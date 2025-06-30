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
      <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center">
        <div className="card-glass mb-6 sm:mb-8">
          <MessageCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white mx-auto mb-4 sm:mb-6" />
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">No chats yet</h3>
          <p className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg">Start a conversation to begin messaging securely</p>
          <button className="btn-primary hover-lift">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            Start New Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-content">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-white/20 flex-shrink-0">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Chats</h2>
          <button className="btn-primary p-2 sm:p-3 hover-lift">
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full input-glass pl-10 sm:pl-12 text-base sm:text-lg focus-ring"
          />
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
        </div>
      </div>

      {/* Chat List - Now properly scrollable */}
      <div className="chat-list-container scrollable mobile-scroll">
        <div className="space-y-0">
          {filteredChats.map((chat) => {
            const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
            const isSelected = selectedChat?.id === chat.id;
            
            return (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className={`p-4 sm:p-6 border-b border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                  isSelected ? 'bg-white/20 border-white/30 shadow-lg' : ''
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-base sm:text-xl">
                        {chat.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 border-2 sm:border-3 border-white rounded-full status-online"></div>
                    )}
                  </div>
                  
                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">{chat.name}</h3>
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                        {chat.lastMessageTime && (
                          <span className="text-xs sm:text-sm text-white/60 font-medium">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        )}
                        {chat.unreadCount > 0 && (
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm rounded-full w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center font-bold shadow-lg">
                            {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-white/70 truncate text-sm sm:text-lg">
                      {chat.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Add extra content to demonstrate scrolling */}
          {filteredChats.length > 0 && (
            <div className="p-4 sm:p-6 text-center">
              <p className="text-white/50 text-sm">End of chat list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;