import React from 'react';
import { Message } from '../types';
import { formatTime } from '../utils/dateUtils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn, senderName }) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📷 Image</span>
              </div>
            </div>
            {message.content && <p>{message.content}</p>}
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📄</span>
            </div>
            <div>
              <p className="font-medium">{message.content}</p>
              <p className="text-xs opacity-75">Click to download</p>
            </div>
          </div>
        );
      
      case 'voice':
        return (
          <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🎤</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/60 rounded-full"
                      style={{ height: `${Math.random() * 20 + 10}px` }}
                    />
                  ))}
                </div>
                <span className="text-xs opacity-75">0:03</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`message-bubble ${isOwn ? 'sent' : 'received'} p-4`}>
        {renderMessageContent()}
        <div className="flex items-center justify-between mt-2 text-xs opacity-75">
          <span>{formatTime(message.timestamp)}</span>
          {message.encrypted && (
            <span className="ml-2">🔒</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;