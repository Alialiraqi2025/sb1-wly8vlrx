import React from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, Star, Award } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  return (
    <div className="flex-content">
      {/* Header */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-white/20 flex-shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Settings</h2>
      </div>

      {/* Content - Now properly scrollable */}
      <div className="settings-container scrollable mobile-scroll p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Profile Section */}
          <div className="card-glass">
            <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white truncate">{user.name}</h3>
                <p className="text-white/70 text-base sm:text-lg truncate">{user.email}</p>
                <div className="flex items-center space-x-2 sm:space-x-3 mt-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 status-online"></div>
                  <span className="text-sm sm:text-lg text-green-300 font-medium">Online</span>
                </div>
              </div>
            </div>
            
            <button className="w-full btn-secondary text-base sm:text-lg py-3 sm:py-4">
              Edit Profile
            </button>
          </div>

          {/* Settings Options */}
          <div className="space-y-3 sm:space-y-4">
            <SettingItem
              icon={<Bell className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Notifications"
              description="Manage your notification preferences"
            />
            
            <SettingItem
              icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Privacy & Security"
              description="Control your privacy settings"
            />
            
            <SettingItem
              icon={<Palette className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Appearance"
              description="Customize the app's look and feel"
            />
            
            <SettingItem
              icon={<Globe className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Language"
              description="Change your language preferences"
            />
            
            <SettingItem
              icon={<HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Help & Support"
              description="Get help and contact support"
            />
          </div>

          {/* Security Info */}
          <div className="card-glass">
            <h4 className="text-lg sm:text-xl font-bold text-green-400 mb-4 sm:mb-6 flex items-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              Security Status
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white text-base sm:text-lg">End-to-End Encryption</span>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-semibold text-sm sm:text-base">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-base sm:text-lg">Two-Factor Authentication</span>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-semibold text-sm sm:text-base">Enabled</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-base sm:text-lg">Secure Backup</span>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-semibold text-sm sm:text-base">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="card-glass">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              About SecureChat
            </h4>
            <div className="space-y-2 sm:space-y-3 text-white/80 text-base sm:text-lg">
              <p>Version 2.1.0</p>
              <p>Built with military-grade encryption</p>
              <p>© 2025 SecureChat. All rights reserved.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-6">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className="text-white/80 text-sm sm:text-base">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-white/80 text-sm sm:text-base">SOC 2 Certified</span>
              </div>
            </div>
          </div>

          {/* Additional content to demonstrate scrolling */}
          <div className="card-glass">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Additional Settings</h4>
            <div className="space-y-3 sm:space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <SettingItem
                  key={i}
                  icon={<Star className="w-5 h-5 sm:w-6 sm:h-6" />}
                  title={`Setting Option ${i + 1}`}
                  description={`This is an additional setting option to demonstrate scrolling functionality.`}
                />
              ))}
            </div>
          </div>

          {/* End marker */}
          <div className="text-center py-4">
            <p className="text-white/50 text-sm">End of settings</p>
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
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="text-blue-400 group-hover:text-blue-300 transition-colors flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-base sm:text-lg font-semibold text-white">{title}</h4>
          <p className="text-white/70 text-sm sm:text-base">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default SettingsPanel;