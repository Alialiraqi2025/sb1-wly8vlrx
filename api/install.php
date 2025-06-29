<?php
require_once 'config.php';

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE " . DB_NAME);
    
    // Create users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            avatar VARCHAR(10) DEFAULT NULL,
            public_key TEXT DEFAULT NULL,
            is_online BOOLEAN DEFAULT FALSE,
            last_login TIMESTAMP NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    
    // Create chats table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS chats (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type ENUM('direct', 'group') NOT NULL,
            name VARCHAR(255) DEFAULT NULL,
            description TEXT DEFAULT NULL,
            avatar VARCHAR(255) DEFAULT NULL,
            created_by INT NOT NULL,
            last_message_id INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
        )
    ");
    
    // Create chat_participants table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS chat_participants (
            id INT AUTO_INCREMENT PRIMARY KEY,
            chat_id INT NOT NULL,
            user_id INT NOT NULL,
            role ENUM('admin', 'member') DEFAULT 'member',
            joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE KEY unique_participant (chat_id, user_id)
        )
    ");
    
    // Create messages table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            chat_id INT NOT NULL,
            sender_id INT NOT NULL,
            content TEXT NOT NULL,
            type ENUM('text', 'image', 'file', 'voice', 'video', 'location') DEFAULT 'text',
            encrypted_content LONGTEXT DEFAULT NULL,
            attachment_url VARCHAR(500) DEFAULT NULL,
            attachment_name VARCHAR(255) DEFAULT NULL,
            attachment_size INT DEFAULT NULL,
            is_read BOOLEAN DEFAULT FALSE,
            is_deleted BOOLEAN DEFAULT FALSE,
            reply_to_id INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
            FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (reply_to_id) REFERENCES messages(id) ON DELETE SET NULL
        )
    ");
    
    // Create message_reactions table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS message_reactions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            message_id INT NOT NULL,
            user_id INT NOT NULL,
            emoji VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE KEY unique_reaction (message_id, user_id, emoji)
        )
    ");
    
    // Create typing_status table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS typing_status (
            chat_id INT NOT NULL,
            user_id INT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (chat_id, user_id),
            FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ");
    
    // Create call_logs table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS call_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            chat_id INT NOT NULL,
            caller_id INT NOT NULL,
            type ENUM('voice', 'video') NOT NULL,
            status ENUM('missed', 'answered', 'declined') NOT NULL,
            duration INT DEFAULT 0,
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ended_at TIMESTAMP NULL,
            FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
            FOREIGN KEY (caller_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ");
    
    // Add foreign key for last_message_id in chats table
    $pdo->exec("
        ALTER TABLE chats 
        ADD CONSTRAINT fk_chats_last_message 
        FOREIGN KEY (last_message_id) REFERENCES messages(id) ON DELETE SET NULL
    ");
    
    // Create indexes for better performance
    $pdo->exec("CREATE INDEX idx_messages_chat_id ON messages(chat_id)");
    $pdo->exec("CREATE INDEX idx_messages_created_at ON messages(created_at)");
    $pdo->exec("CREATE INDEX idx_chat_participants_user_id ON chat_participants(user_id)");
    $pdo->exec("CREATE INDEX idx_users_email ON users(email)");
    
    echo "Database setup completed successfully!\n";
    echo "Tables created:\n";
    echo "- users\n";
    echo "- chats\n";
    echo "- chat_participants\n";
    echo "- messages\n";
    echo "- message_reactions\n";
    echo "- typing_status\n";
    echo "- call_logs\n";
    
} catch (PDOException $e) {
    echo "Database setup failed: " . $e->getMessage() . "\n";
}
?>