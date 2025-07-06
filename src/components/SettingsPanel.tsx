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

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  const [currentSection, setCurrentSection] = useState<SettingsSection>('main');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showRecoveryKeySetup, setShowRecoveryKeySetup] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: 'Secure messaging enthusiast',
    avatar: null as string | null
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
  const [notifications, setNotifications] = useState({
    messages: true,
    calls: true,
    groups: true,
    mentions: true,
    sounds: true,
    vibration: true,
    preview: true,
    badge: true
  });
  const [privacy, setPrivacy] = useState({
    readReceipts: true,
    lastSeen: true,
    profilePhoto: 'everyone',
    status: 'contacts',
    typing: true,
    onlineStatus: true
  });
  const [appearance, setAppearance] = useState({
    theme: 'system',
    fontSize: 'medium',
    chatWallpaper: 'default',
    animations: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrorMessage('Photo size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
        setSuccessMessage('Photo uploaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileData(prev => ({
      ...prev,
      avatar: null
    }));
    setSuccessMessage('Photo removed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate data
      if (!profileData.name.trim()) {
        throw new Error('Name is required');
      }
      
      if (!profileData.email.trim() || !profileData.email.includes('@')) {
        throw new Error('Valid email is required');
      }
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditingProfile(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Validate passwords
      if (!passwordData.currentPassword) {
        throw new Error('Current password is required');
      }
      
      if (passwordData.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters');
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage('Password changed successfully!');
      setShowPasswordChange(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoveryKeySetupComplete = (recoveryKey: string) => {
    setShowRecoveryKeySetup(false);
    setSuccessMessage('Recovery key set up successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const mainMenuItems = [
    {
      id: 'profile' as SettingsSection,
      icon: User,
      title: 'Profile',
      description: 'Edit your profile information and photo',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'account' as SettingsSection,
      icon: Mail,
      title: 'Account',
      description: 'Manage your account settings and preferences',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'security' as SettingsSection,
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Password, recovery key, and privacy controls',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 'notifications' as SettingsSection,
      icon: Bell,
      title: 'Notifications',
      description: 'Manage notification preferences and sounds',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'appearance' as SettingsSection,
      icon: Palette,
      title: 'Appearance',
      description: 'Theme, font size, and visual preferences',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'devices' as SettingsSection,
      icon: Smartphone,
      title: 'Devices',
      description: 'Manage linked devices and sessions',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      id: 'language' as SettingsSection,
      icon: Languages,
      title: 'Language & Region',
      description: 'Language, time zone, and regional settings',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      id: 'help' as SettingsSection,
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help, report issues, and contact support',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'about' as SettingsSection,
      icon: Info,
      title: 'About',
      description: 'App version, terms, and privacy policy',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  const renderHeader = (title: string, subtitle?: string) => (
    <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        {currentSection !== 'main' && (
          <button
            onClick={() => setCurrentSection('main')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-red-600" />
            {title}
          </h2>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const renderSuccessError = () => (
    (successMessage || errorMessage) && (
      <div className="flex-shrink-0 p-4">
        <div className={`p-4 rounded-lg border ${
          successMessage 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center">
            {successMessage ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertTriangle className="w-5 h-5 mr-2" />
            )}
            <span className="font-medium">
              {successMessage || errorMessage}
            </span>
          </div>
        </div>
      </div>
    )
  );

  const renderMainMenu = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Settings', 'Manage your account and preferences')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6">
          {/* User Info Card */}
          <div className="element-card p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-sm text-green-600 font-medium">Online</p>
              </div>
              <button
                onClick={() => setCurrentSection('profile')}
                className="element-button-secondary"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="space-y-3">
            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className="w-full p-4 element-card hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </div>
              </button>
            ))}
            
            {/* Demo settings items for scrolling */}
            {Array.from({ length: 8 }, (_, i) => (
              <div key={`demo-${i}`} className="w-full p-4 element-card hover:shadow-md transition-all duration-200 text-left group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                      Demo Setting {i + 1}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-500 line-clamp-2">
                      This is a demo setting item to show scrolling functionality in the settings panel.
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Profile', 'Edit your profile information and photo')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="element-button-secondary"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="element-button-secondary"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="element-button"
                >
                  {isLoading ? (
                    <div className="element-spinner"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Profile Photo */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-red-600" />
              Profile Photo
            </h4>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {isEditingProfile && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {isEditingProfile && (
                <div className="flex-1 space-y-3">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="element-button-secondary"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </button>
                    {profileData.avatar && (
                      <button
                        onClick={handleRemovePhoto}
                        className="element-button-secondary text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Recommended: Square image, at least 200x200px, max 5MB
                  </p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          {/* Profile Details */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-red-600" />
              Personal Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="element-input"
                    placeholder="Enter your display name"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profileData.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="element-input"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditingProfile ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="element-input h-20 resize-none"
                    placeholder="Tell others about yourself"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Demo content for scrolling */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Additional Profile Options</h4>
            <div className="space-y-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Profile Option {i + 1}</h5>
                    <p className="text-sm text-gray-600">Demo profile setting for scrolling test</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Security & Privacy', 'Manage your security settings and privacy controls')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6 space-y-6">
          {/* Password Change */}
          <div className="element-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-red-600" />
                Password
              </h4>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="element-button-secondary"
              >
                <Lock className="w-4 h-4" />
                Change Password
              </button>
            </div>
            
            {showPasswordChange && (
              <div className="space-y-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="element-input pr-12"
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
                      className="element-input pr-12"
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
                      className="element-input pr-12"
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
                
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setShowPasswordChange(false)}
                    className="flex-1 element-button-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex-1 element-button"
                  >
                    {isLoading ? (
                      <div className="element-spinner"></div>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recovery Key */}
          <div className="element-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Key className="w-5 h-5 mr-2 text-red-600" />
                Recovery Key
              </h4>
              <div className="flex space-x-2">
                {user.recoveryKey ? (
                  <>
                    <button
                      onClick={() => setShowRecoveryKeySetup(true)}
                      className="element-button-secondary"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </button>
                    <button
                      onClick={() => {
                        // Download recovery key
                        const content = `TELE IRAQ Recovery Key\nGenerated: ${new Date().toLocaleString()}\n\nRecovery Key: ${user.recoveryKey}\n\nKeep this key safe and secure!`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `TELE-IRAQ-Recovery-Key-${Date.now()}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="element-button-secondary"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowRecoveryKeySetup(true)}
                    className="element-button"
                  >
                    <Key className="w-4 h-4" />
                    Set Up Recovery Key
                  </button>
                )}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${user.recoveryKey ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-start space-x-3">
                {user.recoveryKey ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                )}
                <div>
                  <h5 className={`font-medium ${user.recoveryKey ? 'text-green-900' : 'text-amber-900'}`}>
                    {user.recoveryKey ? 'Recovery Key Active' : 'No Recovery Key'}
                  </h5>
                  <p className={`text-sm ${user.recoveryKey ? 'text-green-700' : 'text-amber-700'}`}>
                    {user.recoveryKey 
                      ? 'Your account is protected with a recovery key for device verification.'
                      : 'Set up a recovery key to secure your account and verify new devices.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              Privacy Controls
            </h4>
            
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {key === 'readReceipts' && 'Show when you have read messages'}
                      {key === 'lastSeen' && 'Show when you were last online'}
                      {key === 'profilePhoto' && 'Who can see your profile photo'}
                      {key === 'status' && 'Who can see your status updates'}
                      {key === 'typing' && 'Show when you are typing'}
                      {key === 'onlineStatus' && 'Show your online status'}
                    </p>
                  </div>
                  {typeof value === 'boolean' ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  ) : (
                    <select
                      value={value}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.value }))}
                      className="element-input w-32"
                    >
                      <option value="everyone">Everyone</option>
                      <option value="contacts">Contacts</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Demo security settings for scrolling */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Advanced Security</h4>
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Security Feature {i + 1}</h5>
                    <p className="text-sm text-gray-600">Demo security setting for scrolling test</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Notifications', 'Manage notification preferences and sounds')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6 space-y-6">
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-red-600" />
              Notification Preferences
            </h4>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {key === 'messages' && 'Get notified when you receive new messages'}
                      {key === 'calls' && 'Get notified for incoming voice and video calls'}
                      {key === 'groups' && 'Get notified for group messages and activities'}
                      {key === 'mentions' && 'Get notified when someone mentions you'}
                      {key === 'sounds' && 'Play notification sounds'}
                      {key === 'vibration' && 'Vibrate for notifications on mobile devices'}
                      {key === 'preview' && 'Show message preview in notifications'}
                      {key === 'badge' && 'Show unread count badge on app icon'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Demo notification settings for scrolling */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Notification Sounds</h4>
            <div className="space-y-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">Sound Option {i + 1}</h5>
                    <p className="text-sm text-gray-600">Demo notification sound setting</p>
                  </div>
                  <select className="element-input w-32">
                    <option>Default</option>
                    <option>Chime</option>
                    <option>Bell</option>
                    <option>None</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Appearance', 'Customize the look and feel of the app')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6 space-y-6">
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-red-600" />
              Visual Preferences
            </h4>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['light', 'dark', 'system'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setAppearance(prev => ({ ...prev, theme }))}
                      className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        appearance.theme === theme
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full ${
                        theme === 'light' ? 'bg-white border-2 border-gray-300' :
                        theme === 'dark' ? 'bg-gray-800' :
                        'bg-gradient-to-r from-white to-gray-800'
                      }`}></div>
                      <span className="text-sm font-medium capitalize">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Font Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setAppearance(prev => ({ ...prev, fontSize: size }))}
                      className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                        appearance.fontSize === size
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`block mb-2 font-medium ${
                        size === 'small' ? 'text-sm' :
                        size === 'medium' ? 'text-base' :
                        'text-lg'
                      }`}>Aa</span>
                      <span className="text-sm capitalize">{size}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">Animations</h5>
                  <p className="text-sm text-gray-600">Enable smooth animations and transitions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appearance.animations}
                    onChange={(e) => setAppearance(prev => ({ ...prev, animations: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Demo appearance settings for scrolling */}
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Chat Appearance</h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Chat Bubble Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {['rounded', 'square', 'minimal', 'classic'].map((style) => (
                    <button
                      key={style}
                      className="p-4 border-2 border-gray-200 hover:border-gray-300 rounded-lg text-center transition-all duration-200"
                    >
                      <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded"></div>
                      <span className="text-sm font-medium capitalize">{style}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDevicesSection = () => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader('Devices', 'Manage your linked devices and active sessions')}
      {renderSuccessError()}
      
      <div className="flex-1 overflow-y-auto settings-scrollbar">
        <div className="p-6 space-y-6">
          <div className="element-card p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-red-600" />
              Active Devices
            </h4>
            
            <div className="space-y-4">
              {/* Current Device */}
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-green-900">This Device</h5>
                    <p className="text-sm text-green-700">Desktop Computer • Active now</p>
                    <p className="text-xs text-green-600">Current session</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Other Devices */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">iPhone 14</h5>
                    <p className="text-sm text-gray-600">Mobile • Last seen 2 hours ago</p>
                    <p className="text-xs text-gray-500">Baghdad, Iraq</p>
                  </div>
                  <button className="element-button-secondary text-red-600 hover:bg-red-50">
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Tablet className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">iPad Pro</h5>
                    <p className="text-sm text-gray-600">Tablet • Last seen yesterday</p>
                    <p className="text-xs text-gray-500">Erbil, Iraq</p>
                  </div>
                  <button className="element-button-secondary text-red-600 hover:bg-red-50">
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Demo devices for scrolling */}
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">Demo Device {i + 1}</h5>
                      <p className="text-sm text-gray-600">Desktop • Last seen {i + 1} days ago</p>
                      <p className="text-xs text-gray-500">Location: Demo City</p>
                    </div>
                    <button className="element-button-secondary text-red-600 hover:bg-red-50">
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full element-button-secondary text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
                Sign Out All Other Devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderSection = (title: string, icon: React.ElementType, description: string) => (
    <div className="h-full flex flex-col bg-white">
      {renderHeader(title, description)}
      
      <div className="flex-1 flex items-center justify-center overflow-y-auto settings-scrollbar">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {React.createElement(icon, { className: "w-8 h-8 text-gray-400" })}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-8">Coming soon...</p>
          
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

  if (showRecoveryKeySetup) {
    return (
      <RecoveryKeySetup
        onComplete={handleRecoveryKeySetupComplete}
        onBack={() => setShowRecoveryKeySetup(false)}
        isFirstTime={!user.recoveryKey}
      />
    );
  }

  // Render different sections
  switch (currentSection) {
    case 'main':
      return renderMainMenu();
    case 'profile':
      return renderProfileSection();
    case 'security':
      return renderSecuritySection();
    case 'notifications':
      return renderNotificationsSection();
    case 'appearance':
      return renderAppearanceSection();
    case 'devices':
      return renderDevicesSection();
    case 'account':
      return renderPlaceholderSection('Account', Mail, 'Manage your account settings and preferences');
    case 'privacy':
      return renderPlaceholderSection('Privacy', Lock, 'Advanced privacy controls and settings');
    case 'language':
      return renderPlaceholderSection('Language & Region', Languages, 'Language, time zone, and regional settings');
    case 'help':
      return renderPlaceholderSection('Help & Support', HelpCircle, 'Get help, report issues, and contact support');
    case 'about':
      return renderPlaceholderSection('About', Info, 'App version, terms, and privacy policy');
    default:
      return renderMainMenu();
  }
};

export default SettingsPanel;