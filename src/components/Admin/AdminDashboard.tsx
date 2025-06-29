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
  Grid3X3,
  Shield,
  Monitor,
  Crown,
  MessageCircle,
  Headphones
} from 'lucide-react';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import Analytics from './Analytics';
import CategoryManagement from './CategoryManagement';
import CustomerSupport from './CustomerSupport';
import { User } from '../../types/UserTypes';
import { hasPermission, getAccessibleMenuItems, getRoleColor, getRoleName, getRoleRestrictions, canPerformAction } from '../../utils/roleUtils';

interface AdminDashboardProps {
  admin: User;
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
    { id: 3, type: 'product', message: 'Low stock alert: Basmati Rice', time: '10 min ago', unread: false },
    { id: 4, type: 'support', message: 'New customer support message', time: '15 min ago', unread: true }
  ]);

  // Dashboard stats
  const stats = [
    {
      title: 'Total Revenue',
      value: '2,450,000 IQD',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      visible: hasPermission(admin, 'view_analytics') || hasPermission(admin, 'financial_reports')
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      visible: hasPermission(admin, 'view_orders') || hasPermission(admin, 'manage_orders')
    },
    {
      title: 'Total Users',
      value: '5,678',
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      visible: hasPermission(admin, 'view_customers') || hasPermission(admin, 'manage_users')
    },
    {
      title: 'Total Products',
      value: '892',
      change: '+3.1%',
      changeType: 'positive',
      icon: Package,
      color: 'from-orange-500 to-red-600',
      visible: hasPermission(admin, 'view_products') || hasPermission(admin, 'manage_products')
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

  const customerSupportStats = [
    { label: 'Active Chats', value: 12, color: 'text-blue-600' },
    { label: 'Pending Messages', value: 8, color: 'text-orange-600' },
    { label: 'Resolved Today', value: 24, color: 'text-green-600' },
    { label: 'Avg Response Time', value: '2.5 min', color: 'text-purple-600' }
  ];

  // Get accessible menu items based on user permissions
  const menuItems = getAccessibleMenuItems(admin);

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-5 w-5 text-white" />;
      case 'monitor':
        return <Monitor className="h-5 w-5 text-white" />;
      default:
        return <Shield className="h-5 w-5 text-white" />;
    }
  };

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className={`bg-gradient-to-r ${getRoleColor(admin.role)} rounded-2xl p-6 text-white`}>
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-xl">
            {getRoleIcon(admin.role)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {admin.name}!</h2>
            <p className="text-white/90">
              {getRoleName(admin.role)} Dashboard - {admin.department && `${admin.department} Department`}
            </p>
            {admin.accessLevel && (
              <p className="text-white/80 text-sm">Access Level: {admin.accessLevel}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.filter(stat => stat.visible).map((stat, index) => (
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

      {/* Monitor-specific Customer Support Stats */}
      {admin.role === 'monitor' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Customer Support Overview</h3>
            <button 
              onClick={() => setActiveTab('support')}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Manage Support
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {customerSupportStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders - Show if user can view orders */}
        {(hasPermission(admin, 'view_orders') || hasPermission(admin, 'manage_orders')) && (
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
        )}

        {/* Low Stock Alert - Show if user can view products */}
        {(hasPermission(admin, 'view_products') || hasPermission(admin, 'manage_products')) && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Low Stock Alert</h3>
              <button 
                onClick={() => setActiveTab('products')}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                View Products
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
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {hasPermission(admin, 'manage_categories') && (
            <button 
              onClick={() => setActiveTab('categories')}
              className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
            >
              <Grid3X3 className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Manage Categories</span>
            </button>
          )}
          
          {hasPermission(admin, 'manage_products') && (
            <button 
              onClick={() => setActiveTab('products')}
              className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <Plus className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Add Product</span>
            </button>
          )}
          
          {(hasPermission(admin, 'view_orders') || hasPermission(admin, 'manage_orders')) && (
            <button 
              onClick={() => setActiveTab('orders')}
              className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
            >
              <Eye className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Manage Orders</span>
            </button>
          )}
          
          {hasPermission(admin, 'chat_with_customers') && (
            <button 
              onClick={() => setActiveTab('support')}
              className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
            >
              <MessageCircle className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Customer Support</span>
            </button>
          )}
          
          {hasPermission(admin, 'manage_users') && (
            <button 
              onClick={() => setActiveTab('users')}
              className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              <Users className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-indigo-900">Manage Users</span>
            </button>
          )}
          
          {(hasPermission(admin, 'view_analytics') || hasPermission(admin, 'view_reports')) && (
            <button 
              onClick={() => setActiveTab('analytics')}
              className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
            >
              <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">View Analytics</span>
            </button>
          )}
        </div>
      </div>

      {/* Role-specific Information */}
      {admin.role === 'monitor' && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <Monitor className="h-6 w-6 text-purple-600 mt-1" />
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Monitor Role Capabilities</h4>
              <p className="text-purple-800 text-sm mb-3">
                As a Monitor, you specialize in order management and customer support with focused access to operational tools.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-purple-900 mb-1">✅ You can:</h5>
                  <ul className="text-purple-700 space-y-1">
                    <li>• View and manage all orders</li>
                    <li>• Update order status and tracking</li>
                    <li>• Chat with customers and provide support</li>
                    <li>• View customer information and history</li>
                    <li>• View product inventory (read-only)</li>
                    <li>• Access operational reports and analytics</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-900 mb-1">❌ Restrictions:</h5>
                  <ul className="text-purple-700 space-y-1">
                    {getRoleRestrictions(admin.role).map((restriction, index) => (
                      <li key={index}>• {restriction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return canPerformAction(admin, 'add_category') ? 
          <CategoryManagement /> : 
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>You don't have permission to manage categories.</p>
          </div>;
      
      case 'products':
        return (canPerformAction(admin, 'add_product') || canPerformAction(admin, 'view_product')) ? 
          <ProductManagement userRole={admin.role} /> : 
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>You don't have permission to access products.</p>
          </div>;
      
      case 'orders':
        return (hasPermission(admin, 'manage_orders') || hasPermission(admin, 'view_orders')) ? 
          <OrderManagement userRole={admin.role} /> : 
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>You don't have permission to access orders.</p>
          </div>;
      
      case 'users':
        return hasPermission(admin, 'manage_users') ? 
          <UserManagement /> : 
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>You don't have permission to manage users.</p>
          </div>;
      
      case 'analytics':
        return (hasPermission(admin, 'view_analytics') || hasPermission(admin, 'view_reports')) ? 
          <Analytics userRole={admin.role} /> : 
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>You don't have permission to view analytics.</p>
          </div>;
      
      case 'support':
        return hasPermission(admin, 'chat_with_customers') ? 
          <CustomerSupport userRole={admin.role} /> : 
          <div className="text-center py-12 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>You don't have permission to access customer support.</p>
          </div>;
      
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
              <div className={`bg-gradient-to-r ${getRoleColor(admin.role)} p-2 rounded-xl`}>
                {getRoleIcon(admin.role)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{getRoleName(admin.role)} Dashboard</h1>
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
                  <p className="text-xs text-gray-600">{getRoleName(admin.role)}</p>
                </div>
                <div className={`bg-gradient-to-r ${getRoleColor(admin.role)} p-2 rounded-full`}>
                  {getRoleIcon(admin.role)}
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
                        ? `bg-gradient-to-r ${getRoleColor(admin.role)} text-white`
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
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