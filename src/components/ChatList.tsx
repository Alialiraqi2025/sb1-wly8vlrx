import React, { useState } from 'react';
import { Search, Plus, MessageCircle } from 'lucide-react';
import { Chat } from '../types';
import { formatTime } from '../utils/dateUtils';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  currentUserId: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChat, onChatSelect, currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="glass rounded-3xl p-8 mb-6">
          <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No chats yet</h3>
          <p className="text-gray-400 mb-6">Start a conversation to begin messaging securely</p>
          <button className="gradient-primary px-6 py-3 rounded-xl text-white font-medium hover-lift">
            <Plus className="w-4 h-4 inline mr-2" />
            Start New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Chats</h2>
          <button className="gradient-primary p-2 rounded-xl hover-lift">
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full px-4 py-3 pl-10 glass rounded-2xl text-white placeholder-gray-400 focus-ring"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
          const isSelected = selectedChat?.id === chat.id;
          
          return (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 hover:bg-white/5 ${
                isSelected ? 'bg-blue-500/20 border-blue-500/30' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {chat.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-900 rounded-full status-online"></div>
                  )}
                </div>
                
                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white truncate">{chat.name}</h3>
                    <div className="flex items-center space-x-2">
                      {chat.lastMessageTime && (
                        <span className="text-xs text-gray-400">
                          {formatTime(chat.lastMessageTime)}
                        </span>
                      )}
                      {chat.unreadCount > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {chat.lastMessage || 'No messages yet'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;