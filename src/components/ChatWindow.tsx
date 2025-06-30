import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, Send, Paperclip, Smile, Mic, MoreVertical, Shield } from 'lucide-react';
import { Chat, Message } from '../types';
import MessageBubble from './MessageBubble';
import EmojiPicker from './EmojiPicker';

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
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
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
      <div className="border-b border-gray-200 p-4 flex-shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="element-avatar-large">
                {chat.name.charAt(0).toUpperCase()}
              </div>
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="element-text font-semibold chat-name">{chat.name}</h3>
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

      {/* Messages */}
      <div className="messages-container scrollable timeline">
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
          {Array.from({ length: 15 }, (_, i) => (
            <MessageBubble
              key={`demo-${i}`}
              message={{
                id: `demo-${i}`,
                chatId: chat.id,
                senderId: i % 3 === 0 ? currentUserId : 'other',
                content: `This is demo message ${i + 1}. Element has a clean, professional interface that makes messaging feel natural and efficient.`,
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

      {/* Encryption Indicator */}
      <div className="flex justify-center px-4 pb-2">
        <div className="encryption-indicator">
          <Shield className="w-3 h-3" />
          <span>Messages are end-to-end encrypted</span>
        </div>
      </div>

      {/* Message Composer */}
      <div className="message-composer">
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
          {messageInput.trim() ? (
            <button
              onClick={handleSendMessage}
              className="element-button p-2 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;