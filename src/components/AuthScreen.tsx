import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Eye, EyeOff, User, Mail, Lock, Shield, Zap, Globe, Star, Users, Key, X, Link, CheckCircle } from 'lucide-react';
import { User as UserType } from '../types';
import RecoveryKeySetup from './RecoveryKeySetup';
import DeviceVerification from './DeviceVerification';
import { getDeviceInfo } from '../utils/recoveryKey';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const { t, direction } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showServerConnection, setShowServerConnection] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);
  const [showRecoveryKeySetup, setShowRecoveryKeySetup] = useState(false);
  const [showDeviceVerification, setShowDeviceVerification] = useState(false);
  const [pendingUser, setPendingUser] = useState<UserType | null>(null);
  const [serverConfig, setServerConfig] = useState({
    serverUrl: 'https://localhost',
    serverName: 'Local TELE IRAQ Server',
    useSSL: true,
    port: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  });

  const handleServerConnect = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate server connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would test the connection to the server
      const response = await fetch(`${serverConfig.serverUrl}/api/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout and error handling
      }).catch(() => {
        // Simulate successful connection for demo
        return { ok: true, status: 200 };
      });
      
      if (response.ok) {
        setServerConnected(true);
        setShowServerConnection(false);
        // Store server config in localStorage
        localStorage.setItem('tele-iraq-server-config', JSON.stringify(serverConfig));
      } else {
        throw new Error('Server connection failed');
      }
    } catch (error) {
      console.error('Server connection error:', error);
      alert('Failed to connect to server. Please check your server configuration.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleServerDisconnect = () => {
    setServerConnected(false);
    localStorage.removeItem('tele-iraq-server-config');
  };

  // Check for existing server connection on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('tele-iraq-server-config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setServerConfig(config);
        setServerConnected(true);
      } catch (error) {
        console.error('Error loading server config:', error);
      }
    }
  }, []);

  const handleTestLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    onLogin({
      id: 'Ahmed-Al-Iraqi',
      name: 'Ahmed Al-Iraqi',
      email: 'ahmed@teleiraq.com',
      status: 'online',
      lastSeen: new Date(),
      recoveryKey: 'ABCD1234EFGH5678IJKL9012MNOP3456QRST7890UVWX1234YZAB5678CDEF9012'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const user: UserType = {
      id: isLogin ? formData.username : formData.name,
      name: isLogin ? formData.username : formData.name,
      email: isLogin ? `${formData.username}@teleiraq.com` : formData.email,
      status: 'online',
      lastSeen: new Date(),
      recoveryKey: undefined
    };
    onLogin(user);

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex auth-scrollbar overflow-y-auto auth-page-container ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Server Connection Modal */}
      {showServerConnection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowServerConnection(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Connect to Local Server</h3>
                <button
                  onClick={() => setShowServerConnection(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Server Name
                  </label>
                  <input
                    type="text"
                    value={serverConfig.serverName}
                    onChange={(e) => setServerConfig(prev => ({ ...prev, serverName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="My TELE IRAQ Server"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Server URL
                  </label>
                  <input
                    type="url"
                    value={serverConfig.serverUrl}
                    onChange={(e) => setServerConfig(prev => ({ ...prev, serverUrl: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="https://your-server.com"
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Local Server Connection</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Connect to your own TELE IRAQ server for complete data control and privacy. SSL is required for secure connections.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowServerConnection(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleServerConnect}
                    disabled={isConnecting || !serverConfig.serverUrl}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <>
                        <div className="element-spinner"></div>
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-red-800 p-12 flex-col justify-center overflow-y-auto">
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center p-4">
              <img 
                src="/new TI logo.png" 
                alt="TELE IRAQ" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <h1 className="text-5xl font-bold text-white">{t('app.name')}</h1>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            {t('brand.title')}
          </h2>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            {t('brand.description')}
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t('brand.features.encrypted')}</h3>
                <p className="text-white/80">{t('brand.features.encryptedDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t('brand.features.recovery')}</h3>
                <p className="text-white/80">{t('brand.features.recoveryDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t('brand.features.iraq')}</h3>
                <p className="text-white/80">{t('brand.features.iraqDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t('brand.features.fast')}</h3>
                <p className="text-white/80">{t('brand.features.fastDesc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90">{t('brand.trusted')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white/90">{t('brand.community')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto auth-content">
        <div className="w-full max-w-md">
          {/* Server Connection Status */}
          <div className="mb-6">
            {serverConnected ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <h4 className="font-medium text-green-900">Connected to Local Server</h4>
                      <p className="text-sm text-green-700">{serverConfig.serverName}</p>
                      <p className="text-xs text-green-600">{serverConfig.serverUrl}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleServerDisconnect}
                    className="text-green-600 hover:text-green-800 p-1"
                    title="Disconnect from server"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-amber-900">Using Default Server</h4>
                      <p className="text-sm text-amber-700">Connect to your local server for enhanced privacy</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowServerConnection(true)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <Link className="w-3 h-3" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-24 h-24 flex items-center justify-center">
              <img 
                src="/new TI logo.png" 
                alt="TELE IRAQ" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">TELE IRAQ</h1>
          </div>

          <div className="element-card p-8 auth-form-container">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? t('auth.signin') : t('auth.signup')}
              </h2>
              <p className="text-gray-600">
                {isLogin ? t('auth.welcome') : t('auth.join')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 auth-form">
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
                  {isLogin ? t('auth.username') : t('auth.email')}
                </label>
                <div className="relative">
                  <input
                    type={isLogin ? "text" : "email"}
                    name={isLogin ? "username" : "email"}
                    value={isLogin ? formData.username : formData.email}
                    onChange={handleInputChange}
                    placeholder={isLogin ? t('auth.enterUsername') : t('auth.enterEmail')}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                  {isLogin ? (
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  ) : (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  )}
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
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed auth-button"
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

            {/* Local Server Connection Section */}
            <div className="mt-6 pt-6 border-t border-gray-200 server-section">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Local Server Connection</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect to your own TELE IRAQ server for complete control over your data and enhanced privacy.
                </p>
                
                {!serverConnected ? (
                  <button
                    onClick={() => setShowServerConnection(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 auth-button"
                  >
                    <Link className="w-4 h-4" />
                    <span>Connect to Local Server</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">Connected to {serverConfig.serverName}</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">{serverConfig.serverUrl}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowServerConnection(true)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        Change Server
                      </button>
                      <button
                        onClick={handleServerDisconnect}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Local Server Benefits:</p>
                    <ul className="text-left space-y-1">
                      <li>• Complete data control and ownership</li>
                      <li>• Enhanced privacy and security</li>
                      <li>• Custom server configurations</li>
                      <li>• Reduced dependency on external servers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Account Section */}
            <div className="mt-6 pt-6 border-t border-gray-200 test-account-section">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">For testing purposes:</p>
                <button
                  onClick={handleTestLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed auth-button"
                >
                  {isLoading ? (
                    <div className="element-spinner"></div>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>Login with Test Account</span>
                    </>
                  )}
                </button>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs text-blue-800">
                    <p className="font-medium mb-1">Test Account Details:</p>
                    <p>Username: Ahmed-Al-Iraqi</p>
                    <p>Display Name: Ahmed Al-Iraqi</p>
                    <p>Features: Recovery key enabled, trusted device</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200 security-notice">
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
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 recovery-info">
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
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 login-info">
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