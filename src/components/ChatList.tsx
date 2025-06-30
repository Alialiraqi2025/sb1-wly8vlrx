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
        <div className="card-glass mb-8">
          <MessageCircle className="w-20 h-20 text-white mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">No chats yet</h3>
          <p className="text-white/70 mb-8 text-lg">Start a conversation to begin messaging securely</p>
          <button className="btn-primary hover-lift">
            <Plus className="w-5 h-5 inline mr-2" />
            Start New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-8 border-b border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Chats</h2>
          <button className="btn-primary p-3 hover-lift">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full input-glass pl-12 text-lg focus-ring"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
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
              className={`p-6 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                isSelected ? 'bg-white/20 border-white/30 shadow-lg' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {chat.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-3 border-white rounded-full status-online"></div>
                  )}
                </div>
                
                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white truncate">{chat.name}</h3>
                    <div className="flex items-center space-x-3">
                      {chat.lastMessageTime && (
                        <span className="text-sm text-white/60 font-medium">
                          {formatTime(chat.lastMessageTime)}
                        </span>
                      )}
                      {chat.unreadCount > 0 && (
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-white/70 truncate text-lg">
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