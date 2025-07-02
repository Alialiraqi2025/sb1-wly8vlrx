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
  RefreshCw
} from 'lucide-react';
import { User as UserType } from '../types';
import RecoveryKeySetup from './RecoveryKeySetup';

interface SettingsPanelProps {
  user: UserType;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications' | 'privacy' | 'devices'>('profile');
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
    vibration: true
  });
  const [privacy, setPrivacy] = useState({
    readReceipts: true,
    lastSeen: true,
    profilePhoto: 'everyone',
    status: 'contacts'
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

  const renderProfileSection = () => (
    <div className="space-y-6">
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
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Security & Privacy</h3>
      
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
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
      
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

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-red-600" />
              Settings
            </h2>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {(successMessage || errorMessage) && (
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
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50">
          <nav className="p-4 space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy', icon: Lock },
              { id: 'devices', label: 'Devices', icon: Smartphone }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeSection === id
                    ? 'bg-red-100 text-red-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto settings-scrollbar">
          <div className="p-6">
            {activeSection === 'profile' && renderProfileSection()}
            {activeSection === 'security' && renderSecuritySection()}
            {activeSection === 'notifications' && renderNotificationsSection()}
            {activeSection === 'privacy' && (
              <div className="text-center py-12">
                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Settings</h3>
                <p className="text-gray-600">Privacy controls coming soon...</p>
              </div>
            )}
            {activeSection === 'devices' && (
              <div className="text-center py-12">
                <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Device Management</h3>
                <p className="text-gray-600">Device management coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;