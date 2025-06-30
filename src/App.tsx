import React, { useState, useEffect } from 'react';
import { Shield, MessageCircle, Users, Settings, Lock, Zap } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import SettingsPanel from './components/SettingsPanel';
import { User, Chat, Message } from './types';
import { generateDemoData } from './utils/demoData';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'chats' | 'groups' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Load demo data when user logs in
      const demoChats = generateDemoData();
      setChats(demoChats);
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedChat(null);
    setChats([]);
    setMessages([]);
    setCurrentView('chats');
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    // Load messages for selected chat
    const demoMessages: Message[] = [
      {
        id: '1',
        chatId: chat.id,
        senderId: chat.participants[0].id === currentUser?.id ? chat.participants[1].id : chat.participants[0].id,
        content: 'Hey! How are you doing today?',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        encrypted: true
      },
      {
        id: '2',
        chatId: chat.id,
        senderId: currentUser?.id || '',
        content: 'I\'m doing great! Thanks for asking 😊',
        timestamp: new Date(Date.now() - 3500000),
        type: 'text',
        encrypted: true
      },
      {
        id: '3',
        chatId: chat.id,
        senderId: chat.participants[0].id === currentUser?.id ? chat.participants[1].id : chat.participants[0].id,
        content: 'That\'s wonderful! Are you free for a video call later?',
        timestamp: new Date(Date.now() - 1800000),
        type: 'text',
        encrypted: true
      }
    ];
    setMessages(demoMessages);
  };

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'file' | 'voice' = 'text') => {
    if (!selectedChat || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: selectedChat.id,
      senderId: currentUser.id,
      content,
      timestamp: new Date(),
      type,
      encrypted: true
    };

    setMessages(prev => [...prev, newMessage]);

    // Update chat's last message
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: content, lastMessageTime: new Date() }
        : chat
    ));

    // Simulate response after 1-2 seconds
    setTimeout(() => {
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
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        chatId: selectedChat.id,
        senderId: selectedChat.participants.find(p => p.id !== currentUser.id)?.id || '',
        content: response,
        timestamp: new Date(),
        type: 'text',
        encrypted: true
      };

      setMessages(prev => [...prev, responseMessage]);
      setChats(prev => prev.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, lastMessage: response, lastMessageTime: new Date() }
          : chat
      ));
    }, Math.random() * 1000 + 1000);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
        <div className="text-center animate-fade-in">
          <div className="glass-strong rounded-3xl p-12 mb-8 inline-block animate-glow">
            <Shield className="w-20 h-20 text-white mx-auto animate-pulse-slow" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">SecureChat</h1>
          <p className="text-xl text-white/80 mb-8 font-medium">End-to-End Encrypted Messaging</p>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="app-container bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header */}
      <header className="app-header glass-strong border-b border-white/20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="gradient-primary p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">SecureChat</h1>
                <p className="text-xs sm:text-sm text-white/70 font-medium">End-to-End Encrypted</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentView('chats')}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-medium ${
                  currentView === 'chats'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setCurrentView('groups')}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-medium ${
                  currentView === 'groups'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-medium ${
                  currentView === 'settings'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-right hidden lg:block">
                <p className="text-sm sm:text-lg font-semibold text-white">{currentUser.name}</p>
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full status-online"></div>
                  <p className="text-xs sm:text-sm text-green-300 font-medium">Online</p>
                </div>
              </div>
              <div className="gradient-primary p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-white/70 hover:text-red-300 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-red-500/20 transition-all duration-300"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Now allows scrolling */}
      <main className="app-main">
        <div className="flex-container">
          {/* Sidebar */}
          <div className="flex-sidebar glass-strong border-r border-white/20">
            <div className="flex-content">
              {currentView === 'chats' && (
                <ChatList
                  chats={chats}
                  selectedChat={selectedChat}
                  onChatSelect={handleChatSelect}
                  currentUserId={currentUser.id}
                />
              )}
              {currentView === 'groups' && (
                <div className="p-6 sm:p-8 text-center flex-1 flex items-center justify-center">
                  <div className="card-glass">
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 sm:mb-6" />
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Groups</h3>
                    <p className="text-white/70 mb-4 sm:mb-6 text-base sm:text-lg">Create and manage group chats</p>
                    <button className="btn-primary hover-lift">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                      New Group
                    </button>
                  </div>
                </div>
              )}
              {currentView === 'settings' && (
                <SettingsPanel user={currentUser} />
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-main">
            <div className="flex-content">
              {selectedChat ? (
                <ChatWindow
                  chat={selectedChat}
                  messages={messages}
                  currentUserId={currentUser.id}
                  onSendMessage={handleSendMessage}
                />
              ) : (
                <div className="flex items-center justify-center h-full p-6">
                  <div className="text-center animate-fade-in">
                    <div className="glass-strong rounded-3xl p-8 sm:p-12 mb-6 sm:mb-8 inline-block">
                      <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white mx-auto" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Select a conversation</h3>
                    <p className="text-lg sm:text-xl text-white/70">Choose a chat to start messaging securely</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Security Indicator */}
      <div className="fixed bottom-4 right-4 glass-strong rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center space-x-2 sm:space-x-3 z-40 shadow-xl">
        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
        <span className="text-sm sm:text-lg text-green-300 font-semibold">E2E Encrypted</span>
        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
      </div>
    </div>
  );
}

export default App;