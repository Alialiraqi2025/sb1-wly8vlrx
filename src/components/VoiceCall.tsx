import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MoreHorizontal,
  Minimize2,
  Maximize2,
  User
} from 'lucide-react';
import { CallState, ScreenSize } from '../types';

interface VoiceCallProps {
  callState: CallState;
  onEndCall: () => void;
  screenSize: ScreenSize;
}

const VoiceCall: React.FC<VoiceCallProps> = ({ callState, onEndCall, screenSize }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Simulate audio level animation
    const audioTimer = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(audioTimer);
    };
  }, []);

  const formatCallDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getParticipantName = () => {
    const otherParticipant = callState.participants.find(p => p.id !== 'current_user');
    return otherParticipant?.name || 'Unknown';
  };

  const getParticipantAvatar = () => {
    const otherParticipant = callState.participants.find(p => p.id !== 'current_user');
    return otherParticipant?.avatar;
  };

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 w-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl z-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              {getParticipantAvatar() ? (
                <img
                  src={getParticipantAvatar()}
                  alt={getParticipantName()}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-white font-medium text-sm">{getParticipantName()}</p>
              <p className="text-white/70 text-xs">{formatCallDuration(callDuration)}</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-white/20 text-white p-1 rounded-full hover:bg-white/30 transition-colors"
            >
              <Maximize2 className="h-3 w-3" />
            </button>
            <button
              onClick={onEndCall}
              className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <PhoneOff className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div className="text-white">
          <h2 className="text-lg font-semibold">Voice Call</h2>
          <p className="text-white/70 text-sm">{formatCallDuration(callDuration)}</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
          <button className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Participant Info */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="relative mb-8">
          {/* Avatar with audio visualization */}
          <div className="relative">
            <div 
              className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center transition-all duration-200"
              style={{
                transform: `scale(${1 + (audioLevel / 1000)})`,
                boxShadow: `0 0 ${audioLevel}px rgba(255, 255, 255, 0.3)`
              }}
            >
              {getParticipantAvatar() ? (
                <img
                  src={getParticipantAvatar()}
                  alt={getParticipantName()}
                  className="w-44 h-44 rounded-full object-cover"
                />
              ) : (
                <div className="w-44 h-44 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {getParticipantName().charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            {/* Audio level rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
            <div className="absolute inset-2 rounded-full border-2 border-white/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">{getParticipantName()}</h2>
        <p className="text-white/70 text-lg mb-2">
          {callState.isIncoming ? 'Incoming call...' : 'Connected'}
        </p>
        <p className="text-white/50 text-sm">{formatCallDuration(callDuration)}</p>
        
        {/* Audio visualization bars */}
        <div className="flex items-center space-x-1 mt-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-white/40 rounded-full transition-all duration-200"
              style={{
                height: `${Math.random() * 40 + 10}px`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-8">
        <div className="flex justify-center items-center space-x-8">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </button>
          
          {/* Speaker Toggle */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-4 rounded-full transition-all ${
              isSpeakerOn 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isSpeakerOn ? <Volume2 className="h-7 w-7" /> : <VolumeX className="h-7 w-7" />}
          </button>
          
          {/* End Call */}
          <button
            onClick={onEndCall}
            className="bg-red-500 text-white p-5 rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
          >
            <PhoneOff className="h-8 w-8" />
          </button>
        </div>
        
        {/* Status indicators */}
        <div className="flex justify-center items-center space-x-6 mt-6">
          <div className="flex items-center space-x-2 text-white/70">
            <div className={`w-2 h-2 rounded-full ${isMuted ? 'bg-red-400' : 'bg-green-400'}`}></div>
            <span className="text-sm">{isMuted ? 'Muted' : 'Mic On'}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-white/70">
            <div className={`w-2 h-2 rounded-full ${isSpeakerOn ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
            <span className="text-sm">{isSpeakerOn ? 'Speaker' : 'Earpiece'}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-white/70">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;