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
  const [profileData, setProfileData] = useState({
    displayName: user.name,
    email: user.email,
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [notifications, setNotifications] = useState({
    messages: true,
    calls: true,
    groups: true,
    mentions: true,
    sounds: true,
    vibration: true,
    desktop: true,
    preview: true
  });
  const [appearance, setAppearance] = useState({
    theme: 'light' as 'light' | 'dark' | 'system',
    fontSize: 'medium' as 'small' | 'medium' | 'large',
    language: 'en'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileSave = () => {
    // In a real app, this would save to backend
    setIsEditingProfile(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file
      console.log('Avatar file selected:', file);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // In a real app, this would change the password
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const renderMainSettings = () => (
    <div className="space-y-1">
      <button
        onClick={() => setCurrentSection('profile')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Profile</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('security')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Security & Privacy</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('notifications')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Notifications</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('appearance')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Palette className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Appearance</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('devices')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Smartphone className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Devices</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('language')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Languages className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Language & Region</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <div className="border-t border-gray-200 my-4"></div>

      <button
        onClick={() => setCurrentSection('help')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Help & Support</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection('about')}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Info className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">About</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <div className="border-t border-gray-200 my-4"></div>

      <button
        onClick={onSignOut}
        className="w-full flex items-center space-x-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6 profile-section">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg profile-photo-container">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Display Name
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
              disabled={!isEditingProfile}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
            />
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Email
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            disabled={!isEditingProfile}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Location
          </label>
          <input
            type="text"
            value={profileData.location}
            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
            placeholder="Your location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Website
          </label>
          <input
            type="url"
            value={profileData.website}
            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 text-gray-900"
            placeholder="https://your-website.com"
          />
        </div>

        {isEditingProfile && (
          <div className="flex space-x-3">
            <button
              onClick={handleProfileSave}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Security Status</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your account is secured with end-to-end encryption
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="font-medium text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Change
          </button>
        </div>

        {showPasswordChange && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
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
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePasswordChange}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="font-medium text-gray-900">Recovery Key</h3>
              <p className="text-sm text-gray-500">Backup key for account recovery</p>
            </div>
          </div>
          <button
            onClick={() => setShowRecoveryKeySetup(true)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Setup
          </button>
        </div>
      </div>

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
        <h3 className="font-medium text-gray-900">Message Notifications</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Messages</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.messages}
                onChange={(e) => setNotifications({ ...notifications, messages: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Calls</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.calls}
                onChange={(e) => setNotifications({ ...notifications, calls: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Groups</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.groups}
                onChange={(e) => setNotifications({ ...notifications, groups: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AtSign className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Mentions</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.mentions}
                onChange={(e) => setNotifications({ ...notifications, mentions: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Sound & Vibration</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Sounds</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sounds}
                onChange={(e) => setNotifications({ ...notifications, sounds: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Vibrate className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Vibration</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.vibration}
                onChange={(e) => setNotifications({ ...notifications, vibration: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Desktop Notifications</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Desktop Alerts</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.desktop}
                onChange={(e) => setNotifications({ ...notifications, desktop: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Message Preview</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.preview}
                onChange={(e) => setNotifications({ ...notifications, preview: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Theme</h3>
        <div className="space-y-2">
          {[
            { value: 'light', label: 'Light', icon: Monitor },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Settings }
          ].map(({ value, label, icon: Icon }) => (
            <label key={value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="theme"
                value={value}
                checked={appearance.theme === value}
                onChange={(e) => setAppearance({ ...appearance, theme: e.target.value as any })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <Icon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Font Size</h3>
        <div className="space-y-2">
          {[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="fontSize"
                value={value}
                checked={appearance.fontSize === value}
                onChange={(e) => setAppearance({ ...appearance, fontSize: e.target.value as any })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevicesSettings = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-900">Current Device</h3>
            <p className="text-sm text-green-700 mt-1">
              This device is currently active and verified
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Linked Devices</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Desktop - Chrome</h4>
                <p className="text-sm text-gray-500">Last active: 2 minutes ago</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Current
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">iPhone 14</h4>
                <p className="text-sm text-gray-500">Last active: 1 hour ago</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600 text-sm font-medium">
              Remove
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Tablet className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">iPad Pro</h4>
                <p className="text-sm text-gray-500">Last active: 3 days ago</p>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600 text-sm font-medium">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 mb-4">Language</h3>
        <select
          value={appearance.language}
          onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Time Zone</h3>
        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
          <Clock className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">Pacific Standard Time (PST)</p>
            <p className="text-sm text-gray-500">UTC-8</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-4">Region</h3>
        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">United States</p>
            <p className="text-sm text-gray-500">Date format: MM/DD/YYYY</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpSettings = () => (
    <div className="space-y-4">
      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Help Center</span>
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
          <span className="text-gray-900">Terms of Service</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900">Privacy Policy</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );

  const renderAboutSettings = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">SecureChat</h3>
        <p className="text-gray-500">Version 2.1.0</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span className="text-gray-900">Build</span>
          <span className="text-gray-500">2024.01.15</span>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span className="text-gray-900">Platform</span>
          <span className="text-gray-500">Web</span>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span className="text-gray-900">Last Updated</span>
          <span className="text-gray-500">January 15, 2024</span>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>© 2024 SecureChat. All rights reserved.</p>
        <p className="mt-1">End-to-end encrypted messaging</p>
      </div>
    </div>
  );

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
        return renderDevicesSettings();
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