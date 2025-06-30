import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle, 
  Star, 
  Award, 
  Check,
  ChevronRight,
  ArrowLeft,
  Settings,
  Monitor,
  Moon,
  Sun,
  Smartphone,
  Key,
  Lock,
  Eye,
  EyeOff,
  Keyboard,
  Sidebar,
  Mic,
  Video,
  TestTube,
  Info,
  UserCheck,
  Camera,
  Edit3,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Save,
  X,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

type SettingsView = 'main' | 'account' | 'sessions' | 'appearance' | 'notifications' | 'preferences' | 'keyboard' | 'sidebar' | 'voice-video' | 'security-privacy' | 'encryption' | 'labs' | 'help' | 'about';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  
  // Account form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user.name,
    email: user.email,
    phone: '+964 770 123 4567',
    bio: 'Secure communication enthusiast',
    location: 'Baghdad, Iraq',
    joinDate: 'January 2024'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Message layout and font size states
  const [messageLayout, setMessageLayout] = useState<'modern' | 'bubbles' | 'irc'>('modern');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Language and timezone states
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [timezone, setTimezone] = useState('Asia/Baghdad');

  // Voice & Video states
  const [microphoneVolume, setMicrophoneVolume] = useState(75);
  const [speakerVolume, setSpeakerVolume] = useState(80);
  const [cameraQuality, setCameraQuality] = useState<'720p' | '1080p' | '4k'>('1080p');
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);

  const handleProfileSave = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditingProfile(false);
      // Show success message
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      // Show success message
    }, 1000);
  };

  const handleProfilePictureUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle file upload
        console.log('Uploading profile picture:', file.name);
      }
    };
    input.click();
  };

  const renderMainSettings = () => (
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
          icon={<UserCheck className="w-5 h-5" />}
          title="Account"
          description="Manage your account settings and profile"
          onClick={() => setCurrentView('account')}
        />
        
        <SettingItem
          icon={<Smartphone className="w-5 h-5" />}
          title="Sessions"
          description="Manage your active sessions"
          onClick={() => setCurrentView('sessions')}
        />
        
        <SettingItem
          icon={<Palette className="w-5 h-5" />}
          title="Appearance"
          description="Customize the app's appearance"
          onClick={() => setCurrentView('appearance')}
        />
        
        <SettingItem
          icon={<Bell className="w-5 h-5" />}
          title="Notifications"
          description="Manage your notification preferences"
          onClick={() => setCurrentView('notifications')}
        />
        
        <SettingItem
          icon={<Settings className="w-5 h-5" />}
          title="Preferences"
          description="Language and timezone settings"
          onClick={() => setCurrentView('preferences')}
        />
        
        {/* Hide Keyboard and Sidebar on mobile */}
        <div className="hidden lg:block">
          <SettingItem
            icon={<Keyboard className="w-5 h-5" />}
            title="Keyboard"
            description="Keyboard shortcuts and settings"
            onClick={() => setCurrentView('keyboard')}
          />
        </div>
        
        <div className="hidden lg:block">
          <SettingItem
            icon={<Sidebar className="w-5 h-5" />}
            title="Sidebar"
            description="Customize sidebar behavior"
            onClick={() => setCurrentView('sidebar')}
          />
        </div>
        
        <SettingItem
          icon={<Video className="w-5 h-5" />}
          title="Voice & Video"
          description="Audio and video call settings"
          onClick={() => setCurrentView('voice-video')}
        />
        
        <SettingItem
          icon={<Shield className="w-5 h-5" />}
          title="Security & Privacy"
          description="Control your security settings"
          onClick={() => setCurrentView('security-privacy')}
          highlight={true}
        />
        
        <SettingItem
          icon={<Lock className="w-5 h-5" />}
          title="Encryption"
          description="End-to-end encryption settings"
          onClick={() => setCurrentView('encryption')}
        />
        
        <SettingItem
          icon={<TestTube className="w-5 h-5" />}
          title="Labs"
          description="Experimental features and encryption info"
          onClick={() => setCurrentView('labs')}
        />
        
        <SettingItem
          icon={<HelpCircle className="w-5 h-5" />}
          title="Help and About"
          description="Get help and app information"
          onClick={() => setCurrentView('help')}
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
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6 account-scrollbar">
      {/* Profile Section */}
      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="element-text font-semibold text-lg flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile
          </h4>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="element-button-secondary p-2"
          >
            {isEditingProfile ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
              {profileData.displayName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleProfilePictureUpload}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="element-text font-semibold text-lg mb-1">{profileData.displayName}</h3>
            <p className="element-text-small text-gray-500 mb-3">{profileData.bio}</p>
            <div className="flex space-x-2">
              <button
                onClick={handleProfilePictureUpload}
                className="element-button-secondary text-sm px-3 py-1"
              >
                <Upload className="w-3 h-3 mr-1" />
                Upload
              </button>
              <button className="element-button-secondary text-sm px-3 py-1 text-red-600 hover:bg-red-50">
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
              disabled={!isEditingProfile}
              className={`element-input ${!isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditingProfile}
              rows={3}
              className={`element-input resize-none ${!isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              placeholder="Tell others about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                disabled={!isEditingProfile}
                className={`element-input pl-10 ${!isEditingProfile ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {isEditingProfile && (
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleProfileSave}
                className="element-button flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="element-button-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Personal Information
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="element-text font-medium">Email Address</p>
                <p className="element-text-small text-gray-500">{profileData.email}</p>
              </div>
            </div>
            <button className="element-button-secondary text-sm">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="element-text font-medium">Phone Number</p>
                <p className="element-text-small text-gray-500">{profileData.phone}</p>
              </div>
            </div>
            <button className="element-button-secondary text-sm">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="element-text font-medium">Member Since</p>
                <p className="element-text-small text-gray-500">{profileData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="element-text font-semibold flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Password & Security
          </h4>
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="element-button-secondary text-sm"
          >
            {isChangingPassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {!isChangingPassword ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="element-text font-medium text-green-900">Password is secure</p>
                <p className="element-text-small text-green-700">Last changed 30 days ago</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="element-text-small text-gray-500">Password Strength</p>
                <p className="element-text font-semibold text-green-600">Strong</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="element-text-small text-gray-500">Two-Factor Auth</p>
                <p className="element-text font-semibold text-green-600">Enabled</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="element-input pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="element-input pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="element-input pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="element-text-small font-medium text-blue-900 mb-2">Password Requirements:</p>
              <ul className="element-text-small text-blue-700 space-y-1">
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>At least 8 characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>One uppercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>One number</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${/[!@#$%^&*]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>One special character</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handlePasswordChange}
              className="element-button w-full"
              disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              <Key className="w-4 h-4 mr-2" />
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* Account Actions */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Account Actions
        </h4>
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="element-text font-medium">Download My Data</p>
                <p className="element-text-small text-gray-500">Export all your account data</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="element-text font-medium">Deactivate Account</p>
                <p className="element-text-small text-gray-500">Temporarily disable your account</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>
          
          <button className="w-full text-left p-3 rounded-lg border border-red-200 hover:bg-red-50 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="element-text font-medium text-red-600">Delete Account</p>
                <p className="element-text-small text-red-500">Permanently delete your account and data</p>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityPrivacy = () => (
    <div className="space-y-6 settings-scrollbar">
      {/* Privacy Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Privacy
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Show read receipts"
            description="Let others know when you've read their messages"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show typing indicators"
            description="Let others see when you're typing"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show last seen"
            description="Let others see when you were last active"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Allow profile photo downloads"
            description="Let others download your profile photo"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Two-factor authentication"
            description="Add an extra layer of security to your account"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Session verification"
            description="Verify new sessions with existing devices"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Secure backup"
            description="Backup your encryption keys securely"
            enabled={true}
            onChange={() => {}}
          />
          <SettingItem
            icon={<Key className="w-5 h-5" />}
            title="Change password"
            description="Update your account password"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Data & Storage */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Data & Storage
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-download media"
            description="Automatically download images and files"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Save media to gallery"
            description="Save received media to your device gallery"
            enabled={true}
            onChange={() => {}}
          />
          <SettingItem
            icon={<Monitor className="w-5 h-5" />}
            title="Clear cache"
            description="Free up storage space"
            onClick={() => {}}
          />
          <SettingItem
            icon={<Monitor className="w-5 h-5" />}
            title="Export data"
            description="Download your data"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Blocked Users */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <EyeOff className="w-5 h-5 mr-2" />
          Blocked Users
        </h4>
        <p className="element-text-small text-gray-500 mb-4">
          You haven't blocked anyone yet
        </p>
        <button className="element-button-secondary">
          Manage blocked users
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6 settings-scrollbar">
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Theme
        </h4>
        <div className="space-y-3">
          <ThemeOption
            icon={<Sun className="w-5 h-5" />}
            title="Light"
            description="Use light theme"
            selected={theme === 'light'}
            onClick={() => setTheme('light')}
          />
          <ThemeOption
            icon={<Moon className="w-5 h-5" />}
            title="Dark"
            description="Use dark theme"
            selected={theme === 'dark'}
            onClick={() => setTheme('dark')}
          />
          <ThemeOption
            icon={<Monitor className="w-5 h-5" />}
            title="System"
            description="Follow system theme"
            selected={theme === 'system'}
            onClick={() => setTheme('system')}
          />
        </div>
      </div>

      {/* Message Layout */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Message Layout</h4>
        <div className="space-y-3">
          <MessageLayoutOption
            title="Modern"
            description="Clean, modern message bubbles with rounded corners"
            selected={messageLayout === 'modern'}
            onClick={() => setMessageLayout('modern')}
          />
          <MessageLayoutOption
            title="Message Bubbles"
            description="Traditional chat bubbles with distinct sender colors"
            selected={messageLayout === 'bubbles'}
            onClick={() => setMessageLayout('bubbles')}
          />
          <MessageLayoutOption
            title="IRC (Experimental)"
            description="Classic IRC-style text layout for power users"
            selected={messageLayout === 'irc'}
            onClick={() => setMessageLayout('irc')}
            experimental={true}
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Font Size</h4>
        <div className="space-y-3">
          <FontSizeOption
            title="Small"
            description="Compact text for more content"
            size="small"
            selected={fontSize === 'small'}
            onClick={() => setFontSize('small')}
          />
          <FontSizeOption
            title="Medium"
            description="Standard text size (recommended)"
            size="medium"
            selected={fontSize === 'medium'}
            onClick={() => setFontSize('medium')}
          />
          <FontSizeOption
            title="Large"
            description="Larger text for better readability"
            size="large"
            selected={fontSize === 'large'}
            onClick={() => setFontSize('large')}
          />
        </div>
      </div>

      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Display</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Compact mode"
            description="Show more content in less space"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show avatars"
            description="Display user avatars in chat list"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show timestamps"
            description="Display message timestamps"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 settings-scrollbar">
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Enable notifications"
            description="Receive notifications for new messages"
            enabled={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <ToggleItem
            title="Sound"
            description="Play sound for notifications"
            enabled={soundEnabled}
            onChange={setSoundEnabled}
          />
          <ToggleItem
            title="Desktop notifications"
            description="Show notifications on desktop"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show message preview"
            description="Display message content in notifications"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6 settings-scrollbar">
      {/* Application Language */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Application Language
        </h4>
        <div className="space-y-3">
          <LanguageOption
            title="English"
            subtitle="English"
            flag="🇺🇸"
            selected={language === 'en'}
            onClick={() => setLanguage('en')}
          />
          <LanguageOption
            title="العربية"
            subtitle="Arabic"
            flag="🇮🇶"
            selected={language === 'ar'}
            onClick={() => setLanguage('ar')}
          />
        </div>
      </div>

      {/* Display Time & Timezone */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Display Time
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Zone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="element-input"
            >
              <option value="Asia/Baghdad">Baghdad (GMT+3)</option>
              <option value="Asia/Erbil">Erbil (GMT+3)</option>
              <option value="Asia/Kuwait">Kuwait (GMT+3)</option>
              <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
              <option value="Europe/London">London (GMT+0)</option>
              <option value="America/New_York">New York (GMT-5)</option>
              <option value="Asia/Dubai">Dubai (GMT+4)</option>
              <option value="Europe/Berlin">Berlin (GMT+1)</option>
            </select>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="element-text-small text-blue-900">
              <strong>Current time:</strong> {new Date().toLocaleString('en-US', { 
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* General Preferences */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">General Preferences</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-start on system boot"
            description="Launch TELE IRAQ when your device starts"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Minimize to system tray"
            description="Keep app running in background when closed"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Send messages with Enter"
            description="Press Enter to send, Shift+Enter for new line"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderVoiceVideo = () => (
    <div className="space-y-6 settings-scrollbar">
      {/* Voice Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Mic className="w-5 h-5 mr-2" />
          Voice Settings
        </h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Microphone Volume: {microphoneVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={microphoneVolume}
              onChange={(e) => setMicrophoneVolume(Number(e.target.value))}
              className="slider w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Speaker Volume: {speakerVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={speakerVolume}
              onChange={(e) => setSpeakerVolume(Number(e.target.value))}
              className="slider w-full"
            />
          </div>

          <div className="space-y-4">
            <ToggleItem
              title="Echo Cancellation"
              description="Reduce echo during voice calls"
              enabled={echoCancellation}
              onChange={setEchoCancellation}
            />
            <ToggleItem
              title="Noise Suppression"
              description="Filter out background noise"
              enabled={noiseSuppression}
              onChange={setNoiseSuppression}
            />
            <ToggleItem
              title="Push to Talk"
              description="Hold a key to transmit voice"
              enabled={false}
              onChange={() => {}}
            />
          </div>

          <button className="element-button-secondary w-full">
            <Mic className="w-4 h-4 mr-2" />
            Test Microphone
          </button>
        </div>
      </div>

      {/* Video Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Video className="w-5 h-5 mr-2" />
          Video Settings
        </h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Camera Quality
            </label>
            <div className="space-y-2">
              <CameraQualityOption
                title="720p HD"
                description="Standard quality, lower bandwidth"
                quality="720p"
                selected={cameraQuality === '720p'}
                onClick={() => setCameraQuality('720p')}
              />
              <CameraQualityOption
                title="1080p Full HD"
                description="High quality, recommended"
                quality="1080p"
                selected={cameraQuality === '1080p'}
                onClick={() => setCameraQuality('1080p')}
              />
              <CameraQualityOption
                title="4K Ultra HD"
                description="Highest quality, requires fast internet"
                quality="4k"
                selected={cameraQuality === '4k'}
                onClick={() => setCameraQuality('4k')}
              />
            </div>
          </div>

          <div className="space-y-4">
            <ToggleItem
              title="Auto-adjust video quality"
              description="Automatically optimize based on connection"
              enabled={true}
              onChange={() => {}}
            />
            <ToggleItem
              title="Mirror my video"
              description="Show your video mirrored like a mirror"
              enabled={true}
              onChange={() => {}}
            />
            <ToggleItem
              title="Always show video preview"
              description="Display video preview before joining calls"
              enabled={false}
              onChange={() => {}}
            />
          </div>

          <button className="element-button-secondary w-full">
            <Video className="w-4 h-4 mr-2" />
            Test Camera
          </button>
        </div>
      </div>

      {/* Call Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Call Settings</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Incoming call sounds"
            description="Play ringtone for incoming calls"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Call waiting"
            description="Allow incoming calls during active calls"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto-answer calls"
            description="Automatically answer calls from contacts"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderLabs = () => (
    <div className="space-y-6 settings-scrollbar">
      {/* End-to-End Encryption Education */}
      <div className="element-card p-6 border-2 border-red-200 bg-red-50">
        <h4 className="element-text font-semibold mb-4 flex items-center text-red-900">
          <Shield className="w-6 h-6 mr-2" />
          Understanding End-to-End Encryption
        </h4>
        
        {/* What is E2E Encryption */}
        <div className="mb-6">
          <h5 className="element-text font-semibold mb-3 text-red-800">📚 What is End-to-End Encryption?</h5>
          <p className="element-text text-red-700 leading-relaxed mb-3">
            End-to-end encryption is a security method that ensures only you and the person you're communicating with can read your messages. Nobody else, including TELE IRAQ, can access your private conversations.
          </p>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <p className="element-text-small text-red-600 font-medium">
              🔒 Your messages are locked with a special key that only you and your recipient have.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-6">
          <h5 className="element-text font-semibold mb-3 text-red-800">🧠 How Does It Work?</h5>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-red-200">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">1</span>
              </div>
              <div>
                <p className="element-text font-medium text-red-900">🔑 Key Generation</p>
                <p className="element-text-small text-red-700">Your device creates unique cryptographic keys for each conversation</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-red-200">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">2</span>
              </div>
              <div>
                <p className="element-text font-medium text-red-900">🔒 Message Encryption</p>
                <p className="element-text-small text-red-700">Your message is scrambled using the recipient's public key</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-red-200">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">3</span>
              </div>
              <div>
                <p className="element-text font-medium text-red-900">🖥️ Secure Transmission</p>
                <p className="element-text-small text-red-700">The encrypted message travels through our servers, but we can't read it</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-red-200">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">4</span>
              </div>
              <div>
                <p className="element-text font-medium text-red-900">✅ Message Decryption</p>
                <p className="element-text-small text-red-700">Only the recipient's private key can unlock and read the message</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Important */}
        <div className="mb-6">
          <h5 className="element-text font-semibold mb-3 text-red-800">❤️ Why Is This Important?</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="element-text font-medium text-red-900 mb-1">🛡️ Privacy Protection</p>
              <p className="element-text-small text-red-700">Your personal conversations stay private, even from us</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="element-text font-medium text-red-900 mb-1">✅ Security Assurance</p>
              <p className="element-text-small text-red-700">Protection against hackers and data breaches</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="element-text font-medium text-red-900 mb-1">🌍 Freedom of Speech</p>
              <p className="element-text-small text-red-700">Communicate freely without fear of surveillance</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-red-200">
              <p className="element-text font-medium text-red-900 mb-1">👥 Trust Building</p>
              <p className="element-text-small text-red-700">Stronger relationships through secure communication</p>
            </div>
          </div>
        </div>

        {/* TELE IRAQ Commitment */}
        <div className="mb-6 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white">
          <h5 className="font-semibold mb-3 flex items-center">
            <span className="text-2xl mr-2">🇮🇶</span>
            TELE IRAQ's Commitment: "Built for Iraq, Secured for Everyone"
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>We cannot read your messages</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>We cannot access your calls</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>We cannot share your data</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Your keys stay on your device</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Implementation */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Technical Implementation
        </h4>
        <div className="space-y-4">
          <div>
            <h5 className="element-text font-medium mb-2">Encryption Standards</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="element-text-small font-medium">AES-256 Encryption</p>
                <p className="element-text-small text-gray-600">Military-grade message encryption</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="element-text-small font-medium">RSA-4096 Key Exchange</p>
                <p className="element-text-small text-gray-600">Secure key distribution</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="element-text-small font-medium">Perfect Forward Secrecy</p>
                <p className="element-text-small text-gray-600">Past messages stay secure</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="element-text-small font-medium">Double Ratchet Algorithm</p>
                <p className="element-text-small text-gray-600">Advanced key management</p>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="element-text font-medium mb-2">Security Features</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="element-text-small">Message authentication prevents tampering</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="element-text-small">Key verification ensures secure connections</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="element-text-small">Secure key backup protects against device loss</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="element-text-small">Cross-device sync maintains security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Verification */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Security Verification
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="element-text font-medium text-blue-900 mb-2">🔍 Verify Your Conversations</h5>
            <p className="element-text-small text-blue-700 mb-3">
              Each conversation has a unique security code (fingerprint) that you can verify with your contact to ensure your connection is secure.
            </p>
            <button className="element-button-secondary text-sm">
              Learn How to Verify
            </button>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h5 className="element-text font-medium text-yellow-900 mb-2">⚠️ Security Warnings</h5>
            <p className="element-text-small text-yellow-700">
              TELE IRAQ will warn you if someone tries to intercept your messages or if there are any security concerns with your conversations.
            </p>
          </div>
        </div>
      </div>

      {/* Experimental Features */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <TestTube className="w-5 h-5 mr-2" />
          Experimental Features
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Enhanced Message Reactions"
            description="Use custom emojis and animated reactions"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Voice Message Transcription"
            description="Automatically convert voice messages to text"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Advanced Search Filters"
            description="Search messages by date, sender, and content type"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Message Scheduling"
            description="Schedule messages to be sent at specific times"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Beta Program */}
      <div className="element-card p-6 border-2 border-blue-200 bg-blue-50">
        <h4 className="element-text font-semibold mb-4 flex items-center text-blue-900">
          <Star className="w-5 h-5 mr-2" />
          Join Our Beta Program
        </h4>
        <p className="element-text text-blue-700 mb-4">
          Get early access to new features and help shape the future of TELE IRAQ. Beta features may be unstable and are not recommended for critical communications.
        </p>
        <div className="flex items-center space-x-3">
          <button className="element-button">
            Join Beta Program
          </button>
          <div className="flex items-center space-x-2 text-blue-600">
            <AlertCircle className="w-4 h-4" />
            <span className="element-text-small">Beta features may be unstable</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenericSection = (title: string, icon: React.ReactNode) => (
    <div className="space-y-6 settings-scrollbar">
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          {icon}
          {title}
        </h4>
        <p className="element-text-small text-gray-500 mb-4">
          {title} settings will be available in future updates.
        </p>
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <ToggleItem
              key={i}
              title={`${title} option ${i + 1}`}
              description={`Configure ${title.toLowerCase()} setting ${i + 1}`}
              enabled={i === 0}
              onChange={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'main':
        return renderMainSettings();
      case 'account':
        return renderAccount();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'notifications':
        return renderNotifications();
      case 'preferences':
        return renderPreferences();
      case 'voice-video':
        return renderVoiceVideo();
      case 'labs':
        return renderLabs();
      case 'sessions':
        return renderGenericSection('Sessions', <Smartphone className="w-5 h-5 mr-2" />);
      case 'keyboard':
        return renderGenericSection('Keyboard', <Keyboard className="w-5 h-5 mr-2" />);
      case 'sidebar':
        return renderGenericSection('Sidebar', <Sidebar className="w-5 h-5 mr-2" />);
      case 'encryption':
        return renderGenericSection('Encryption', <Lock className="w-5 h-5 mr-2" />);
      case 'help':
        return renderGenericSection('Help and About', <HelpCircle className="w-5 h-5 mr-2" />);
      default:
        return renderMainSettings();
    }
  };

  return (
    <div className="flex-content">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {currentView !== 'main' && (
            <button
              onClick={() => setCurrentView('main')}
              className="element-button-secondary p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h2 className="element-title">
            {currentView === 'main' ? 'Settings' : 
             currentView === 'security-privacy' ? 'Security & Privacy' :
             currentView === 'voice-video' ? 'Voice & Video' :
             currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="settings-container p-4">
        {renderCurrentView()}
        
        {/* End marker */}
        <div className="text-center py-8">
          <p className="element-text-small text-gray-400">End of settings</p>
        </div>
      </div>
    </div>
  );
};

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  highlight?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, title, description, onClick, highlight = false }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full element-card p-4 text-left element-hover group ${
        highlight ? 'border-red-200 bg-red-50' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`transition-colors flex-shrink-0 ${
          highlight 
            ? 'text-red-600' 
            : 'text-gray-600 group-hover:text-red-600'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </button>
  );
};

interface ToggleItemProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ title, description, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h4 className="element-text font-medium">{title}</h4>
        <p className="element-text-small text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
      </label>
    </div>
  );
};

interface ThemeOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ icon, title, description, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`${selected ? 'text-red-600' : 'text-gray-600'}`}>
          {icon}
        </div>
        <div className="text-left">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600 ml-auto" />}
      </div>
    </button>
  );
};

interface MessageLayoutOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  experimental?: boolean;
}

const MessageLayoutOption: React.FC<MessageLayoutOptionProps> = ({ title, description, selected, onClick, experimental = false }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-left flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="element-text font-medium">{title}</h4>
            {experimental && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Experimental
              </span>
            )}
          </div>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface FontSizeOptionProps {
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  selected: boolean;
  onClick: () => void;
}

const FontSizeOption: React.FC<FontSizeOptionProps> = ({ title, description, size, selected, onClick }) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-left flex-1">
          <h4 className={`font-medium ${sizeClasses[size]}`}>{title}</h4>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface LanguageOptionProps {
  title: string;
  subtitle: string;
  flag: string;
  selected: boolean;
  onClick: () => void;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({ title, subtitle, flag, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{flag}</span>
        <div className="text-left flex-1">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{subtitle}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface CameraQualityOptionProps {
  title: string;
  description: string;
  quality: '720p' | '1080p' | '4k';
  selected: boolean;
  onClick: () => void;
}

const CameraQualityOption: React.FC<CameraQualityOptionProps> = ({ title, description, quality, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-left flex-1">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-4 h-4 text-red-600" />}
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