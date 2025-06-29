<?php
class Database {
    private $pdo;
    
    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    // User management
    public function createUser($name, $email, $password) {
        $stmt = $this->pdo->prepare("
            INSERT INTO users (name, email, password, avatar, created_at) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        
        $avatar = strtoupper($name[0]);
        $stmt->execute([$name, $email, $password, $avatar]);
        
        return $this->pdo->lastInsertId();
    }
    
    public function getUserByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }
    
    public function getUserById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
    
    public function updateLastLogin($userId) {
        $stmt = $this->pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$userId]);
    }
    
    // Chat management
    public function createChat($type, $name, $creatorId, $participants) {
        $this->pdo->beginTransaction();
        
        try {
            // Create chat
            $stmt = $this->pdo->prepare("
                INSERT INTO chats (type, name, created_by, created_at) 
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$type, $name, $creatorId]);
            $chatId = $this->pdo->lastInsertId();
            
            // Add creator as participant
            $this->addChatParticipant($chatId, $creatorId);
            
            // Add other participants
            foreach ($participants as $participantId) {
                if ($participantId != $creatorId) {
                    $this->addChatParticipant($chatId, $participantId);
                }
            }
            
            $this->pdo->commit();
            return $chatId;
        } catch (Exception $e) {
            $this->pdo->rollback();
            throw $e;
        }
    }
    
    public function addChatParticipant($chatId, $userId) {
        $stmt = $this->pdo->prepare("
            INSERT INTO chat_participants (chat_id, user_id, joined_at) 
            VALUES (?, ?, NOW())
        ");
        $stmt->execute([$chatId, $userId]);
    }
    
    public function getUserChats($userId) {
        $stmt = $this->pdo->prepare("
            SELECT c.*, 
                   m.content as last_message,
                   m.created_at as last_message_time,
                   COUNT(CASE WHEN m2.is_read = 0 AND m2.sender_id != ? THEN 1 END) as unread_count
            FROM chats c
            INNER JOIN chat_participants cp ON c.id = cp.chat_id
            LEFT JOIN messages m ON c.last_message_id = m.id
            LEFT JOIN messages m2 ON c.id = m2.chat_id AND m2.sender_id != ?
            WHERE cp.user_id = ?
            GROUP BY c.id
            ORDER BY c.updated_at DESC
        ");
        $stmt->execute([$userId, $userId, $userId]);
        return $stmt->fetchAll();
    }
    
    public function userHasAccessToChat($userId, $chatId) {
        $stmt = $this->pdo->prepare("
            SELECT 1 FROM chat_participants 
            WHERE chat_id = ? AND user_id = ?
        ");
        $stmt->execute([$chatId, $userId]);
        return $stmt->fetch() !== false;
    }
    
    // Message management
    public function createMessage($chatId, $senderId, $content, $type = 'text', $encryptedContent = null) {
        $stmt = $this->pdo->prepare("
            INSERT INTO messages (chat_id, sender_id, content, type, encrypted_content, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([$chatId, $senderId, $content, $type, $encryptedContent]);
        
        return $this->pdo->lastInsertId();
    }
    
    public function getChatMessages($chatId, $limit = 50, $offset = 0) {
        $stmt = $this->pdo->prepare("
            SELECT m.*, u.name as sender_name, u.avatar as sender_avatar
            FROM messages m
            INNER JOIN users u ON m.sender_id = u.id
            WHERE m.chat_id = ?
            ORDER BY m.created_at DESC
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([$chatId, $limit, $offset]);
        return array_reverse($stmt->fetchAll());
    }
    
    public function updateChatLastMessage($chatId, $messageId) {
        $stmt = $this->pdo->prepare("
            UPDATE chats 
            SET last_message_id = ?, updated_at = NOW() 
            WHERE id = ?
        ");
        $stmt->execute([$messageId, $chatId]);
    }
    
    public function markMessageAsRead($messageId, $userId) {
        $stmt = $this->pdo->prepare("
            UPDATE messages 
            SET is_read = 1 
            WHERE id = ? AND chat_id IN (
                SELECT chat_id FROM chat_participants WHERE user_id = ?
            )
        ");
        $stmt->execute([$messageId, $userId]);
    }
    
    // Typing status
    public function updateTypingStatus($chatId, $userId, $isTyping) {
        if ($isTyping) {
            $stmt = $this->pdo->prepare("
                INSERT INTO typing_status (chat_id, user_id, updated_at) 
                VALUES (?, ?, NOW())
                ON DUPLICATE KEY UPDATE updated_at = NOW()
            ");
            $stmt->execute([$chatId, $userId]);
        } else {
            $stmt = $this->pdo->prepare("
                DELETE FROM typing_status 
                WHERE chat_id = ? AND user_id = ?
            ");
            $stmt->execute([$chatId, $userId]);
        }
    }
    
    public function getTypingUsers($chatId) {
        $stmt = $this->pdo->prepare("
            SELECT u.id, u.name 
            FROM typing_status ts
            INNER JOIN users u ON ts.user_id = u.id
            WHERE ts.chat_id = ? AND ts.updated_at > DATE_SUB(NOW(), INTERVAL 5 SECOND)
        ");
        $stmt->execute([$chatId]);
        return $stmt->fetchAll();
    }
}
?>