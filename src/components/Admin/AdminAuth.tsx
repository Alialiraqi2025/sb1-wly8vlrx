import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck,
  UserCheck,
  Key
} from 'lucide-react';

interface AdminAuthProps {
  onLogin: (adminData: any) => void;
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
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Demo admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@durramarket.com',
    password: 'admin123456'
  };

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
      
      if (enteredEmail !== ADMIN_CREDENTIALS.email || enteredPassword !== ADMIN_CREDENTIALS.password) {
        newErrors.credentials = 'Invalid admin credentials. Please use the demo credentials provided below.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const adminData = {
        id: 'admin-001',
        name: 'Admin User',
        email: loginData.email,
        role: 'super_admin',
        permissions: ['all'],
        lastLogin: new Date().toISOString()
      };
      
      onLogin(adminData);
      setIsLoading(false);
    }, 1500);
  };

  const fillDemoCredentials = () => {
    setLoginData({
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white text-center">
          <div className="bg-white/20 p-4 rounded-2xl inline-block mb-4">
            <Shield className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
          <p className="text-gray-300">Durra Market 2 Management</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-blue-800 flex items-center space-x-2">
                <Key className="h-4 w-4" />
                <span>Demo Admin Access</span>
              </h4>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
              >
                Auto-fill
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-blue-700">
                <strong>Email:</strong> {ADMIN_CREDENTIALS.email}
              </p>
              <p className="text-sm text-blue-700">
                <strong>Password:</strong> {ADMIN_CREDENTIALS.password}
              </p>
            </div>
            <p className="text-xs text-blue-600 mt-2 flex items-center space-x-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Use these credentials to access the admin dashboard</span>
            </p>
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
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

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