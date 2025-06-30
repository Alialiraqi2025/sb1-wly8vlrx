import React, { useState, useEffect } from 'react';
import { Shield, MessageCircle, Users, Settings, Phone, Video, Send, Paperclip, Smile, Mic, Search, Plus, Lock, Zap } from 'lucide-react';
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

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header */}
      <header className="glass-strong border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-3 rounded-2xl shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">SecureChat</h1>
                <p className="text-sm text-white/70 font-medium">End-to-End Encrypted</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('chats')}
                className={`p-4 rounded-2xl transition-all duration-300 font-medium ${
                  currentView === 'chats'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentView('groups')}
                className={`p-4 rounded-2xl transition-all duration-300 font-medium ${
                  currentView === 'groups'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Users className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`p-4 rounded-2xl transition-all duration-300 font-medium ${
                  currentView === 'settings'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="w-6 h-6" />
              </button>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-lg font-semibold text-white">{currentUser.name}</p>
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full status-online"></div>
                  <p className="text-sm text-green-300 font-medium">Online</p>
                </div>
              </div>
              <div className="gradient-primary p-3 rounded-2xl shadow-lg">
                <span className="text-white font-bold text-lg">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-white/70 hover:text-red-300 p-3 rounded-2xl hover:bg-red-500/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <div className="w-96 glass-strong border-r border-white/20 flex flex-col">
          {currentView === 'chats' && (
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              onChatSelect={handleChatSelect}
              currentUserId={currentUser.id}
            />
          )}
          {currentView === 'groups' && (
            <div className="p-8 text-center">
              <div className="card-glass">
                <Users className="w-16 h-16 text-white mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">Groups</h3>
                <p className="text-white/70 mb-6 text-lg">Create and manage group chats</p>
                <button className="btn-primary hover-lift">
                  <Plus className="w-5 h-5 inline mr-2" />
                  New Group
                </button>
              </div>
            </div>
          )}
          {currentView === 'settings' && (
            <SettingsPanel user={currentUser} />
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              messages={messages}
              currentUserId={currentUser.id}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center animate-fade-in">
                <div className="glass-strong rounded-3xl p-12 mb-8 inline-block">
                  <MessageCircle className="w-20 h-20 text-white mx-auto" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Select a conversation</h3>
                <p className="text-xl text-white/70">Choose a chat to start messaging securely</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Security Indicator */}
      <div className="fixed bottom-6 right-6 glass-strong rounded-full px-6 py-3 flex items-center space-x-3 z-40 shadow-xl">
        <Lock className="w-5 h-5 text-green-400" />
        <span className="text-lg text-green-300 font-semibold">E2E Encrypted</span>
        <Zap className="w-4 h-4 text-green-400 animate-pulse" />
      </div>
    </div>
  );
}

export default App;