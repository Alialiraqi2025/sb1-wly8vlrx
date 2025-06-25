import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShoppingBasket,
  Check,
  AlertCircle,
  UserPlus,
  LogIn
} from 'lucide-react';

interface AuthProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
  screenSize?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

const Auth: React.FC<AuthProps> = ({ 
  onClose, 
  onLogin,
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // Demo credentials for testing
  const DEMO_CREDENTIALS = {
    email: 'demo@durramarket.com',
    password: 'demo123456'
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+964\s?\d{3}\s?\d{3}\s?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    // Validate email
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    // If basic validation passes, check credentials
    if (!newErrors.email && !newErrors.password) {
      // Trim whitespace and check exact match
      const enteredEmail = loginData.email.trim();
      const enteredPassword = loginData.password.trim();
      
      console.log('Entered email:', enteredEmail);
      console.log('Expected email:', DEMO_CREDENTIALS.email);
      console.log('Entered password:', enteredPassword);
      console.log('Expected password:', DEMO_CREDENTIALS.password);
      console.log('Email match:', enteredEmail === DEMO_CREDENTIALS.email);
      console.log('Password match:', enteredPassword === DEMO_CREDENTIALS.password);
      
      if (enteredEmail !== DEMO_CREDENTIALS.email || enteredPassword !== DEMO_CREDENTIALS.password) {
        newErrors.credentials = 'Invalid email or password. Please use the demo credentials provided below.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: 'Ahmed Al-Rashid',
        email: loginData.email,
        phone: '+964 770 123 4567',
        address: 'Haifa Street, Al-Karkh, Baghdad'
      };
      
      onLogin(userData);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!registerData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!registerData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(registerData.phone)) {
      newErrors.phone = 'Please enter a valid Iraqi phone number (+964 XXX XXX XXXX)';
    }

    if (!registerData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(registerData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!registerData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        address: registerData.address
      };
      
      onLogin(userData);
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const handleLoginInputChange = (field: string, value: string) => {
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

  const handleRegisterInputChange = (field: string, value: string | boolean) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const fillDemoCredentials = () => {
    setLoginData({
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password
    });
    setErrors({});
  };

  // Dynamic modal class
  const getModalClass = () => {
    if (screenSize.isDesktop) {
      return 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    } else {
      return 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    }
  };

  // Dynamic content class
  const getContentClass = () => {
    if (screenSize.isDesktop) {
      return 'bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto';
    } else if (screenSize.isTablet) {
      return 'bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto';
    } else {
      return 'bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto';
    }
  };

  return (
    <div className={getModalClass()}>
      <div className={getContentClass()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-t-3xl p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white touch-target ios-button android-button hover-lift focus-ring"
            aria-label="Close authentication modal"
          >
            ✕
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <ShoppingBasket className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Durra Market 2</h1>
              <p className="text-orange-100">Your Local Food Store</p>
            </div>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-white/20 rounded-2xl p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrors({});
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all touch-target ios-button android-button hover-lift focus-ring ${
                isLogin 
                  ? 'bg-white text-orange-600 shadow-lg' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <LogIn className="h-4 w-4 inline mr-2" />
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrors({});
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all touch-target ios-button android-button hover-lift focus-ring ${
                !isLogin 
                  ? 'bg-white text-orange-600 shadow-lg' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <UserPlus className="h-4 w-4 inline mr-2" />
              Sign Up
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLogin ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Sign in to your account to continue shopping</p>
              </div>

              {/* Demo Credentials Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-800">Demo Account</h4>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium underline touch-target ios-button android-button focus-ring"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-blue-700">
                    <strong>Email:</strong> {DEMO_CREDENTIALS.email}
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Password:</strong> {DEMO_CREDENTIALS.password}
                  </p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  ⚠️ Use these exact credentials to login
                </p>
              </div>

              {/* Credentials Error */}
              {errors.credentials && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{errors.credentials}</span>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => handleLoginInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
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
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.password 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-target ios-button android-button focus-ring"
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

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-orange-600 hover:text-orange-700 text-sm font-medium touch-target ios-button android-button focus-ring"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 touch-target ios-button android-button hover-lift touch-active focus-ring"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join us and start shopping for quality products</p>
              </div>

              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={registerData.fullName}
                    onChange={(e) => handleRegisterInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.fullName 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.fullName && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.fullName}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                    placeholder="+964 XXX XXX XXXX"
                    className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.phone 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.phone && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={registerData.address}
                    onChange={(e) => handleRegisterInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.address 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.address && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.address}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                    placeholder="Create a password (min. 8 characters)"
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.password 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-target ios-button android-button focus-ring"
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-2xl focus:outline-none focus:ring-2 transition-colors ios-input touch-target focus-ring ${
                      errors.confirmPassword 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-orange-500'
                    }`}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-target ios-button android-button focus-ring"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={registerData.agreeToTerms}
                      onChange={(e) => handleRegisterInputChange('agreeToTerms', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center transition-colors touch-target ${
                      registerData.agreeToTerms 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'border-gray-300'
                    }`}>
                      {registerData.agreeToTerms && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <button type="button" className="text-orange-600 hover:text-orange-700 font-medium touch-target ios-button android-button focus-ring">
                      Terms & Conditions
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-orange-600 hover:text-orange-700 font-medium touch-target ios-button android-button focus-ring">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <div className="flex items-center space-x-1 mt-1 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{errors.agreeToTerms}</span>
                  </div>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 touch-target ios-button android-button hover-lift touch-active focus-ring"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-orange-600 hover:text-orange-700 font-medium touch-target ios-button android-button focus-ring"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;