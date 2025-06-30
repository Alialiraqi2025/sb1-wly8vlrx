import React from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, Star, Award } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-8 border-b border-white/20">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Profile Section */}
        <div className="card-glass">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{user.name}</h3>
              <p className="text-white/70 text-lg">{user.email}</p>
              <div className="flex items-center space-x-3 mt-2">
                <div className="w-3 h-3 rounded-full bg-green-400 status-online"></div>
                <span className="text-lg text-green-300 font-medium">Online</span>
              </div>
            </div>
          </div>
          
          <button className="w-full btn-secondary text-lg py-4">
            Edit Profile
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          <SettingItem
            icon={<Bell className="w-6 h-6" />}
            title="Notifications"
            description="Manage your notification preferences"
          />
          
          <SettingItem
            icon={<Shield className="w-6 h-6" />}
            title="Privacy & Security"
            description="Control your privacy settings"
          />
          
          <SettingItem
            icon={<Palette className="w-6 h-6" />}
            title="Appearance"
            description="Customize the app's look and feel"
          />
          
          <SettingItem
            icon={<Globe className="w-6 h-6" />}
            title="Language"
            description="Change your language preferences"
          />
          
          <SettingItem
            icon={<HelpCircle className="w-6 h-6" />}
            title="Help & Support"
            description="Get help and contact support"
          />
        </div>

        {/* Security Info */}
        <div className="card-glass">
          <h4 className="text-xl font-bold text-green-400 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3" />
            Security Status
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-lg">End-to-End Encryption</span>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-lg">Two-Factor Authentication</span>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-semibold">Enabled</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-lg">Secure Backup</span>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="card-glass">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
            <Award className="w-6 h-6 mr-3" />
            About SecureChat
          </h4>
          <div className="space-y-3 text-white/80 text-lg">
            <p>Version 2.1.0</p>
            <p>Built with military-grade encryption</p>
            <p>© 2025 SecureChat. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white/80">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-white/80">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, description }) => {
  return (
    <button className="w-full card-glass text-left hover:bg-white/20 transition-all duration-300 group hover-lift">
      <div className="flex items-center space-x-4">
        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          <p className="text-white/70">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default SettingsPanel;