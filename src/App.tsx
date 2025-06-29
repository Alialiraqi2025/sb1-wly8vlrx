import React, { useState, useEffect } from 'react';
import { MessageSquare, Shield, Users, Phone, Video, Settings, Lock } from 'lucide-react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import VideoCall from './components/VideoCall';
import VoiceCall from './components/VoiceCall';
import GroupManager from './components/GroupManager';
import SettingsPanel from './components/SettingsPanel';
import AuthScreen from './components/AuthScreen';
import { EncryptionService } from './services/EncryptionService';
import { ChatService } from './services/ChatService';
import { User, Chat, Message, CallState } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentView, setCurrentView] = useState<'chats' | 'groups' | 'settings'>('chats');
  const [callState, setCallState] = useState<CallState | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle viewport height for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Initialize encryption and chat services
  useEffect(() => {
    if (currentUser) {
      EncryptionService.initialize(currentUser.id);
      ChatService.initialize(currentUser.id);
      loadChats();
    }
  }, [currentUser]);

  const loadChats = async () => {
    try {
      const userChats = await ChatService.getChats();
      setChats(userChats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setSelectedChat(null);
    setChats([]);
    setCallState(null);
  };

  const handleSendMessage = async (content: string, type: 'text' | 'image' | 'file' | 'voice' = 'text', attachment?: File) => {
    if (!selectedChat || !currentUser) return;

    try {
      const message: Message = {
        id: Date.now().toString(),
        chatId: selectedChat.id,
        senderId: currentUser.id,
        content,
        type,
        timestamp: new Date(),
        encrypted: true,
        attachment: attachment ? {
          name: attachment.name,
          size: attachment.size,
          type: attachment.type,
          url: URL.createObjectURL(attachment)
        } : undefined
      };

      // Encrypt message content
      const encryptedMessage = await EncryptionService.encryptMessage(message, selectedChat.participants);
      
      // Send message through chat service
      await ChatService.sendMessage(encryptedMessage);
      
      // Update local chat state
      const updatedChat = {
        ...selectedChat,
        messages: [...(selectedChat.messages || []), message],
        lastMessage: message,
        updatedAt: new Date()
      };
      
      setSelectedChat(updatedChat);
      setChats(chats.map(chat => chat.id === selectedChat.id ? updatedChat : chat));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleStartCall = (type: 'voice' | 'video') => {
    if (!selectedChat) return;

    setCallState({
      type,
      chatId: selectedChat.id,
      participants: selectedChat.participants,
      isIncoming: false,
      isActive: true,
      startTime: new Date()
    });
  };

  const handleEndCall = () => {
    setCallState(null);
  };

  const renderMainContent = () => {
    if (callState?.isActive) {
      if (callState.type === 'video') {
        return (
          <VideoCall
            callState={callState}
            onEndCall={handleEndCall}
            screenSize={screenSize}
          />
        );
      } else {
        return (
          <VoiceCall
            callState={callState}
            onEndCall={handleEndCall}
            screenSize={screenSize}
          />
        );
      }
    }

    if (screenSize.isMobile) {
      // Mobile layout - single view
      if (selectedChat) {
        return (
          <ChatWindow
            chat={selectedChat}
            currentUser={currentUser!}
            onSendMessage={handleSendMessage}
            onStartCall={handleStartCall}
            onBack={() => setSelectedChat(null)}
            screenSize={screenSize}
          />
        );
      } else {
        return renderSidebar();
      }
    } else {
      // Desktop/Tablet layout - split view
      return (
        <div className="flex h-screen">
          <div className="w-1/3 border-r border-gray-200">
            {renderSidebar()}
          </div>
          <div className="flex-1">
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                currentUser={currentUser!}
                onSendMessage={handleSendMessage}
                onStartCall={handleStartCall}
                screenSize={screenSize}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center">
                  <div className="bg-indigo-100 p-4 rounded-full inline-block mb-4">
                    <MessageSquare className="h-12 w-12 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat to start messaging securely</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  const renderSidebar = () => {
    switch (currentView) {
      case 'groups':
        return (
          <GroupManager
            currentUser={currentUser!}
            chats={chats.filter(chat => chat.type === 'group')}
            onSelectChat={setSelectedChat}
            onCreateGroup={(group) => setChats([...chats, group])}
            screenSize={screenSize}
          />
        );
      case 'settings':
        return (
          <SettingsPanel
            currentUser={currentUser!}
            onUpdateUser={setCurrentUser}
            onLogout={handleLogout}
            screenSize={screenSize}
          />
        );
      default:
        return (
          <ChatList
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
            currentUser={currentUser!}
            screenSize={screenSize}
          />
        );
    }
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} screenSize={screenSize} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SecureChat</h1>
                <p className="text-xs text-gray-600">End-to-End Encrypted</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentView('chats')}
                className={`p-2 rounded-lg transition-colors ${
                  currentView === 'chats'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Chats"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentView('groups')}
                className={`p-2 rounded-lg transition-colors ${
                  currentView === 'groups'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Groups"
              >
                <Users className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className={`p-2 rounded-lg transition-colors ${
                  currentView === 'settings'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-600">Online</p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-full">
                <span className="text-white font-semibold text-sm">
                  {currentUser?.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {renderMainContent()}
      </main>

      {/* Security Indicator */}
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 z-40">
        <Lock className="h-3 w-3" />
        <span>E2E Encrypted</span>
      </div>
    </div>
  );
}

export default App;