// Chat management functionality
class ChatManager {
    constructor() {
        this.activeChats = new Map();
        this.messageQueue = [];
        this.typingIndicators = new Map();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // File attachment
        document.getElementById('attachment-btn').addEventListener('click', () => this.showAttachmentMenu());
        
        // Emoji picker
        document.getElementById('emoji-btn').addEventListener('click', () => this.showEmojiPicker());
        
        // Message input events
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('input', () => this.handleTyping());
        messageInput.addEventListener('paste', (e) => this.handlePaste(e));
    }

    showAttachmentMenu() {
        // Create attachment menu
        const menu = document.createElement('div');
        menu.className = 'absolute bottom-16 left-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-10';
        menu.innerHTML = `
            <div class="grid grid-cols-2 gap-3">
                <button class="attachment-option flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors" data-type="image">
                    <i class="fas fa-image text-blue-600 text-xl mb-1"></i>
                    <span class="text-xs text-blue-900">Photo</span>
                </button>
                <button class="attachment-option flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors" data-type="file">
                    <i class="fas fa-file text-green-600 text-xl mb-1"></i>
                    <span class="text-xs text-green-900">File</span>
                </button>
                <button class="attachment-option flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors" data-type="camera">
                    <i class="fas fa-camera text-purple-600 text-xl mb-1"></i>
                    <span class="text-xs text-purple-900">Camera</span>
                </button>
                <button class="attachment-option flex flex-col items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors" data-type="location">
                    <i class="fas fa-map-marker-alt text-orange-600 text-xl mb-1"></i>
                    <span class="text-xs text-orange-900">Location</span>
                </button>
            </div>
        `;

        // Position menu
        const messageContainer = document.querySelector('.p-4.bg-white.border-t');
        messageContainer.style.position = 'relative';
        messageContainer.appendChild(menu);

        // Handle attachment selection
        menu.querySelectorAll('.attachment-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.handleAttachment(type);
                menu.remove();
            });
        });

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }

    showEmojiPicker() {
        const emojis = [
            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
            '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗',
            '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨',
            '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞',
            '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫',
            '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
            '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
            '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍'
        ];

        const picker = document.createElement('div');
        picker.className = 'absolute bottom-16 left-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-10 max-h-48 overflow-y-auto';
        picker.innerHTML = `
            <div class="grid grid-cols-8 gap-2">
                ${emojis.map(emoji => `
                    <button class="emoji-btn text-xl hover:bg-gray-100 rounded-lg p-2 transition-colors">${emoji}</button>
                `).join('')}
            </div>
        `;

        const messageContainer = document.querySelector('.p-4.bg-white.border-t');
        messageContainer.appendChild(picker);

        // Handle emoji selection
        picker.querySelectorAll('.emoji-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const emoji = e.target.textContent;
                const messageInput = document.getElementById('message-input');
                messageInput.value += emoji;
                messageInput.focus();
                picker.remove();
            });
        });

        // Close picker when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closePicker(e) {
                if (!picker.contains(e.target) && e.target.id !== 'emoji-btn') {
                    picker.remove();
                    document.removeEventListener('click', closePicker);
                }
            });
        }, 100);
    }

    handleAttachment(type) {
        switch (type) {
            case 'image':
                this.selectImage();
                break;
            case 'file':
                this.selectFile();
                break;
            case 'camera':
                this.openCamera();
                break;
            case 'location':
                this.shareLocation();
                break;
        }
    }

    selectImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.sendImageMessage(file);
            }
        };
        input.click();
    }

    selectFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.sendFileMessage(file);
            }
        };
        input.click();
    }

    openCamera() {
        // In a real app, this would open the camera
        alert('Camera functionality would be implemented here');
    }

    shareLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.sendLocationMessage(latitude, longitude);
                },
                (error) => {
                    alert('Unable to get location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser');
        }
    }

    sendImageMessage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const message = {
                id: 'msg_' + Date.now(),
                senderId: 'me',
                content: `📷 Image: ${file.name}`,
                timestamp: new Date(),
                type: 'image',
                attachment: {
                    url: e.target.result,
                    name: file.name,
                    size: file.size
                }
            };

            this.addMessageToChat(message);
        };
        reader.readAsDataURL(file);
    }

    sendFileMessage(file) {
        const message = {
            id: 'msg_' + Date.now(),
            senderId: 'me',
            content: `📎 File: ${file.name}`,
            timestamp: new Date(),
            type: 'file',
            attachment: {
                name: file.name,
                size: file.size,
                type: file.type
            }
        };

        this.addMessageToChat(message);
    }

    sendLocationMessage(latitude, longitude) {
        const message = {
            id: 'msg_' + Date.now(),
            senderId: 'me',
            content: `📍 Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            timestamp: new Date(),
            type: 'location',
            location: { latitude, longitude }
        };

        this.addMessageToChat(message);
    }

    addMessageToChat(message) {
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = this.createMessageElement(message);
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Update chat list
        if (window.app && window.app.currentChat) {
            window.app.currentChat.lastMessage = message.content;
            window.app.currentChat.timestamp = new Date();
            window.app.renderChatList();
        }
    }

    createMessageElement(message) {
        const div = document.createElement('div');
        const isOwn = message.senderId === 'me';
        
        div.className = `message ${isOwn ? 'sent' : 'received'}`;
        
        const timeStr = this.formatTime(message.timestamp);
        let content = message.content;

        // Handle different message types
        if (message.type === 'image' && message.attachment) {
            content = `<img src="${message.attachment.url}" alt="${message.attachment.name}" class="max-w-xs rounded-lg mb-2">`;
        } else if (message.type === 'file' && message.attachment) {
            content = `
                <div class="flex items-center space-x-3 bg-white/20 p-3 rounded-lg">
                    <i class="fas fa-file text-xl"></i>
                    <div>
                        <div class="font-medium">${message.attachment.name}</div>
                        <div class="text-xs opacity-75">${this.formatFileSize(message.attachment.size)}</div>
                    </div>
                </div>
            `;
        }
        
        div.innerHTML = `
            <div class="message-bubble ${isOwn ? 'sent' : 'received'}">
                ${content}
                <div class="message-time">${timeStr}</div>
            </div>
        `;

        return div;
    }

    handleTyping() {
        // Implement typing indicator logic
        const chatId = window.app?.currentChat?.id;
        if (!chatId) return;

        // Clear existing timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        // Show typing indicator
        this.showTypingIndicator(chatId);

        // Hide typing indicator after 3 seconds of inactivity
        this.typingTimeout = setTimeout(() => {
            this.hideTypingIndicator(chatId);
        }, 3000);
    }

    showTypingIndicator(chatId) {
        // In a real app, this would send typing status to other users
        console.log(`User is typing in chat ${chatId}`);
    }

    hideTypingIndicator(chatId) {
        // In a real app, this would stop typing status
        console.log(`User stopped typing in chat ${chatId}`);
    }

    handlePaste(e) {
        const items = e.clipboardData.items;
        
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                this.sendImageMessage(file);
                break;
            }
        }
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize chat manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
});