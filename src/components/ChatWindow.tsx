import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, Send, Paperclip, Smile, Mic, MoreVertical } from 'lucide-react';
import { Chat, Message } from '../types';
import MessageBubble from './MessageBubble';
import EmojiPicker from './EmojiPicker';
import { formatTime } from '../utils/dateUtils';

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file' | 'voice') => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, messages, currentUserId, onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const otherParticipant = chat.participants.find(p => p.id !== currentUserId);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      onSendMessage('🎤 Voice message', 'voice');
    } else {
      setIsRecording(true);
      // In a real app, start recording here
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
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
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="glass-strong border-b border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">
                  {chat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full status-online"></div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{chat.name}</h3>
              <p className="text-lg text-white/70">
                {chat.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 text-white/70 hover:text-white hover-scale">
              <Phone className="w-6 h-6" />
            </button>
            <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 text-white/70 hover:text-white hover-scale">
              <Video className="w-6 h-6" />
            </button>
            <button className="p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 text-white/70 hover:text-white hover-scale">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUserId}
            senderName={message.senderId === currentUserId ? 'You' : otherParticipant?.name || 'Unknown'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="glass-strong border-t border-white/20 p-6">
        <div className="flex items-end space-x-4">
          {/* Attachment Button */}
          <button
            onClick={handleFileUpload}
            className="p-4 text-white/70 hover:text-white hover:bg-white/20 rounded-2xl transition-all duration-300 hover-scale"
          >
            <Paperclip className="w-6 h-6" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full input-glass pr-14 text-lg resize-none focus-ring"
              rows={1}
              style={{ minHeight: '56px', maxHeight: '140px' }}
            />
            
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors hover-scale"
            >
              <Smile className="w-6 h-6" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-3">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>

          {/* Send/Voice Button */}
          {messageInput.trim() ? (
            <button
              onClick={handleSendMessage}
              className="btn-primary p-4 hover-lift hover-glow"
            >
              <Send className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              } hover-scale`}
            >
              <Mic className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;