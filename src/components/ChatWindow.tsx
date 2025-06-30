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

  useEffect(() => {
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 140)}px`;
    }
  }, [messageInput]);

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
    <div className="flex-content">
      {/* Chat Header */}
      <div className="glass-strong border-b border-white/20 p-4 sm:p-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base sm:text-xl">
                  {chat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 border-2 border-white rounded-full status-online"></div>
              )}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{chat.name}</h3>
              <p className="text-sm sm:text-lg text-white/70">
                {chat.isOnline ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="p-2 sm:p-3 hover:bg-white/20 rounded-xl sm:rounded-2xl transition-all duration-300 text-white/70 hover:text-white hover-scale">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="p-2 sm:p-3 hover:bg-white/20 rounded-xl sm:rounded-2xl transition-all duration-300 text-white/70 hover:text-white hover-scale">
              <Video className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="p-2 sm:p-3 hover:bg-white/20 rounded-xl sm:rounded-2xl transition-all duration-300 text-white/70 hover:text-white hover-scale">
              <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages - Now properly scrollable */}
      <div className="messages-container scrollable mobile-scroll p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUserId}
              senderName={message.senderId === currentUserId ? 'You' : otherParticipant?.name || 'Unknown'}
            />
          ))}
          
          {/* Add some demo messages to show scrolling */}
          {Array.from({ length: 10 }, (_, i) => (
            <MessageBubble
              key={`demo-${i}`}
              message={{
                id: `demo-${i}`,
                chatId: chat.id,
                senderId: i % 2 === 0 ? currentUserId : 'other',
                content: `This is demo message ${i + 1} to demonstrate scrolling functionality. You should be able to scroll through all these messages easily.`,
                timestamp: new Date(Date.now() - (i * 300000)),
                type: 'text',
                encrypted: true
              }}
              isOwn={i % 2 === 0}
              senderName={i % 2 === 0 ? 'You' : otherParticipant?.name || 'Unknown'}
            />
          ))}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="glass-strong border-t border-white/20 p-4 sm:p-6 flex-shrink-0">
        <div className="flex items-end space-x-3 sm:space-x-4">
          {/* Attachment Button */}
          <button
            onClick={handleFileUpload}
            className="p-3 sm:p-4 text-white/70 hover:text-white hover:bg-white/20 rounded-xl sm:rounded-2xl transition-all duration-300 hover-scale flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full input-glass pr-12 sm:pr-14 text-base sm:text-lg auto-resize focus-ring"
              rows={1}
            />
            
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors hover-scale"
            >
              <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-3 z-10">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>

          {/* Send/Voice Button */}
          {messageInput.trim() ? (
            <button
              onClick={handleSendMessage}
              className="btn-primary p-3 sm:p-4 hover-lift hover-glow flex-shrink-0"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex-shrink-0 ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              } hover-scale`}
            >
              <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;