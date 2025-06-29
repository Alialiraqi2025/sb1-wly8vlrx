import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Star,
  Clock,
  MapPin,
  Lock,
  AlertTriangle
} from 'lucide-react';

interface AnalyticsProps {
  userRole?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ userRole = 'admin' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Check permissions based on user role
  const canViewFinancialData = userRole === 'admin';
  const canViewOperationalData = userRole === 'admin' || userRole === 'monitor';

  // Sample analytics data
  const analyticsData = {
    revenue: {
      current: 2450000,
      previous: 2180000,
      change: 12.4,
      trend: 'up',
      data: [
        { date: '2024-01-14', value: 320000 },
        { date: '2024-01-15', value: 380000 },
        { date: '2024-01-16', value: 290000 },
        { date: '2024-01-17', value: 420000 },
        { date: '2024-01-18', value: 350000 },
        { date: '2024-01-19', value: 390000 },
        { date: '2024-01-20', value: 300000 }
      ]
    },
    orders: {
      current: 1234,
      previous: 1089,
      change: 13.3,
      trend: 'up',
      data: [
        { date: '2024-01-14', value: 165 },
        { date: '2024-01-15', value: 189 },
        { date: '2024-01-16', value: 142 },
        { date: '2024-01-17', value: 198 },
        { date: '2024-01-18', value: 176 },
        { date: '2024-01-19', value: 203 },
        { date: '2024-01-20', value: 161 }
      ]
    },
    customers: {
      current: 5678,
      previous: 4932,
      change: 15.1,
      trend: 'up',
      data: [
        { date: '2024-01-14', value: 45 },
        { date: '2024-01-15', value: 52 },
        { date: '2024-01-16', value: 38 },
        { date: '2024-01-17', value: 61 },
        { date: '2024-01-18', value: 47 },
        { date: '2024-01-19', value: 58 },
        { date: '2024-01-20', value: 43 }
      ]
    }
  };

  const topProducts = [
    {
      name: 'Premium Basmati Rice 5kg',
      sales: 245,
      revenue: canViewFinancialData ? 4165000 : null,
      growth: 18.5,
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Extra Virgin Olive Oil 1L',
      sales: 189,
      revenue: canViewFinancialData ? 2230200 : null,
      growth: 12.3,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Chocolate Chip Cookies 400g',
      sales: 167,
      revenue: canViewFinancialData ? 768200 : null,
      growth: 25.7,
      image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'All-Purpose Cleaner 750ml',
      sales: 134,
      revenue: canViewFinancialData ? 696800 : null,
      growth: 8.9,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const topCustomers = [
    {
      name: 'Ahmed Al-Rashid',
      orders: 24,
      spent: canViewFinancialData ? 156000 : null,
      lastOrder: '2024-01-20',
      status: 'VIP'
    },
    {
      name: 'Sarah Ahmed',
      orders: 31,
      spent: canViewFinancialData ? 198700 : null,
      lastOrder: '2024-01-20',
      status: 'VIP'
    },
    {
      name: 'Fatima Hassan',
      orders: 18,
      spent: canViewFinancialData ? 89500 : null,
      lastOrder: '2024-01-19',
      status: 'Regular'
    },
    {
      name: 'Omar Khalil',
      orders: 15,
      spent: canViewFinancialData ? 67200 : null,
      lastOrder: '2024-01-19',
      status: 'Regular'
    }
  ];

  const categoryPerformance = [
    { name: 'Grains & Rice', sales: 45, revenue: canViewFinancialData ? 765000 : null, growth: 15.2 },
    { name: 'Oils & Vinegar', sales: 32, revenue: canViewFinancialData ? 378400 : null, growth: 8.7 },
    { name: 'Snacks', sales: 28, revenue: canViewFinancialData ? 128800 : null, growth: 22.1 },
    { name: 'Cleaning', sales: 25, revenue: canViewFinancialData ? 130000 : null, growth: 12.5 },
    { name: 'Fresh Produce', sales: 38, revenue: canViewFinancialData ? 106400 : null, growth: 18.9 },
    { name: 'Dairy', sales: 22, revenue: canViewFinancialData ? 74800 : null, growth: 6.3 }
  ];

  const recentActivity = [
    {
      type: 'order',
      message: 'New order #ORD-2024-156 placed',
      time: '2 minutes ago',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      type: 'user',
      message: 'New customer registration: Sarah Ahmed',
      time: '5 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      type: 'product',
      message: 'Low stock alert: Basmati Rice (5 units left)',
      time: '10 minutes ago',
      icon: Package,
      color: 'text-orange-600'
    },
    {
      type: 'order',
      message: 'Order #ORD-2024-155 delivered successfully',
      time: '15 minutes ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    }
  ];

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Restricted';
    return `${price.toLocaleString()} IQD`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCurrentData = () => {
    return analyticsData[selectedMetric] || analyticsData.revenue;
  };

  const currentData = getCurrentData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">
            {userRole === 'monitor' ? 'Track operational performance and customer insights' : 'Track your store performance and insights'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Role Restriction Notice for Monitor */}
      {userRole === 'monitor' && (
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <Lock className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 mb-1">Operational Analytics Access</h4>
              <p className="text-purple-800 text-sm">
                As a Monitor, you can view operational metrics like orders, customers, and product performance. 
                Financial data and revenue information are restricted to administrators only.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Revenue - Only for Admin */}
        {canViewFinancialData && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                analyticsData.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {analyticsData.revenue.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{analyticsData.revenue.change}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatPrice(analyticsData.revenue.current)}
            </h3>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>
        )}

        {/* Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              analyticsData.orders.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.orders.trend === 'up' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{analyticsData.orders.change}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {analyticsData.orders.current.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Total Orders</p>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              analyticsData.customers.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.customers.trend === 'up' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{analyticsData.customers.change}%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {analyticsData.customers.current.toLocaleString()}
          </h3>
          <p className="text-gray-600 text-sm">Total Customers</p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span>3.2%</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">892</h3>
          <p className="text-gray-600 text-sm">Total Products</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance Trend</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {canViewFinancialData && <option value="revenue">Revenue</option>}
              <option value="orders">Orders</option>
              <option value="customers">Customers</option>
            </select>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="space-y-4">
            {currentData.data.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 text-xs text-gray-600">{formatDate(item.date)}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(item.value / Math.max(...currentData.data.map(d => d.value))) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="w-20 text-xs text-gray-900 text-right">
                  {selectedMetric === 'revenue' && canViewFinancialData ? formatPrice(item.value) : item.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Category Performance</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {categoryPerformance.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.sales}% of sales</p>
                </div>
                <div className="text-right">
                  {canViewFinancialData ? (
                    <p className="font-bold text-gray-900">{formatPrice(category.revenue)}</p>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Lock className="h-3 w-3" />
                      <span className="text-xs">Restricted</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>{category.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                  <p className="text-xs text-gray-600">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  {canViewFinancialData ? (
                    <p className="font-bold text-gray-900 text-sm">{formatPrice(product.revenue)}</p>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Lock className="h-3 w-3" />
                      <span className="text-xs">Restricted</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>{product.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top Customers</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{customer.name}</h4>
                    <p className="text-xs text-gray-600">{customer.orders} orders</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      customer.status === 'VIP' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {canViewFinancialData ? (
                    <p className="font-bold text-gray-900 text-sm">{formatPrice(customer.spent)}</p>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Lock className="h-3 w-3" />
                      <span className="text-xs">Restricted</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-600">{formatDate(customer.lastOrder)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;