import React from 'react';
import { Play, Mic } from 'lucide-react';
import { Message } from '../types';
import { formatTime } from '../utils/dateUtils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
  isContinuation?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, senderName, isContinuation = false }) => {
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
      
      case 'voice':
        return (
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 max-w-xs">
            <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors group">
              <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Mic className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">Voice Message</span>
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