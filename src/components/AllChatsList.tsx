import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Hash, UserPlus } from 'lucide-react';
import { Chat } from '../types';
import { formatTime } from '../utils/dateUtils';
import { useLanguage } from '../contexts/LanguageContext';
import InviteFriendModal from './InviteFriendModal';

interface AllChatsListProps {
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  currentUserId: string;
}

const AllChatsList: React.FC<AllChatsListProps> = ({ chats, onChatSelect, currentUserId }) => {
  const { t, direction } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (chats.length === 0) {
    return (
      <div className={`chat-list-wrapper ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
        <div className="chat-list-header">
          <h2 className="element-title">{t('nav.chats')}</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="element-card p-8 mb-6">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('chatList.noConversations')}</h3>
            <p className="text-gray-600 mb-6">{t('chatList.startConversation')}</p>
            <button className="element-button">
              <Plus className="w-4 h-4" />
              {t('chatList.startChat')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-list-wrapper overflow-hidden ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="chat-list-header">
        <div className="flex items-center justify-between mb-4">
          <h2 className="element-title">{t('nav.chats')}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowInviteModal(true)}
              className="element-button-secondary p-2"
              title={t('invite.title')}
            >
              <UserPlus className="w-4 h-4" />
            </button>
            <button className="element-button-secondary p-2">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('chatList.searchConversations')}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
      </div>

      {/* Chat List with Custom Scrollbar */}
      <div className="chat-list-content chat-scrollbar overflow-y-auto">
        <div className="scrollable-content">
          {filteredChats.map((chat) => {
            const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
            
            return (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className="chat-item element-hover"
              >
                <div className="flex items-center space-x-3 w-full">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="element-avatar-large">
                      {chat.type === 'group' ? (
                        <Hash className="w-5 h-5" />
                      ) : (
                        chat.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    {chat.isOnline && chat.type === 'direct' && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="element-text font-semibold truncate chat-name">{chat.name}</h3>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {chat.lastMessageTime && (
                          <span className="element-text-small">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        )}
                        {chat.unreadCount > 0 && (
                          <div className="element-badge">
                            {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="element-text-small text-gray-500 truncate">
                      {chat.lastMessage || t('chatList.noMessages')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Invite Friend Modal */}
      <InviteFriendModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        userEmail="user@teleiraq.com"
        userName="Current User"
      />
    </div>
  );
};

export default AllChatsList;