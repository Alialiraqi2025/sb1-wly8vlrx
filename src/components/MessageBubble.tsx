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
          <div className="space-y-3">
            <div className="bg-white/20 rounded-2xl p-4">
              <div className="w-64 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-medium">📷 Image</span>
              </div>
            </div>
            {message.content && <p className="text-lg">{message.content}</p>}
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center space-x-4 bg-white/20 rounded-2xl p-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">📄</span>
            </div>
            <div>
              <p className="font-semibold text-lg">{message.content}</p>
              <p className="text-sm opacity-75">Click to download</p>
            </div>
          </div>
        );
      
      case 'voice':
        return (
          <div className="flex items-center space-x-4 bg-white/20 rounded-2xl p-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🎤</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/70 rounded-full"
                      style={{ height: `${Math.random() * 24 + 12}px` }}
                    />
                  ))}
                </div>
                <span className="text-sm opacity-75 font-medium">0:03</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return <p className="text-lg leading-relaxed">{message.content}</p>;
    }
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`message-bubble ${isOwn ? 'sent' : 'received'} p-5`}>
        {renderMessageContent()}
        <div className="flex items-center justify-between mt-3 text-sm opacity-75">
          <span className="font-medium">{formatTime(message.timestamp)}</span>
          {message.encrypted && (
            <span className="ml-3 text-lg">🔒</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;