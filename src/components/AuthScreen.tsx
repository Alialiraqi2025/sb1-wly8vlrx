import React, { useState } from 'react';
import { MessageSquare, Eye, EyeOff, User, Mail, Lock, Shield, Zap, Globe, Star, Users, Key } from 'lucide-react';
import { User as UserType } from '../types';
import RecoveryKeySetup from './RecoveryKeySetup';
import DeviceVerification from './DeviceVerification';
import { getDeviceInfo } from '../utils/recoveryKey';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoveryKeySetup, setShowRecoveryKeySetup] = useState(false);
  const [showDeviceVerification, setShowDeviceVerification] = useState(false);
  const [pendingUser, setPendingUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const deviceInfo = getDeviceInfo();
    const user: UserType = {
      id: Date.now().toString(),
      name: isLogin ? formData.email.split('@')[0] : formData.name,
      email: formData.email,
      status: 'online',
      deviceId: deviceInfo.id,
      trustedDevices: []
    };

    if (isLogin) {
      // For existing users - check if they have a recovery key and if device is trusted
      // Simulate checking user data from server
      const userHasRecoveryKey = Math.random() > 0.3; // 70% chance user has recovery key
      const isDeviceTrusted = Math.random() > 0.7; // 30% chance device is trusted
      
      if (userHasRecoveryKey && !isDeviceTrusted) {
        // User has recovery key but device is not trusted - require verification
        const storedRecoveryKey = 'ABCD1234EFGH5678IJKL9012MNOP3456QRST7890UVWX1234YZAB5678CDEF9012';
        setPendingUser({ ...user, recoveryKey: storedRecoveryKey });
        setShowDeviceVerification(true);
      } else if (!userHasRecoveryKey) {
        // User doesn't have recovery key - direct login but will show notice later
        onLogin(user);
      } else {
        // Device is trusted - direct login
        const storedRecoveryKey = 'ABCD1234EFGH5678IJKL9012MNOP3456QRST7890UVWX1234YZAB5678CDEF9012';
        onLogin({ 
          ...user, 
          recoveryKey: storedRecoveryKey,
          trustedDevices: [{
            id: deviceInfo.id,
            name: deviceInfo.name,
            type: deviceInfo.type,
            lastUsed: new Date(),
            isCurrentDevice: true,
            verified: true
          }]
        });
      }
    } else {
      // New user - setup recovery key after account creation
      setPendingUser(user);
      setShowRecoveryKeySetup(true);
    }

    setIsLoading(false);
  };

  const handleRecoveryKeySetupComplete = (recoveryKey: string) => {
    if (pendingUser) {
      const userWithRecoveryKey = {
        ...pendingUser,
        recoveryKey,
        trustedDevices: [{
          id: pendingUser.deviceId || 'unknown',
          name: getDeviceInfo().name,
          type: getDeviceInfo().type,
          lastUsed: new Date(),
          isCurrentDevice: true,
          verified: true
        }]
      };
      onLogin(userWithRecoveryKey);
    }
    setShowRecoveryKeySetup(false);
    setPendingUser(null);
  };

  const handleDeviceVerified = (deviceId: string) => {
    if (pendingUser) {
      const userWithTrustedDevice = {
        ...pendingUser,
        trustedDevices: [{
          id: deviceId,
          name: getDeviceInfo().name,
          type: getDeviceInfo().type,
          lastUsed: new Date(),
          isCurrentDevice: true,
          verified: true
        }]
      };
      onLogin(userWithTrustedDevice);
    }
    setShowDeviceVerification(false);
    setPendingUser(null);
  };

  const handleBackToAuth = () => {
    setShowRecoveryKeySetup(false);
    setShowDeviceVerification(false);
    setPendingUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Show recovery key setup screen
  if (showRecoveryKeySetup && pendingUser) {
    return (
      <RecoveryKeySetup
        onComplete={handleRecoveryKeySetupComplete}
        onBack={handleBackToAuth}
        isFirstTime={true}
      />
    );
  }

  // Show device verification screen
  if (showDeviceVerification && pendingUser) {
    return (
      <DeviceVerification
        onVerified={handleDeviceVerified}
        onBack={handleBackToAuth}
        userEmail={pendingUser.email}
        storedRecoveryKey={pendingUser.recoveryKey}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex auth-scrollbar overflow-y-auto">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-800 p-12 flex-col justify-center overflow-y-auto">
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center p-2">
              <img 
                src="/new TI logo.png" 
                alt="TELE IRAQ" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-white">TELE IRAQ</h1>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Secure Communication for Iraq
          </h2>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Connect with confidence. Built for Iraq, secured for everyone. Experience messaging without compromise.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">End-to-end encrypted</h3>
                <p className="text-white/80">Your messages are secured with military-grade encryption that only you and the recipient can access.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Recovery Key Protection</h3>
                <p className="text-white/80">Secure device verification system protects your account from unauthorized access.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Made for Iraq</h3>
                <p className="text-white/80">Designed with Iraqi users in mind, supporting local needs and cultural preferences.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Fast & reliable</h3>
                <p className="text-white/80">Lightning-fast messaging, crystal-clear voice calls, and seamless file sharing.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90">Trusted by thousands</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white/90">Growing community</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/new TI logo.png" 
                alt="TELE IRAQ" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TELE IRAQ</h1>
          </div>

          <div className="element-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Sign in' : 'Create account'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Welcome back to TELE IRAQ' : 'Join the secure messaging network'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your display name"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required={!isLogin}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="element-spinner"></div>
                ) : (
                  <>
                    {isLogin ? <MessageSquare className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-600 hover:text-red-700 font-medium ml-1"
                >
                  {isLogin ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-900">End-to-end encrypted</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Your messages are secured with encryption and recovery key protection that ensures only you and the recipient can read them.
                  </p>
                </div>
              </div>
            </div>

            {/* Recovery Key Info for New Users */}
            {!isLogin && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Recovery Key Setup</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      After creating your account, you'll set up a recovery key to secure your device access and protect your encrypted messages.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Login Info */}
            {isLogin && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">Secure Login</h4>
                    <p className="text-sm text-green-700 mt-1">
                      If you don't have a recovery key yet, you'll be prompted to set one up after logging in for enhanced security.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;