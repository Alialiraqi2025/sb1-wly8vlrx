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
  MapPin,
  Phone,
  Mail,
  Calendar,
  Download,
  UserX,
  Trash2,
  AlertTriangle,
  Volume2,
  Headphones,
  MicOff,
  VideoOff,
  Languages
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
    bio: 'Secure messaging enthusiast from Iraq 🇮🇶',
    location: 'Baghdad, Iraq',
    email: user.email,
    phone: '+964 770 123 4567'
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Preferences states
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [timezone, setTimezone] = useState('Asia/Baghdad');

  // Voice & Video states
  const [voiceSettings, setVoiceSettings] = useState({
    inputVolume: 75,
    outputVolume: 80,
    noiseSuppression: true,
    echoCancellation: true,
    autoGainControl: true
  });
  const [videoSettings, setVideoSettings] = useState({
    resolution: '720p',
    frameRate: 30,
    mirrorVideo: true,
    backgroundBlur: false
  });

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const score = Object.values(requirements).filter(Boolean).length;
    return { requirements, score, strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong' };
  };

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match');
      return;
    }
    
    const validation = validatePassword(passwordData.new);
    if (validation.score < 4) {
      alert('Password does not meet all requirements');
      return;
    }
    
    setIsChangingPassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
    // Here you would typically save to backend
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white username">{user.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-green-600 dark:text-green-400">Online</span>
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
          description="Language and timezone settings"
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
          description="Learn about encryption technology"
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
        <h4 className="text-base font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Profile Picture</h4>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex space-x-3">
              <button className="element-button">
                <Camera className="w-4 h-4" />
                Upload Photo
              </button>
              <button className="element-button-secondary">
                Remove
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              JPG, PNG or GIF. Max size 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h4>
          <button
            onClick={() => isEditingProfile ? handleProfileSave() : setIsEditingProfile(true)}
            className={isEditingProfile ? "element-button" : "element-button-secondary"}
          >
            {isEditingProfile ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Name
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.displayName}
                onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">{profileData.displayName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            {isEditingProfile ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                placeholder="Tell others about yourself..."
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{profileData.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Your location"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{profileData.location}</p>
            )}
          </div>
        </div>

        {isEditingProfile && (
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleProfileSave}
              className="element-button"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="element-button-secondary"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Personal Information</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</p>
                <p className="text-gray-900 dark:text-white">{profileData.email}</p>
              </div>
            </div>
            <button className="element-button-secondary text-sm">Change</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</p>
                <p className="text-gray-900 dark:text-white">{profileData.phone}</p>
              </div>
            </div>
            <button className="element-button-secondary text-sm">Change</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</p>
                <p className="text-gray-900 dark:text-white">January 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password & Security */}
      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Password & Security</h4>
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className={isChangingPassword ? "element-button-secondary" : "element-button"}
          >
            {isChangingPassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {isChangingPassword ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.current}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.new}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {passwordData.new && (
                <div className="mt-3">
                  <div className="space-y-2">
                    {Object.entries(validatePassword(passwordData.new).requirements).map(([key, met]) => (
                      <div key={key} className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {met ? <Check className="w-3 h-3" /> : <span className="w-2 h-2 bg-current rounded-full" />}
                        </div>
                        <span>
                          {key === 'length' && 'At least 8 characters'}
                          {key === 'uppercase' && 'One uppercase letter'}
                          {key === 'number' && 'One number'}
                          {key === 'special' && 'One special character'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Strength:</span>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        validatePassword(passwordData.new).strength === 'weak' ? 'bg-red-100 text-red-700' :
                        validatePassword(passwordData.new).strength === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {validatePassword(passwordData.new).strength.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {passwordData.confirm && passwordData.new !== passwordData.confirm && (
                <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={handlePasswordChange}
                disabled={!passwordData.current || !passwordData.new || !passwordData.confirm || passwordData.new !== passwordData.confirm}
                className="element-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({ current: '', new: '', confirm: '' });
                }}
                className="element-button-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</p>
                <p className="text-gray-500 text-sm">Last changed 30 days ago</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Strong</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-factor authentication</p>
                <p className="text-gray-500 text-sm">Add an extra layer of security</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Enabled</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Actions */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Account Actions</h4>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">Download My Data</p>
                <p className="text-sm text-gray-500">Export your account information</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <UserX className="w-5 h-5 text-yellow-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">Deactivate Account</p>
                <p className="text-sm text-gray-500">Temporarily disable your account</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <p className="font-medium text-red-900 dark:text-red-400">Delete Account</p>
                <p className="text-sm text-red-700 dark:text-red-500">Permanently delete your account and data</p>
              </div>
            </div>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Language Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
          <Languages className="w-5 h-5 mr-2" />
          Application Language
        </h4>
        <div className="space-y-3">
          <LanguageOption
            title="English"
            subtitle="English (US)"
            flag="🇺🇸"
            selected={language === 'en'}
            onClick={() => setLanguage('en')}
          />
          <LanguageOption
            title="العربية"
            subtitle="Arabic (Iraq)"
            flag="🇮🇶"
            selected={language === 'ar'}
            onClick={() => setLanguage('ar')}
          />
        </div>
      </div>

      {/* Timezone Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
          <Globe className="w-5 h-5 mr-2" />
          Time Zone
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select your timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="Asia/Baghdad">Baghdad (GMT+3)</option>
              <option value="Asia/Kuwait">Kuwait (GMT+3)</option>
              <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
              <option value="Asia/Dubai">Dubai (GMT+4)</option>
              <option value="Europe/London">London (GMT+0)</option>
              <option value="America/New_York">New York (GMT-5)</option>
              <option value="Europe/Berlin">Berlin (GMT+1)</option>
              <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
            </select>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-blue-900 dark:text-blue-400">Current Time</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {new Date().toLocaleString('en-US', { 
                    timeZone: timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display Time Format */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Display Format</h4>
        <div className="space-y-4">
          <ToggleItem
            title="24-hour time format"
            description="Display time in 24-hour format instead of 12-hour"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show seconds"
            description="Display seconds in timestamps"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Relative timestamps"
            description="Show 'just now', '5 minutes ago' instead of exact time"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderVoiceVideo = () => (
    <div className="space-y-6">
      {/* Voice Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
          <Mic className="w-5 h-5 mr-2" />
          Voice Settings
        </h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Volume2 className="w-4 h-4 inline mr-1" />
              Microphone Volume: {voiceSettings.inputVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={voiceSettings.inputVolume}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, inputVolume: parseInt(e.target.value) }))}
              className="w-full slider"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Headphones className="w-4 h-4 inline mr-1" />
              Speaker Volume: {voiceSettings.outputVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={voiceSettings.outputVolume}
              onChange={(e) => setVoiceSettings(prev => ({ ...prev, outputVolume: parseInt(e.target.value) }))}
              className="w-full slider"
            />
          </div>

          <div className="space-y-4">
            <ToggleItem
              title="Noise Suppression"
              description="Reduce background noise during calls"
              enabled={voiceSettings.noiseSuppression}
              onChange={(enabled) => setVoiceSettings(prev => ({ ...prev, noiseSuppression: enabled }))}
            />
            <ToggleItem
              title="Echo Cancellation"
              description="Prevent echo during voice calls"
              enabled={voiceSettings.echoCancellation}
              onChange={(enabled) => setVoiceSettings(prev => ({ ...prev, echoCancellation: enabled }))}
            />
            <ToggleItem
              title="Auto Gain Control"
              description="Automatically adjust microphone sensitivity"
              enabled={voiceSettings.autoGainControl}
              onChange={(enabled) => setVoiceSettings(prev => ({ ...prev, autoGainControl: enabled }))}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <MicOff className="w-5 h-5 text-blue-600" />
              <div>
                <h5 className="text-sm font-medium text-blue-900 dark:text-blue-400">Test Microphone</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300">Click to test your microphone settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
          <Video className="w-5 h-5 mr-2" />
          Video Settings
        </h4>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Video Resolution
            </label>
            <select
              value={videoSettings.resolution}
              onChange={(e) => setVideoSettings(prev => ({ ...prev, resolution: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="480p">480p (Standard)</option>
              <option value="720p">720p (HD)</option>
              <option value="1080p">1080p (Full HD)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Frame Rate: {videoSettings.frameRate} FPS
            </label>
            <input
              type="range"
              min="15"
              max="60"
              step="15"
              value={videoSettings.frameRate}
              onChange={(e) => setVideoSettings(prev => ({ ...prev, frameRate: parseInt(e.target.value) }))}
              className="w-full slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 FPS</span>
              <span>30 FPS</span>
              <span>45 FPS</span>
              <span>60 FPS</span>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleItem
              title="Mirror Video"
              description="Mirror your video preview (like a mirror)"
              enabled={videoSettings.mirrorVideo}
              onChange={(enabled) => setVideoSettings(prev => ({ ...prev, mirrorVideo: enabled }))}
            />
            <ToggleItem
              title="Background Blur"
              description="Blur your background during video calls"
              enabled={videoSettings.backgroundBlur}
              onChange={(enabled) => setVideoSettings(prev => ({ ...prev, backgroundBlur: enabled }))}
            />
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <VideoOff className="w-5 h-5 text-green-600" />
              <div>
                <h5 className="text-sm font-medium text-green-900 dark:text-green-400">Test Camera</h5>
                <p className="text-sm text-green-700 dark:text-green-300">Click to test your camera settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Call Settings</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-answer calls"
            description="Automatically answer incoming calls after 3 rings"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Call waiting"
            description="Allow incoming calls while on another call"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Push to talk"
            description="Hold spacebar to talk (mute by default)"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderLabs = () => (
    <div className="space-y-6">
      {/* Encryption Overview */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
          <Shield className="w-5 h-5 mr-2 text-green-600" />
          End-to-End Encryption
        </h4>
        
        <div className="space-y-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h5 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-2">
                  Your Messages Are Secure
                </h5>
                <p className="text-green-800 dark:text-green-300 leading-relaxed">
                  TELE IRAQ uses end-to-end encryption to ensure that only you and the person you're communicating with can read what is sent. Nobody in between, not even TELE IRAQ, can access your messages.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-4">How End-to-End Encryption Works</h5>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h6 className="font-medium text-gray-900 dark:text-white">Key Generation</h6>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    When you start a conversation, your device generates a unique pair of cryptographic keys - a public key and a private key.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h6 className="font-medium text-gray-900 dark:text-white">Key Exchange</h6>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Your device shares your public key with the recipient, while keeping your private key secret and secure on your device.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h6 className="font-medium text-gray-900 dark:text-white">Message Encryption</h6>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    When you send a message, it's encrypted using the recipient's public key, making it unreadable to anyone except the intended recipient.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h6 className="font-medium text-gray-900 dark:text-white">Message Decryption</h6>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Only the recipient can decrypt and read the message using their private key, which never leaves their device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Why Encryption Matters</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <h6 className="font-medium text-red-900 dark:text-red-400">Privacy Protection</h6>
                </div>
                <p className="text-red-800 dark:text-red-300 text-sm">
                  Prevents unauthorized access to your personal conversations and sensitive information.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h6 className="font-medium text-blue-900 dark:text-blue-400">Data Security</h6>
                </div>
                <p className="text-blue-800 dark:text-blue-300 text-sm">
                  Protects your messages from being intercepted during transmission over the internet.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Key className="w-5 h-5 text-green-600" />
                  <h6 className="font-medium text-green-900 dark:text-green-400">Identity Verification</h6>
                </div>
                <p className="text-green-800 dark:text-green-300 text-sm">
                  Ensures that messages come from the claimed sender and haven't been tampered with.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <h6 className="font-medium text-purple-900 dark:text-purple-400">Freedom of Speech</h6>
                </div>
                <p className="text-purple-800 dark:text-purple-300 text-sm">
                  Enables secure communication in regions where privacy and free speech are restricted.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h6 className="font-medium text-yellow-900 dark:text-yellow-400">Important Note</h6>
                <p className="text-yellow-800 dark:text-yellow-300 text-sm mt-1">
                  End-to-end encryption is automatically enabled for all conversations in TELE IRAQ. You don't need to do anything to activate it - your messages are secure by default.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Technical Implementation</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h6 className="font-medium text-gray-900 dark:text-white mb-2">Encryption Algorithm</h6>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              TELE IRAQ uses the Signal Protocol with AES-256 encryption and ECDH key exchange for maximum security.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h6 className="font-medium text-gray-900 dark:text-white mb-2">Perfect Forward Secrecy</h6>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Each message uses a unique encryption key, so even if one key is compromised, past and future messages remain secure.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h6 className="font-medium text-gray-900 dark:text-white mb-2">Open Source</h6>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Our encryption implementation is based on open-source protocols that have been audited by security experts worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityPrivacy = () => (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Display</h4>
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
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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

  const renderGenericSection = (title: string, icon: React.ReactNode) => (
    <div className="space-y-6">
      <div className="element-card p-6">
        <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
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
        return renderAccount();
      case 'preferences':
        return renderPreferences();
      case 'voice-video':
        return renderVoiceVideo();
      case 'labs':
        return renderLabs();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'notifications':
        return renderNotifications();
      case 'sessions':
        return renderGenericSection('Sessions', <Smartphone className="w-5 h-5 mr-2" />);
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
      {/* Header with improved contrast */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
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

      {/* Content with custom scrollbar */}
      <div className="settings-container settings-scrollbar p-4">
        {renderCurrentView()}
        
        {/* End marker */}
        <div className="text-center py-8">
          <p className="text-sm text-gray-400">End of settings</p>
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
        highlight ? 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : ''
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
        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
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
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-600'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{flag}</span>
        <div className="text-left flex-1">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
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
      <span className="text-sm text-gray-900 dark:text-white">{title}</span>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span className={`text-sm font-medium ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
          {status}
        </span>
        {isActive && <Check className="w-4 h-4 text-green-600" />}
      </div>
    </div>
  );
};

export default SettingsPanel;