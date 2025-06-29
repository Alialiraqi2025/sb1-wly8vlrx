# SecureChat - End-to-End Encrypted Messenger

A modern, secure messaging application built with JavaScript and PHP, featuring end-to-end encryption, voice/video calls, group chats, and file sharing.

## Features

### 🔐 Security
- End-to-end encryption for all messages
- Secure authentication with JWT tokens
- No message storage on servers (client-side encryption)
- Perfect forward secrecy

### 💬 Messaging
- Real-time text messaging
- File and image sharing
- Voice message recording
- Emoji picker
- Typing indicators
- Message reactions
- Reply to messages

### 📞 Communication
- Voice calls
- Video calls
- Group chats
- Direct messaging

### 📱 User Experience
- Responsive design for mobile and desktop
- Modern, intuitive interface
- Real-time notifications
- Online/offline status
- Dark/light theme support

## Technology Stack

### Frontend
- **JavaScript (ES6+)** - Modern vanilla JavaScript
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library
- **CryptoJS** - Client-side encryption

### Backend
- **PHP 7.4+** - Server-side logic
- **MySQL** - Database storage
- **JWT** - Authentication tokens
- **RESTful API** - Clean API architecture

## Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- mod_rewrite enabled

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd securechat
   ```

2. **Configure the database**
   - Edit `api/config.php` with your database credentials
   - Update the JWT secret key for production

3. **Set up the database**
   ```bash
   php api/install.php
   ```

4. **Configure web server**
   - Ensure the document root points to the project directory
   - Make sure `.htaccess` is enabled for Apache
   - Create an `uploads` directory with write permissions:
     ```bash
     mkdir uploads
     chmod 755 uploads
     ```

5. **Update configuration for production**
   - Change `JWT_SECRET` in `api/config.php`
   - Update database credentials
   - Disable error reporting in production

## API Endpoints

### Authentication
- `POST /api/auth?action=login` - User login
- `POST /api/auth?action=register` - User registration
- `POST /api/auth?action=logout` - User logout
- `GET /api/auth?action=verify` - Verify JWT token

### Chat Management
- `GET /api/chat?action=chats` - Get user's chats
- `GET /api/chat?action=messages&chat_id={id}` - Get chat messages
- `POST /api/chat?action=send` - Send message
- `POST /api/chat?action=create_chat` - Create new chat
- `POST /api/chat?action=typing` - Update typing status

### File Upload
- `POST /api/upload` - Upload files/images

## Database Schema

### Tables
- **users** - User accounts and profiles
- **chats** - Chat rooms (direct and group)
- **chat_participants** - Chat membership
- **messages** - All messages with encryption
- **message_reactions** - Message reactions/emojis
- **typing_status** - Real-time typing indicators
- **call_logs** - Voice/video call history

## Security Features

### Encryption
- All messages are encrypted client-side before transmission
- Each message uses a unique symmetric key
- Keys are encrypted with recipient's public key
- Perfect forward secrecy ensures past messages remain secure

### Authentication
- JWT tokens with expiration
- Secure password hashing with PHP's `password_hash()`
- Protected API endpoints requiring authentication

### File Security
- File type validation
- Size limits (10MB default)
- Secure file naming to prevent conflicts
- Upload directory protection

## Development

### File Structure
```
/
├── index.php              # Main application entry point
├── api/                   # Backend API
│   ├── auth.php          # Authentication endpoints
│   ├── chat.php          # Chat management endpoints
│   ├── upload.php        # File upload handling
│   ├── config.php        # Configuration settings
│   ├── database.php      # Database abstraction layer
│   └── install.php       # Database setup script
├── assets/               # Frontend assets
│   ├── css/
│   │   └── style.css     # Custom styles
│   └── js/
│       ├── app.js        # Main application logic
│       ├── auth.js       # Authentication handling
│       ├── chat.js       # Chat functionality
│       └── encryption.js # Client-side encryption
├── uploads/              # File upload directory
├── .htaccess            # Apache configuration
└── README.md            # This file
```

### Adding New Features
1. Create new API endpoints in the appropriate PHP file
2. Add corresponding JavaScript functions
3. Update the database schema if needed
4. Test thoroughly with different user scenarios

## Production Deployment

### Security Checklist
- [ ] Change JWT secret key
- [ ] Update database credentials
- [ ] Disable error reporting
- [ ] Enable HTTPS
- [ ] Set up proper file permissions
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Monitor logs for security issues

### Performance Optimization
- Enable gzip compression
- Set up proper caching headers
- Optimize database queries
- Use CDN for static assets
- Monitor server resources

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.