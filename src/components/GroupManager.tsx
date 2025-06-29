import React, { useState } from 'react';
import { Users, Plus, Search, Settings, UserPlus, Crown, Shield, X } from 'lucide-react';
import { Chat, User, ScreenSize } from '../types';
import { ChatService } from '../services/ChatService';

interface GroupManagerProps {
  currentUser: User;
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  onCreateGroup: (group: Chat) => void;
  screenSize: ScreenSize;
}

const GroupManager: React.FC<GroupManagerProps> = ({
  currentUser,
  chats,
  onSelectChat,
  onCreateGroup,
  screenSize
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    selectedUsers: [] as User[]
  });

  // Demo users for group creation
  const availableUsers: User[] = [
    {
      id: 'user_2',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      publicKey: '',
      privateKey: '',
      status: 'online',
      lastSeen: new Date(),
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: 'light',
        language: 'en',
        autoDownloadMedia: true,
        readReceipts: true,
        lastSeenPrivacy: 'everyone',
        profilePhotoPrivacy: 'everyone'
      }
    },
    {
      id: 'user_3',
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      publicKey: '',
      privateKey: '',
      status: 'away',
      lastSeen: new Date(),
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: 'dark',
        language: 'en',
        autoDownloadMedia: false,
        readReceipts: true,
        lastSeenPrivacy: 'contacts',
        profilePhotoPrivacy: 'contacts'
      }
    },
    {
      id: 'user_4',
      name: 'Carol Davis',
      email: 'carol@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      publicKey: '',
      privateKey: '',
      status: 'online',
      lastSeen: new Date(),
      settings: {
        notifications: true,
        soundEnabled: true,
        theme: 'light',
        language: 'en',
        autoDownloadMedia: true,
        readReceipts: true,
        lastSeenPrivacy: 'everyone',
        profilePhotoPrivacy: 'everyone'
      }
    }
  ];

  const filteredChats = chats.filter(chat => 
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = async () => {
    if (!newGroupData.name.trim() || newGroupData.selectedUsers.length === 0) return;

    try {
      const chatService = ChatService.getInstance();
      const newGroup = await chatService.createGroupChat(
        newGroupData.name,
        newGroupData.description,
        newGroupData.selectedUsers
      );

      onCreateGroup(newGroup);
      setShowCreateModal(false);
      setNewGroupData({
        name: '',
        description: '',
        selectedUsers: []
      });
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };

  const toggleUserSelection = (user: User) => {
    setNewGroupData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.find(u => u.id === user.id)
        ? prev.selectedUsers.filter(u => u.id !== user.id)
        : [...prev.selectedUsers, user]
    }));
  };

  const getGroupMemberCount = (chat: Chat) => {
    return chat.participants.length;
  };

  const isGroupAdmin = (chat: Chat) => {
    return chat.groupSettings?.adminIds.includes(currentUser.id) || false;
  };

  const CreateGroupModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Create New Group</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Group Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={newGroupData.name}
                onChange={(e) => setNewGroupData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter group name"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={newGroupData.description}
                onChange={(e) => setNewGroupData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter group description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Add Members ({newGroupData.selectedUsers.length} selected)
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableUsers.map((user) => {
                const isSelected = newGroupData.selectedUsers.find(u => u.id === user.id);
                
                return (
                  <div
                    key={user.id}
                    onClick={() => toggleUserSelection(user)}
                    className={`flex items-center space-x-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-indigo-500 border-indigo-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            disabled={!newGroupData.name.trim() || newGroupData.selectedUsers.length === 0}
            className="px-6 py-3 bg-indigo-500 text-white hover:bg-indigo-600 rounded-2xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Groups</h2>
          <button
            onClick={() => setShowCreateModal(true)}
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
            placeholder="Search groups..."
            className="w-full px-4 py-3 pl-10 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups yet</h3>
            <p className="text-gray-600 mb-4">Create a group to start collaborating with multiple people</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-500 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-600 transition-colors"
            >
              Create Your First Group
            </button>
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className="flex items-center space-x-3 p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  {isGroupAdmin(chat) && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {getGroupMemberCount(chat)} members
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 truncate">
                    {chat.description || 'No description'}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      {chat.participants.slice(0, 3).map((participant, index) => (
                        <div
                          key={participant.id}
                          className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                          style={{ marginLeft: index > 0 ? '-8px' : '0' }}
                        >
                          {participant.avatar ? (
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">
                                {participant.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                      {getGroupMemberCount(chat) > 3 && (
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600 font-medium border-2 border-white" style={{ marginLeft: '-8px' }}>
                          +{getGroupMemberCount(chat) - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {chat.isPinned && <Shield className="h-3 w-3 text-gray-400" />}
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && <CreateGroupModal />}
    </div>
  );
};

export default GroupManager;