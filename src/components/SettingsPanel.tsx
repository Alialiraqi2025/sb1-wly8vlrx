import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Smartphone,
  Lock,
  Key,
  Archive,
  HelpCircle
} from 'lucide-react';
import { User as UserType, ScreenSize } from '../types';

interface SettingsPanelProps {
  currentUser: UserType;
  onUpdateUser: (user: UserType) => void;
  onLogout: () => void;
  screenSize: ScreenSize;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  currentUser,
  onUpdateUser,
  onLogout,
  screenSize
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const updateUserSettings = (key: string, value: any) => {
    const updatedUser = {
      ...currentUser,
      settings: {
        ...currentUser.settings,
        [key]: value
      }
    };
    onUpdateUser(updatedUser);
  };

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: User,
      color: 'text-blue-600',
      items: [
        { label: 'Edit Profile', action: () => setActiveSection('profile') },
        { label: 'Status Message', action: () => {} },
        { label: 'Username', action: () => {} }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: 'text-green-600',
      items: [
        { 
          label: 'Enable Notifications', 
          toggle: true,
          value: currentUser.settings.notifications,
          onChange: (value: boolean) => updateUserSettings('notifications', value)
        },
        { 
          label: 'Sound', 
          toggle: true,
          value: currentUser.settings.soundEnabled,
          onChange: (value: boolean) => updateUserSettings('soundEnabled', value)
        },
        { label: 'Quiet Hours', action: () => {} }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      color: 'text-red-600',
      items: [
        { 
          label: 'Read Receipts', 
          toggle: true,
          value: currentUser.settings.readReceipts,
          onChange: (value: boolean) => updateUserSettings('readReceipts', value)
        },
        { label: 'Last Seen Privacy', action: () => {} },
        { label: 'Profile Photo Privacy', action: () => {} },
        { label: 'Blocked Contacts', action: () => {} },
        { label: 'Two-Step Verification', action: () => {} }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      color: 'text-purple-600',
      items: [
        { 
          label: 'Theme', 
          value: currentUser.settings.theme,
          options: ['light', 'dark', 'auto'],
          onChange: (value: string) => updateUserSettings('theme', value)
        },
        { label: 'Font Size', action: () => {} },
        { label: 'Chat Wallpaper', action: () => {} }
      ]
    },
    {
      id: 'storage',
      title: 'Storage & Data',
      icon: Download,
      color: 'text-orange-600',
      items: [
        { 
          label: 'Auto-download Media', 
          toggle: true,
          value: currentUser.settings.autoDownloadMedia,
          onChange: (value: boolean) => updateUserSettings('autoDownloadMedia', value)
        },
        { label: 'Storage Usage', action: () => {} },
        { label: 'Clear Cache', action: () => {} },
        { label: 'Export Chat History', action: () => {} }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Lock,
      color: 'text-indigo-600',
      items: [
        { label: 'Active Sessions', action: () => {} },
        { label: 'Security Keys', action: () => {} },
        { label: 'Login Alerts', action: () => {} },
        { label: 'App Lock', action: () => {} }
      ]
    }
  ];

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-indigo-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{currentUser.name}</h3>
        <p className="text-gray-600">{currentUser.email}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={currentUser.name}
            onChange={(e) => onUpdateUser({ ...currentUser, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={currentUser.email}
            onChange={(e) => onUpdateUser({ ...currentUser, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={currentUser.status}
            onChange={(e) => onUpdateUser({ ...currentUser, status: e.target.value as any })}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="online">Online</option>
            <option value="away">Away</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          {activeSection && (
            <button
              onClick={() => setActiveSection(null)}
              className="text-indigo-600 font-medium"
            >
              Back
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'profile' ? (
          <div className="p-6">
            <ProfileSection />
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* User Profile Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{currentUser.name}</h3>
                  <p className="text-indigo-100">{currentUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      currentUser.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm text-indigo-100 capitalize">{currentUser.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-4">
              {settingSections.map((section) => (
                <div key={section.id} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg bg-white ${section.color}`}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{item.label}</span>
                        
                        {item.toggle && (
                          <ToggleSwitch
                            enabled={item.value}
                            onChange={item.onChange!}
                          />
                        )}
                        
                        {item.options && (
                          <select
                            value={item.value}
                            onChange={(e) => item.onChange!(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {item.options.map((option) => (
                              <option key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                              </option>
                            ))}
                          </select>
                        )}
                        
                        {item.action && !item.toggle && !item.options && (
                          <button
                            onClick={item.action}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900">Help & Support</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                <div className="flex items-center space-x-3">
                  <Archive className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-900">Archived Chats</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>

              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>

            {/* App Info */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
              <p>SecureChat v1.0.0</p>
              <p>End-to-End Encrypted Messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;