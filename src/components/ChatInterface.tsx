import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Video, Send, Paperclip, Smile, Mic, MoreVertical, Shield, Square, Play, Pause, X, MapPin, Navigation, Camera, VideoIcon, Users, Plus } from 'lucide-react';
import { Chat, Message } from '../types';
import MessageBubble from './MessageBubble';
import EmojiPicker from './EmojiPicker';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatInterfaceProps {
  chat: Chat;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file' | 'voice') => void;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  chat, 
  messages, 
  currentUserId, 
  onSendMessage, 
  onBack 
}) => {
  const { t, direction } = useLanguage();
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isCapturingMedia, setIsCapturingMedia] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const otherParticipant = chat.participants.find(p => p.id !== currentUserId);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [messageInput]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (recordingTimer) {
        clearInterval(recordingTimer);
      }
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };
  }, [recordingTimer, mediaRecorder]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingTimer(timer);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    if (recordingTimer) {
      clearInterval(recordingTimer);
      setRecordingTimer(null);
    }
    setIsRecording(false);
  };

  const cancelRecording = () => {
    stopRecording();
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const sendVoiceMessage = () => {
    if (audioBlob) {
      const duration = formatTime(recordingTime);
      onSendMessage(`🎤 Voice message (${duration})`, 'voice');
      setAudioBlob(null);
      setRecordingTime(0);
    }
  };

  const playPreview = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlayingPreview(true);
      
      audioRef.current.onended = () => {
        setIsPlayingPreview(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const pausePreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingPreview(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVoiceRecord = () => {
    if (!isRecording && !audioBlob) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSendMessage(`📍 Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, 'text');
          setShowAttachmentMenu(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check your permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleShareLiveLocation = () => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSendMessage(`🔴 Live Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, 'text');
        },
        (error) => {
          console.error('Error getting live location:', error);
          alert('Unable to get your live location. Please check your permissions.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      
      // Stop watching after 5 minutes
      setTimeout(() => {
        navigator.geolocation.clearWatch(watchId);
      }, 300000);
      
      setShowAttachmentMenu(false);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCapturingMedia(true);
        setShowAttachmentMenu(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check your permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            onSendMessage('📷 Photo captured', 'image');
          }
        }, 'image/jpeg', 0.8);
      }
      
      // Stop camera stream
      const stream = video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      setIsCapturingMedia(false);
    }
  };

  const handleRecordVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        onSendMessage('🎥 Video recorded', 'video');
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setShowAttachmentMenu(false);
      
      // Stop recording after 30 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 30000);
      
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Unable to access camera and microphone. Please check your permissions.');
    }
  };

  const handleShareContact = () => {
    // In a real app, this would open a contact picker
    const contacts = ['John Doe', 'Jane Smith', 'Ahmed Al-Iraqi', 'Sarah Johnson'];
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    onSendMessage(`👤 Contact: ${randomContact}`, 'text');
    setShowAttachmentMenu(false);
  };

  const handleFileUpload = (accept?: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept || 'image/*,application/pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onSendMessage(`📎 ${file.name}`, file.type.startsWith('image/') ? 'image' : 'file');
        setShowAttachmentMenu(false);
      }
    };
    input.click();
  };

  return (
    <div className={`h-screen flex flex-col bg-white overflow-hidden ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Camera Capture Overlay */}
      {isCapturingMedia && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex-1 relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Camera Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
              <button
                onClick={() => {
                  const stream = videoRef.current?.srcObject as MediaStream;
                  if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                  }
                  setIsCapturingMedia(false);
                }}
                className="w-12 h-12 bg-gray-800 bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={capturePhoto}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-300"></div>
              </button>
              
              <button
                onClick={() => {
                  // Switch camera (front/back)
                  // This would require more complex implementation
                }}
                className="w-12 h-12 bg-gray-800 bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-4 bg-black bg-opacity-50">
            <div className="text-center">
              <p className="text-white text-lg font-medium">{t('chat.takePhoto')}</p>
              <p className="text-gray-300 text-sm">{t('chat.tapCapture')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 flex-shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="element-button-secondary p-2 lg:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            {/* Chat Info */}
            <div className="relative">
              <div className="element-avatar-large">
                {chat.name.charAt(0).toUpperCase()}
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="element-text font-semibold text-lg chat-name">{chat.name}</h3>
              <p className="element-text-small text-gray-500">
                {chat.isOnline ? t('chat.activeNow') : t('chat.lastSeenRecently')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="element-button-secondary p-2">
              <Phone className="w-4 h-4" />
            </button>
            <button className="element-button-secondary p-2">
              <Video className="w-4 h-4" />
            </button>
            <button className="element-button-secondary p-2">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto bg-gray-50 messages-scrollbar">
        <div className="messages-content">
          <div className="space-y-1">
            {messages.map((message, index) => {
              const prevMessage = messages[index - 1];
              const isContinuation = prevMessage && 
                prevMessage.senderId === message.senderId && 
                (message.timestamp.getTime() - prevMessage.timestamp.getTime()) < 300000; // 5 minutes

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.senderId === currentUserId}
                  senderName={message.senderId === currentUserId ? 'You' : otherParticipant?.name || 'Unknown'}
                  isContinuation={isContinuation}
                />
              );
            })}
            
            {/* Demo messages for scrolling */}
            {Array.from({ length: 20 }, (_, i) => (
              <MessageBubble
                key={`demo-${i}`}
                message={{
                  id: `demo-${i}`,
                  chatId: chat.id,
                  senderId: i % 3 === 0 ? currentUserId : 'other',
                  content: `This is demo message ${i + 1}. TELE IRAQ provides a secure and user-friendly messaging experience with end-to-end encryption.`,
                  timestamp: new Date(Date.now() - (i * 300000)),
                  type: 'text',
                  encrypted: true
                }}
                isOwn={i % 3 === 0}
                senderName={i % 3 === 0 ? 'You' : otherParticipant?.name || 'Unknown'}
                isContinuation={false}
              />
            ))}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Encryption Indicator */}
      <div className="flex justify-center px-4 pb-2 flex-shrink-0">
        <div className="encryption-indicator">
          <Shield className="w-3 h-3" />
          <span>{t('chat.encrypted')}</span>
        </div>
      </div>

      {/* Message Composer */}
      <div className="message-composer flex-shrink-0">
        <div className="flex items-end space-x-3">
          {/* Attachment Menu */}
          <div className="relative">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="element-button-secondary p-2 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
            
            {/* Attachment Options */}
            {showAttachmentMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 min-w-64 animate-scale-in">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleFileUpload('image/*')}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Paperclip className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{t('chat.file')}</span>
                  </button>
                  
                  <button
                    onClick={handleTakePhoto}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Camera className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{t('chat.camera')}</span>
                  </button>
                  
                  <button
                    onClick={handleRecordVideo}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <VideoIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Video</span>
                  </button>
                  
                  <button
                    onClick={handleShareLocation}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{t('chat.location')}</span>
                  </button>
                  
                  <button
                    onClick={handleShareLiveLocation}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <Navigation className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{t('chat.liveLocation')}</span>
                  </button>
                  
                  <button
                    onClick={handleShareContact}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{t('chat.contact')}</span>
                  </button>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">{t('chat.chooseShare')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.writeMessage')}
              className="composer-input w-full auto-resize"
              rows={1}
            />
            
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Smile className="w-4 h-4" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-10">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>

          {/* Send/Voice Button */}
          {messageInput.trim() || audioBlob ? (
            <button
              onClick={audioBlob ? sendVoiceMessage : handleSendMessage}
              className="element-button p-2 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : isRecording ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={cancelRecording}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-700 font-mono text-sm">
                  {formatTime(recordingTime)}
                </span>
              </div>
              <button
                onClick={stopRecording}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 flex-shrink-0"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 flex-shrink-0"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Voice Message Preview */}
        {audioBlob && !isRecording && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={isPlayingPreview ? pausePreview : playPreview}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  {isPlayingPreview ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <div>
                  <p className="text-sm font-medium text-blue-900">Voice Message</p>
                  <p className="text-xs text-blue-700">{formatTime(recordingTime)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={cancelRecording}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {t('chat.cancel')}
                </button>
                <button
                  onClick={sendVoiceMessage}
                  className="px-4 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t('chat.send')}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Hidden audio element for preview */}
        <audio ref={audioRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default ChatInterface;