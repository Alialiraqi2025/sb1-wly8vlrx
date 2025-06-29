import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Truck, 
  Package, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Calendar,
  DollarSign,
  Edit3,
  Printer,
  Download,
  RefreshCw,
  X
} from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-156',
      customer: {
        name: 'Ahmed Al-Rashid',
        email: 'ahmed.rashid@email.com',
        phone: '+964 770 123 4567',
        address: 'Haifa Street, Al-Karkh, Baghdad'
      },
      items: [
        { name: 'Basmati Rice 5kg', quantity: 2, price: 17000 },
        { name: 'Olive Oil 1L', quantity: 1, price: 11800 }
      ],
      total: 45600,
      status: 'processing',
      paymentMethod: 'cash_on_delivery',
      deliveryType: 'standard',
      orderDate: '2024-01-20T10:30:00',
      estimatedDelivery: '2024-01-20T15:30:00',
      notes: 'Please call before delivery'
    },
    {
      id: 'ORD-2024-155',
      customer: {
        name: 'Fatima Hassan',
        email: 'fatima.hassan@email.com',
        phone: '+964 771 234 5678',
        address: 'Karrada District, Baghdad'
      },
      items: [
        { name: 'Chocolate Cookies 400g', quantity: 3, price: 4600 },
        { name: 'Fresh Milk 1L', quantity: 2, price: 3400 },
        { name: 'Orange Juice 1L', quantity: 1, price: 4200 }
      ],
      total: 28400,
      status: 'delivered',
      paymentMethod: 'cash_on_delivery',
      deliveryType: 'express',
      orderDate: '2024-01-19T14:15:00',
      estimatedDelivery: '2024-01-19T16:15:00',
      deliveredAt: '2024-01-19T16:05:00',
      notes: ''
    },
    {
      id: 'ORD-2024-154',
      customer: {
        name: 'Omar Khalil',
        email: 'omar.khalil@email.com',
        phone: '+964 772 345 6789',
        address: 'Mansour District, Baghdad'
      },
      items: [
        { name: 'All-Purpose Cleaner 750ml', quantity: 2, price: 5200 },
        { name: 'Dish Soap 500ml', quantity: 1, price: 4600 },
        { name: 'Premium Rice 5kg', quantity: 3, price: 17000 }
      ],
      total: 67200,
      status: 'shipped',
      paymentMethod: 'cash_on_delivery',
      deliveryType: 'standard',
      orderDate: '2024-01-19T09:45:00',
      estimatedDelivery: '2024-01-19T14:45:00',
      shippedAt: '2024-01-19T11:30:00',
      notes: 'Fragile items - handle with care'
    },
    {
      id: 'ORD-2024-153',
      customer: {
        name: 'Sarah Ahmed',
        email: 'sarah.ahmed@email.com',
        phone: '+964 773 456 7890',
        address: 'Sadr City, Baghdad'
      },
      items: [
        { name: 'Fresh Bananas 1kg', quantity: 2, price: 2800 },
        { name: 'Greek Yogurt 500g', quantity: 1, price: 5800 }
      ],
      total: 11400,
      status: 'cancelled',
      paymentMethod: 'cash_on_delivery',
      deliveryType: 'standard',
      orderDate: '2024-01-18T16:20:00',
      cancelledAt: '2024-01-18T17:00:00',
      cancelReason: 'Customer requested cancellation',
      notes: ''
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || order.paymentMethod === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { 
        ...order, 
        status: newStatus,
        ...(newStatus === 'shipped' && { shippedAt: new Date().toISOString() }),
        ...(newStatus === 'delivered' && { deliveredAt: new Date().toISOString() })
      } : order
    ));
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} IQD`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0);

    return { totalOrders, pendingOrders, processingOrders, deliveredOrders, totalRevenue };
  };

  const stats = calculateOrderStats();

  const OrderModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <p className="text-gray-600">{selectedOrder?.id}</p>
            </div>
            <button
              onClick={() => {
                setShowOrderModal(false);
                setSelectedOrder(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {selectedOrder && (
          <div className="p-6 space-y-6">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="capitalize">{selectedOrder.status}</span>
                </span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    handleStatusChange(selectedOrder.id, e.target.value);
                    setSelectedOrder({...selectedOrder, status: e.target.value});
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Customer & Order Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Customer Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-900">{selectedOrder.customer.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Order Information</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500">Order Date</span>
                      <div className="text-sm text-gray-900">{formatDateTime(selectedOrder.orderDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500">Payment Method</span>
                      <div className="text-sm text-gray-900 capitalize">{selectedOrder.paymentMethod.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500">Delivery Type</span>
                      <div className="text-sm text-gray-900 capitalize">{selectedOrder.deliveryType}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(item.price)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total:</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">{formatPrice(selectedOrder.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Order Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Order Placed</div>
                    <div className="text-xs text-gray-500">{formatDateTime(selectedOrder.orderDate)}</div>
                  </div>
                </div>
                
                {selectedOrder.shippedAt && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Truck className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Order Shipped</div>
                      <div className="text-xs text-gray-500">{formatDateTime(selectedOrder.shippedAt)}</div>
                    </div>
                  </div>
                )}
                
                {selectedOrder.deliveredAt && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Order Delivered</div>
                      <div className="text-xs text-gray-500">{formatDateTime(selectedOrder.deliveredAt)}</div>
                    </div>
                  </div>
                )}
                
                {selectedOrder.cancelledAt && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Order Cancelled</div>
                      <div className="text-xs text-gray-500">{formatDateTime(selectedOrder.cancelledAt)}</div>
                      {selectedOrder.cancelReason && (
                        <div className="text-xs text-red-600">Reason: {selectedOrder.cancelReason}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Notes</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">{selectedOrder.notes}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">Monitor and manage customer orders</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processingOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{stats.deliveredOrders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-lg font-bold text-green-600">{formatPrice(stats.totalRevenue)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by ID, customer name, or email..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>

          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Payment Methods</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500 capitalize">{order.deliveryType} delivery</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{order.items.length} items</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{formatPrice(order.total)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatDateTime(order.orderDate)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && <OrderModal />}
    </div>
  );
};

export default OrderManagement;