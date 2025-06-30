import React from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Settings</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Profile Section */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{user.name}</h3>
              <p className="text-blue-200">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-400 status-online"></div>
                <span className="text-sm text-green-400">Online</span>
              </div>
            </div>
          </div>
          
          <button className="w-full glass rounded-xl p-3 text-white hover:bg-white/10 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-3">
          <SettingItem
            icon={<Bell className="w-5 h-5" />}
            title="Notifications"
            description="Manage your notification preferences"
          />
          
          <SettingItem
            icon={<Shield className="w-5 h-5" />}
            title="Privacy & Security"
            description="Control your privacy settings"
          />
          
          <SettingItem
            icon={<Palette className="w-5 h-5" />}
            title="Appearance"
            description="Customize the app's look and feel"
          />
          
          <SettingItem
            icon={<Globe className="w-5 h-5" />}
            title="Language"
            description="Change your language preferences"
          />
          
          <SettingItem
            icon={<HelpCircle className="w-5 h-5" />}
            title="Help & Support"
            description="Get help and contact support"
          />
        </div>

        {/* Security Info */}
        <div className="glass rounded-2xl p-6">
          <h4 className="font-semibold text-green-400 mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Status
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">End-to-End Encryption</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Two-Factor Authentication</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Enabled</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Secure Backup</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="glass rounded-2xl p-6">
          <h4 className="font-semibold text-white mb-3">About SecureChat</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p>Version 2.1.0</p>
            <p>Built with military-grade encryption</p>
            <p>© 2025 SecureChat. All rights reserved.</p>
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
    <button className="w-full glass rounded-xl p-4 text-left hover:bg-white/10 transition-colors group">
      <div className="flex items-center space-x-3">
        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default SettingsPanel;