import React, { useState, useEffect } from 'react';
import { Search, Plus, Archive, Pin, MoreHorizontal, MessageSquare, Users, Phone, Video } from 'lucide-react';
import { Chat, User, ScreenSize } from '../types';
import { ChatService } from '../services/ChatService';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  currentUser: User;
  screenSize: ScreenSize;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat,
  currentUser,
  screenSize
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  useEffect(() => {
    // Initialize demo data
    const chatService = ChatService.getInstance();
    chatService.initializeDemoData();
  }, []);

  const filteredChats = chats.filter(chat => {
    const searchTerm = searchQuery.toLowerCase();
    const chatName = chat.type === 'group' ? chat.name : 
      chat.participants.find(p => p.id !== currentUser.id)?.name || '';
    
    return chatName.toLowerCase().includes(searchTerm) ||
           chat.lastMessage?.content.toLowerCase().includes(searchTerm);
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d`;
    
    return date.toLocaleDateString();
  };

  const getUnreadCount = (chat: Chat) => {
    if (!chat.messages) return 0;
    return chat.messages.filter(msg => 
      msg.senderId !== currentUser.id && !msg.readBy.includes(currentUser.id)
    ).length;
  };

  const getChatName = (chat: Chat) => {
    if (chat.type === 'group') return chat.name;
    const otherUser = chat.participants.find(p => p.id !== currentUser.id);
    return otherUser?.name || 'Unknown';
  };

  const getChatAvatar = (chat: Chat) => {
    if (chat.type === 'group') {
      return chat.avatar || (
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-white" />
        </div>
      );
    }
    
    const otherUser = chat.participants.find(p => p.id !== currentUser.id);
    if (otherUser?.avatar) {
      return (
        <img
          src={otherUser.avatar}
          alt={otherUser.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      );
    }
    
    return (
      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-lg">
          {getChatName(chat).charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  const getLastMessagePreview = (chat: Chat) => {
    if (!chat.lastMessage) return 'No messages yet';
    
    const message = chat.lastMessage;
    const isOwn = message.senderId === currentUser.id;
    const prefix = isOwn ? 'You: ' : '';
    
    switch (message.type) {
      case 'image':
        return `${prefix}📷 Photo`;
      case 'file':
        return `${prefix}📎 File`;
      case 'voice':
        return `${prefix}🎤 Voice message`;
      case 'video':
        return `${prefix}🎥 Video`;
      default:
        return `${prefix}${message.content}`;
    }
  };

  const NewChatModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">New Chat</h2>
            <button
              onClick={() => setShowNewChatModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-colors">
              <div className="bg-indigo-500 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">New Direct Chat</div>
                <div className="text-sm text-gray-600">Start a private conversation</div>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors">
              <div className="bg-purple-500 p-2 rounded-full">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">New Group</div>
                <div className="text-sm text-gray-600">Create a group chat</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          <button
            onClick={() => setShowNewChatModal(true)}
            className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full px-4 py-3 pl-10 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No chats yet</h3>
            <p className="text-gray-600 mb-4">Start a conversation to begin messaging securely</p>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="bg-indigo-500 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-600 transition-colors"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChats.map((chat) => {
              const unreadCount = getUnreadCount(chat);
              const isSelected = selectedChat?.id === chat.id;
              
              return (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className={`flex items-center space-x-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50 border border-indigo-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    {getChatAvatar(chat)}
                    {chat.type === 'direct' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium truncate ${
                        unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {getChatName(chat)}
                        {chat.type === 'group' && (
                          <span className="ml-1 text-xs text-gray-500">
                            ({chat.participants.length})
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {chat.isPinned && <Pin className="h-3 w-3 text-gray-400" />}
                        <span className="text-xs text-gray-500">
                          {chat.lastMessage && formatTime(chat.lastMessage.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {getLastMessagePreview(chat)}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <div className="bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </div>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && <NewChatModal />}
    </div>
  );
};

export default ChatList;