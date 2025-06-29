<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';

class UploadAPI {
    private $userId;
    
    public function __construct() {
        $this->userId = $this->authenticateUser();
    }
    
    public function handleRequest() {
        if (!$this->userId) {
            $this->sendError('Authentication required', 401);
            return;
        }
        
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendError('Method not allowed', 405);
            return;
        }
        
        if (!isset($_FILES['file'])) {
            $this->sendError('No file uploaded');
            return;
        }
        
        $this->uploadFile();
    }
    
    private function uploadFile() {
        $file = $_FILES['file'];
        
        // Check for upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $this->sendError('Upload failed: ' . $this->getUploadError($file['error']));
            return;
        }
        
        // Check file size
        if ($file['size'] > MAX_FILE_SIZE) {
            $this->sendError('File too large. Maximum size: ' . (MAX_FILE_SIZE / 1024 / 1024) . 'MB');
            return;
        }
        
        // Check file type
        $fileType = $file['type'];
        $isImage = in_array($fileType, ALLOWED_IMAGE_TYPES);
        $isFile = in_array($fileType, ALLOWED_FILE_TYPES);
        
        if (!$isImage && !$isFile) {
            $this->sendError('File type not allowed');
            return;
        }
        
        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '_' . time() . '.' . $extension;
        $uploadPath = UPLOAD_DIR . $filename;
        
        // Create upload directory if it doesn't exist
        if (!is_dir(UPLOAD_DIR)) {
            mkdir(UPLOAD_DIR, 0755, true);
        }
        
        // Move uploaded file
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            $fileUrl = '/uploads/' . $filename;
            
            $this->sendSuccess([
                'filename' => $filename,
                'original_name' => $file['name'],
                'url' => $fileUrl,
                'size' => $file['size'],
                'type' => $fileType,
                'is_image' => $isImage
            ]);
        } else {
            $this->sendError('Failed to save file');
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
    
    private function getUploadError($code) {
        switch ($code) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return 'File too large';
            case UPLOAD_ERR_PARTIAL:
                return 'File partially uploaded';
            case UPLOAD_ERR_NO_FILE:
                return 'No file uploaded';
            case UPLOAD_ERR_NO_TMP_DIR:
                return 'No temporary directory';
            case UPLOAD_ERR_CANT_WRITE:
                return 'Cannot write file';
            case UPLOAD_ERR_EXTENSION:
                return 'Upload stopped by extension';
            default:
                return 'Unknown error';
        }
    }
    
    private function sendSuccess($data) {
        echo json_encode(['success' => true, 'data' => $data]);
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['success' => false, 'error' => $message]);
    }
}

$api = new UploadAPI();
$api->handleRequest();
?>