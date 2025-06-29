<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'securechat');
define('DB_USER', 'root');
define('DB_PASS', '');

// JWT Secret (in production, use a strong random key)
define('JWT_SECRET', 'your-super-secret-jwt-key-change-this-in-production');

// File upload settings
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('UPLOAD_DIR', '../uploads/');

// Allowed file types
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
define('ALLOWED_FILE_TYPES', ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']);

// CORS settings
define('ALLOWED_ORIGINS', ['http://localhost', 'http://127.0.0.1']);

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('UTC');
?>