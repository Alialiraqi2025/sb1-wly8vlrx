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
  Phone,
  Mail,
  Calendar,
  MapPin,
  Copy,
  RefreshCw,
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle,
  Download
} from 'lucide-react';
import { User as UserType, TrustedDevice } from '../types';
import RecoveryKeySetup from './RecoveryKeySetup';
import { formatRecoveryKey, getDeviceInfo } from '../utils/recoveryKey';

interface SettingsPanelProps {
  user: UserType;
}

type SettingsView = 'main' | 'account' | 'profile' | 'sessions' | 'appearance' | 'notifications' | 'preferences' | 'keyboard' | 'sidebar' | 'voice-video' | 'security-privacy' | 'encryption' | 'labs' | 'help' | 'about' | 'recovery-key-setup';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [showRecoveryKey, setShowRecoveryKey] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user.name,
    email: user.email,
    phone: '+964 770 123 4567',
    bio: 'Secure messaging enthusiast'
  });
  const [voiceSettings, setVoiceSettings] = useState({
    inputVolume: 75,
    outputVolume: 80,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  });
  const [videoSettings, setVideoSettings] = useState({
    resolution: '720p',
    frameRate: 30,
    bandwidth: 'auto',
    backgroundBlur: false
  });

  // Mock trusted devices
  const trustedDevices: TrustedDevice[] = [
    {
      id: 'device-1',
      name: 'iPhone 14 Pro',
      type: 'mobile',
      lastUsed: new Date(Date.now() - 3600000),
      isCurrentDevice: true,
      verified: true
    },
    {
      id: 'device-2',
      name: 'MacBook Pro',
      type: 'desktop',
      lastUsed: new Date(Date.now() - 86400000),
      isCurrentDevice: false,
      verified: true
    },
    {
      id: 'device-3',
      name: 'iPad Air',
      type: 'tablet',
      lastUsed: new Date(Date.now() - 172800000),
      isCurrentDevice: false,
      verified: true
    }
  ];

  const handleRecoveryKeySetupComplete = (recoveryKey: string) => {
    // In real app, save the recovery key securely
    console.log('Recovery key setup completed:', recoveryKey);
    setCurrentView('security-privacy');
  };

  const handleBackToSettings = () => {
    setCurrentView('security-privacy');
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Monitor className="w-5 h-5" />; // Using Monitor as tablet icon
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const renderMainSettings = () => (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="element-card p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="element-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white username">{user.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-green-600 dark:text-green-400">Online</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentView('profile')}
          className="element-button-secondary w-full"
        >
          <Edit3 className="w-4 h-4" />
          Edit profile
        </button>
      </div>

      {/* Settings Categories */}
      <div className="space-y-2">
        <SettingItem
          icon={<UserCheck className="w-5 h-5" />}
          title="Account"
          description="Manage your account settings"
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
          description="General app preferences"
          onClick={() => setCurrentView('preferences')}
        />
        
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
          description="Experimental features"
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
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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
            title="Recovery key"
            status="Configured"
            isActive={true}
          />
          <SecurityStatusItem
            title="Device verification"
            status="Enabled"
            isActive={true}
          />
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h4>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="element-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <button className="element-button-secondary">
              <Camera className="w-4 h-4" />
              Change Photo
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Upload a new profile picture (max 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={profileData.displayName}
                onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              placeholder="Tell others about yourself..."
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button className="flex-1 element-button">
            <Check className="w-4 h-4" />
            Save Changes
          </button>
          <button className="flex-1 element-button-secondary">
            Cancel
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h4>
        <button className="element-button w-full">
          <Lock className="w-4 h-4" />
          Change Password
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          You'll be asked to verify your current password
        </p>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6 account-scrollbar">
      {/* Profile Section */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-red-600" />
          Profile
        </h4>
        <SettingItem
          icon={<Edit3 className="w-5 h-5" />}
          title="Display Name"
          description={`Currently: ${profileData.displayName}`}
          onClick={() => setCurrentView('profile')}
        />
      </div>

      {/* Account Information */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            <button className="element-button-secondary p-2">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{profileData.phone}</p>
              </div>
            </div>
            <button className="element-button-secondary p-2">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Member since</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">January 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Actions */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h4>
        <div className="space-y-3">
          <SettingItem
            icon={<Lock className="w-5 h-5" />}
            title="Change Password"
            description="Update your account password"
            onClick={() => {}}
          />
          <SettingItem
            icon={<Key className="w-5 h-5" />}
            title="Recovery Key"
            description="Manage your recovery key"
            onClick={() => setCurrentView('recovery-key-setup')}
          />
          <SettingItem
            icon={<Smartphone className="w-5 h-5" />}
            title="Trusted Devices"
            description="Manage device access"
            onClick={() => setCurrentView('sessions')}
          />
        </div>
      </div>

      {/* Account Actions */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Actions</h4>
        <div className="space-y-3">
          <button className="w-full element-button-secondary text-left">
            <Download className="w-4 h-4" />
            Export Data
          </button>
          <button className="w-full element-button-secondary text-left text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderSessionsSettings = () => (
    <div className="space-y-6">
      {/* Current Device */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          Current Device
        </h4>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="text-green-600">
              {getDeviceIcon(getDeviceInfo().type)}
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-green-900 dark:text-green-100">{getDeviceInfo().name}</h5>
              <p className="text-sm text-green-700 dark:text-green-300">Active now</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Device ID: {getDeviceInfo().id}
              </p>
            </div>
            <div className="text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Devices */}
      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Trusted Devices
          </h4>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {trustedDevices.length} devices
          </span>
        </div>
        
        <div className="space-y-3">
          {trustedDevices.map((device) => (
            <div key={device.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-gray-600 dark:text-gray-400">
                  {getDeviceIcon(device.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-gray-900 dark:text-white">{device.name}</h5>
                    {device.isCurrentDevice && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last used: {device.lastUsed.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Device ID: {device.id}
                  </p>
                </div>
                {!device.isCurrentDevice && (
                  <button className="element-button-secondary p-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Security */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Security</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Require recovery key for new devices"
            description="Always verify new devices with recovery key"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto-logout inactive sessions"
            description="Automatically logout after 30 days of inactivity"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Session notifications"
            description="Get notified when new devices sign in"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions</h4>
        <div className="space-y-3">
          <button className="w-full element-button-secondary text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
            Logout All Other Devices
          </button>
          <button className="w-full element-button-secondary">
            <RefreshCw className="w-4 h-4" />
            Generate New Recovery Key
          </button>
        </div>
      </div>
    </div>
  );

  const renderVoiceVideoSettings = () => (
    <div className="space-y-6">
      {/* Voice Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Mic className="w-5 h-5 mr-2 text-blue-600" />
          Voice Settings
        </h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Volume: {voiceSettings.inputVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={voiceSettings.inputVolume}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, inputVolume: parseInt(e.target.value) }))}
              className="slider w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Output Volume: {voiceSettings.outputVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={voiceSettings.outputVolume}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, outputVolume: parseInt(e.target.value) }))}
              className="slider w-full"
            />
          </div>

          <div className="space-y-4">
            <ToggleItem
              title="Echo Cancellation"
              description="Reduce echo during voice calls"
              enabled={voiceSettings.echoCancellation}
              onChange={(enabled) => setVoiceSettings(prev => ({ ...prev, echoCancellation: enabled }))}
            />
            <ToggleItem
              title="Noise Suppression"
              description="Filter out background noise"
              enabled={voiceSettings.noiseSuppression}
              onChange={(enabled) => setVoiceSettings(prev => ({ ...prev, noiseSuppression: enabled }))}
            />
            <ToggleItem
              title="Auto Gain Control"
              description="Automatically adjust microphone sensitivity"
              enabled={voiceSettings.autoGainControl}
              onChange={(enabled) => setVoiceSettings(prev => ({ ...prev, autoGainControl: enabled }))}
            />
          </div>
        </div>
      </div>

      {/* Video Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Video className="w-5 h-5 mr-2 text-green-600" />
          Video Settings
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video Resolution
            </label>
            <select
              value={videoSettings.resolution}
              onChange={(e) => setVideoSettings(prev => ({ ...prev, resolution: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="480p">480p (Standard)</option>
              <option value="720p">720p (HD)</option>
              <option value="1080p">1080p (Full HD)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frame Rate
            </label>
            <select
              value={videoSettings.frameRate}
              onChange={(e) => setVideoSettings(prev => ({ ...prev, frameRate: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={15}>15 FPS</option>
              <option value={24}>24 FPS</option>
              <option value={30}>30 FPS</option>
              <option value={60}>60 FPS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bandwidth Usage
            </label>
            <select
              value={videoSettings.bandwidth}
              onChange={(e) => setVideoSettings(prev => ({ ...prev, bandwidth: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="low">Low (Save Data)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Best Quality)</option>
              <option value="auto">Auto (Adaptive)</option>
            </select>
          </div>

          <ToggleItem
            title="Background Blur"
            description="Blur your background during video calls"
            enabled={videoSettings.backgroundBlur}
            onChange={(enabled) => setVideoSettings(prev => ({ ...prev, backgroundBlur: enabled }))}
          />
        </div>
      </div>

      {/* Call Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Call Settings</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-answer calls"
            description="Automatically answer incoming calls"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Call waiting"
            description="Allow incoming calls during active calls"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show call duration"
            description="Display call timer during calls"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Test Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Test Your Setup</h4>
        <div className="space-y-3">
          <button className="w-full element-button-secondary">
            <Mic className="w-4 h-4" />
            Test Microphone
          </button>
          <button className="w-full element-button-secondary">
            <Video className="w-4 h-4" />
            Test Camera
          </button>
          <button className="w-full element-button-secondary">
            <Phone className="w-4 h-4" />
            Test Call Quality
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityPrivacy = () => (
    <div className="space-y-6">
      {/* Recovery Key Management */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-red-600" />
          Recovery Key
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-red-900 dark:text-red-100">Recovery Key Active</h5>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Your account is protected with a recovery key for device verification
                </p>
              </div>
            </div>
          </div>

          {user.recoveryKey && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900 dark:text-white">Your Recovery Key</h5>
                <button
                  onClick={() => setShowRecoveryKey(!showRecoveryKey)}
                  className="element-button-secondary p-2"
                >
                  {showRecoveryKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded border">
                {showRecoveryKey ? formatRecoveryKey(user.recoveryKey) : '••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••'}
              </div>
              {showRecoveryKey && (
                <div className="flex space-x-2 mt-3">
                  <button className="element-button-secondary flex-1">
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                  <button className="element-button-secondary flex-1">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <button 
              onClick={() => setCurrentView('recovery-key-setup')}
              className="w-full element-button"
            >
              <RefreshCw className="w-4 h-4" />
              Generate New Recovery Key
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generating a new recovery key will invalidate the current one. Make sure to save it securely.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <EyeOff className="w-5 h-5 mr-2" />
          Blocked Users
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          You haven't blocked anyone yet
        </p>
        <button className="element-button-secondary">
          Manage blocked users
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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

      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Display</h4>
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
    <div className="space-y-6">
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
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

  const renderLabsSection = () => (
    <div className="space-y-6">
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-red-600" />
          End-to-End Encryption
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">How End-to-End Encryption Works</h5>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  TELE IRAQ uses the Signal Protocol, the same encryption used by WhatsApp and Signal, to secure your messages.
                </p>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• <strong>Your messages are encrypted</strong> on your device before being sent</li>
                  <li>• <strong>Only you and the recipient</strong> have the keys to decrypt messages</li>
                  <li>• <strong>TELE IRAQ servers cannot read</strong> your encrypted messages</li>
                  <li>• <strong>Each conversation has unique keys</strong> that change regularly</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <Key className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Recovery Key Protection</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Your recovery key adds an extra layer of security by verifying device access.
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• <strong>Device verification</strong> prevents unauthorized access</li>
                  <li>• <strong>Cross-device security</strong> ensures only trusted devices can access your account</li>
                  <li>• <strong>Account recovery</strong> allows you to regain access if you lose your device</li>
                  <li>• <strong>Message continuity</strong> maintains encryption across all your devices</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Why This Matters</h5>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  End-to-end encryption with recovery key protection ensures your privacy and security.
                </p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• <strong>Privacy protection</strong> - Your conversations remain private</li>
                  <li>• <strong>Security assurance</strong> - Protection against data breaches</li>
                  <li>• <strong>Trust building</strong> - You control who can access your messages</li>
                  <li>• <strong>Peace of mind</strong> - Your sensitive information stays secure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <TestTube className="w-5 h-5 mr-2 text-purple-600" />
          Experimental Features
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Advanced encryption metrics"
            description="Show detailed encryption information in chats"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Enhanced security notifications"
            description="Get notified about security events"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Beta features"
            description="Access experimental features before public release"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="element-card p-6 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Security Note</h4>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              While TELE IRAQ provides strong encryption, remember that your security also depends on keeping your recovery key safe, using strong passwords, and being cautious about who you communicate with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGenericSection = (title: string, icon: React.ReactNode) => (
    <div className="space-y-6">
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          {icon}
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
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
        return renderAccountSettings();
      case 'profile':
        return renderProfileSettings();
      case 'sessions':
        return renderSessionsSettings();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'notifications':
        return renderNotifications();
      case 'voice-video':
        return renderVoiceVideoSettings();
      case 'labs':
        return renderLabsSection();
      case 'recovery-key-setup':
        return (
          <RecoveryKeySetup
            onComplete={handleRecoveryKeySetupComplete}
            onBack={handleBackToSettings}
            isFirstTime={false}
          />
        );
      case 'preferences':
        return renderGenericSection('Preferences', <Settings className="w-5 h-5 mr-2" />);
      case 'encryption':
        return renderGenericSection('Encryption', <Lock className="w-5 h-5 mr-2" />);
      case 'help':
        return renderGenericSection('Help and About', <HelpCircle className="w-5 h-5 mr-2" />);
      default:
        return renderMainSettings();
    }
  };

  // Don't render header and container for recovery key setup
  if (currentView === 'recovery-key-setup') {
    return renderCurrentView();
  }

  return (
    <div className="flex-content">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {currentView !== 'main' && (
            <button
              onClick={() => setCurrentView('main')}
              className="element-button-secondary p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {currentView === 'main' ? 'Settings' : 
             currentView === 'security-privacy' ? 'Security & Privacy' :
             currentView === 'voice-video' ? 'Voice & Video' :
             currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="settings-container settings-scrollbar p-4">
        {renderCurrentView()}
        
        {/* End marker */}
        <div className="text-center py-8">
          <p className="text-sm text-gray-400 dark:text-gray-600">End of settings</p>
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
        highlight ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`transition-colors flex-shrink-0 ${
          highlight 
            ? 'text-red-600' 
            : 'text-gray-600 dark:text-gray-400 group-hover:text-red-600'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
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
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
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
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-600'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`${selected ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
          {icon}
        </div>
        <div className="text-left">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600 ml-auto" />}
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
      <span className="text-sm text-gray-700 dark:text-gray-300">{title}</span>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span className={`text-sm font-medium ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {status}
        </span>
        {isActive && <Check className="w-4 h-4 text-green-600" />}
      </div>
    </div>
  );
};

export default SettingsPanel;