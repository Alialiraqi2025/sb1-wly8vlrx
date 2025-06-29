import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ShoppingBag,
  Star,
  Ban,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Save,
  UserPlus,
  Lock,
  EyeOff,
  Key,
  RefreshCw
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+964 770 123 4567',
      address: 'Haifa Street, Al-Karkh, Baghdad',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      totalOrders: 24,
      totalSpent: 156000,
      avatar: null,
      verified: true,
      hasPassword: true
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      email: 'fatima.hassan@email.com',
      phone: '+964 771 234 5678',
      address: 'Karrada District, Baghdad',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19',
      totalOrders: 18,
      totalSpent: 89500,
      avatar: null,
      verified: true,
      hasPassword: true
    },
    {
      id: 3,
      name: 'Omar Khalil',
      email: 'omar.khalil@email.com',
      phone: '+964 772 345 6789',
      address: 'Mansour District, Baghdad',
      status: 'suspended',
      role: 'customer',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-18',
      totalOrders: 5,
      totalSpent: 23400,
      avatar: null,
      verified: false,
      hasPassword: true
    },
    {
      id: 4,
      name: 'Sarah Ahmed',
      email: 'sarah.ahmed@email.com',
      phone: '+964 773 456 7890',
      address: 'Sadr City, Baghdad',
      status: 'active',
      role: 'customer',
      joinDate: '2024-01-12',
      lastLogin: '2024-01-20',
      totalOrders: 31,
      totalSpent: 198700,
      avatar: null,
      verified: true,
      hasPassword: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordUser, setPasswordUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'customer',
    status: 'active',
    password: '',
    confirmPassword: '',
    sendCredentials: true
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
    sendNotification: true
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'suspended':
        return <Ban className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <UserCheck className="h-4 w-4" />;
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleGeneratePassword = () => {
    const password = generateRandomPassword();
    setNewUser({
      ...newUser,
      password: password,
      confirmPassword: password
    });
  };

  const handleGenerateNewPassword = () => {
    const password = generateRandomPassword();
    setPasswordData({
      ...passwordData,
      newPassword: password,
      confirmPassword: password
    });
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleAddUser = () => {
    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(newUser.password);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
      avatar: null,
      verified: false,
      hasPassword: true
    };

    setUsers([...users, user]);
    
    // Simulate sending credentials if requested
    if (newUser.sendCredentials) {
      alert(`User created successfully! Login credentials have been sent to ${newUser.email}`);
    } else {
      alert('User created successfully!');
    }

    setNewUser({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'customer',
      status: 'active',
      password: '',
      confirmPassword: '',
      sendCredentials: true
    });
    setShowAddUserModal(false);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      status: user.status,
      password: '',
      confirmPassword: '',
      sendCredentials: false
    });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = () => {
    const updatedUser = {
      ...editingUser,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      role: newUser.role,
      status: newUser.status
    };

    setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
    setShowEditUserModal(false);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'customer',
      status: 'active',
      password: '',
      confirmPassword: '',
      sendCredentials: true
    });
  };

  const handleChangePassword = (user: any) => {
    setPasswordUser(user);
    setPasswordData({
      newPassword: '',
      confirmPassword: '',
      sendNotification: true
    });
    setShowPasswordModal(true);
  };

  const handleUpdatePassword = () => {
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(passwordData.newPassword);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    // Update user password (in real app, this would be an API call)
    setUsers(users.map(u => 
      u.id === passwordUser.id ? { ...u, hasPassword: true } : u
    ));

    // Simulate sending notification if requested
    if (passwordData.sendNotification) {
      alert(`Password updated successfully! New password has been sent to ${passwordUser.email}`);
    } else {
      alert('Password updated successfully!');
    }

    setShowPasswordModal(false);
    setPasswordUser(null);
    setPasswordData({
      newPassword: '',
      confirmPassword: '',
      sendNotification: true
    });
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} IQD`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const UserModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">User Details</h2>
            <button
              onClick={() => {
                setShowUserModal(false);
                setSelectedUser(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {selectedUser && (
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                    {getStatusIcon(selectedUser.status)}
                    <span className="capitalize">{selectedUser.status}</span>
                  </span>
                  {selectedUser.verified && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verified</span>
                    </span>
                  )}
                  {selectedUser.hasPassword && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Lock className="h-3 w-3" />
                      <span>Password Set</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-900">{selectedUser.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Account Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500">Joined</span>
                      <div className="text-sm text-gray-900">{formatDate(selectedUser.joinDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500">Last Login</span>
                      <div className="text-sm text-gray-900">{formatDate(selectedUser.lastLogin)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Statistics */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Order Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{selectedUser.totalOrders}</div>
                  <div className="text-sm text-blue-700">Total Orders</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <Star className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">{formatPrice(selectedUser.totalSpent)}</div>
                  <div className="text-sm text-green-700">Total Spent</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedUser.status}
                onChange={(e) => {
                  handleStatusChange(selectedUser.id, e.target.value);
                  setSelectedUser({...selectedUser, status: e.target.value});
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <button 
                onClick={() => handleEditUser(selectedUser)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit User
              </button>

              <button 
                onClick={() => handleChangePassword(selectedUser)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Key className="h-4 w-4" />
                <span>Change Password</span>
              </button>
              
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                View Orders
              </button>
              
              <button 
                onClick={() => handleDeleteUser(selectedUser.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const PasswordModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Change User Password</h2>
            <button
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordUser(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {passwordUser && (
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{passwordUser.name}</h3>
                  <p className="text-sm text-gray-600">{passwordUser.email}</p>
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateNewPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700"
                    title="Generate Password"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Password Match Indicator */}
              {passwordData.newPassword && passwordData.confirmPassword && (
                <div className={`text-sm ${
                  passwordData.newPassword === passwordData.confirmPassword 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {passwordData.newPassword === passwordData.confirmPassword 
                    ? '✓ Passwords match' 
                    : '✗ Passwords do not match'
                  }
                </div>
              )}

              {/* Send Notification Option */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="sendNotification"
                  checked={passwordData.sendNotification}
                  onChange={(e) => setPasswordData({...passwordData, sendNotification: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="sendNotification" className="text-sm text-gray-700">
                  Send new password to user via email
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordUser(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePassword}
                disabled={!passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Key className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const UserFormModal = ({ isEdit = false }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit User' : 'Add New User'}
            </h2>
            <button
              onClick={() => {
                setShowAddUserModal(false);
                setShowEditUserModal(false);
                setEditingUser(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+964 XXX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={newUser.address}
                onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full address"
              />
            </div>

            {/* Password Section - Only for new users */}
            {!isEdit && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleGeneratePassword}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                      title="Generate Password"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {/* Password Match Indicator */}
                  {newUser.password && newUser.confirmPassword && (
                    <div className={`text-xs mt-1 ${
                      newUser.password === newUser.confirmPassword 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {newUser.password === newUser.confirmPassword 
                        ? '✓ Passwords match' 
                        : '✗ Passwords do not match'
                      }
                    </div>
                  )}
                </div>

                {/* Send Credentials Option */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="sendCredentials"
                      checked={newUser.sendCredentials}
                      onChange={(e) => setNewUser({...newUser, sendCredentials: e.target.checked})}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="sendCredentials" className="text-sm text-gray-700">
                      Send login credentials to user via email
                    </label>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={newUser.status}
                onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => {
              setShowAddUserModal(false);
              setShowEditUserModal(false);
              setEditingUser(null);
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleUpdateUser : handleAddUser}
            disabled={!isEdit && (!newUser.password || newUser.password !== newUser.confirmPassword)}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>{isEdit ? 'Update User' : 'Add User'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage customer accounts and user data</p>
        </div>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.status === 'suspended').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">With Passwords</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.hasPassword).length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Lock className="h-6 w-6 text-purple-600" />
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
                placeholder="Search users by name, email, or phone..."
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
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          {user.verified && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Verified</span>
                            </div>
                          )}
                          {user.hasPassword && (
                            <div className="flex items-center space-x-1 ml-2">
                              <Lock className="h-3 w-3 text-purple-500" />
                              <span className="text-xs text-purple-600">Password Set</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{user.totalOrders}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{formatPrice(user.totalSpent)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatDate(user.joinDate)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleChangePassword(user)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Change Password"
                      >
                        <Key className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showUserModal && <UserModal />}
      {showAddUserModal && <UserFormModal />}
      {showEditUserModal && <UserFormModal isEdit={true} />}
      {showPasswordModal && <PasswordModal />}
    </div>
  );
};

export default UserManagement;