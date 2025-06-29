import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck,
  UserCheck,
  Key,
  X,
  Crown,
  Monitor,
  Users
} from 'lucide-react';
import { User, UserRole } from '../../types/UserTypes';
import { getDefaultPermissions, getRoleColor, getRoleName } from '../../utils/roleUtils';

interface AdminAuthProps {
  onLogin: (adminData: User) => void;
  onClose?: () => void;
  screenSize?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

const AdminAuth: React.FC<AdminAuthProps> = ({ 
  onLogin,
  onClose,
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Demo admin credentials for different roles
  const DEMO_CREDENTIALS = [
    {
      email: 'admin@durramarket.com',
      password: 'admin123456',
      role: 'admin' as UserRole,
      name: 'Admin User',
      department: 'Management',
      accessLevel: 5
    },
    {
      email: 'monitor@durramarket.com',
      password: 'monitor123456',
      role: 'monitor' as UserRole,
      name: 'Monitor User',
      department: 'Operations',
      accessLevel: 2
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field] || errors.credentials) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors.credentials;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    // Check credentials
    if (!newErrors.email && !newErrors.password) {
      const enteredEmail = loginData.email.trim();
      const enteredPassword = loginData.password.trim();
      
      const validCredential = DEMO_CREDENTIALS.find(
        cred => cred.email === enteredEmail && cred.password === enteredPassword
      );
      
      if (!validCredential) {
        newErrors.credentials = 'Invalid admin credentials. Please use one of the demo credentials provided below.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Find the matching credential
    const credential = DEMO_CREDENTIALS.find(
      cred => cred.email === loginData.email.trim() && cred.password === loginData.password.trim()
    );

    if (credential) {
      // Simulate API call
      setTimeout(() => {
        const adminData: User = {
          id: `${credential.role}-001`,
          name: credential.name,
          email: credential.email,
          role: credential.role,
          status: 'active',
          permissions: getDefaultPermissions(credential.role),
          joinDate: '2024-01-01',
          lastLogin: new Date().toISOString(),
          verified: true,
          hasPassword: true,
          department: credential.department,
          accessLevel: credential.accessLevel
        };
        
        onLogin(adminData);
        setIsLoading(false);
      }, 1500);
    }
  };

  const fillDemoCredentials = (credentialIndex: number) => {
    const credential = DEMO_CREDENTIALS[credentialIndex];
    setLoginData({
      email: credential.email,
      password: credential.password
    });
    setErrors({});
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'monitor':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <div className="text-center">
            <div className="bg-white/20 p-4 rounded-2xl inline-block mb-4">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
            <p className="text-gray-300">Durra Market 2 Management</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Demo Credentials Info */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>Demo Access Credentials</span>
            </h4>
            
            {DEMO_CREDENTIALS.map((credential, index) => (
              <div key={index} className={`bg-gradient-to-r ${getRoleColor(credential.role)} bg-opacity-10 border border-gray-200 rounded-2xl p-4`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`bg-gradient-to-r ${getRoleColor(credential.role)} p-1 rounded-lg`}>
                      {getRoleIcon(credential.role)}
                    </div>
                    <h5 className="font-semibold text-gray-800">{getRoleName(credential.role)} Access</h5>
                  </div>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials(index)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <strong>Email:</strong> {credential.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Password:</strong> {credential.password}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {credential.department} • Level {credential.accessLevel}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Credentials Error */}
          {errors.credentials && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{errors.credentials}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter admin email"
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-gray-500'
                }`}
              />
              {errors.email && (
                <div className="flex items-center space-x-1 mt-1 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter admin password"
                  className={`w-full px-4 py-3 pr-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-gray-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-1 mt-1 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{errors.password}</span>
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserCheck className="h-5 w-5" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Role Information */}
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-900 text-sm">Role Capabilities:</h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-1 rounded">
                  <Crown className="h-3 w-3 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900">Admin:</span>
                  <span className="text-gray-600 ml-1">Full system access, user management, financial reports</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-1 rounded">
                  <Monitor className="h-3 w-3 text-white" />
                </div>
                <div>
                  <span className="font-medium text-gray-900">Monitor:</span>
                  <span className="text-gray-600 ml-1">View-only access, order status updates, basic reports</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Security Notice</h4>
                <p className="text-xs text-gray-600 mt-1">
                  This is a demo admin portal. In production, implement proper authentication, 
                  2FA, and role-based access control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;