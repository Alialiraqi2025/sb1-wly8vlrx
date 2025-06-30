import React, { useState } from 'react';
import { Shield, Eye, EyeOff, MessageCircle, UserPlus, Lock, Zap, Globe } from 'lucide-react';
import { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    const user: User = {
      id: Date.now().toString(),
      name: isLogin ? formData.email.split('@')[0] : formData.name,
      email: formData.email,
      status: 'online'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left animate-slide-in-left">
          <div className="glass rounded-3xl p-8 mb-8 inline-block">
            <Shield className="w-20 h-20 text-blue-400 mx-auto lg:mx-0" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Secure<span className="text-blue-400">Chat</span>
          </h1>
          
          <p className="text-xl text-blue-200 mb-8 leading-relaxed">
            The most secure messaging platform with military-grade end-to-end encryption
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-2xl p-4 text-center hover-lift">
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">End-to-End</h3>
              <p className="text-sm text-gray-300">Military-grade encryption</p>
            </div>
            
            <div className="glass rounded-2xl p-4 text-center hover-lift">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
              <p className="text-sm text-gray-300">Real-time messaging</p>
            </div>
            
            <div className="glass rounded-2xl p-4 text-center hover-lift">
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Global</h3>
              <p className="text-sm text-gray-300">Connect worldwide</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h4 className="font-semibold text-green-400 mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Features
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                End-to-end encryption for all messages
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Secure voice and video calls
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                No message storage on servers
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Perfect forward secrecy
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="animate-slide-in-right">
          <div className="glass rounded-3xl overflow-hidden max-w-md mx-auto">
            {/* Form Header */}
            <div className="gradient-primary p-8 text-white text-center">
              <div className="glass rounded-2xl p-4 inline-block mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-blue-100">
                {isLogin ? 'Sign in to continue messaging securely' : 'Join the secure messaging platform'}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="animate-slide-up">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 pl-12 glass rounded-2xl text-white placeholder-gray-400 focus-ring"
                        required={!isLogin}
                      />
                      <UserPlus className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 pl-12 glass rounded-2xl text-white placeholder-gray-400 focus-ring"
                      required
                    />
                    <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pl-12 pr-12 glass rounded-2xl text-white placeholder-gray-400 focus-ring"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {isLogin ? <MessageCircle className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 font-medium ml-2 transition-colors"
                  >
                    {isLogin ? 'Sign up here' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;