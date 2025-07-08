import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Video, Send, Paperclip, Smile, Mic, MoreVertical, Shield, Square, Play, Pause, X } from 'lucide-react';
import { Chat, Message } from '../types';
import MessageBubble from './MessageBubble';
import EmojiPicker from './EmojiPicker';

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
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onSendMessage(`📎 ${file.name}`, file.type.startsWith('image/') ? 'image' : 'file');
      }
    };
    input.click();
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
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
                {chat.isOnline ? 'Active now' : 'Last seen recently'}
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
          <span>Messages are end-to-end encrypted</span>
        </div>
      </div>

      {/* Message Composer */}
      <div className="message-composer flex-shrink-0">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <button
            onClick={handleFileUpload}
            className="element-button-secondary p-2 flex-shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a message..."
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
                  Cancel
                </button>
                <button
                  onClick={sendVoiceMessage}
                  className="px-4 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send
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