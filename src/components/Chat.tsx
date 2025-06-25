import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  User, 
  Bot, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Smile,
  Paperclip,
  MoreHorizontal,
  ArrowDown,
  Headphones,
  Image,
  FileText,
  Camera,
  File,
  Download,
  Eye
} from 'lucide-react';

interface ChatProps {
  onClose: () => void;
  user?: any;
  screenSize?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'file';
  size: string;
  url?: string;
  preview?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type?: 'text' | 'system';
  status?: 'sent' | 'delivered' | 'read';
  attachment?: Attachment;
}

const Chat: React.FC<ChatProps> = ({ 
  onClose, 
  user,
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'اهلا وسهلا بكم في تطبيق درة ماركت 2 😊',
      sender: 'support',
      timestamp: new Date(),
      type: 'text',
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    "Order status",
    "Delivery time",
    "Product availability",
    "Payment issue",
    "Return/Refund",
    "Account help"
  ];

  const emojis = [
    '😊', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗',
    '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨',
    '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞',
    '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫',
    '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥',
    '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐',
    '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲',
    '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
    '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
    '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚',
    '🖐️', '✋', '🖖', '👏', '🙌', '🤲', '🤝', '🙏',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
    '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖',
    '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️',
    '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈',
    '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐'
  ];

  const attachmentOptions = [
    {
      id: 'image',
      label: 'Photo',
      icon: Image,
      color: 'text-blue-600',
      description: 'Send an image'
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: Camera,
      color: 'text-green-600',
      description: 'Take a photo'
    },
    {
      id: 'document',
      label: 'Document',
      icon: FileText,
      color: 'text-orange-600',
      description: 'Send a document'
    },
    {
      id: 'file',
      label: 'File',
      icon: File,
      color: 'text-purple-600',
      description: 'Send any file'
    }
  ];

  const supportResponses = {
    "order status": "I can help you check your order status! 😊 Could you please provide your order number?",
    "delivery time": "Our standard delivery time is 2-3 hours, and express delivery is 30-60 minutes. Free delivery is available on orders over 5,000 IQD! 🚚✨",
    "product availability": "I can check product availability for you! 📦 Which product are you looking for?",
    "payment issue": "I'm sorry to hear about the payment issue. 😔 We accept cash on delivery and all major payment methods. What specific issue are you experiencing?",
    "return": "We have a flexible return policy! 😊 Items can be returned within 7 days of delivery. What would you like to return?",
    "refund": "Refunds are processed within 3-5 business days! 💰 Do you have an order you'd like to return?",
    "account": "I can help with account-related issues! 👤 Are you having trouble logging in or with your profile information?",
    "hello": "Hello! 👋 How can I assist you today?",
    "hi": "Hi there! 😊 What can I help you with?",
    "help": "I'm here to help! 🤝 You can ask me about orders, deliveries, products, payments, or anything else related to Durra Market 2.",
    "thanks": "You're welcome! 😊 Is there anything else I can help you with?",
    "thank you": "My pleasure! 😄 Feel free to reach out if you need any other assistance.",
    "delivery": "We offer free delivery on orders over 5,000 IQD! 🚚 Standard delivery takes 2-3 hours, express delivery is 30-60 minutes.",
    "free delivery": "Yes! 🎉 We offer free delivery on all orders over 5,000 IQD. Orders below this amount have a delivery fee of 2,000 IQD."
  };

  // Dynamic chat container class
  const getChatContainerClass = () => {
    if (screenSize.isDesktop) {
      return 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    } else {
      return 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4';
    }
  };

  // Dynamic chat window class
  const getChatWindowClass = () => {
    if (screenSize.isDesktop) {
      return 'bg-white rounded-3xl w-full max-w-lg h-[80vh] flex flex-col overflow-hidden shadow-2xl';
    } else if (screenSize.isTablet) {
      return 'bg-white rounded-t-3xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden';
    } else {
      return 'bg-white rounded-t-3xl w-full max-w-md h-[80vh] flex flex-col overflow-hidden';
    }
  };

  // Dynamic message container class
  const getMessageContainerClass = () => {
    return 'flex-1 overflow-y-auto spacing-responsive bg-gray-50 custom-scrollbar smooth-scroll';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSupportResponse = (userMessage: string, hasAttachment?: boolean): string => {
    if (hasAttachment) {
      return "Thank you for sharing that with us! 📎 I can see your attachment. Our support team will review it and get back to you shortly. Is there anything specific you'd like us to help you with regarding this?";
    }

    const message = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(supportResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Check for common greetings and responses
    if (message.includes('price') || message.includes('cost')) {
      return "Our prices are very competitive! 💰 You can see all product prices in the app. Is there a specific product you'd like to know about?";
    }
    
    if (message.includes('store') || message.includes('location')) {
      return "We're located on Haifa Street, Baghdad! 📍 You can also choose home delivery or store pickup when placing your order.";
    }
    
    if (message.includes('hours') || message.includes('open')) {
      return "We're open 24/7 for online orders! 🕐 Our physical store is open from 8 AM to 10 PM daily.";
    }

    if (message.includes('discount') || message.includes('offer') || message.includes('deal')) {
      return "We have daily deals and special offers! 🎁 Check out our 'Special Offers' section in the app for current promotions.";
    }

    if (message.includes('minimum') || message.includes('5000') || message.includes('5,000')) {
      return "Yes! 😊 We offer free delivery on orders over 5,000 IQD. Orders below this amount have a delivery fee of 2,000 IQD.";
    }

    // Default response in Arabic
    return "شكراً لرسالتكم! 😊 سيقوم فريق الدعم بالرد عليكم قريباً. في هذه الأثناء، يمكنكم تصفح قسم الأسئلة الشائعة أو السؤال عن الطلبات، التوصيل، المنتجات، أو المدفوعات.";
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const attachment: Attachment = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      size: formatFileSize(file.size),
      url: URL.createObjectURL(file)
    };

    // If it's an image, create a preview
    if (file.type.startsWith('image/')) {
      attachment.preview = attachment.url;
    }

    setSelectedAttachment(attachment);
    setShowAttachmentMenu(false);
    
    // Reset file input
    event.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && !selectedAttachment) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage || (selectedAttachment ? `Sent ${selectedAttachment.type}` : ''),
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      status: 'sent',
      attachment: selectedAttachment || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = newMessage;
    const hasAttachment = !!selectedAttachment;
    
    setNewMessage('');
    setSelectedAttachment(null);
    setShowEmojiPicker(false);
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSupportResponse(messageText, hasAttachment),
        sender: 'support',
        timestamp: new Date(),
        type: 'text',
        status: 'read'
      };

      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleAttachmentOption = (optionId: string) => {
    switch (optionId) {
      case 'image':
        imageInputRef.current?.click();
        break;
      case 'camera':
        // In a real app, this would open the camera
        alert('Camera functionality would be implemented here');
        setShowAttachmentMenu(false);
        break;
      case 'document':
      case 'file':
        fileInputRef.current?.click();
        break;
    }
  };

  const removeAttachment = () => {
    if (selectedAttachment?.url) {
      URL.revokeObjectURL(selectedAttachment.url);
    }
    setSelectedAttachment(null);
  };

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const AttachmentPreview = ({ attachment }: { attachment: Attachment }) => {
    return (
      <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
        {attachment.type === 'image' && attachment.preview ? (
          <div className="relative">
            <img 
              src={attachment.preview} 
              alt={attachment.name}
              className="max-w-full h-32 object-cover rounded-lg img-responsive"
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {attachment.size}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
              <p className="text-xs text-gray-500">{attachment.size}</p>
            </div>
            <div className="flex space-x-1">
              <button className="p-1 text-gray-400 hover:text-gray-600 touch-target ios-button android-button focus-ring">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 touch-target ios-button android-button focus-ring">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={getChatContainerClass()}>
      <div className={getChatWindowClass()}>
        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
          onChange={(e) => handleFileSelect(e, 'file')}
          className="hidden"
        />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e, 'image')}
          className="hidden"
        />

        {/* Chat Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 spacing-responsive text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Headphones className="h-5 w-5" />
                </div>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-responsive-lg">Customer Support 😊</h3>
                <p className="text-xs text-orange-100 text-responsive">
                  {isOnline ? 'Online • Typically replies in minutes' : 'Offline • We\'ll reply soon'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 touch-target ios-button android-button hover-lift focus-ring"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={chatContainerRef}
          onScroll={handleScroll}
          className={getMessageContainerClass()}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                      : 'bg-gray-300'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-sm">😊</span>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl card-responsive ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}>
                    <p className="text-responsive">{message.text}</p>
                    
                    {/* Attachment */}
                    {message.attachment && (
                      <AttachmentPreview attachment={message.attachment} />
                    )}
                    
                    <div className={`flex items-center justify-between mt-1 ${
                      message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <div className="ml-2">
                          {message.status === 'sent' && <Clock className="h-3 w-3" />}
                          {message.status === 'delivered' && <CheckCircle className="h-3 w-3" />}
                          {message.status === 'read' && <CheckCircle className="h-3 w-3 text-orange-200" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">😊</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl card-responsive">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="spacing-responsive bg-white border-t border-gray-100">
            <p className="text-xs text-gray-600 mb-2">Quick replies:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs transition-colors touch-target ios-button android-button hover-lift focus-ring"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attachment Menu */}
        {showAttachmentMenu && (
          <div className="absolute bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-2xl shadow-lg card-responsive">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 text-responsive">Send Attachment</h3>
              <button
                onClick={() => setShowAttachmentMenu(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors touch-target ios-button android-button focus-ring"
                aria-label="Close attachment menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {attachmentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAttachmentOption(option.id)}
                  className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors touch-target ios-button android-button hover-lift focus-ring"
                >
                  <div className={`p-3 rounded-full bg-gray-100 mb-2 ${option.color}`}>
                    <option.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{option.label}</span>
                  <span className="text-xs text-gray-500 text-center">{option.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 right-4 bg-white border border-gray-200 rounded-2xl shadow-lg card-responsive max-h-48 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 text-responsive">Choose Emoji</h3>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors touch-target ios-button android-button focus-ring"
                aria-label="Close emoji picker"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-xl hover:bg-gray-100 rounded-lg p-2 transition-colors touch-target ios-button android-button hover-lift focus-ring"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute right-6 bottom-20 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors touch-target ios-button android-button hover-lift focus-ring"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        )}

        {/* Selected Attachment Preview */}
        {selectedAttachment && (
          <div className="spacing-responsive bg-orange-50 border-t border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-800">Attachment ready to send:</span>
              <button
                onClick={removeAttachment}
                className="text-orange-600 hover:text-orange-800 p-1 rounded-lg hover:bg-orange-100 transition-colors touch-target ios-button android-button focus-ring"
                aria-label="Remove attachment"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-white rounded-lg p-3">
              {selectedAttachment.type === 'image' && selectedAttachment.preview ? (
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedAttachment.preview} 
                    alt={selectedAttachment.name}
                    className="w-12 h-12 object-cover rounded-lg img-responsive"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{selectedAttachment.name}</p>
                    <p className="text-xs text-gray-500">{selectedAttachment.size}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{selectedAttachment.name}</p>
                    <p className="text-xs text-gray-500">{selectedAttachment.size}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="spacing-responsive bg-white border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... 😊"
                className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-responsive ios-input touch-target focus-ring"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-1 rounded-lg transition-colors touch-target ios-button android-button focus-ring ${
                    showEmojiPicker 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label="Open emoji picker"
                >
                  <Smile className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className={`p-1 rounded-lg transition-colors touch-target ios-button android-button focus-ring ${
                    showAttachmentMenu 
                      ? 'text-orange-600 bg-orange-50' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label="Open attachment menu"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() && !selectedAttachment}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target ios-button android-button hover-lift touch-active focus-ring"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="bg-gray-50 p-3 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+964 770 123 4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>support@durramarket.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;