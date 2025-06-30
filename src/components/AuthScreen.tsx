import React, { useState } from 'react';
import { Shield, Eye, EyeOff, MessageCircle, UserPlus, Lock, Zap, Globe, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left animate-slide-in-left">
          <div className="glass-strong rounded-3xl p-12 mb-8 inline-block animate-glow">
            <Shield className="w-24 h-24 text-white mx-auto lg:mx-0" />
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Secure<span className="text-yellow-300">Chat</span>
          </h1>
          
          <p className="text-2xl text-white/90 mb-12 leading-relaxed font-medium">
            The most secure messaging platform with military-grade end-to-end encryption
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="card-glass text-center hover-lift">
              <Lock className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">End-to-End</h3>
              <p className="text-white/70">Military-grade encryption</p>
            </div>
            
            <div className="card-glass text-center hover-lift">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70">Real-time messaging</p>
            </div>
            
            <div className="card-glass text-center hover-lift">
              <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Global</h3>
              <p className="text-white/70">Connect worldwide</p>
            </div>
          </div>

          {/* Security Features */}
          <div className="card-glass">
            <h4 className="text-xl font-bold text-green-400 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              Security Features
            </h4>
            <ul className="text-white/80 space-y-4 text-lg">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                End-to-end encryption for all messages
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                Secure voice and video calls
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                No message storage on servers
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                Perfect forward secrecy
              </li>
            </ul>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-white/80 font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-white/80 font-medium">SOC 2 Certified</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="animate-slide-in-right">
          <div className="glass-strong rounded-3xl overflow-hidden max-w-lg mx-auto shadow-2xl">
            {/* Form Header */}
            <div className="gradient-primary p-10 text-white text-center">
              <div className="glass rounded-2xl p-6 inline-block mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-white/80 text-lg">
                {isLogin ? 'Sign in to continue messaging securely' : 'Join the secure messaging platform'}
              </p>
            </div>

            {/* Form */}
            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {!isLogin && (
                  <div className="animate-slide-up">
                    <label className="block text-lg font-semibold text-white mb-3">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full input-glass pl-14 text-lg focus-ring"
                        required={!isLogin}
                      />
                      <UserPlus className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full input-glass pl-14 text-lg focus-ring"
                      required
                    />
                    <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full input-glass pl-14 pr-14 text-lg focus-ring"
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary text-xl py-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      {isLogin ? <MessageCircle className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-lg text-white/70">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-yellow-300 hover:text-yellow-200 font-semibold ml-2 transition-colors text-lg"
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