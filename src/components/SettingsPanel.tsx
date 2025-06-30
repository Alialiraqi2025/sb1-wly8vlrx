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
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  Headphones,
  MicOff,
  VideoOff,
  Languages,
  Clock,
  QrCode,
  LogOut,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Database,
  Server,
  Wifi,
  WifiOff,
  Fingerprint,
  ShieldCheck,
  ShieldAlert,
  BookOpen,
  Lightbulb,
  Brain,
  Target,
  Users,
  MessageSquare,
  Phone,
  FileText,
  Image,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume1,
  Volume,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Copy,
  ExternalLink,
  Share2,
  Heart,
  ThumbsUp,
  Flag,
  AlertCircle,
  HelpCircle as Help
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
  const [messageLayout, setMessageLayout] = useState<'modern' | 'bubbles' | 'irc'>('modern');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [timezone, setTimezone] = useState('UTC+3 (Baghdad)');
  const [micVolume, setMicVolume] = useState(75);
  const [speakerVolume, setSpeakerVolume] = useState(80);
  const [cameraQuality, setCameraQuality] = useState<'720p' | '1080p' | '4k'>('1080p');
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);

  // Mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
        
        {!isMobile && (
          <>
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
          </>
        )}
        
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
          description="Learn about encryption & experimental features"
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
      {/* Current Session */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-green-600" />
          Current Session
        </h4>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-medium text-green-900">This Device</h5>
                <p className="text-sm text-green-700">Chrome on Windows • Active now</p>
                <p className="text-xs text-green-600">IP: 192.168.1.100 • Baghdad, Iraq</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Link New Device */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <QrCode className="w-5 h-5 mr-2" />
          Link New Device
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Scan this QR code with TELE IRAQ on your other device to sign in securely
        </p>
        
        {/* QR Code Placeholder */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
          <QrCode className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <p className="text-sm text-gray-500">QR Code will appear here</p>
          <p className="text-xs text-gray-400 mt-2">Valid for 5 minutes</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="element-button flex-1">
            <RefreshCw className="w-4 h-4" />
            Generate QR Code
          </button>
          <button className="element-button-secondary">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Other Sessions */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Other Sessions
        </h4>
        
        <div className="space-y-3">
          <SessionItem
            device="iPhone 14 Pro"
            location="Baghdad, Iraq"
            lastActive="2 hours ago"
            isActive={false}
          />
          <SessionItem
            device="MacBook Pro"
            location="Erbil, Iraq"
            lastActive="1 day ago"
            isActive={false}
          />
        </div>
        
        <button className="element-button-secondary w-full mt-4 text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          Sign out all other sessions
        </button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
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
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Message Layout
        </h4>
        <div className="space-y-3">
          <MessageLayoutOption
            title="Modern"
            description="Clean, modern message design"
            selected={messageLayout === 'modern'}
            onClick={() => setMessageLayout('modern')}
          />
          <MessageLayoutOption
            title="Message Bubbles"
            description="Traditional chat bubbles"
            selected={messageLayout === 'bubbles'}
            onClick={() => setMessageLayout('bubbles')}
          />
          <MessageLayoutOption
            title="IRC (Experimental)"
            description="Classic IRC-style layout"
            selected={messageLayout === 'irc'}
            onClick={() => setMessageLayout('irc')}
            experimental={true}
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Font Size
        </h4>
        <div className="space-y-3">
          <FontSizeOption
            title="Small"
            description="Compact text for more content"
            selected={fontSize === 'small'}
            onClick={() => setFontSize('small')}
            preview="Small text preview"
          />
          <FontSizeOption
            title="Medium"
            description="Default comfortable reading size"
            selected={fontSize === 'medium'}
            onClick={() => setFontSize('medium')}
            preview="Medium text preview"
          />
          <FontSizeOption
            title="Large"
            description="Larger text for better readability"
            selected={fontSize === 'large'}
            onClick={() => setFontSize('large')}
            preview="Large text preview"
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

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Language Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Languages className="w-5 h-5 mr-2" />
          Application Language
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Choose your preferred interface language
        </p>
        <div className="space-y-3">
          <LanguageOption
            title="English"
            nativeTitle="English"
            flag="🇺🇸"
            selected={language === 'en'}
            onClick={() => setLanguage('en')}
          />
          <LanguageOption
            title="Arabic"
            nativeTitle="العربية"
            flag="🇮🇶"
            selected={language === 'ar'}
            onClick={() => setLanguage('ar')}
          />
        </div>
      </div>

      {/* Time Zone Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Display Time
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Set your time zone for accurate message timestamps
        </p>
        
        <div className="space-y-3">
          <TimezoneOption
            title="Baghdad Time"
            timezone="UTC+3 (Baghdad)"
            selected={timezone === 'UTC+3 (Baghdad)'}
            onClick={() => setTimezone('UTC+3 (Baghdad)')}
          />
          <TimezoneOption
            title="Erbil Time"
            timezone="UTC+3 (Erbil)"
            selected={timezone === 'UTC+3 (Erbil)'}
            onClick={() => setTimezone('UTC+3 (Erbil)')}
          />
          <TimezoneOption
            title="Basra Time"
            timezone="UTC+3 (Basra)"
            selected={timezone === 'UTC+3 (Basra)'}
            onClick={() => setTimezone('UTC+3 (Basra)')}
          />
          <TimezoneOption
            title="System Time"
            timezone="Follow system timezone"
            selected={timezone === 'system'}
            onClick={() => setTimezone('system')}
          />
        </div>
      </div>

      {/* General Preferences */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">General</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-start on boot"
            description="Launch TELE IRAQ when your device starts"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Minimize to system tray"
            description="Keep TELE IRAQ running in the background"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Send typing indicators"
            description="Let others see when you're typing"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto-download media"
            description="Automatically download images and files"
            enabled={false}
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
        <h4 className="element-text font-semibold mb-6 flex items-center">
          <Mic className="w-5 h-5 mr-2" />
          Voice Settings
        </h4>
        
        {/* Microphone Volume */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="element-text font-medium">Microphone Volume</label>
              <span className="element-text-small text-gray-500">{micVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={micVolume}
              onChange={(e) => setMicVolume(Number(e.target.value))}
              className="slider w-full"
            />
          </div>

          {/* Speaker Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="element-text font-medium">Speaker Volume</label>
              <span className="element-text-small text-gray-500">{speakerVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={speakerVolume}
              onChange={(e) => setSpeakerVolume(Number(e.target.value))}
              className="slider w-full"
            />
          </div>

          {/* Voice Enhancement */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <ToggleItem
              title="Auto Gain Control"
              description="Automatically adjust microphone sensitivity"
              enabled={autoGainControl}
              onChange={setAutoGainControl}
            />
            <ToggleItem
              title="Noise Suppression"
              description="Reduce background noise during calls"
              enabled={noiseSuppression}
              onChange={setNoiseSuppression}
            />
            <ToggleItem
              title="Echo Cancellation"
              description="Prevent audio feedback and echo"
              enabled={echoCancellation}
              onChange={setEchoCancellation}
            />
          </div>
        </div>
      </div>

      {/* Video Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-6 flex items-center">
          <Video className="w-5 h-5 mr-2" />
          Video Settings
        </h4>
        
        <div className="space-y-4">
          {/* Camera Quality */}
          <div>
            <label className="element-text font-medium mb-3 block">Camera Quality</label>
            <div className="space-y-2">
              <CameraQualityOption
                title="720p HD"
                description="Good quality, lower bandwidth"
                selected={cameraQuality === '720p'}
                onClick={() => setCameraQuality('720p')}
              />
              <CameraQualityOption
                title="1080p Full HD"
                description="High quality, recommended"
                selected={cameraQuality === '1080p'}
                onClick={() => setCameraQuality('1080p')}
              />
              <CameraQualityOption
                title="4K Ultra HD"
                description="Best quality, high bandwidth required"
                selected={cameraQuality === '4k'}
                onClick={() => setCameraQuality('4k')}
              />
            </div>
          </div>

          {/* Video Preferences */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <ToggleItem
              title="Start video calls with camera on"
              description="Automatically enable camera when starting video calls"
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
              title="Hardware acceleration"
              description="Use GPU for better video performance"
              enabled={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Test Audio/Video */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <TestTube className="w-5 h-5 mr-2" />
          Test Your Setup
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Test your microphone and camera before making calls
        </p>
        <div className="flex space-x-3">
          <button className="element-button-secondary flex-1">
            <Mic className="w-4 h-4" />
            Test Microphone
          </button>
          <button className="element-button-secondary flex-1">
            <Video className="w-4 h-4" />
            Test Camera
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecurityPrivacy = () => (
    <div className="space-y-6">
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

  const renderNotifications = () => (
    <div className="space-y-6">
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

  const renderLabs = () => (
    <div className="space-y-6">
      {/* Encryption Education */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-3 text-green-600" />
          Understanding End-to-End Encryption
        </h4>
        
        {/* What is E2E Encryption */}
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-2">What is End-to-End Encryption?</h5>
              <p className="element-text text-gray-700 leading-relaxed">
                End-to-end encryption (E2E) is a security method where only you and the person you're communicating with can read your messages. Nobody else, including TELE IRAQ, governments, or hackers, can access your conversations.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3">How Does It Work?</h5>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Key className="w-5 h-5 text-green-600" />
                    <span className="font-medium">1. Key Generation</span>
                  </div>
                  <p className="element-text-small text-gray-600 ml-8">
                    Your device creates a unique pair of cryptographic keys - one public, one private.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">2. Message Encryption</span>
                  </div>
                  <p className="element-text-small text-gray-600 ml-8">
                    Your message is encrypted using the recipient's public key before leaving your device.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Server className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">3. Secure Transmission</span>
                  </div>
                  <p className="element-text-small text-gray-600 ml-8">
                    The encrypted message travels through our servers, but we can't read it.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium">4. Message Decryption</span>
                  </div>
                  <p className="element-text-small text-gray-600 ml-8">
                    Only the recipient's private key can decrypt and read your message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why It's Important */}
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3">Why Is This Important?</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Privacy Protection</span>
                  </div>
                  <p className="element-text-small text-green-700">
                    Your personal conversations remain completely private, even from us.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Security Assurance</span>
                  </div>
                  <p className="element-text-small text-blue-700">
                    Protection against hackers, data breaches, and unauthorized access.
                  </p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Freedom of Speech</span>
                  </div>
                  <p className="element-text-small text-purple-700">
                    Communicate freely without fear of surveillance or censorship.
                  </p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Trust Building</span>
                  </div>
                  <p className="element-text-small text-orange-700">
                    Build stronger relationships through secure, private communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TELE IRAQ's Commitment */}
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Flag className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3">TELE IRAQ's Commitment</h5>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="element-text text-red-900 leading-relaxed mb-3">
                  <strong>Built for Iraq, Secured for Everyone.</strong> We believe that privacy is a fundamental right. That's why we've implemented military-grade encryption that even we cannot break.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="element-text-small text-red-800">We cannot read your messages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="element-text-small text-red-800">We cannot access your calls</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="element-text-small text-red-800">We cannot share your data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="element-text-small text-red-800">Your keys stay on your device</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h5 className="font-semibold text-lg mb-3">Technical Implementation</h5>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium mb-2">Encryption Standards</h6>
                    <ul className="space-y-1 element-text-small text-gray-600">
                      <li>• AES-256 encryption</li>
                      <li>• RSA-4096 key exchange</li>
                      <li>• Perfect Forward Secrecy</li>
                      <li>• Double Ratchet Algorithm</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-2">Security Features</h6>
                    <ul className="space-y-1 element-text-small text-gray-600">
                      <li>• Message authentication</li>
                      <li>• Key verification</li>
                      <li>• Secure key backup</li>
                      <li>• Cross-device sync</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Fingerprint className="w-6 h-6 text-blue-600" />
            <h5 className="font-semibold text-blue-900">Verify Your Security</h5>
          </div>
          <p className="element-text-small text-blue-700 mb-3">
            You can verify that your conversations are encrypted by checking the security codes with your contacts.
          </p>
          <button className="element-button-secondary text-blue-600 hover:bg-blue-100">
            <ShieldCheck className="w-4 h-4" />
            Learn How to Verify
          </button>
        </div>
      </div>

      {/* Experimental Features */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <TestTube className="w-5 h-5 mr-2" />
          Experimental Features
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Try out new features before they're officially released. These features may be unstable.
        </p>
        <div className="space-y-4">
          <ToggleItem
            title="Enhanced message reactions"
            description="Use custom emoji reactions and animated responses"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Voice message transcription"
            description="Automatically transcribe voice messages to text"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Advanced search filters"
            description="Search messages by date, sender, and content type"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Message scheduling"
            description="Schedule messages to be sent at a specific time"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Beta Program */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-600" />
          Beta Program
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Join our beta program to get early access to new features and help us improve TELE IRAQ.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-900">Beta Features Notice</span>
          </div>
          <p className="element-text-small text-yellow-700">
            Beta features may contain bugs and could affect app stability. Use with caution.
          </p>
        </div>
        <button className="element-button w-full">
          <Star className="w-4 h-4" />
          Join Beta Program
        </button>
      </div>
    </div>
  );

  const renderGenericSection = (title: string, icon: React.ReactNode) => (
    <div className="space-y-6">
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
      case 'sessions':
        return renderSessions();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'preferences':
        return renderPreferences();
      case 'voice-video':
        return renderVoiceVideo();
      case 'notifications':
        return renderNotifications();
      case 'labs':
        return renderLabs();
      case 'account':
        return renderGenericSection('Account', <UserCheck className="w-5 h-5 mr-2" />);
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
      <div className="settings-container settings-scrollbar p-4">
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
              <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
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
  selected: boolean;
  onClick: () => void;
  preview: string;
}

const FontSizeOption: React.FC<FontSizeOptionProps> = ({ title, description, selected, onClick, preview }) => {
  const getFontSize = () => {
    switch (title.toLowerCase()) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
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
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{description}</p>
          <p className={`${getFontSize()} text-gray-700 mt-2`}>{preview}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface LanguageOptionProps {
  title: string;
  nativeTitle: string;
  flag: string;
  selected: boolean;
  onClick: () => void;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({ title, nativeTitle, flag, selected, onClick }) => {
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
          <p className="element-text-small text-gray-500">{nativeTitle}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface TimezoneOptionProps {
  title: string;
  timezone: string;
  selected: boolean;
  onClick: () => void;
}

const TimezoneOption: React.FC<TimezoneOptionProps> = ({ title, timezone, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h4 className="element-text font-medium">{title}</h4>
          <p className="element-text-small text-gray-500">{timezone}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface CameraQualityOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const CameraQualityOption: React.FC<CameraQualityOptionProps> = ({ title, description, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h5 className="font-medium">{title}</h5>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-4 h-4 text-red-600" />}
      </div>
    </button>
  );
};

interface SessionItemProps {
  device: string;
  location: string;
  lastActive: string;
  isActive: boolean;
}

const SessionItem: React.FC<SessionItemProps> = ({ device, location, lastActive, isActive }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h5 className="font-medium">{device}</h5>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-xs text-gray-500">Last active: {lastActive}</p>
        </div>
      </div>
      <button className="text-red-600 hover:text-red-700 p-2">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
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