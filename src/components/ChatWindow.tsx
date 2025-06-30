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
      <div className="glass border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {chat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full status-online"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{chat.name}</h3>
              <p className="text-sm text-gray-400">
                {chat.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
      <div className="glass border-t border-white/10 p-4">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <button
            onClick={handleFileUpload}
            className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 glass rounded-2xl text-white placeholder-gray-400 focus-ring resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>

          {/* Send/Voice Button */}
          {messageInput.trim() ? (
            <button
              onClick={handleSendMessage}
              className="gradient-primary p-3 rounded-xl hover-lift text-white"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className={`p-3 rounded-xl transition-all ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;