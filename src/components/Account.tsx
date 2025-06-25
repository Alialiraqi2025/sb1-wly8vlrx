import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag, 
  Heart, 
  Settings, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  Edit3,
  Package,
  Star,
  Clock,
  ChevronRight,
  Camera,
  Shield,
  Gift,
  Truck
} from 'lucide-react';

interface AccountProps {
  user: any;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || 'Ahmed Al-Rashid',
    email: user?.email || 'ahmed.rashid@email.com',
    phone: user?.phone || '+964 770 123 4567',
    address: user?.address || 'Haifa Street, Al-Karkh, Baghdad',
    joinDate: 'March 2023'
  });

  const orderHistory = [
    {
      id: '#ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: '45,600 IQD',
      items: 8,
      statusColor: 'text-orange-600 bg-orange-50'
    },
    {
      id: '#ORD-2024-002',
      date: '2024-01-12',
      status: 'Processing',
      total: '32,400 IQD',
      items: 5,
      statusColor: 'text-blue-600 bg-blue-50'
    },
    {
      id: '#ORD-2024-003',
      date: '2024-01-08',
      status: 'Delivered',
      total: '28,900 IQD',
      items: 6,
      statusColor: 'text-orange-600 bg-orange-50'
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Basmati Rice 10kg',
      price: '32,000 IQD',
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=200',
      inStock: true
    },
    {
      id: 2,
      name: 'Organic Olive Oil 2L',
      price: '18,500 IQD',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=200',
      inStock: true
    }
  ];

  const menuItems = [
    { icon: User, label: 'Profile', id: 'profile', color: 'text-orange-600' },
    { icon: ShoppingBag, label: 'Order History', id: 'orders', color: 'text-orange-600' },
    { icon: Heart, label: 'Wishlist', id: 'wishlist', color: 'text-red-600' },
    { icon: MapPin, label: 'Addresses', id: 'addresses', color: 'text-purple-600' },
    { icon: CreditCard, label: 'Payment Methods', id: 'payment', color: 'text-orange-600' },
    { icon: Bell, label: 'Notifications', id: 'notifications', color: 'text-yellow-600' },
    { icon: Settings, label: 'Settings', id: 'settings', color: 'text-gray-600' },
    { icon: HelpCircle, label: 'Help & Support', id: 'help', color: 'text-indigo-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-10 w-10" />
            </div>
            <button className="absolute -bottom-1 -right-1 bg-white text-orange-600 p-1.5 rounded-full">
              <Camera className="h-3 w-3" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{userInfo.name}</h2>
            <p className="text-orange-100">Member since {userInfo.joinDate}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="h-4 w-4 text-yellow-300 fill-current" />
              <span className="text-sm">Premium Customer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-orange-600 hover:text-orange-700 flex items-center space-x-1"
          >
            <Edit3 className="h-4 w-4" />
            <span className="text-sm font-medium">{isEditing ? 'Save' : 'Edit'}</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{userInfo.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{userInfo.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{userInfo.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            {isEditing ? (
              <textarea
                value={userInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={2}
              />
            ) : (
              <p className="text-gray-900">{userInfo.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">24</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600">156,000</div>
          <div className="text-sm text-gray-600">Total Spent (IQD)</div>
        </div>
      </div>
    </div>
  );

  const renderOrdersSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Order History</h3>
        <button className="text-orange-600 text-sm font-medium">View All</button>
      </div>

      {orderHistory.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{order.id}</h4>
              <p className="text-sm text-gray-600">{order.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
              {order.status}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{order.items} items</span>
              <span>•</span>
              <span className="font-semibold text-gray-900">{order.total}</span>
            </div>
            <button className="text-orange-600 hover:text-orange-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWishlistSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">My Wishlist</h3>
        <span className="text-sm text-gray-600">{wishlistItems.length} items</span>
      </div>

      {wishlistItems.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex space-x-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
              <p className="text-orange-600 font-bold">{item.price}</p>
              <p className="text-xs text-orange-600 mt-1">
                {item.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs">
                Add to Cart
              </button>
              <button className="text-red-500 text-xs">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Settings</h3>
      
      <div className="bg-white rounded-2xl shadow-sm">
        {[
          { icon: Bell, label: 'Push Notifications', toggle: true },
          { icon: Mail, label: 'Email Notifications', toggle: true },
          { icon: Shield, label: 'Privacy Settings', toggle: false },
          { icon: Gift, label: 'Marketing Offers', toggle: true },
          { icon: Truck, label: 'Delivery Preferences', toggle: false }
        ].map((setting, index) => (
          <div key={index} className={`flex items-center justify-between p-4 ${index !== 4 ? 'border-b border-gray-100' : ''}`}>
            <div className="flex items-center space-x-3">
              <setting.icon className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">{setting.label}</span>
            </div>
            {setting.toggle ? (
              <div className="w-12 h-6 bg-orange-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSection();
      case 'orders':
        return renderOrdersSection();
      case 'wishlist':
        return renderWishlistSection();
      case 'settings':
        return renderSettingsSection();
      default:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="text-gray-400 mb-4">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <section className="pt-20 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <button 
            onClick={onLogout}
            className="text-red-500 hover:text-red-600 flex items-center space-x-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              } ${activeTab === item.id ? 'bg-orange-50' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-orange-600' : item.color}`} />
                <span className={`font-medium ${activeTab === item.id ? 'text-orange-600' : 'text-gray-900'}`}>
                  {item.label}
                </span>
              </div>
              <ChevronRight className={`h-4 w-4 ${activeTab === item.id ? 'text-orange-600' : 'text-gray-400'}`} />
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </section>
  );
};

export default Account;