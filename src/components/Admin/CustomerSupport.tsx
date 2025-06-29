import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Filter, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Star,
  Phone,
  Mail,
  MapPin,
  Package,
  ShoppingCart,
  Eye,
  X,
  Paperclip,
  Smile,
  MoreHorizontal,
  Archive,
  Flag,
  UserCheck,
  Headphones
} from 'lucide-react';

interface CustomerSupportProps {
  userRole?: string;
}

const CustomerSupport: React.FC<CustomerSupportProps> = ({ userRole = 'monitor' }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [chats] = useState([
    {
      id: 1,
      customer: {
        name: 'Ahmed Al-Rashid',
        email: 'ahmed.rashid@email.com',
        phone: '+964 770 123 4567',
        address: 'Haifa Street, Al-Karkh, Baghdad',
        totalOrders: 24,
        totalSpent: 156000,
        joinDate: '2023-03-15',
        status: 'VIP'
      },
      lastMessage: 'When will my order #ORD-2024-156 be delivered?',
      timestamp: '2024-01-20T14:30:00',
      status: 'active',
      unread: 3,
      priority: 'normal',
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Hello, I placed an order yesterday but haven\'t received any updates.',
          timestamp: '2024-01-20T14:25:00',
          read: true
        },
        {
          id: 2,
          sender: 'support',
          text: 'Hello Ahmed! I\'m checking your order status right now. Can you please provide your order number?',
          timestamp: '2024-01-20T14:26:00',
          read: true
        },
        {
          id: 3,
          sender: 'customer',
          text: 'It\'s order #ORD-2024-156. I ordered rice and olive oil.',
          timestamp: '2024-01-20T14:28:00',
          read: true
        },
        {
          id: 4,
          sender: 'support',
          text: 'Perfect! I can see your order is currently being processed and will be shipped within the next 2 hours. You\'ll receive a tracking notification via SMS.',
          timestamp: '2024-01-20T14:29:00',
          read: true
        },
        {
          id: 5,
          sender: 'customer',
          text: 'When will my order #ORD-2024-156 be delivered?',
          timestamp: '2024-01-20T14:30:00',
          read: false
        }
      ]
    },
    {
      id: 2,
      customer: {
        name: 'Fatima Hassan',
        email: 'fatima.hassan@email.com',
        phone: '+964 771 234 5678',
        address: 'Karrada District, Baghdad',
        totalOrders: 18,
        totalSpent: 89500,
        joinDate: '2023-06-20',
        status: 'Regular'
      },
      lastMessage: 'Thank you for the quick delivery!',
      timestamp: '2024-01-20T13:45:00',
      status: 'resolved',
      unread: 0,
      priority: 'low',
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'I received my order but one item was missing.',
          timestamp: '2024-01-20T13:30:00',
          read: true
        },
        {
          id: 2,
          sender: 'support',
          text: 'I apologize for the inconvenience. Can you tell me which item was missing?',
          timestamp: '2024-01-20T13:32:00',
          read: true
        },
        {
          id: 3,
          sender: 'customer',
          text: 'The chocolate cookies were missing from my order.',
          timestamp: '2024-01-20T13:35:00',
          read: true
        },
        {
          id: 4,
          sender: 'support',
          text: 'I\'ve arranged for the missing item to be delivered to you within 1 hour at no extra charge. You\'ll also receive a 10% discount on your next order.',
          timestamp: '2024-01-20T13:40:00',
          read: true
        },
        {
          id: 5,
          sender: 'customer',
          text: 'Thank you for the quick delivery!',
          timestamp: '2024-01-20T13:45:00',
          read: true
        }
      ]
    },
    {
      id: 3,
      customer: {
        name: 'Omar Khalil',
        email: 'omar.khalil@email.com',
        phone: '+964 772 345 6789',
        address: 'Mansour District, Baghdad',
        totalOrders: 15,
        totalSpent: 67200,
        joinDate: '2023-08-10',
        status: 'Regular'
      },
      lastMessage: 'Do you have organic vegetables available?',
      timestamp: '2024-01-20T12:15:00',
      status: 'pending',
      unread: 1,
      priority: 'normal',
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'Do you have organic vegetables available?',
          timestamp: '2024-01-20T12:15:00',
          read: false
        }
      ]
    },
    {
      id: 4,
      customer: {
        name: 'Sarah Ahmed',
        email: 'sarah.ahmed@email.com',
        phone: '+964 773 456 7890',
        address: 'Sadr City, Baghdad',
        totalOrders: 8,
        totalSpent: 34500,
        joinDate: '2023-11-05',
        status: 'New'
      },
      lastMessage: 'How can I cancel my order?',
      timestamp: '2024-01-20T11:30:00',
      status: 'urgent',
      unread: 2,
      priority: 'high',
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: 'I need to cancel my order urgently. There was a family emergency.',
          timestamp: '2024-01-20T11:25:00',
          read: false
        },
        {
          id: 2,
          sender: 'customer',
          text: 'How can I cancel my order?',
          timestamp: '2024-01-20T11:30:00',
          read: false
        }
      ]
    }
  ]);

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || chat.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'normal':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Regular':
        return 'bg-blue-100 text-blue-800';
      case 'New':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} IQD`;
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: selectedChat.messages.length + 1,
      sender: 'support',
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    // Update the selected chat with new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, message],
      lastMessage: newMessage,
      timestamp: new Date().toISOString()
    };

    setSelectedChat(updatedChat);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "Thank you for contacting us! How can I help you today?",
    "I'm checking your order status right now...",
    "Your order has been processed and will be delivered soon.",
    "I apologize for the inconvenience. Let me resolve this for you.",
    "Is there anything else I can help you with?",
    "Thank you for your patience. Your issue has been resolved."
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Support</h2>
          <p className="text-gray-600">Manage customer conversations and provide support</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 px-3 py-1 rounded-full">
            <span className="text-purple-800 text-sm font-medium">
              {filteredChats.filter(c => c.unread > 0).length} unread
            </span>
          </div>
        </div>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Chats</p>
              <p className="text-2xl font-bold text-blue-600">
                {chats.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {chats.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">
                {chats.filter(c => c.status === 'resolved').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">
                {chats.filter(c => c.status === 'urgent').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex h-[600px]">
          {/* Chat List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="urgent">Urgent</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-purple-50 border-purple-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-full">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{chat.customer.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getCustomerStatusColor(chat.customer.status)}`}>
                          {chat.customer.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(chat.priority)}`}></span>
                      {chat.unread > 0 && (
                        <div className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">{chat.lastMessage}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chat.status)}`}>
                      {chat.status}
                    </span>
                    <span className="text-xs text-gray-500">{formatTime(chat.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-full">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedChat.customer.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{selectedChat.customer.email}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getCustomerStatusColor(selectedChat.customer.status)}`}>
                            {selectedChat.customer.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Customer Info Panel */}
                <div className="p-4 bg-purple-50 border-b border-purple-200">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-purple-900">{selectedChat.customer.totalOrders}</div>
                      <div className="text-purple-600">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-900">{formatPrice(selectedChat.customer.totalSpent)}</div>
                      <div className="text-purple-600">Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-900">{formatDate(selectedChat.customer.joinDate)}</div>
                      <div className="text-purple-600">Joined</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-900">{selectedChat.customer.phone}</div>
                      <div className="text-purple-600">Phone</div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'support'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'support' ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Replies */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-2">Quick Replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.slice(0, 3).map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => setNewMessage(reply)}
                          className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-100 transition-colors"
                        >
                          {reply.substring(0, 30)}...
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={1}
                        style={{ minHeight: '44px', maxHeight: '120px' }}
                      />
                      <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Smile className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
                    <Headphones className="h-12 w-12 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a customer chat to start providing support</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;