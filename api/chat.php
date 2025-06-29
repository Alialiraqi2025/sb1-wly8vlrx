<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';
require_once 'database.php';

class ChatAPI {
    private $db;
    private $userId;
    
    public function __construct() {
        $this->db = new Database();
        $this->userId = $this->authenticateUser();
    }
    
    public function handleRequest() {
        if (!$this->userId) {
            $this->sendError('Authentication required', 401);
            return;
        }
        
        $method = $_SERVER['REQUEST_METHOD'];
        $action = $_GET['action'] ?? '';
        
        switch ($method) {
            case 'GET':
                if ($action === 'chats') {
                    $this->getChats();
                } elseif ($action === 'messages') {
                    $this->getMessages();
                }
                break;
            case 'POST':
                if ($action === 'send') {
                    $this->sendMessage();
                } elseif ($action === 'create_chat') {
                    $this->createChat();
                } elseif ($action === 'typing') {
                    $this->updateTypingStatus();
                }
                break;
            default:
                $this->sendError('Method not allowed', 405);
        }
    }
    
    private function authenticateUser() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        
        if (strpos($token, 'Bearer ') === 0) {
            $token = substr($token, 7);
        }
        
        if (!$token) {
            return null;
        }
        
        try {
            $decoded = $this->verifyJWT($token);
            return $decoded['user_id'];
        } catch (Exception $e) {
            return null;
        }
    }
    
    private function getChats() {
        try {
            $chats = $this->db->getUserChats($this->userId);
            $this->sendSuccess($chats);
        } catch (Exception $e) {
            $this->sendError('Failed to get chats: ' . $e->getMessage());
        }
    }
    
    private function getMessages() {
        $chatId = $_GET['chat_id'] ?? '';
        
        if (!$chatId) {
            $this->sendError('Chat ID required');
            return;
        }
        
        try {
            // Verify user has access to this chat
            if (!$this->db->userHasAccessToChat($this->userId, $chatId)) {
                $this->sendError('Access denied', 403);
                return;
            }
            
            $messages = $this->db->getChatMessages($chatId);
            $this->sendSuccess($messages);
        } catch (Exception $e) {
            $this->sendError('Failed to get messages: ' . $e->getMessage());
        }
    }
    
    private function sendMessage() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['chat_id']) || !isset($input['content'])) {
            $this->sendError('Chat ID and content are required');
            return;
        }
        
        $chatId = $input['chat_id'];
        $content = trim($input['content']);
        $type = $input['type'] ?? 'text';
        $encryptedContent = $input['encrypted_content'] ?? null;
        
        if (empty($content) && empty($encryptedContent)) {
            $this->sendError('Message content cannot be empty');
            return;
        }
        
        try {
            // Verify user has access to this chat
            if (!$this->db->userHasAccessToChat($this->userId, $chatId)) {
                $this->sendError('Access denied', 403);
                return;
            }
            
            $messageId = $this->db->createMessage($chatId, $this->userId, $content, $type, $encryptedContent);
            
            // Update chat's last message
            $this->db->updateChatLastMessage($chatId, $messageId);
            
            $this->sendSuccess(['message_id' => $messageId]);
        } catch (Exception $e) {
            $this->sendError('Failed to send message: ' . $e->getMessage());
        }
    }
    
    private function createChat() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['type'])) {
            $this->sendError('Chat type is required');
            return;
        }
        
        $type = $input['type'];
        $name = $input['name'] ?? null;
        $participants = $input['participants'] ?? [];
        
        if ($type === 'group' && empty($name)) {
            $this->sendError('Group name is required');
            return;
        }
        
        if (empty($participants)) {
            $this->sendError('At least one participant is required');
            return;
        }
        
        try {
            $chatId = $this->db->createChat($type, $name, $this->userId, $participants);
            $this->sendSuccess(['chat_id' => $chatId]);
        } catch (Exception $e) {
            $this->sendError('Failed to create chat: ' . $e->getMessage());
        }
    }
    
    private function updateTypingStatus() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['chat_id']) || !isset($input['is_typing'])) {
            $this->sendError('Chat ID and typing status are required');
            return;
        }
        
        $chatId = $input['chat_id'];
        $isTyping = (bool)$input['is_typing'];
        
        try {
            // Verify user has access to this chat
            if (!$this->db->userHasAccessToChat($this->userId, $chatId)) {
                $this->sendError('Access denied', 403);
                return;
            }
            
            $this->db->updateTypingStatus($chatId, $this->userId, $isTyping);
            $this->sendSuccess(['status' => 'updated']);
        } catch (Exception $e) {
            $this->sendError('Failed to update typing status: ' . $e->getMessage());
        }
    }
    
    private function verifyJWT($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            throw new Exception('Invalid token format');
        }
        
        $header = json_decode($this->base64UrlDecode($parts[0]), true);
        $payload = json_decode($this->base64UrlDecode($parts[1]), true);
        $signature = $this->base64UrlDecode($parts[2]);
        
        $expectedSignature = hash_hmac('sha256', $parts[0] . "." . $parts[1], JWT_SECRET, true);
        
        if (!hash_equals($signature, $expectedSignature)) {
            throw new Exception('Invalid signature');
        }
        
        if ($payload['exp'] < time()) {
            throw new Exception('Token expired');
        }
        
        return $payload;
    }
    
    private function base64UrlDecode($data) {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }
    
    private function sendSuccess($data) {
        echo json_encode(['success' => true, 'data' => $data]);
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['success' => false, 'error' => $message]);
    }
}

$api = new ChatAPI();
$api->handleRequest();
?>