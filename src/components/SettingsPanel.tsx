import React from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, Star, Award, Check } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  return (
    <div className="flex-content">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="element-title">Settings</h2>
      </div>

      {/* Content */}
      <div className="settings-container scrollable p-4">
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="element-card p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="element-avatar-large">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="element-text font-semibold text-lg username">{user.name}</h3>
                <p className="element-text-small text-gray-500">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="element-text-small text-green-600">Online</span>
                </div>
              </div>
            </div>
            
            <button className="element-button-secondary w-full">
              Edit profile
            </button>
          </div>

          {/* Settings Categories */}
          <div className="space-y-2">
            <SettingItem
              icon={<Bell className="w-5 h-5" />}
              title="Notifications"
              description="Manage your notification preferences"
            />
            
            <SettingItem
              icon={<Shield className="w-5 h-5" />}
              title="Security & Privacy"
              description="Control your security settings"
            />
            
            <SettingItem
              icon={<Palette className="w-5 h-5" />}
              title="Appearance"
              description="Customize the app's appearance"
            />
            
            <SettingItem
              icon={<Globe className="w-5 h-5" />}
              title="Language & Region"
              description="Change language and region settings"
            />
            
            <SettingItem
              icon={<HelpCircle className="w-5 h-5" />}
              title="Help & Support"
              description="Get help and contact support"
            />
          </div>

          {/* Security Status */}
          <div className="element-card p-6">
            <h4 className="element-text font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              Security Status
            </h4>
            <div className="space-y-3">
              <SecurityStatusItem
                title="End-to-end encryption"
                status="Active"
                isActive={true}
              />
              <SecurityStatusItem
                title="Cross-signing"
                status="Verified"
                isActive={true}
              />
              <SecurityStatusItem
                title="Secure backup"
                status="Enabled"
                isActive={true}
              />
            </div>
          </div>

          {/* About */}
          <div className="element-card p-6">
            <h4 className="element-text font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              About TELE IRAQ
            </h4>
            <div className="space-y-2 element-text-small text-gray-600">
              <p>Version 1.11.50</p>
              <p>Built on Matrix protocol</p>
              <p>© 2024 TELE IRAQ. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="element-text-small text-gray-600">4.2/5 rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="element-text-small text-gray-600">Open source</span>
              </div>
            </div>
          </div>

          {/* Additional Settings for Demo */}
          <div className="element-card p-6">
            <h4 className="element-text font-semibold mb-4">Advanced</h4>
            <div className="space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
                <SettingItem
                  key={i}
                  icon={<Star className="w-5 h-5" />}
                  title={`Advanced Setting ${i + 1}`}
                  description={`Configure advanced option ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* End marker */}
          <div className="text-center py-4">
            <p className="element-text-small text-gray-400">End of settings</p>
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
    <button className="w-full element-card p-4 text-left element-hover group">
      <div className="flex items-center space-x-3">
        <div className="text-gray-600 group-hover:text-green-600 transition-colors flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
};

interface SecurityStatusItemProps {
  title: string;
  status: string;
  isActive: boolean;
}

const SecurityStatusItem: React.FC<SecurityStatusItemProps> = ({ title, status, isActive }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="element-text">{title}</span>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span className={`element-text-small font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
          {status}
        </span>
        {isActive && <Check className="w-4 h-4 text-green-600" />}
      </div>
    </div>
  );
};

export default SettingsPanel;