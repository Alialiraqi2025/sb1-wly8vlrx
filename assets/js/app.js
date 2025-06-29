// Main application controller
class SecureChatApp {
    constructor() {
        this.currentUser = null;
        this.currentChat = null;
        this.chats = new Map();
        this.isAuthenticated = false;
        this.currentView = 'chats';
        
        this.init();
    }

    init() {
        this.showLoading();
        this.setupEventListeners();
        this.checkAuthStatus();
        
        // Hide loading after initialization
        setTimeout(() => {
            this.hideLoading();
            if (!this.isAuthenticated) {
                this.showAuthScreen();
            } else {
                this.showMainApp();
            }
        }, 2000);
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('nav-chats').addEventListener('click', () => this.switchView('chats'));
        document.getElementById('nav-groups').addEventListener('click', () => this.switchView('groups'));
        document.getElementById('nav-settings').addEventListener('click', () => this.switchView('settings'));

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());

        // New chat
        document.getElementById('new-chat-btn').addEventListener('click', () => this.showNewChatModal());
        document.getElementById('close-new-chat-modal').addEventListener('click', () => this.hideNewChatModal());

        // Message input
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());

        // Voice recording
        document.getElementById('voice-record-btn').addEventListener('mousedown', () => this.startVoiceRecording());
        document.getElementById('voice-record-btn').addEventListener('mouseup', () => this.stopVoiceRecording());

        // Call buttons
        document.getElementById('voice-call-btn').addEventListener('click', () => this.startVoiceCall());
        document.getElementById('video-call-btn').addEventListener('click', () => this.startVideoCall());

        // Chat search
        document.getElementById('chat-search').addEventListener('input', (e) => this.searchChats(e.target.value));
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showAuthScreen() {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    }

    showMainApp() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('security-indicator').classList.remove('hidden');
        this.loadChats();
        this.updateUserInfo();
    }

    checkAuthStatus() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.isAuthenticated = true;
        }
    }

    login(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.showMainApp();
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.currentChat = null;
        this.chats.clear();
        localStorage.removeItem('currentUser');
        this.showAuthScreen();
    }

    updateUserInfo() {
        if (this.currentUser) {
            document.getElementById('user-name').textContent = this.currentUser.name;
            document.getElementById('user-avatar').textContent = this.currentUser.name.charAt(0).toUpperCase();
            document.getElementById('settings-name').textContent = this.currentUser.name;
            document.getElementById('settings-email').textContent = this.currentUser.email;
            document.getElementById('settings-avatar').textContent = this.currentUser.name.charAt(0).toUpperCase();
        }
    }

    switchView(view) {
        this.currentView = view;
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`nav-${view}`).classList.add('active');

        // Show/hide views
        document.getElementById('chat-list-view').classList.toggle('hidden', view !== 'chats');
        document.getElementById('group-manager-view').classList.toggle('hidden', view !== 'groups');
        document.getElementById('settings-view').classList.toggle('hidden', view !== 'settings');
    }

    loadChats() {
        // Load demo chats
        this.createDemoChats();
        this.renderChatList();
    }

    createDemoChats() {
        const demoChats = [
            {
                id: 'chat_1',
                type: 'direct',
                name: 'Alice Johnson',
                avatar: 'A',
                lastMessage: 'Hey! How are you doing?',
                timestamp: new Date(Date.now() - 3600000),
                unread: 2,
                online: true
            },
            {
                id: 'chat_2',
                type: 'direct',
                name: 'Bob Smith',
                avatar: 'B',
                lastMessage: 'Thanks for the help earlier!',
                timestamp: new Date(Date.now() - 7200000),
                unread: 0,
                online: false
            },
            {
                id: 'chat_3',
                type: 'group',
                name: 'Team Chat',
                avatar: 'T',
                lastMessage: 'Meeting at 3 PM today',
                timestamp: new Date(Date.now() - 1800000),
                unread: 5,
                online: true
            }
        ];

        demoChats.forEach(chat => {
            this.chats.set(chat.id, chat);
        });
    }

    renderChatList() {
        const chatList = document.getElementById('chat-list');
        chatList.innerHTML = '';

        if (this.chats.size === 0) {
            chatList.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div class="bg-gray-100 p-4 rounded-full mb-4">
                        <i class="fas fa-comments text-gray-400 text-3xl"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">No chats yet</h3>
                    <p class="text-gray-600 mb-4">Start a conversation to begin messaging securely</p>
                    <button class="bg-indigo-500 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-600 transition-colors">
                        Start New Chat
                    </button>
                </div>
            `;
            return;
        }

        const sortedChats = Array.from(this.chats.values()).sort((a, b) => b.timestamp - a.timestamp);

        sortedChats.forEach(chat => {
            const chatElement = this.createChatElement(chat);
            chatList.appendChild(chatElement);
        });
    }

    createChatElement(chat) {
        const div = document.createElement('div');
        div.className = 'chat-item';
        div.dataset.chatId = chat.id;
        
        const timeStr = this.formatTime(chat.timestamp);
        const unreadBadge = chat.unread > 0 ? 
            `<div class="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">${chat.unread > 9 ? '9+' : chat.unread}</div>` : '';

        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="relative">
                    <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-semibold">${chat.avatar}</span>
                    </div>
                    ${chat.online ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>' : ''}
                </div>
                
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                        <h3 class="font-medium text-gray-900 truncate">${chat.name}</h3>
                        <div class="flex items-center space-x-2">
                            <span class="text-xs text-gray-500">${timeStr}</span>
                            ${unreadBadge}
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 truncate">${chat.lastMessage}</p>
                </div>
            </div>
        `;

        div.addEventListener('click', () => this.selectChat(chat.id));
        return div;
    }

    selectChat(chatId) {
        this.currentChat = this.chats.get(chatId);
        
        // Update UI
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-chat-id="${chatId}"]`).classList.add('active');

        // Show chat window
        document.getElementById('no-chat-selected').classList.add('hidden');
        document.getElementById('active-chat').classList.remove('hidden');

        // Update chat header
        document.getElementById('chat-name').textContent = this.currentChat.name;
        document.getElementById('chat-avatar').textContent = this.currentChat.avatar;
        document.getElementById('chat-status').textContent = this.currentChat.online ? 'Online' : 'Last seen recently';

        // Load messages
        this.loadMessages();

        // Mark as read
        this.markChatAsRead(chatId);
    }

    loadMessages() {
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';

        // Demo messages
        const demoMessages = [
            {
                id: 'msg_1',
                senderId: this.currentChat.id === 'chat_1' ? 'alice' : 'bob',
                content: 'Hey! How are you doing?',
                timestamp: new Date(Date.now() - 3600000),
                type: 'text'
            },
            {
                id: 'msg_2',
                senderId: 'me',
                content: 'Hi! I\'m doing great, thanks for asking! 😊',
                timestamp: new Date(Date.now() - 3500000),
                type: 'text'
            },
            {
                id: 'msg_3',
                senderId: this.currentChat.id === 'chat_1' ? 'alice' : 'bob',
                content: 'That\'s wonderful! Are you free for a video call later?',
                timestamp: new Date(Date.now() - 1800000),
                type: 'text'
            }
        ];

        demoMessages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
        const div = document.createElement('div');
        const isOwn = message.senderId === 'me';
        
        div.className = `message ${isOwn ? 'sent' : 'received'}`;
        
        const timeStr = this.formatTime(message.timestamp);
        
        div.innerHTML = `
            <div class="message-bubble ${isOwn ? 'sent' : 'received'}">
                <p>${message.content}</p>
                <div class="message-time">${timeStr}</div>
            </div>
        `;

        return div;
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const content = input.value.trim();
        
        if (!content || !this.currentChat) return;

        const message = {
            id: 'msg_' + Date.now(),
            senderId: 'me',
            content: content,
            timestamp: new Date(),
            type: 'text'
        };

        // Add to UI
        const messagesContainer = document.getElementById('messages-container');
        const messageElement = this.createMessageElement(message);
        messagesContainer.appendChild(messageElement);

        // Update chat list
        this.currentChat.lastMessage = content;
        this.currentChat.timestamp = new Date();
        this.renderChatList();

        // Clear input
        input.value = '';

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate response
        setTimeout(() => this.simulateResponse(), 1000);
    }

    simulateResponse() {
        const responses = [
            "That's interesting!",
            "I see what you mean.",
            "Thanks for sharing that.",
            "Let me think about it.",
            "Sounds good to me!",
            "I agree with you.",
            "That makes sense."
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const message = {
            id: 'msg_' + Date.now(),
            senderId: this.currentChat.id,
            content: response,
            timestamp: new Date(),
            type: 'text'
        };

        const messagesContainer = document.getElementById('messages-container');
        const messageElement = this.createMessageElement(message);
        messagesContainer.appendChild(messageElement);

        // Update chat list
        this.currentChat.lastMessage = response;
        this.currentChat.timestamp = new Date();
        this.renderChatList();

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    startVoiceRecording() {
        const btn = document.getElementById('voice-record-btn');
        btn.classList.add('recording');
        btn.innerHTML = '<i class="fas fa-stop"></i>';
        
        // Simulate recording
        console.log('Started voice recording');
    }

    stopVoiceRecording() {
        const btn = document.getElementById('voice-record-btn');
        btn.classList.remove('recording');
        btn.innerHTML = '<i class="fas fa-microphone"></i>';
        
        // Simulate sending voice message
        console.log('Stopped voice recording');
        this.sendVoiceMessage();
    }

    sendVoiceMessage() {
        const message = {
            id: 'msg_' + Date.now(),
            senderId: 'me',
            content: '🎤 Voice message',
            timestamp: new Date(),
            type: 'voice'
        };

        const messagesContainer = document.getElementById('messages-container');
        const messageElement = this.createMessageElement(message);
        messagesContainer.appendChild(messageElement);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    startVoiceCall() {
        if (!this.currentChat) return;
        this.showCallInterface('voice');
    }

    startVideoCall() {
        if (!this.currentChat) return;
        this.showCallInterface('video');
    }

    showCallInterface(type) {
        const callInterface = document.createElement('div');
        callInterface.className = 'call-interface';
        callInterface.innerHTML = `
            <div class="call-avatar">
                <span style="font-size: 4rem;">${this.currentChat.avatar}</span>
            </div>
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">${this.currentChat.name}</h2>
            <p style="font-size: 1.2rem; opacity: 0.8;">${type === 'video' ? 'Video' : 'Voice'} Call</p>
            <p style="opacity: 0.6;">00:00</p>
            
            <div class="call-controls">
                <button class="call-btn mute" id="mute-btn">
                    <i class="fas fa-microphone"></i>
                </button>
                ${type === 'video' ? '<button class="call-btn mute" id="video-btn"><i class="fas fa-video"></i></button>' : ''}
                <button class="call-btn end" id="end-call-btn">
                    <i class="fas fa-phone"></i>
                </button>
            </div>
        `;

        document.body.appendChild(callInterface);

        // Call controls
        document.getElementById('end-call-btn').addEventListener('click', () => {
            document.body.removeChild(callInterface);
        });

        const muteBtn = document.getElementById('mute-btn');
        muteBtn.addEventListener('click', () => {
            muteBtn.classList.toggle('active');
            const icon = muteBtn.querySelector('i');
            icon.className = muteBtn.classList.contains('active') ? 'fas fa-microphone-slash' : 'fas fa-microphone';
        });

        if (type === 'video') {
            const videoBtn = document.getElementById('video-btn');
            videoBtn.addEventListener('click', () => {
                videoBtn.classList.toggle('active');
                const icon = videoBtn.querySelector('i');
                icon.className = videoBtn.classList.contains('active') ? 'fas fa-video-slash' : 'fas fa-video';
            });
        }
    }

    markChatAsRead(chatId) {
        const chat = this.chats.get(chatId);
        if (chat) {
            chat.unread = 0;
            this.renderChatList();
        }
    }

    searchChats(query) {
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const chatName = item.querySelector('h3').textContent.toLowerCase();
            const lastMessage = item.querySelector('p').textContent.toLowerCase();
            const matches = chatName.includes(query.toLowerCase()) || lastMessage.includes(query.toLowerCase());
            item.style.display = matches ? 'block' : 'none';
        });
    }

    showNewChatModal() {
        document.getElementById('new-chat-modal').classList.remove('hidden');
    }

    hideNewChatModal() {
        document.getElementById('new-chat-modal').classList.add('hidden');
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`;
        
        return date.toLocaleDateString();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SecureChatApp();
});