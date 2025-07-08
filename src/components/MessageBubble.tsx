import React from 'react';
import { Play, Mic, MapPin, Navigation, Users, VideoIcon } from 'lucide-react';
import { Message } from '../types';
import { formatTime } from '../utils/dateUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
  isContinuation?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, senderName, isContinuation = false }) => {
  const { t } = useLanguage();

  console.log('Rendering message bubble:', { message, isOwn, senderName }); // Debug log

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="w-48 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">📷 Image</span>
              </div>
            </div>
            {message.content && <p>{message.content}</p>}
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📄</span>
            </div>
            <div>
              <p className="font-medium text-sm">{message.content}</p>
              <p className="text-xs text-gray-500">Click to download</p>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="space-y-2">
            <div className="bg-gray-100 rounded-lg p-3 relative">
              <div className="w-64 h-36 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <VideoIcon className="w-12 h-12 text-white" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  0:15
                </div>
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all">
                  <Play className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
            {message.content && <p>{message.content}</p>}
          </div>
        );
      
      case 'location':
        return (
          <div className="bg-gray-50 rounded-lg p-4 max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{t('chat.location')}</h4>
                <p className="text-sm text-gray-600 mb-2">{message.content}</p>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  {t('chat.viewOnMap')}
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="bg-gray-50 rounded-lg p-4 max-w-xs">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{message.content.replace('👤 Contact: ', '')}</h4>
                <p className="text-sm text-gray-500">{t('chat.contact')}</p>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-1">
                  {t('chat.addToContacts')}
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'voice':
        return (
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 max-w-xs">
            <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors group">
              <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Mic className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">{t('chat.voiceMessage')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <span className="text-xs text-gray-500 font-mono">0:03</span>
              </div>
            </div>
          </div>
        );
      
      default:
        // Handle special message types based on content
        if (message.content.includes('📍 Location:')) {
          const coordinates = message.content.replace('📍 Location: ', '');
          return (
            <div className="bg-gray-50 rounded-lg p-3 max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-900">{t('chat.sharedLocation')}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{coordinates}</p>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                {t('chat.openInMaps')}
              </button>
            </div>
          );
        }
        
        return <p className="leading-relaxed">{message.content}</p>;
    }
  };

  return (
    <div className={`timeline-item ${isContinuation ? 'continuation' : ''} ${isOwn ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`message-bubble ${isOwn ? 'sent' : 'received'} ${isContinuation ? 'continuation' : ''}`}>
        {!isContinuation && !isOwn && (
          <div className="sender-name mb-1">{senderName}</div>
        )}
        {renderMessageContent()}
        <div className="flex items-center justify-between mt-2">
          <span className="message-time">{formatTime(message.timestamp)}</span>
          {message.encrypted && (
            <span className="text-xs text-gray-400 ml-2">🔒</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;