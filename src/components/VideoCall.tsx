import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  MoreHorizontal,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { CallState, ScreenSize } from '../types';

interface VideoCallProps {
  callState: CallState;
  onEndCall: () => void;
  screenSize: ScreenSize;
}

const VideoCall: React.FC<VideoCallProps> = ({ callState, onEndCall, screenSize }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    initializeCall();
    
    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      cleanup();
    };
  }, []);

  const initializeCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simulate remote video stream
      if (remoteVideoRef.current) {
        // In a real app, this would be the remote user's stream
        remoteVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to initialize call:', error);
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true, 
          audio: true 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        setIsScreenSharing(true);
        
        // Listen for screen share end
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          initializeCall(); // Switch back to camera
        };
      } else {
        setIsScreenSharing(false);
        initializeCall(); // Switch back to camera
      }
    } catch (error) {
      console.error('Failed to toggle screen share:', error);
    }
  };

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

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 w-64 h-48 bg-black rounded-2xl overflow-hidden shadow-2xl z-50">
        <div className="relative h-full">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {formatCallDuration(callDuration)}
          </div>
          
          <div className="absolute bottom-2 right-2">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-16 h-12 object-cover rounded-lg border-2 border-white"
            />
          </div>
          
          <div className="absolute bottom-2 left-2 flex space-x-1">
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-white/20 text-white p-1 rounded-full"
            >
              <Maximize2 className="h-3 w-3" />
            </button>
            <button
              onClick={onEndCall}
              className="bg-red-500 text-white p-1 rounded-full"
            >
              <PhoneOff className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Remote Video */}
      <div className="flex-1 relative">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Call Info Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-black/50 text-white px-4 py-2 rounded-2xl">
            <h3 className="font-semibold">{getParticipantName()}</h3>
            <p className="text-sm opacity-75">{formatCallDuration(callDuration)}</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <Minimize2 className="h-5 w-5" />
            </button>
            <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Local Video */}
        <div className="absolute bottom-20 right-4 w-32 h-24 bg-gray-900 rounded-2xl overflow-hidden border-2 border-white/20">
          {isVideoEnabled ? (
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="bg-gray-600 p-3 rounded-full">
                <span className="text-white font-semibold text-lg">
                  You
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="p-6 bg-black/80 backdrop-blur-sm">
        <div className="flex justify-center items-center space-x-6">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition-colors ${
              isMuted 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </button>
          
          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full transition-colors ${
              !isVideoEnabled 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </button>
          
          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full transition-colors ${
              isScreenSharing 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Monitor className="h-6 w-6" />
          </button>
          
          {/* Speaker Toggle */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-4 rounded-full transition-colors ${
              !isSpeakerOn 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isSpeakerOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
          </button>
          
          {/* End Call */}
          <button
            onClick={onEndCall}
            className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;