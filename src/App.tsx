import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, Settings, Hash, ArrowLeft } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import AllChatsList from './components/AllChatsList';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';
import { User, Chat, Message } from './types';
import { generateDemoData } from './utils/demoData';

type ViewType = 'all-chats' | 'groups' | 'settings' | 'chat-interface';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('all-chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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
    setCurrentView('all-chats');
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setCurrentView('chat-interface');
    
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

  const handleBackToAllChats = () => {
    setCurrentView('all-chats');
    setSelectedChat(null);
    setMessages([]);
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
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="element-card p-12 mb-8 inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 app-name">TELE IRAQ</h1>
            <p className="text-gray-600">Secure messaging for everyone</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Chat Interface View - Full Screen
  if (currentView === 'chat-interface' && selectedChat) {
    return (
      <div className="app-container">
        <ChatInterface
          chat={selectedChat}
          messages={messages}
          currentUserId={currentUser.id}
          onSendMessage={handleSendMessage}
          onBack={handleBackToAllChats}
        />
      </div>
    );
  }

  // Main App View with Sidebar
  return (
    <div className="app-container">
      {/* Header - Element style */}
      <header className="app-header">
        <div className="px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold app-name">TELE IRAQ</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentView('all-chats')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === 'all-chats'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('groups')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === 'groups'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Hash className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === 'settings'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium username">{currentUser.name}</p>
                <div className="flex items-center justify-end space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <div className="element-avatar">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="flex-container">
          {/* Sidebar */}
          <div className="flex-sidebar sidebar-container">
            <div className="flex-content">
              {currentView === 'all-chats' && (
                <AllChatsList
                  chats={chats}
                  onChatSelect={handleChatSelect}
                  currentUserId={currentUser.id}
                />
              )}
              {currentView === 'groups' && (
                <div className="p-6 text-center flex-1 flex items-center justify-center">
                  <div className="element-card p-8">
                    <Hash className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Rooms</h3>
                    <p className="text-gray-600 mb-6">Join or create rooms to chat with groups</p>
                    <button className="element-button">
                      <Hash className="w-4 h-4" />
                      Create Room
                    </button>
                  </div>
                </div>
              )}
              {currentView === 'settings' && (
                <SettingsPanel user={currentUser} />
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-main chat-window-container">
            <div className="empty-state">
              <div className="text-center animate-fade-in">
                <div className="element-card p-12 mb-6 inline-block">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;