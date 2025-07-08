import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Video, User, X } from 'lucide-react';
import { User as UserType } from '../types';

interface CallNotificationProps {
  isVisible: boolean;
  caller: UserType;
  callType: 'voice' | 'video';
  onAccept: () => void;
  onDecline: () => void;
  onDismiss: () => void;
}

const CallNotification: React.FC<CallNotificationProps> = ({
  isVisible,
  caller,
  callType,
  onAccept,
  onDecline,
  onDismiss
}) => {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setIsRinging(true);
      // Auto-dismiss after 30 seconds
      const timer = setTimeout(() => {
        onDismiss();
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="call-notification animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold ${isRinging ? 'call-ring' : ''}`}>
            {caller.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{caller.name}</h3>
            <p className="text-sm text-gray-600 flex items-center space-x-1">
              {callType === 'video' ? (
                <Video className="w-4 h-4" />
              ) : (
                <Phone className="w-4 h-4" />
              )}
              <span>Incoming {callType} call</span>
            </p>
          </div>
        </div>
        
        <button
          onClick={onDismiss}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onDecline}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 call-button"
        >
          <PhoneOff className="w-4 h-4" />
          <span>Decline</span>
        </button>
        
        <button
          onClick={onAccept}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 call-button"
        >
          {callType === 'video' ? (
            <Video className="w-4 h-4" />
          ) : (
            <Phone className="w-4 h-4" />
          )}
          <span>Accept</span>
        </button>
      </div>
      
      {/* Ringing animation */}
      {isRinging && (
        <div className="absolute -inset-2 border-2 border-green-400 rounded-lg animate-pulse opacity-50"></div>
      )}
    </div>
  );
};

export default CallNotification;