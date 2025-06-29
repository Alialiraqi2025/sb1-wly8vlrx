import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreHorizontal, 
  ArrowLeft,
  Mic,
  MicOff,
  Image,
  File,
  Camera,
  MapPin,
  X,
  Download,
  Play,
  Pause
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { Chat, User, Message, ScreenSize } from '../types';

interface ChatWindowProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file' | 'voice', attachment?: File) => void;
  onStartCall: (type: 'voice' | 'video') => void;
  onBack?: () => void;
  screenSize: ScreenSize;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  currentUser,
  onSendMessage,
  onStartCall,
  onBack,
  screenSize
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  useEffect(() => {
    // Simulate typing indicator
    if (message.length > 0 && !isTyping) {
      setIsTyping(true);
      // In real app, send typing indicator to other users
    } else if (message.length === 0 && isTyping) {
      setIsTyping(false);
    }
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() || selectedFile) {
      if (selectedFile) {
        onSendMessage(selectedFile.name, getFileType(selectedFile), selectedFile);
        setSelectedFile(null);
      } else {
        onSendMessage(message.trim());
      }
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowAttachmentMenu(false);
    }
  };

  const getFileType = (file: File): 'image' | 'file' | 'voice' | 'video' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'voice';
    return 'file';
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], `voice_${Date.now()}.webm`, { type: 'audio/webm' });
        onSendMessage('Voice message', 'voice', file);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getChatName = () => {
    if (chat.type === 'group') return chat.name;
    const otherUser = chat.participants.find(p => p.id !== currentUser.id);
    return otherUser?.name || 'Unknown';
  };

  const getChatAvatar = () => {
    if (chat.type === 'group') {
      return (
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {chat.name?.charAt(0).toUpperCase()}
          </span>
        </div>
      );
    }
    
    const otherUser = chat.participants.find(p => p.id !== currentUser.id);
    if (otherUser?.avatar) {
      return (
        <img
          src={otherUser.avatar}
          alt={otherUser.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    
    return (
      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {getChatName().charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderMessage = (msg: Message) => {
    const isOwn = msg.senderId === currentUser.id;
    
    return (
      <div
        key={msg.id}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwn
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {msg.type === 'text' && (
              <p className="text-sm">{msg.content}</p>
            )}
            
            {msg.type === 'image' && msg.attachment && (
              <div>
                <img
                  src={msg.attachment.url}
                  alt={msg.attachment.name}
                  className="rounded-lg max-w-full h-auto mb-2"
                />
                <p className="text-xs opacity-75">{msg.attachment.name}</p>
              </div>
            )}
            
            {msg.type === 'file' && msg.attachment && (
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <File className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{msg.attachment.name}</p>
                  <p className="text-xs opacity-75">{(msg.attachment.size / 1024).toFixed(1)} KB</p>
                </div>
                <button className="bg-white/20 p-1 rounded">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {msg.type === 'voice' && msg.attachment && (
              <div className="flex items-center space-x-3">
                <button className="bg-white/20 p-2 rounded-full">
                  <Play className="h-4 w-4" />
                </button>
                <div className="flex-1">
                  <div className="bg-white/20 h-1 rounded-full">
                    <div className="bg-white h-1 rounded-full w-1/3"></div>
                  </div>
                  <p className="text-xs opacity-75 mt-1">0:15</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs ${isOwn ? 'text-indigo-200' : 'text-gray-500'}`}>
                {formatMessageTime(msg.timestamp)}
              </span>
              {msg.editedAt && (
                <span className={`text-xs ${isOwn ? 'text-indigo-200' : 'text-gray-500'}`}>
                  edited
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AttachmentMenu = () => (
    <div className="absolute bottom-16 left-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-10">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => imageInputRef.current?.click()}
          className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
        >
          <Image className="h-6 w-6 text-blue-600 mb-1" />
          <span className="text-xs text-blue-900">Photo</span>
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
        >
          <File className="h-6 w-6 text-green-600 mb-1" />
          <span className="text-xs text-green-900">File</span>
        </button>
        
        <button className="flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
          <Camera className="h-6 w-6 text-purple-600 mb-1" />
          <span className="text-xs text-purple-900">Camera</span>
        </button>
        
        <button className="flex flex-col items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
          <MapPin className="h-6 w-6 text-orange-600 mb-1" />
          <span className="text-xs text-orange-900">Location</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          {screenSize.isMobile && onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          {getChatAvatar()}
          
          <div>
            <h3 className="font-semibold text-gray-900">{getChatName()}</h3>
            <p className="text-sm text-gray-500">
              {chat.type === 'group' 
                ? `${chat.participants.length} members`
                : 'Online'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onStartCall('voice')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => onStartCall('video')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chat.messages && chat.messages.length > 0 ? (
          <>
            {chat.messages.map(renderMessage)}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="bg-gray-200 p-4 rounded-full inline-block mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start the conversation</h3>
              <p className="text-gray-600">Send your first message to {getChatName()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                {selectedFile.type.startsWith('image/') ? (
                  <Image className="h-5 w-5 text-white" />
                ) : (
                  <File className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <p className="font-medium text-blue-900">{selectedFile.name}</p>
                <p className="text-sm text-blue-700">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Voice Recording */}
      {isRecording && (
        <div className="p-4 bg-red-50 border-t border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-full animate-pulse">
                <Mic className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-red-900">Recording...</p>
                <p className="text-sm text-red-700">{formatRecordingTime(recordingTime)}</p>
              </div>
            </div>
            <button
              onClick={stopVoiceRecording}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200 relative">
        {showAttachmentMenu && <AttachmentMenu />}
        
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-4 z-10">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
        
        <div className="flex items-end space-x-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          {message.trim() || selectedFile ? (
            <button
              onClick={handleSendMessage}
              className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          ) : (
            <button
              onMouseDown={startVoiceRecording}
              onMouseUp={stopVoiceRecording}
              onTouchStart={startVoiceRecording}
              onTouchEnd={stopVoiceRecording}
              className={`p-3 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;