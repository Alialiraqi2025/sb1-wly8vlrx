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
  AlertTriangle,
  Trash2,
  Save,
  X,
  QrCode,
  Plus,
  MoreVertical,
  MapPin,
  Clock,
  Wifi,
  LogOut,
  RefreshCw,
  Copy,
  CheckCircle
} from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

type SettingsView = 'main' | 'account' | 'sessions' | 'appearance' | 'notifications' | 'preferences' | 'keyboard' | 'sidebar' | 'voice-video' | 'security-privacy' | 'encryption' | 'labs' | 'help' | 'about';

interface Session {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'web';
  location: string;
  ipAddress: string;
  lastActive: Date;
  isCurrent: boolean;
  isVerified: boolean;
  browser?: string;
  os?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  
  // Sessions states
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [copiedQR, setCopiedQR] = useState(false);
  
  // Account form states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user.name,
    username: user.email.split('@')[0],
    email: user.email,
    phoneNumber: '+964 770 123 4567'
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

  // Demo sessions data
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 'current',
      deviceName: 'Chrome on Windows',
      deviceType: 'desktop',
      location: 'Baghdad, Iraq',
      ipAddress: '192.168.1.100',
      lastActive: new Date(),
      isCurrent: true,
      isVerified: true,
      browser: 'Chrome 120.0',
      os: 'Windows 11'
    },
    {
      id: 'mobile1',
      deviceName: 'iPhone 15 Pro',
      deviceType: 'mobile',
      location: 'Baghdad, Iraq',
      ipAddress: '192.168.1.101',
      lastActive: new Date(Date.now() - 1800000), // 30 minutes ago
      isCurrent: false,
      isVerified: true,
      browser: 'Safari Mobile',
      os: 'iOS 17.2'
    },
    {
      id: 'tablet1',
      deviceName: 'iPad Air',
      deviceType: 'tablet',
      location: 'Erbil, Iraq',
      ipAddress: '10.0.0.50',
      lastActive: new Date(Date.now() - 7200000), // 2 hours ago
      isCurrent: false,
      isVerified: true,
      browser: 'Safari',
      os: 'iPadOS 17.2'
    },
    {
      id: 'desktop2',
      deviceName: 'Firefox on Ubuntu',
      deviceType: 'desktop',
      location: 'Basra, Iraq',
      ipAddress: '203.0.113.45',
      lastActive: new Date(Date.now() - 86400000), // 1 day ago
      isCurrent: false,
      isVerified: false,
      browser: 'Firefox 121.0',
      os: 'Ubuntu 22.04'
    }
  ]);

  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    
    // Simulate QR code generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a secure session token for QR code
    const sessionToken = `TELE_IRAQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const qrData = JSON.stringify({
      app: 'TELE_IRAQ',
      action: 'link_device',
      token: sessionToken,
      userId: user.id,
      timestamp: Date.now(),
      expires: Date.now() + 300000 // 5 minutes
    });
    
    setQrCodeData(qrData);
    setShowQRCode(true);
    setIsGeneratingQR(false);
    
    // Auto-hide QR code after 5 minutes
    setTimeout(() => {
      setShowQRCode(false);
      setQrCodeData('');
    }, 300000);
  };

  const copyQRData = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeData);
      setCopiedQR(true);
      setTimeout(() => setCopiedQR(false), 2000);
    } catch (err) {
      console.error('Failed to copy QR data:', err);
    }
  };

  const terminateSession = (sessionId: string) => {
    if (sessionId === 'current') {
      alert('Cannot terminate current session. Please sign out instead.');
      return;
    }
    
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    alert('Session terminated successfully.');
  };

  const verifySession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, isVerified: true }
        : session
    ));
    alert('Session verified successfully.');
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Monitor className="w-5 h-5" />;
      case 'desktop':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Active now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return `${Math.floor(diff / 86400000)} days ago`;
  };

  const handleProfileSave = () => {
    // Here you would typically save to your backend/database
    console.log('Saving profile data:', profileData);
    setIsEditingProfile(false);
    // Show success message
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // Here you would typically validate current password and update
    console.log('Changing password...');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
    alert('Password changed successfully!');
  };

  const handleDeactivateAccount = () => {
    // Here you would typically:
    // 1. Send deactivation request to server
    // 2. Clear local storage
    // 3. Redirect to login
    console.log('Deactivating account...');
    localStorage.clear();
    alert('Account deactivated successfully. You will be redirected to login.');
    window.location.reload();
  };

  const handleProfilePictureChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Here you would typically upload the file
        console.log('Uploading profile picture:', file.name);
        alert('Profile picture updated successfully!');
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
          icon={<Keyboard className="w-5 h-5" />}
          title="Keyboard"
          description="Keyboard shortcuts and settings"
          onClick={() => setCurrentView('keyboard')}
        />
        
        <SettingItem
          icon={<Sidebar className="w-5 h-5" />}
          title="Sidebar"
          description="Customize sidebar behavior"
          onClick={() => setCurrentView('sidebar')}
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

  const renderSessions = () => (
    <div className="space-y-6">
      {/* Link New Device Section */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Link New Device
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Use a QR code to sign in to TELE IRAQ on another device and set up secure messaging.
        </p>
        
        {!showQRCode ? (
          <button
            onClick={generateQRCode}
            disabled={isGeneratingQR}
            className="element-button flex items-center space-x-2 w-full justify-center"
          >
            {isGeneratingQR ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating QR Code...</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Generate QR Code</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-4">
            {/* QR Code Display */}
            <div className="bg-white p-6 rounded-lg border-2 border-red-200 text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-red-700">QR Code</p>
                  <p className="text-xs text-red-600">Scan with your device</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">Scan this QR code with your new device</p>
                <p className="text-xs text-gray-500">Code expires in 5 minutes</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">📱 How to link your device:</h5>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Open TELE IRAQ on your new device</li>
                <li>Tap "Link with QR Code" on the login screen</li>
                <li>Scan this QR code with your device camera</li>
                <li>Confirm the link on both devices</li>
                <li>Your messages will sync automatically</li>
              </ol>
            </div>

            {/* QR Code Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={copyQRData}
                className="element-button-secondary flex items-center space-x-2 flex-1"
              >
                {copiedQR ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowQRCode(false);
                  setQrCodeData('');
                }}
                className="element-button-secondary flex items-center space-x-2 flex-1"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>

            {/* Security Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-red-900">Security Notice</h5>
                  <p className="text-sm text-red-700 mt-1">
                    Only scan this QR code on devices you trust. The link will expire automatically in 5 minutes for your security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Session */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Current Session
        </h4>
        
        {sessions.filter(session => session.isCurrent).map(session => (
          <div key={session.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-green-600">
                  {getDeviceIcon(session.deviceType)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-semibold text-green-900">{session.deviceName}</h5>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Current</span>
                    {session.isVerified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-green-700">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-3 h-3" />
                      <span>{session.ipAddress}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{formatLastActive(session.lastActive)}</span>
                    </div>
                    {session.browser && (
                      <div className="text-xs text-green-600">
                        {session.browser} • {session.os}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Sessions */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2" />
          Other Sessions ({sessions.filter(session => !session.isCurrent).length})
        </h4>
        
        {sessions.filter(session => !session.isCurrent).length === 0 ? (
          <div className="text-center py-8">
            <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No other active sessions</p>
            <p className="text-sm text-gray-400">Use the QR code above to link a new device</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.filter(session => !session.isCurrent).map(session => (
              <div key={session.id} className={`border rounded-lg p-4 ${
                session.isVerified ? 'border-gray-200 bg-white' : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`${session.isVerified ? 'text-gray-600' : 'text-yellow-600'}`}>
                      {getDeviceIcon(session.deviceType)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-semibold text-gray-900">{session.deviceName}</h5>
                        {session.isVerified ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wifi className="w-3 h-3" />
                          <span>{session.ipAddress}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3" />
                          <span>{formatLastActive(session.lastActive)}</span>
                        </div>
                        {session.browser && (
                          <div className="text-xs text-gray-500">
                            {session.browser} • {session.os}
                          </div>
                        )}
                      </div>
                      {!session.isVerified && (
                        <div className="mt-2 text-sm text-yellow-700">
                          ⚠️ Unverified session - verify or terminate if not recognized
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!session.isVerified && (
                      <button
                        onClick={() => verifySession(session.id)}
                        className="text-green-600 hover:text-green-700 p-1"
                        title="Verify session"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => terminateSession(session.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Terminate session"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-red-900">Session Security</h5>
                  <p className="text-sm text-red-700 mt-1">
                    If you see any sessions you don't recognize, terminate them immediately and change your password.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Session Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Session Settings
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-verify trusted devices"
            description="Automatically verify devices from known locations"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Session notifications"
            description="Get notified when new devices sign in"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto-terminate inactive sessions"
            description="Automatically sign out devices after 30 days of inactivity"
            enabled={false}
            onChange={() => {}}
          />
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to terminate all other sessions? This will sign out all your other devices.')) {
                  setSessions(prev => prev.filter(session => session.isCurrent));
                  alert('All other sessions terminated successfully.');
                }
              }}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate All Other Sessions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-6 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Profile Information
        </h4>
        
        {/* Profile Picture */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="element-avatar-large">
              {profileData.displayName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleProfilePictureChange}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900">Profile Picture</h5>
            <p className="text-sm text-gray-500">Click the camera icon to change your picture</p>
          </div>
        </div>

        {/* Display Name and Username */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={profileData.displayName}
                onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                disabled={!isEditingProfile}
                className="flex-1 element-input disabled:bg-gray-50 disabled:text-gray-500"
              />
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="element-button-secondary p-2"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                disabled={!isEditingProfile}
                className="flex-1 element-input disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {isEditingProfile && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handleProfileSave}
                className="element-button flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => {
                  setIsEditingProfile(false);
                  setProfileData({
                    displayName: user.name,
                    username: user.email.split('@')[0],
                    email: user.email,
                    phoneNumber: '+964 770 123 4567'
                  });
                }}
                className="element-button-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-6 flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Personal Information
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditingProfile}
                className="w-full pl-10 element-input disabled:bg-gray-50 disabled:text-gray-500"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                disabled={!isEditingProfile}
                className="w-full pl-10 element-input disabled:bg-gray-50 disabled:text-gray-500"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Password Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-6 flex items-center">
          <Key className="w-5 h-5 mr-2" />
          Password & Security
        </h4>
        
        {!isChangingPassword ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Password</h5>
                <p className="text-sm text-gray-500">Last changed 30 days ago</p>
              </div>
              <button
                onClick={() => setIsChangingPassword(true)}
                className="element-button"
              >
                Change Password
              </button>
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
                  className="w-full pr-10 element-input"
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
                  className="w-full pr-10 element-input"
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
                  className="w-full pr-10 element-input"
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

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePasswordChange}
                className="element-button flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Password</span>
              </button>
              <button
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                className="element-button-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Password Requirements:</strong> At least 8 characters long, include uppercase, lowercase, numbers, and special characters.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sign Out */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Session Management
        </h4>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h5 className="font-medium text-gray-900">Sign Out</h5>
            <p className="text-sm text-gray-500">Sign out from this device</p>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="element-button-secondary text-red-600 border-red-200 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="element-card p-6 border-red-200 bg-red-50">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Danger Zone
        </h4>
        
        {!showDeactivateConfirm ? (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-red-200 rounded-lg">
              <h5 className="font-medium text-red-900 mb-2">Deactivate Account</h5>
              <p className="text-sm text-red-700 mb-4">
                This will permanently deactivate your account and remove all your data from our servers. 
                This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeactivateConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Deactivate Account</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-white border border-red-200 rounded-lg">
              <h5 className="font-medium text-red-900 mb-2">⚠️ Confirm Account Deactivation</h5>
              <p className="text-sm text-red-700 mb-4">
                Are you absolutely sure you want to deactivate your account? This will:
              </p>
              <ul className="text-sm text-red-700 mb-4 list-disc list-inside space-y-1">
                <li>Permanently delete all your messages and data</li>
                <li>Remove your account from all conversations</li>
                <li>Clear all local storage and session data</li>
                <li>Make your account unrecoverable</li>
              </ul>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDeactivateAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Yes, Deactivate My Account</span>
                </button>
                <button
                  onClick={() => setShowDeactivateConfirm(false)}
                  className="element-button-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSecurityPrivacy = () => (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
    <div className="space-y-6">
      <div className="element-card p-6">
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
        <h4 className="text-lg font-bold text-red-600 mb-4">Display</h4>
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
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
        <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center">
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
      case 'sessions':
        return renderSessions();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'notifications':
        return renderNotifications();
      case 'preferences':
        return renderGenericSection('Preferences', <Settings className="w-5 h-5 mr-2" />);
      case 'keyboard':
        return renderGenericSection('Keyboard', <Keyboard className="w-5 h-5 mr-2" />);
      case 'sidebar':
        return renderGenericSection('Sidebar', <Sidebar className="w-5 h-5 mr-2" />);
      case 'voice-video':
        return renderGenericSection('Voice & Video', <Video className="w-5 h-5 mr-2" />);
      case 'encryption':
        return renderGenericSection('Encryption', <Lock className="w-5 h-5 mr-2" />);
      case 'labs':
        return renderGenericSection('Labs', <TestTube className="w-5 h-5 mr-2" />);
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
          <h2 className="text-2xl font-bold text-red-600">
            {currentView === 'main' ? 'Settings' : 
             currentView === 'security-privacy' ? 'Security & Privacy' :
             currentView === 'voice-video' ? 'Voice & Video' :
             currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
          </h2>
        </div>
      </div>

      {/* Content with Enhanced Scrollbar */}
      <div className={`settings-container flex-1 overflow-y-auto p-4 ${
        currentView === 'account' ? 'account-scrollbar' : 'settings-scrollbar'
      }`}>
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