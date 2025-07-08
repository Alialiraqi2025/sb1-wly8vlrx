import React, { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  Lock, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  Smartphone, 
  Key, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Upload, 
  Trash2, 
  Edit3, 
  Save, 
  AlertTriangle,
  CheckCircle,
  Settings,
  LogOut,
  Download,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Clock,
  MapPin,
  Volume2,
  Vibrate,
  MessageSquare,
  Phone,
  Users,
  AtSign,
  Palette,
  Languages,
  HelpCircle,
  Info,
  FileText,
  Mail
} from 'lucide-react';
import { User as UserType } from '../types';
import RecoveryKeySetup from './RecoveryKeySetup';

interface SettingsPanelProps {
  user: UserType;
  onSignOut?: () => void;
}

type SettingsSection = 
  | 'main' 
  | 'profile' 
  | 'account' 
  | 'security' 
  | 'privacy' 
  | 'notifications' 
  | 'appearance' 
  | 'devices' 
  | 'language' 
  | 'help' 
  | 'about';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user, onSignOut }) => {
  const [currentSection, setCurrentSection] = useState<SettingsSection>('main');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showRecoveryKeySetup, setShowRecoveryKeySetup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Theme state management
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'system'>('light');

  // Add missing state for appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'light' as 'light' | 'dark' | 'system'
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignOut = () => {
    // Clear any local state/data
    setCurrentSection('main');
    setIsEditingProfile(false);
    setShowPasswordChange(false);
    setShowRecoveryKeySetup(false);
    setSuccessMessage('');
    
    // Call the parent logout handler if provided
    if (onSignOut) {
      onSignOut();
    } else {
      // Fallback: reload the page to clear all state
      window.location.reload();
    }
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setActiveTheme(theme);
    setAppearance(prev => ({ ...prev, theme }));
    
    // Apply theme immediately
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme - check user's preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Show success message
    setSuccessMessage(`Theme changed to ${theme}`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change logic
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleProfileSave = () => {
    // Handle profile save logic
    setIsEditingProfile(false);
  };

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic
      console.log('File selected:', file);
    }
  };

  const renderHeader = (title: string, description: string) => (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const renderSuccessError = () => (
    <>
      {successMessage && (
        <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        </div>
      )}
    </>
  );

  const renderMainSettings = () => (
    <div className="space-y-1">
      <button
        onClick={() => setCurrentSection('profile')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Profile</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('account')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Account</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('security')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Security & Privacy</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('notifications')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Notifications</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('appearance')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Palette className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Appearance</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('devices')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Smartphone className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Devices</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('language')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Languages className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Language & Region</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button
          onClick={() => setCurrentSection('help')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentSection('about')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">About</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 p-4 hover:bg-red-50 transition-colors text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            onClick={handleAvatarChange}
            className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            disabled={!isEditingProfile}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={profileData.location}
            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            value={profileData.website}
            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="flex space-x-3">
        {isEditingProfile ? (
          <>
            <button
              onClick={handleProfileSave}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Security Recommendation</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Enable two-factor authentication and set up recovery keys for enhanced security.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordChange(true)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Change
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Recovery Keys</h4>
              <p className="text-sm text-gray-500">Backup codes for account recovery</p>
            </div>
          </div>
          <button
            onClick={() => setShowRecoveryKeySetup(true)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Setup
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
          </div>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            Enable
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-gray-600" />
            <div>
              <h4 className="font-medium text-gray-900">Active Sessions</h4>
              <p className="text-sm text-gray-500">Manage your active login sessions</p>
            </div>
          </div>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            View
          </button>
        </div>
      </div>

      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handlePasswordChange}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecoveryKeySetup && (
        <RecoveryKeySetup
          onClose={() => setShowRecoveryKeySetup(false)}
          onComplete={() => setShowRecoveryKeySetup(false)}
        />
      )}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Message Notifications</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">New Messages</h4>
                <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Group Messages</h4>
                <p className="text-sm text-gray-500">Notifications for group conversations</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AtSign className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Mentions</h4>
                <p className="text-sm text-gray-500">When someone mentions you in a conversation</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Sound & Vibration</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Sound</h4>
                <p className="text-sm text-gray-500">Play sound for notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Vibrate className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Vibration</h4>
                <p className="text-sm text-gray-500">Vibrate device for notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Do Not Disturb</h3>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Quiet Hours</h4>
                <p className="text-sm text-gray-500">Mute notifications during specific hours</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="time"
                defaultValue="22:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="time"
                defaultValue="08:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      {/* Success message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Theme</h3>
        <p className="text-sm text-gray-600">Choose your preferred theme appearance</p>
        
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleThemeChange('light')}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              activeTheme === 'light' 
                ? 'border-red-500 bg-red-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="w-full h-16 bg-white rounded mb-3 border shadow-sm flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-sm font-medium text-gray-900">Light</p>
              {activeTheme === 'light' && (
                <CheckCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
            {activeTheme === 'light' && (
              <p className="text-xs text-red-600 mt-1">Active</p>
            )}
          </button>
          
          <button 
            onClick={() => handleThemeChange('dark')}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              activeTheme === 'dark' 
                ? 'border-red-500 bg-red-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="w-full h-16 bg-gray-800 rounded mb-3 shadow-sm flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-sm font-medium text-gray-900">Dark</p>
              {activeTheme === 'dark' && (
                <CheckCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
            {activeTheme === 'dark' && (
              <p className="text-xs text-red-600 mt-1">Active</p>
            )}
          </button>
          
          <button 
            onClick={() => handleThemeChange('system')}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              activeTheme === 'system' 
                ? 'border-red-500 bg-red-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="w-full h-16 bg-gradient-to-r from-white to-gray-800 rounded mb-3 shadow-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full mr-1"></div>
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-sm font-medium text-gray-900">System</p>
              {activeTheme === 'system' && (
                <CheckCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
            {activeTheme === 'system' && (
              <p className="text-xs text-red-600 mt-1">Active</p>
            )}
          </button>
        </div>
        
        {/* Theme description */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Palette className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Current Theme: {activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)}</h4>
              <p className="text-sm text-blue-700">
                {activeTheme === 'light' && 'Light theme provides a clean, bright interface that\'s easy on the eyes during daytime use.'}
                {activeTheme === 'dark' && 'Dark theme reduces eye strain in low-light conditions and saves battery on OLED displays.'}
                {activeTheme === 'system' && 'System theme automatically switches between light and dark based on your device\'s settings.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Chat Appearance</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Message Text Size</h4>
              <p className="text-sm text-gray-500">Adjust the size of message text</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Small</option>
              <option selected>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Chat Wallpaper</h4>
              <p className="text-sm text-gray-500">Customize your chat background</p>
            </div>
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Bubble Style</h4>
              <p className="text-sm text-gray-500">Choose message bubble appearance</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option selected>Rounded</option>
              <option>Square</option>
              <option>Minimal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Display</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Show Timestamps</h4>
                <p className="text-sm text-gray-500">Display message timestamps</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Show Online Status</h4>
                <p className="text-sm text-gray-500">Display when contacts are online</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeviceSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">This Device</h4>
            <p className="text-sm text-blue-700 mt-1">
              MacBook Pro • Last active now
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Linked Devices</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">iPhone 14 Pro</h4>
                <p className="text-sm text-gray-500">Last active 2 hours ago</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600 font-medium">
              Remove
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Tablet className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">iPad Air</h4>
                <p className="text-sm text-gray-500">Last active yesterday</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600 font-medium">
              Remove
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Windows Desktop</h4>
                <p className="text-sm text-gray-500">Last active 3 days ago</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600 font-medium">
              Remove
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
          <Smartphone className="w-4 h-4" />
          <span>Link New Device</span>
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Device Settings</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Auto-sync Messages</h4>
              <p className="text-sm text-gray-500">Sync messages across all devices</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">End-to-End Encryption</h4>
              <p className="text-sm text-gray-500">Secure messages across devices</p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Language</h3>
        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-xs text-white font-medium">EN</span>
              </div>
              <span className="font-medium text-gray-900">English (US)</span>
            </div>
            <Check className="w-4 h-4 text-blue-500" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-xs text-white font-medium">ES</span>
              </div>
              <span className="text-gray-900">Español</span>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xs text-white font-medium">FR</span>
              </div>
              <span className="text-gray-900">Français</span>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <span className="text-xs text-white font-medium">DE</span>
              </div>
              <span className="text-gray-900">Deutsch</span>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-xs text-white font-medium">PT</span>
              </div>
              <span className="text-gray-900">Português</span>
            </div>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Region & Format</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Region</h4>
                <p className="text-sm text-gray-500">United States</p>
              </div>
            </div>
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Time Format</h4>
                <p className="text-sm text-gray-500">12-hour (AM/PM)</p>
              </div>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option selected>12-hour</option>
              <option>24-hour</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Date Format</h4>
                <p className="text-sm text-gray-500">MM/DD/YYYY</p>
              </div>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option selected>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpSettings = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">FAQ</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Contact Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">User Guide</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Download Data</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">Reset Settings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
        <p className="text-sm text-gray-600 mb-3">
          Our support team is available 24/7 to help you with any questions or issues.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
          Get Support
        </button>
      </div>
    </div>
  );

  const renderAboutSettings = () => (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">ChatApp</h3>
        <p className="text-gray-500">Version 2.1.0</p>
      </div>

      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-900">Terms of Service</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-900">Privacy Policy</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-900">Open Source Licenses</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-900">Check for Updates</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Made with ❤️ by the ChatApp Team
        </p>
        <p className="text-xs text-gray-500">
          © 2024 ChatApp. All rights reserved.
        </p>
      </div>
    </div>
  );

  const renderPlaceholderSection = (title: string, icon: React.ElementType, description: string) => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader(title, description)}
      
      <div className="flex-1 flex items-center justify-center overflow-y-auto settings-scrollbar">
        <div className="text-center p-6">
          <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {React.createElement(icon, { className: "w-12 h-12 text-gray-400" })}
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-lg text-gray-600 mb-8">Coming soon...</p>
          
          {/* Demo content for scrolling */}
          <div className="space-y-4 max-w-md">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="element-card p-4 text-left">
                <h4 className="font-medium text-gray-900 mb-2">Demo Feature {i + 1}</h4>
                <p className="text-sm text-gray-600">This is a placeholder for future {title.toLowerCase()} features.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Account', 'Manage your account settings and preferences')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6 space-y-6">
          {/* Account Overview */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-red-600" />
              Account Overview
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Account Status</h5>
                  <p className="text-sm text-gray-600">Your account is active and verified</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Account Type</h5>
                  <p className="text-sm text-gray-600">Standard TELE IRAQ account</p>
                </div>
                <span className="text-sm font-medium text-blue-600">Standard</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Member Since</h5>
                  <p className="text-sm text-gray-600">Account creation date</p>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Email Management */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-red-600" />
              Email Management
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900">Primary Email</h5>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-600">Verified</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 element-button-secondary">
                  <Edit3 className="w-4 h-4" />
                  Change Email
                </button>
                <button className="flex-1 element-button-secondary">
                  <RefreshCw className="w-4 h-4" />
                  Resend Verification
                </button>
              </div>
            </div>
          </div>

          {/* Account Preferences */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-red-600" />
              Account Preferences
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">Two-Factor Authentication</h5>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button className="element-button-secondary">
                  <Shield className="w-4 h-4" />
                  Enable 2FA
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">Login Alerts</h5>
                  <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">Session Timeout</h5>
                  <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                </div>
                <select className="element-input w-32">
                  <option value="30">30 minutes</option>
                  <option value="60" selected>1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Storage */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-red-600" />
              Data & Storage
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900">Storage Usage</h5>
                  <span className="text-sm text-gray-600">2.3 GB of 5 GB used</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '46%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Messages: 1.2 GB</span>
                  <span>Media: 1.1 GB</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="element-button-secondary">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
                <button className="element-button-secondary">
                  <Trash2 className="w-4 h-4" />
                  Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Account Actions
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-blue-900">Download Your Data</h5>
                    <p className="text-sm text-blue-700 mt-1">
                      Export all your messages, media, and account information
                    </p>
                    <button className="mt-3 element-button-secondary text-blue-600 hover:bg-blue-100">
                      Request Data Export
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-amber-900">Deactivate Account</h5>
                    <p className="text-sm text-amber-700 mt-1">
                      Temporarily disable your account (can be reactivated)
                    </p>
                    <button className="mt-3 element-button-secondary text-amber-600 hover:bg-amber-100">
                      Deactivate Account
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-red-900">Delete Account</h5>
                    <p className="text-sm text-red-700 mt-1">
                      Permanently delete your account and all data (cannot be undone)
                    </p>
                    <button className="mt-3 element-button-secondary text-red-600 hover:bg-red-100">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-red-600" />
              Account Statistics
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">1,247</div>
                <div className="text-sm text-gray-600">Messages Sent</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Active Chats</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-gray-600">Files Shared</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">89</div>
                <div className="text-sm text-gray-600">Days Active</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-red-600" />
              Recent Activity
            </h4>
            
            <div className="space-y-3">
              {[
                { action: 'Password changed', time: '2 hours ago', icon: Lock },
                { action: 'New device linked', time: '1 day ago', icon: Smartphone },
                { action: 'Profile updated', time: '3 days ago', icon: User },
                { action: 'Recovery key generated', time: '1 week ago', icon: Key },
                { action: 'Account created', time: '2 weeks ago', icon: CheckCircle }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (showRecoveryKeySetup) {
    return (
      <RecoveryKeySetup
        onClose={() => setShowRecoveryKeySetup(false)}
        onComplete={() => setShowRecoveryKeySetup(false)}
      />
    );
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'devices':
        return renderDeviceSettings();
      case 'account':
        return renderAccountSection();
      case 'privacy':
        return renderPlaceholderSection('Privacy', Lock, 'Advanced privacy controls and settings');
      case 'language':
        return renderLanguageSettings();
      case 'help':
        return renderHelpSettings();
      case 'about':
        return renderAboutSettings();
      default:
        return renderMainSettings();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {currentSection !== 'main' ? (
          <button
            onClick={() => setCurrentSection('main')}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
        <h2 className="text-lg font-semibold text-gray-900">
          {currentSection === 'main' ? 'Settings' : 
           currentSection === 'profile' ? 'Profile' :
           currentSection === 'security' ? 'Security & Privacy' :
           currentSection === 'notifications' ? 'Notifications' :
           currentSection === 'appearance' ? 'Appearance' :
           currentSection === 'devices' ? 'Devices' :
           currentSection === 'language' ? 'Language & Region' :
           currentSection === 'help' ? 'Help & Support' :
           currentSection === 'about' ? 'About' : 'Settings'}
        </h2>
        <div />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default SettingsPanel;