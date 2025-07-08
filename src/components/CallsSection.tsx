import React, { useState } from 'react';
import { 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  Video, 
  VideoOff, 
  Clock, 
  Search, 
  Filter,
  MoreVertical,
  UserPlus,
  Settings,
  Trash2,
  Info,
  MessageSquare,
  ArrowUpRight,
  ArrowDownLeft,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTime } from '../utils/dateUtils';

interface CallRecord {
  id: string;
  participantName: string;
  participantId: string;
  type: 'voice' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: Date;
  duration?: number; // in seconds
  status: 'completed' | 'missed' | 'declined' | 'failed';
}

interface CallsSectionProps {
  currentUserId: string;
  onStartCall: (userId: string, type: 'voice' | 'video') => void;
}

const CallsSection: React.FC<CallsSectionProps> = ({ currentUserId, onStartCall }) => {
  const { t, direction } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'missed' | 'incoming' | 'outgoing'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Demo call history data
  const [callHistory] = useState<CallRecord[]>([
    {
      id: '1',
      participantName: 'Ahmed Al-Iraqi',
      participantId: 'ahmed-123',
      type: 'video',
      direction: 'incoming',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      duration: 1245, // 20:45
      status: 'completed'
    },
    {
      id: '2',
      participantName: 'Fatima Al-Basri',
      participantId: 'fatima-456',
      type: 'voice',
      direction: 'outgoing',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      duration: 892, // 14:52
      status: 'completed'
    },
    {
      id: '3',
      participantName: 'Omar Al-Kurdi',
      participantId: 'omar-789',
      type: 'voice',
      direction: 'missed',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'missed'
    },
    {
      id: '4',
      participantName: 'Zainab Al-Najafi',
      participantId: 'zainab-012',
      type: 'video',
      direction: 'outgoing',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      duration: 2156, // 35:56
      status: 'completed'
    },
    {
      id: '5',
      participantName: 'Hassan Al-Mosuli',
      participantId: 'hassan-345',
      type: 'voice',
      direction: 'incoming',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      duration: 567, // 9:27
      status: 'completed'
    },
    {
      id: '6',
      participantName: 'Layla Al-Karkhi',
      participantId: 'layla-678',
      type: 'video',
      direction: 'missed',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      status: 'missed'
    },
    {
      id: '7',
      participantName: 'Ali Al-Baghdadi',
      participantId: 'ali-901',
      type: 'voice',
      direction: 'outgoing',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      duration: 1834, // 30:34
      status: 'completed'
    },
    {
      id: '8',
      participantName: 'Noor Al-Tikrit',
      participantId: 'noor-234',
      type: 'video',
      direction: 'incoming',
      timestamp: new Date(Date.now() - 345600000), // 4 days ago
      duration: 445, // 7:25
      status: 'completed'
    }
  ]);

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.participantName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || call.direction === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCallIcon = (call: CallRecord) => {
    if (call.status === 'missed') {
      return <PhoneMissed className="w-4 h-4 text-red-500" />;
    }
    
    if (call.direction === 'incoming') {
      return <PhoneIncoming className="w-4 h-4 text-green-500" />;
    }
    
    return <PhoneOutgoing className="w-4 h-4 text-blue-500" />;
  };

  const getCallTypeIcon = (type: 'voice' | 'video') => {
    return type === 'video' ? (
      <Video className="w-4 h-4 text-gray-500" />
    ) : (
      <Phone className="w-4 h-4 text-gray-500" />
    );
  };

  const handleCallParticipant = (participantId: string, type: 'voice' | 'video') => {
    onStartCall(participantId, type);
  };

  const getMissedCallsCount = () => {
    return callHistory.filter(call => call.status === 'missed').length;
  };

  if (callHistory.length === 0) {
    return (
      <div className={`calls-wrapper ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
        <div className="calls-header">
          <h2 className="element-title">Calls</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="element-card p-8 mb-6">
            <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No calls yet</h3>
            <p className="text-gray-600 mb-6">Start a voice or video call to see your call history here</p>
            <button className="element-button">
              <Phone className="w-4 h-4" />
              Make a Call
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`calls-wrapper overflow-hidden universal-scrollbar ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="calls-header">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h2 className="element-title">Calls</h2>
            {getMissedCallsCount() > 0 && (
              <div className="element-badge">
                {getMissedCallsCount()}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`element-button-secondary p-2 ${filterType !== 'all' ? 'bg-red-100 text-red-600' : ''}`}
                title="Filter calls"
              >
                <Filter className="w-4 h-4" />
              </button>
              
              {/* Filter Menu */}
              {showFilterMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 min-w-48 animate-scale-in z-10">
                  <div className="space-y-1">
                    {[
                      { key: 'all', label: 'All Calls', icon: Phone },
                      { key: 'missed', label: 'Missed Calls', icon: PhoneMissed },
                      { key: 'incoming', label: 'Incoming', icon: PhoneIncoming },
                      { key: 'outgoing', label: 'Outgoing', icon: PhoneOutgoing }
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => {
                          setFilterType(key as any);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left ${
                          filterType === key ? 'bg-red-50 text-red-600' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button className="element-button-secondary p-2">
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search call history..."
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
      </div>

      {/* Call History List */}
      <div className="calls-content calls-scrollbar universal-scrollbar overflow-y-auto">
        <div className="scrollable-content">
          {filteredCalls.length === 0 ? (
            <div className="text-center py-12">
              <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No calls found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredCalls.map((call) => (
              <div
                key={call.id}
                className="call-item element-hover"
              >
                <div className="flex items-center space-x-3 w-full">
                  {/* Avatar and Call Direction */}
                  <div className="relative flex-shrink-0">
                    <div className="element-avatar-large">
                      {call.participantName.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white">
                      {getCallIcon(call)}
                    </div>
                  </div>
                  
                  {/* Call Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="element-text font-semibold truncate call-name">
                        {call.participantName}
                      </h3>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="element-text-small">
                          {formatTime(call.timestamp)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCallTypeIcon(call.type)}
                        <span className="element-text-small text-gray-500">
                          {call.status === 'missed' ? (
                            'Missed call'
                          ) : call.status === 'declined' ? (
                            'Declined'
                          ) : call.status === 'failed' ? (
                            'Failed'
                          ) : call.duration ? (
                            formatDuration(call.duration)
                          ) : (
                            'No answer'
                          )}
                        </span>
                      </div>
                      
                      {/* Quick Action Buttons */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleCallParticipant(call.participantId, 'voice')}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Voice call"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCallParticipant(call.participantId, 'video')}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="Video call"
                        >
                          <Video className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Click outside to close filter menu */}
      {showFilterMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowFilterMenu(false)}
        />
      )}
    </div>
  );
};

export default CallsSection;