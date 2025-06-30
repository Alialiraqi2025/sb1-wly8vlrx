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
  QrCode,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  Wifi,
  Volume2,
  Camera,
  Headphones,
  MicIcon,
  Speaker,
  Play,
  Pause,
  SkipForward,
  Languages,
  Clock
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
  const [language, setLanguage] = useState<'english' | 'arabic'>('english');
  const [timezone, setTimezone] = useState('UTC+3 (Baghdad)');
  const [micVolume, setMicVolume] = useState(75);
  const [speakerVolume, setSpeakerVolume] = useState(80);
  const [selectedMic, setSelectedMic] = useState('Built-in Microphone');
  const [selectedSpeaker, setSelectedSpeaker] = useState('Built-in Speakers');
  const [selectedCamera, setSelectedCamera] = useState('Built-in Camera');
  const [audioQuality, setAudioQuality] = useState<'low' | 'medium' | 'high'>('high');
  const [videoQuality, setVideoQuality] = useState<'low' | 'medium' | 'high' | 'hd'>('high');
  const [cameraResolution, setCameraResolution] = useState<'480p' | '720p' | '1080p' | '4k'>('720p');
  const [frameRate, setFrameRate] = useState<'15' | '30' | '60'>('30');
  const [showQRCode, setShowQRCode] = useState(false);

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;

  const renderMainSettings = () => (
    <div className="space-y-6 settings-scrollbar">
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
        
        {/* Only show Keyboard and Sidebar on desktop */}
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
    <div className="space-y-6 account-scrollbar">
      {/* Link New Device */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <QrCode className="w-5 h-5 mr-2 text-red-600" />
          Link New Device
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Scan this QR code with your other device to sign in securely and set up end-to-end encrypted messaging.
        </p>
        
        {!showQRCode ? (
          <button 
            onClick={() => setShowQRCode(true)}
            className="element-button w-full"
          >
            <QrCode className="w-4 h-4" />
            Generate QR Code
          </button>
        ) : (
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <QrCode className="w-20 h-20 text-white" />
              </div>
            </div>
            <p className="element-text-small text-gray-600 mb-4">
              Scan this code with TELE IRAQ on your other device
            </p>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowQRCode(false)}
                className="element-button-secondary flex-1"
              >
                Close
              </button>
              <button className="element-button flex-1">
                <Download className="w-4 h-4" />
                Save QR
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Current Session */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-green-600" />
          Current Session
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h5 className="element-text font-medium">This Device</h5>
                <p className="element-text-small text-gray-600">Chrome on Windows • Baghdad, Iraq</p>
                <p className="element-text-small text-green-600">Active now</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Other Sessions */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2" />
          Other Sessions
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h5 className="element-text font-medium">iPhone 14</h5>
                <p className="element-text-small text-gray-600">TELE IRAQ iOS • Baghdad, Iraq</p>
                <p className="element-text-small text-gray-500">Last seen 2 hours ago</p>
              </div>
            </div>
            <button className="element-button-secondary p-2">
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <h5 className="element-text font-medium">MacBook Pro</h5>
                <p className="element-text-small text-gray-600">Safari on macOS • Erbil, Iraq</p>
                <p className="element-text-small text-gray-500">Last seen yesterday</p>
              </div>
            </div>
            <button className="element-button-secondary p-2">
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
        
        <button className="element-button-secondary w-full mt-4">
          <Trash2 className="w-4 h-4" />
          Terminate All Other Sessions
        </button>
      </div>

      {/* Session Security */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Session Security
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Require verification for new sessions"
            description="Verify new sign-ins with existing devices"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto-terminate inactive sessions"
            description="Sign out sessions after 30 days of inactivity"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show session notifications"
            description="Get notified when someone signs in to your account"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6 settings-scrollbar">
      {/* Theme Selection */}
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
          <Settings className="w-5 h-5 mr-2" />
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
            description="Classic IRC-style messages"
            selected={messageLayout === 'irc'}
            onClick={() => setMessageLayout('irc')}
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Font Size
        </h4>
        <div className="space-y-3">
          <FontSizeOption
            title="Small"
            description="Compact text size"
            selected={fontSize === 'small'}
            onClick={() => setFontSize('small')}
          />
          <FontSizeOption
            title="Medium"
            description="Standard text size"
            selected={fontSize === 'medium'}
            onClick={() => setFontSize('medium')}
          />
          <FontSizeOption
            title="Large"
            description="Larger text for better readability"
            selected={fontSize === 'large'}
            onClick={() => setFontSize('large')}
          />
        </div>
      </div>

      {/* Display Options */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Display Options</h4>
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
          <ToggleItem
            title="Show message previews"
            description="Preview message content in notifications"
            enabled={true}
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
          <Languages className="w-5 h-5 mr-2" />
          Application Language
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Choose your preferred interface language
        </p>
        <div className="space-y-3">
          <LanguageOption
            title="English"
            description="English interface"
            selected={language === 'english'}
            onClick={() => setLanguage('english')}
            flag="🇺🇸"
          />
          <LanguageOption
            title="العربية"
            description="Arabic interface"
            selected={language === 'arabic'}
            onClick={() => setLanguage('arabic')}
            flag="🇮🇶"
          />
        </div>
      </div>

      {/* Display Time */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Display Time
        </h4>
        <p className="element-text-small text-gray-600 mb-4">
          Set your time zone for accurate message timestamps
        </p>
        <div className="space-y-3">
          <select 
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="UTC+3 (Baghdad)">UTC+3 (Baghdad, Iraq)</option>
            <option value="UTC+3 (Erbil)">UTC+3 (Erbil, Iraq)</option>
            <option value="UTC+3 (Basra)">UTC+3 (Basra, Iraq)</option>
            <option value="UTC+0 (London)">UTC+0 (London, UK)</option>
            <option value="UTC-5 (New York)">UTC-5 (New York, USA)</option>
            <option value="UTC+1 (Berlin)">UTC+1 (Berlin, Germany)</option>
            <option value="UTC+8 (Beijing)">UTC+8 (Beijing, China)</option>
            <option value="UTC+9 (Tokyo)">UTC+9 (Tokyo, Japan)</option>
          </select>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="element-text-small text-gray-600">
            Current time: <span className="font-medium">2:30 PM, December 15, 2024</span>
          </p>
        </div>
      </div>

      {/* General Preferences */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          General Preferences
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-start on system boot"
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
            title="Send messages with Enter"
            description="Press Enter to send, Shift+Enter for new line"
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
            title="Auto-download media"
            description="Automatically download images and files"
            enabled={false}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Chat Preferences */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Chat Preferences</h4>
        <div className="space-y-4">
          <ToggleItem
            title="Group chat notifications"
            description="Receive notifications for group messages"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Read receipts"
            description="Send read receipts to message senders"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Link previews"
            description="Show previews for shared links"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Emoji suggestions"
            description="Show emoji suggestions while typing"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderVoiceVideo = () => (
    <div className="space-y-6 settings-scrollbar">
      {/* Device Status */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-green-600" />
          Device Status
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <MicIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h5 className="element-text font-medium text-green-800">Microphone</h5>
            <p className="element-text-small text-green-600">Active</p>
          </div>
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h5 className="element-text font-medium text-green-800">Camera</h5>
            <p className="element-text-small text-green-600">Active</p>
          </div>
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <Speaker className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h5 className="element-text font-medium text-green-800">Speaker</h5>
            <p className="element-text-small text-green-600">Active</p>
          </div>
        </div>
      </div>

      {/* Voice Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <MicIcon className="w-5 h-5 mr-2" />
          Voice Settings
        </h4>
        
        {/* Microphone Selection */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Microphone</label>
          <select 
            value={selectedMic}
            onChange={(e) => setSelectedMic(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="Built-in Microphone">Built-in Microphone</option>
            <option value="USB Microphone">USB Microphone</option>
            <option value="Bluetooth Headset">Bluetooth Headset</option>
            <option value="External Microphone">External Microphone</option>
          </select>
        </div>

        {/* Speaker Selection */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Speaker/Headphones</label>
          <select 
            value={selectedSpeaker}
            onChange={(e) => setSelectedSpeaker(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="Built-in Speakers">Built-in Speakers</option>
            <option value="Headphones">Headphones</option>
            <option value="Bluetooth Headset">Bluetooth Headset</option>
            <option value="USB Speakers">USB Speakers</option>
          </select>
        </div>

        {/* Volume Controls */}
        <div className="space-y-4">
          <div>
            <label className="block element-text font-medium mb-2">
              Microphone Volume: {micVolume}%
            </label>
            <div className="flex items-center space-x-3">
              <span className="element-text-small text-gray-500">Mute</span>
              <input
                type="range"
                min="0"
                max="100"
                value={micVolume}
                onChange={(e) => setMicVolume(Number(e.target.value))}
                className="flex-1 slider"
              />
              <span className="element-text-small text-gray-500">Max</span>
            </div>
          </div>
          
          <div>
            <label className="block element-text font-medium mb-2">
              Speaker Volume: {speakerVolume}%
            </label>
            <div className="flex items-center space-x-3">
              <span className="element-text-small text-gray-500">Mute</span>
              <input
                type="range"
                min="0"
                max="100"
                value={speakerVolume}
                onChange={(e) => setSpeakerVolume(Number(e.target.value))}
                className="flex-1 slider"
              />
              <span className="element-text-small text-gray-500">Max</span>
            </div>
          </div>
        </div>

        {/* Audio Quality */}
        <div className="mt-6">
          <label className="block element-text font-medium mb-2">Audio Quality</label>
          <div className="space-y-2">
            <AudioQualityOption
              title="Low Quality (32 kbps)"
              description="Saves bandwidth"
              selected={audioQuality === 'low'}
              onClick={() => setAudioQuality('low')}
            />
            <AudioQualityOption
              title="Medium Quality (64 kbps)"
              description="Balanced quality and bandwidth"
              selected={audioQuality === 'medium'}
              onClick={() => setAudioQuality('medium')}
            />
            <AudioQualityOption
              title="High Quality (128 kbps)"
              description="Best audio quality"
              selected={audioQuality === 'high'}
              onClick={() => setAudioQuality('high')}
            />
          </div>
        </div>

        {/* Audio Enhancement */}
        <div className="mt-6 space-y-4">
          <ToggleItem
            title="Noise cancellation"
            description="Reduce background noise"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Echo cancellation"
            description="Prevent audio feedback"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto gain control"
            description="Automatically adjust microphone sensitivity"
            enabled={true}
            onChange={() => {}}
          />
        </div>

        {/* Test Buttons */}
        <div className="mt-6 flex space-x-3">
          <button className="element-button-secondary flex-1">
            <Play className="w-4 h-4" />
            Test Microphone
          </button>
          <button className="element-button-secondary flex-1">
            <Volume2 className="w-4 h-4" />
            Test Speakers
          </button>
        </div>
      </div>

      {/* Video Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Video Settings
        </h4>
        
        {/* Camera Selection */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Camera</label>
          <select 
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="Built-in Camera">Built-in Camera</option>
            <option value="USB Camera">USB Camera</option>
            <option value="External Camera">External Camera</option>
            <option value="Phone Camera">Phone Camera</option>
          </select>
        </div>

        {/* Video Quality */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Video Quality</label>
          <div className="space-y-2">
            <VideoQualityOption
              title="Low (240p)"
              description="Basic video quality"
              selected={videoQuality === 'low'}
              onClick={() => setVideoQuality('low')}
            />
            <VideoQualityOption
              title="Medium (360p)"
              description="Standard video quality"
              selected={videoQuality === 'medium'}
              onClick={() => setVideoQuality('medium')}
            />
            <VideoQualityOption
              title="High (480p)"
              description="Enhanced video quality"
              selected={videoQuality === 'high'}
              onClick={() => setVideoQuality('high')}
            />
            <VideoQualityOption
              title="HD (720p+)"
              description="High definition video"
              selected={videoQuality === 'hd'}
              onClick={() => setVideoQuality('hd')}
            />
          </div>
        </div>

        {/* Camera Resolution */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Camera Resolution</label>
          <div className="space-y-2">
            <ResolutionOption
              title="480p (640×480)"
              selected={cameraResolution === '480p'}
              onClick={() => setCameraResolution('480p')}
            />
            <ResolutionOption
              title="720p (1280×720)"
              selected={cameraResolution === '720p'}
              onClick={() => setCameraResolution('720p')}
            />
            <ResolutionOption
              title="1080p (1920×1080)"
              selected={cameraResolution === '1080p'}
              onClick={() => setCameraResolution('1080p')}
            />
            <ResolutionOption
              title="4K (3840×2160)"
              selected={cameraResolution === '4k'}
              onClick={() => setCameraResolution('4k')}
            />
          </div>
        </div>

        {/* Frame Rate */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Frame Rate</label>
          <div className="space-y-2">
            <FrameRateOption
              title="15 FPS"
              description="Battery Saver"
              selected={frameRate === '15'}
              onClick={() => setFrameRate('15')}
            />
            <FrameRateOption
              title="30 FPS"
              description="Standard"
              selected={frameRate === '30'}
              onClick={() => setFrameRate('30')}
            />
            <FrameRateOption
              title="60 FPS"
              description="Ultra Smooth"
              selected={frameRate === '60'}
              onClick={() => setFrameRate('60')}
            />
          </div>
        </div>

        {/* Camera Preview */}
        <div className="mb-6">
          <label className="block element-text font-medium mb-2">Camera Preview</label>
          <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="element-text-small text-gray-500">Camera preview will appear here</p>
            </div>
          </div>
        </div>

        {/* Video Options */}
        <div className="space-y-4">
          <ToggleItem
            title="Hardware acceleration"
            description="Use GPU for video processing"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Background blur"
            description="Blur background during video calls"
            enabled={false}
            onChange={() => {}}
          />
        </div>

        {/* Test Buttons */}
        <div className="mt-6 flex space-x-3">
          <button className="element-button-secondary flex-1">
            <Camera className="w-4 h-4" />
            Test Camera
          </button>
          <button className="element-button-secondary flex-1">
            <RotateCcw className="w-4 h-4" />
            Flip Camera
          </button>
        </div>
      </div>

      {/* Call Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Video className="w-5 h-5 mr-2" />
          Call Settings
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-answer calls"
            description="Automatically answer incoming calls after 10 seconds"
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
            description="Hold spacebar to speak (mute by default)"
            enabled={false}
            onChange={() => {}}
          />
          <ToggleItem
            title="Show call statistics"
            description="Display connection quality during calls"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </div>

      {/* Network & Performance */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Wifi className="w-5 h-5 mr-2" />
          Network & Performance
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Adaptive bitrate"
            description="Automatically adjust quality based on connection"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Low bandwidth mode"
            description="Optimize for slow connections"
            enabled={false}
            onChange={() => {}}
          />
        </div>
        
        {/* Connection Status */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="element-text font-medium text-green-800 mb-2">Connection Status</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="element-text-small text-gray-600">Latency</p>
              <p className="element-text font-medium text-green-700">45ms</p>
            </div>
            <div>
              <p className="element-text-small text-gray-600">Bandwidth</p>
              <p className="element-text font-medium text-green-700">50 Mbps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Troubleshooting
        </h4>
        <div className="space-y-3">
          <button className="element-button-secondary w-full">
            <RotateCcw className="w-4 h-4" />
            Reset Audio Settings
          </button>
          <button className="element-button-secondary w-full">
            <RotateCcw className="w-4 h-4" />
            Reset Video Settings
          </button>
          <button className="element-button-secondary w-full">
            <Wifi className="w-4 h-4" />
            Run Connection Test
          </button>
          <button className="element-button-secondary w-full">
            <Download className="w-4 h-4" />
            Download Logs
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
      case 'account':
        return renderGenericSection('Account', <UserCheck className="w-5 h-5 mr-2" />);
      case 'keyboard':
        return renderGenericSection('Keyboard', <Keyboard className="w-5 h-5 mr-2" />);
      case 'sidebar':
        return renderGenericSection('Sidebar', <Sidebar className="w-5 h-5 mr-2" />);
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
}

const MessageLayoutOption: React.FC<MessageLayoutOptionProps> = ({ title, description, selected, onClick }) => {
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
}

const FontSizeOption: React.FC<FontSizeOptionProps> = ({ title, description, selected, onClick }) => {
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
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface LanguageOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  flag: string;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({ title, description, selected, onClick, flag }) => {
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
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
};

interface AudioQualityOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const AudioQualityOption: React.FC<AudioQualityOptionProps> = ({ title, description, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h5 className="element-text font-medium">{title}</h5>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-4 h-4 text-red-600" />}
      </div>
    </button>
  );
};

interface VideoQualityOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const VideoQualityOption: React.FC<VideoQualityOptionProps> = ({ title, description, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h5 className="element-text font-medium">{title}</h5>
          <p className="element-text-small text-gray-500">{description}</p>
        </div>
        {selected && <Check className="w-4 h-4 text-red-600" />}
      </div>
    </button>
  );
};

interface ResolutionOptionProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const ResolutionOption: React.FC<ResolutionOptionProps> = ({ title, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <h5 className="element-text font-medium">{title}</h5>
        {selected && <Check className="w-4 h-4 text-red-600" />}
      </div>
    </button>
  );
};

interface FrameRateOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const FrameRateOption: React.FC<FrameRateOptionProps> = ({ title, description, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h5 className="element-text font-medium">{title}</h5>
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