import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  Users,
  MessageSquare,
  MoreVertical,
  X,
  Camera,
  CameraOff,
  Monitor,
  Smartphone
} from 'lucide-react';
import { User } from '../types';

interface CallInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  callType: 'voice' | 'video';
  participant: User;
  isIncoming?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}

const CallInterface: React.FC<CallInterfaceProps> = ({
  isOpen,
  onClose,
  callType,
  participant,
  isIncoming = false,
  onAccept,
  onDecline
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [showControls, setShowControls] = useState(true);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && !isIncoming) {
      initializeCall();
    }
    
    return () => {
      cleanup();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isConnected && callTimerRef.current === null) {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
    };
  }, [isConnected]);

  const initializeCall = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Get user media
      const constraints = {
        audio: true,
        video: callType === 'video' ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } : false
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStreamRef.current = stream;
      
      if (localVideoRef.current && callType === 'video') {
        localVideoRef.current.srcObject = stream;
      }
      
      // Initialize WebRTC peer connection
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };
      
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;
      
      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      
      // Handle remote stream
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      
      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        const state = peerConnection.connectionState;
        if (state === 'connected') {
          setConnectionStatus('connected');
          setIsConnected(true);
        } else if (state === 'disconnected' || state === 'failed') {
          setConnectionStatus('disconnected');
          setIsConnected(false);
        }
      };
      
      // Simulate connection for demo
      setTimeout(() => {
        setConnectionStatus('connected');
        setIsConnected(true);
      }, 2000);
      
    } catch (error) {
      console.error('Error initializing call:', error);
      handleCallError(error as Error);
    }
  };

  const handleCallError = (error: Error) => {
    const errorMessage = error.message;
    let userMessage = 'Unable to start the call. Please try again.';
    
    if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
      userMessage = 'Camera and microphone access was denied. Please enable permissions and try again.';
    } else if (errorMessage.includes('NotFoundError')) {
      userMessage = 'No camera or microphone found. Please connect your devices and try again.';
    } else if (errorMessage.includes('NotReadableError')) {
      userMessage = 'Camera or microphone is already in use. Please close other applications and try again.';
    }
    
    alert(userMessage);
    onClose();
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
      controlsTimerRef.current = null;
    }
  };

  const handleAcceptCall = async () => {
    await initializeCall();
    if (onAccept) onAccept();
  };

  const handleDeclineCall = () => {
    cleanup();
    if (onDecline) onDecline();
    onClose();
  };

  const handleEndCall = () => {
    cleanup();
    onClose();
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

  const toggleVideo = async () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      } else if (!isVideoEnabled) {
        // Enable video if it was disabled
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' },
            audio: false 
          });
          
          const videoTrack = videoStream.getVideoTracks()[0];
          if (peerConnectionRef.current) {
            peerConnectionRef.current.addTrack(videoTrack, localStreamRef.current!);
          }
          
          localStreamRef.current!.addTrack(videoTrack);
          setIsVideoEnabled(true);
          
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStreamRef.current;
          }
        } catch (error) {
          console.error('Error enabling video:', error);
        }
      }
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // In a real implementation, this would switch audio output
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatCallDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    controlsTimerRef.current = setTimeout(() => {
      if (isConnected && callType === 'video') {
        setShowControls(false);
      }
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black ${isFullscreen ? '' : 'bg-opacity-90'} flex items-center justify-center`}
      onMouseMove={handleMouseMove}
    >
      <div className={`relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl h-full max-h-[90vh]'} bg-gray-900 rounded-lg overflow-hidden`}>
        
        {/* Video Container */}
        {callType === 'video' && (
          <div className="relative w-full h-full">
            {/* Remote Video */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
            
            {/* Local Video */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              {isVideoEnabled ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <CameraOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Camera off</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Participant info overlay for video calls */}
            {showControls && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{participant.name}</h3>
                    <p className="text-sm text-gray-300">
                      {isConnected ? formatCallDuration(callDuration) : connectionStatus}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Voice Call Interface */}
        {callType === 'voice' && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">{participant.name}</h2>
              <p className="text-xl text-white text-opacity-80 mb-4">
                {isIncoming ? 'Incoming call...' : isConnected ? formatCallDuration(callDuration) : connectionStatus}
              </p>
              {connectionStatus === 'connecting' && (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Incoming Call Controls */}
        {isIncoming && !isConnected && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
            <button
              onClick={handleDeclineCall}
              className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110"
            >
              <PhoneOff className="w-8 h-8" />
            </button>
            <button
              onClick={handleAcceptCall}
              className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110"
            >
              <Phone className="w-8 h-8" />
            </button>
          </div>
        )}
        
        {/* Call Controls */}
        {!isIncoming && (showControls || callType === 'voice') && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-6 py-4">
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            
            {/* Video Toggle (for video calls) */}
            {callType === 'video' && (
              <button
                onClick={toggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  !isVideoEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                } text-white`}
              >
                {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>
            )}
            
            {/* Speaker Toggle */}
            <button
              onClick={toggleSpeaker}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isSpeakerOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
            
            {/* Fullscreen Toggle (for video calls) */}
            {callType === 'video' && (
              <button
                onClick={toggleFullscreen}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-all duration-200"
              >
                {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
              </button>
            )}
            
            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        )}
        
        {/* Close Button */}
        {!isIncoming && (showControls || callType === 'voice') && (
          <button
            onClick={handleEndCall}
            className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        {/* Connection Status Indicator */}
        {connectionStatus !== 'connected' && !isIncoming && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <div className="bg-black bg-opacity-50 rounded-lg p-6">
              <div className="element-spinner mx-auto mb-4"></div>
              <p className="text-lg font-medium">
                {connectionStatus === 'connecting' ? 'Connecting...' : 'Connection lost'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallInterface;