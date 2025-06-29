import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Eye,
  Plus,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Grid3X3
} from 'lucide-react';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import Analytics from './Analytics';
import CategoryManagement from './CategoryManagement';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
  screenSize?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  admin, 
  onLogout,
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications] = useState([
    { id: 1, type: 'order', message: 'New order #ORD-2024-156', time: '2 min ago', unread: true },
    { id: 2, type: 'user', message: 'New user registration', time: '5 min ago', unread: true },
    { id: 3, type: 'product', message: 'Low stock alert: Basmati Rice', time: '10 min ago', unread: false }
  ]);

  // Dashboard stats
  const stats = [
    {
      title: 'Total Revenue',
      value: '2,450,000 IQD',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Users',
      value: '5,678',
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Total Products',
      value: '892',
      change: '+3.1%',
      changeType: 'positive',
      icon: Package,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-156',
      customer: 'Ahmed Al-Rashid',
      items: 5,
      total: '45,600 IQD',
      status: 'processing',
      time: '2 min ago'
    },
    {
      id: 'ORD-2024-155',
      customer: 'Fatima Hassan',
      items: 3,
      total: '28,400 IQD',
      status: 'delivered',
      time: '15 min ago'
    },
    {
      id: 'ORD-2024-154',
      customer: 'Omar Khalil',
      items: 8,
      total: '67,200 IQD',
      status: 'shipped',
      time: '1 hour ago'
    }
  ];

  const lowStockProducts = [
    { name: 'Basmati Rice 5kg', stock: 5, threshold: 20, status: 'critical' },
    { name: 'Olive Oil 1L', stock: 12, threshold: 25, status: 'low' },
    { name: 'Chocolate Cookies', stock: 8, threshold: 15, status: 'low' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'low':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-900">{order.id}</h4>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.items} items • {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Low Stock Alert</h3>
            <button 
              onClick={() => setActiveTab('products')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Manage Stock
            </button>
          </div>
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">Threshold: {product.threshold} units</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${getStockStatusColor(product.status)}`}>
                    {product.stock}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStockStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button 
            onClick={() => setActiveTab('categories')}
            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
          >
            <Grid3X3 className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Manage Categories</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <Plus className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">Add Product</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
          >
            <Eye className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">View Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            <Users className="h-8 w-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-indigo-900">Manage Users</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return <CategoryManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-2 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Durra Market 2</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 border-0 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => n.unread) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                  )}
                </button>
              </div>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                  <p className="text-xs text-gray-600">{admin.role}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-2 rounded-full">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm p-4">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;