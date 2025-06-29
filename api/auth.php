<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';
require_once 'database.php';

class AuthAPI {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $action = $_GET['action'] ?? '';
        
        switch ($method) {
            case 'POST':
                if ($action === 'login') {
                    $this->login();
                } elseif ($action === 'register') {
                    $this->register();
                } elseif ($action === 'logout') {
                    $this->logout();
                }
                break;
            case 'GET':
                if ($action === 'verify') {
                    $this->verifyToken();
                }
                break;
            default:
                $this->sendError('Method not allowed', 405);
        }
    }
    
    private function login() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['email']) || !isset($input['password'])) {
            $this->sendError('Email and password are required');
            return;
        }
        
        $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
        $password = $input['password'];
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->sendError('Invalid email format');
            return;
        }
        
        try {
            $user = $this->db->getUserByEmail($email);
            
            if (!$user || !password_verify($password, $user['password'])) {
                $this->sendError('Invalid credentials');
                return;
            }
            
            // Generate JWT token
            $token = $this->generateToken($user['id']);
            
            // Update last login
            $this->db->updateLastLogin($user['id']);
            
            $this->sendSuccess([
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'avatar' => $user['avatar'],
                    'created_at' => $user['created_at']
                ],
                'token' => $token
            ]);
            
        } catch (Exception $e) {
            $this->sendError('Login failed: ' . $e->getMessage());
        }
    }
    
    private function register() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['name']) || !isset($input['email']) || !isset($input['password'])) {
            $this->sendError('Name, email and password are required');
            return;
        }
        
        $name = trim($input['name']);
        $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
        $password = $input['password'];
        
        if (strlen($name) < 2) {
            $this->sendError('Name must be at least 2 characters long');
            return;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->sendError('Invalid email format');
            return;
        }
        
        if (strlen($password) < 6) {
            $this->sendError('Password must be at least 6 characters long');
            return;
        }
        
        try {
            // Check if user already exists
            if ($this->db->getUserByEmail($email)) {
                $this->sendError('User with this email already exists');
                return;
            }
            
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Create user
            $userId = $this->db->createUser($name, $email, $hashedPassword);
            
            // Generate token
            $token = $this->generateToken($userId);
            
            $this->sendSuccess([
                'user' => [
                    'id' => $userId,
                    'name' => $name,
                    'email' => $email,
                    'avatar' => strtoupper($name[0]),
                    'created_at' => date('Y-m-d H:i:s')
                ],
                'token' => $token
            ]);
            
        } catch (Exception $e) {
            $this->sendError('Registration failed: ' . $e->getMessage());
        }
    }
    
    private function logout() {
        // In a real app, you might want to blacklist the token
        $this->sendSuccess(['message' => 'Logged out successfully']);
    }
    
    private function verifyToken() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        
        if (strpos($token, 'Bearer ') === 0) {
            $token = substr($token, 7);
        }
        
        if (!$token) {
            $this->sendError('Token required', 401);
            return;
        }
        
        try {
            $decoded = $this->verifyJWT($token);
            $user = $this->db->getUserById($decoded['user_id']);
            
            if (!$user) {
                $this->sendError('User not found', 401);
                return;
            }
            
            $this->sendSuccess([
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'avatar' => $user['avatar'],
                    'created_at' => $user['created_at']
                ]
            ]);
            
        } catch (Exception $e) {
            $this->sendError('Invalid token', 401);
        }
    }
    
    private function generateToken($userId) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'user_id' => $userId,
            'exp' => time() + (24 * 60 * 60) // 24 hours
        ]);
        
        $headerEncoded = $this->base64UrlEncode($header);
        $payloadEncoded = $this->base64UrlEncode($payload);
        
        $signature = hash_hmac('sha256', $headerEncoded . "." . $payloadEncoded, JWT_SECRET, true);
        $signatureEncoded = $this->base64UrlEncode($signature);
        
        return $headerEncoded . "." . $payloadEncoded . "." . $signatureEncoded;
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
    
    private function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
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

$api = new AuthAPI();
$api->handleRequest();
?>