import React, { useState, useEffect } from 'react';
import { MessageSquare, Users, Settings, Hash, ArrowLeft } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import AllChatsList from './components/AllChatsList';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';
import LinkDeviceModal from './components/LinkDeviceModal';
import RecoveryKeyNotice from './components/RecoveryKeyNotice';
import RecoveryKeySetup from './components/RecoveryKeySetup';
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
  const [showRecoveryKeyNotice, setShowRecoveryKeyNotice] = useState(false);
  const [showRecoveryKeySetup, setShowRecoveryKeySetup] = useState(false);
  const [showLinkDeviceModal, setShowLinkDeviceModal] = useState(false);

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
      
      // Check if user needs to set up recovery key
      // In a real app, this would check if the user has a recovery key
      const hasRecoveryKey = currentUser.recoveryKey;
      if (!hasRecoveryKey) {
        // Show notice after a short delay for better UX
        setTimeout(() => {
          setShowRecoveryKeyNotice(true);
        }, 1000);
      }
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
    setShowRecoveryKeyNotice(false);
    setShowRecoveryKeySetup(false);
    setShowLinkDeviceModal(false);
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

  const handleSetupRecoveryKey = () => {
    setShowRecoveryKeyNotice(false);
    setShowRecoveryKeySetup(true);
  };

  const handleRecoveryKeySetupComplete = (recoveryKey: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        recoveryKey
      });
    }
    setShowRecoveryKeySetup(false);
  };

  const handleRemindLater = () => {
    setShowRecoveryKeyNotice(false);
    // In a real app, you might set a reminder for later
  };

  const handleCloseRecoveryKeyNotice = () => {
    setShowRecoveryKeyNotice(false);
  };

  const handleBackFromRecoveryKeySetup = () => {
    setShowRecoveryKeySetup(false);
    setShowRecoveryKeyNotice(true);
  };


  if (isLoading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="element-card p-12 mb-8 inline-block">
            <div className="w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <img 
                src="/new TI logo.png" 
                alt="TELE IRAQ" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 app-name">TELE IRAQ</h1>
            <p className="text-xl text-gray-600">Secure Communication</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Show recovery key setup screen
  if (showRecoveryKeySetup) {
    return (
      <RecoveryKeySetup
        onComplete={handleRecoveryKeySetupComplete}
        onBack={handleBackFromRecoveryKeySetup}
        isFirstTime={true}
      />
    );
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
        
        {/* Recovery Key Notice Overlay */}
        <RecoveryKeyNotice
          isOpen={showRecoveryKeyNotice}
          onClose={handleCloseRecoveryKeyNotice}
          onSetupRecoveryKey={handleSetupRecoveryKey}
          onRemindLater={handleRemindLater}
          userEmail={currentUser.email}
        />

        {/* Link Device Modal */}
        <LinkDeviceModal
          isOpen={showLinkDeviceModal}
          onClose={() => setShowLinkDeviceModal(false)}
          userEmail={currentUser.email}
        />
      </div>
    );
  }

  // Main App View - Full Page Views
  return (
    <div className="app-container app-scrollbar">
      {/* Header - Element style */}
      <header className="app-header">
        <div className="px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src="/new TI logo.png" 
                  alt="TELE IRAQ" 
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-3xl font-bold app-name">TELE IRAQ</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentView('all-chats')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === 'all-chats'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('groups')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === 'groups'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Hash className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentView === 'settings'
                    ? 'bg-red-100 text-red-700'
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full Page Views */}
      <main className="app-main">
        <div className="h-full w-full">
          {currentView === 'all-chats' && (
            <div className="h-full bg-white">
              <AllChatsList
                chats={chats}
                onChatSelect={handleChatSelect}
                currentUserId={currentUser.id}
              />
            </div>
          )}
          
          {currentView === 'groups' && (
            <div className="h-full bg-white p-6 flex items-center justify-center app-scrollbar overflow-y-auto">
              <div className="text-center">
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
              
              {/* Demo content for scrolling */}
              <div className="mt-12 space-y-6">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="element-card p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Demo Room {i + 1}</h4>
                    <p className="text-gray-600 mb-4">This is a demo room to show scrolling functionality in the groups section.</p>
                    <div className="flex items-center space-x-4">
                      <div className="element-avatar-small">
                        <Hash className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 1} members</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentView === 'settings' && (
            <div className="h-full bg-white overflow-hidden">
              <SettingsPanel user={currentUser} onSignOut={handleLogout} />
            </div>
          )}
        </div>
      </main>

      {/* Recovery Key Notice Overlay */}
      <RecoveryKeyNotice
        isOpen={showRecoveryKeyNotice}
        onClose={handleCloseRecoveryKeyNotice}
        onSetupRecoveryKey={handleSetupRecoveryKey}
        onRemindLater={handleRemindLater}
        userEmail={currentUser.email}
      />

      {/* Link Device Modal */}
      <LinkDeviceModal
        isOpen={showLinkDeviceModal}
        onClose={() => setShowLinkDeviceModal(false)}
        userEmail={currentUser.email}
      />
    </div>
  );
}

export default App;