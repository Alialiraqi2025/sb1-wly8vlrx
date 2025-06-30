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
  MessageSquare,
  MessageCircle,
  Hash,
  Type,
  Minus,
  Plus,
  RotateCcw
} from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsPanelProps {
  user: UserType;
}

type SettingsView = 'main' | 'account' | 'sessions' | 'appearance' | 'notifications' | 'preferences' | 'keyboard' | 'sidebar' | 'voice-video' | 'security-privacy' | 'encryption' | 'labs' | 'help' | 'about';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [messageLayout, setMessageLayout] = useState<'modern' | 'bubbles' | 'irc'>('modern');
  const [fontSize, setFontSize] = useState<number>(14);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

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
          highlight={true}
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
      {/* Link New Device */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Smartphone className="w-5 h-5 mr-2 text-red-600" />
          Link New Device
        </h4>
        <p className="element-text-small text-gray-600 mb-6">
          Use a QR code to sign in to another device and set up secure messaging
        </p>
        
        {/* QR Code Display */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 text-center">
          <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-3 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1 p-2">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img 
                    src="/new TI logo.png" 
                    alt="TELE IRAQ" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700">TELE IRAQ</span>
              </div>
              <p className="text-xs text-gray-500">Secure Session Token</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="element-button w-full">
              Generate QR Code
            </button>
            <button className="element-button-secondary w-full">
              Copy Link
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <h5 className="font-semibold text-red-900 mb-2">How to link your device:</h5>
          <ol className="text-sm text-red-800 space-y-1 list-decimal list-inside">
            <li>Open TELE IRAQ on your other device</li>
            <li>Go to Settings → Sessions</li>
            <li>Tap "Scan QR Code"</li>
            <li>Point your camera at this QR code</li>
            <li>Confirm the connection on both devices</li>
          </ol>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-yellow-900">Security Notice</h5>
              <p className="text-sm text-yellow-800 mt-1">
                QR codes expire after 5 minutes. Only scan codes from trusted sources and verify the device details before confirming.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Session */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-green-600" />
          Current Session
        </h4>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h5 className="font-semibold text-green-900">Chrome on Windows</h5>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">Current</span>
              </div>
              <p className="text-sm text-green-700">Baghdad, Iraq • 192.168.1.100</p>
              <p className="text-xs text-green-600">Active now • Verified</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Other Sessions */}
      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="element-text font-semibold flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            Other Sessions
          </h4>
          <button className="element-button-secondary text-sm">
            Terminate All
          </button>
        </div>
        
        <div className="space-y-3">
          {/* iPhone Session */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-semibold text-gray-900">iPhone 14 Pro</h5>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Verified</span>
                </div>
                <p className="text-sm text-gray-600">Erbil, Iraq • 10.0.0.45</p>
                <p className="text-xs text-gray-500">Last active 2 hours ago</p>
              </div>
              <div className="flex space-x-2">
                <button className="element-button-secondary text-xs px-3 py-1">
                  Verify
                </button>
                <button className="text-red-600 hover:text-red-700 text-xs px-3 py-1 border border-red-200 rounded hover:bg-red-50">
                  Terminate
                </button>
              </div>
            </div>
          </div>

          {/* iPad Session */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-semibold text-gray-900">iPad Air</h5>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Verified</span>
                </div>
                <p className="text-sm text-gray-600">Basra, Iraq • 172.16.0.23</p>
                <p className="text-xs text-gray-500">Last active 1 day ago</p>
              </div>
              <div className="flex space-x-2">
                <button className="element-button-secondary text-xs px-3 py-1">
                  Verify
                </button>
                <button className="text-red-600 hover:text-red-700 text-xs px-3 py-1 border border-red-200 rounded hover:bg-red-50">
                  Terminate
                </button>
              </div>
            </div>
          </div>

          {/* Unverified Session */}
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h5 className="font-semibold text-gray-900">Firefox on Linux</h5>
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">Unverified</span>
                </div>
                <p className="text-sm text-gray-600">Unknown Location • 203.0.113.42</p>
                <p className="text-xs text-gray-500">Last active 3 days ago</p>
              </div>
              <div className="flex space-x-2">
                <button className="element-button text-xs px-3 py-1">
                  Verify
                </button>
                <button className="text-red-600 hover:text-red-700 text-xs px-3 py-1 border border-red-200 rounded hover:bg-red-50">
                  Terminate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Session Settings
        </h4>
        <div className="space-y-4">
          <ToggleItem
            title="Auto-verify trusted devices"
            description="Automatically verify devices you've used before"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Session notifications"
            description="Get notified when someone signs in to your account"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Auto-terminate inactive sessions"
            description="Automatically end sessions after 30 days of inactivity"
            enabled={false}
            onChange={() => {}}
          />
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

  const renderAppearance = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
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
        <p className="element-text-small text-gray-600 mb-6">
          Choose how messages are displayed in conversations
        </p>
        
        <div className="space-y-4">
          {/* Modern Layout */}
          <MessageLayoutOption
            icon={<MessageSquare className="w-5 h-5" />}
            title="Modern"
            description="Clean, modern message bubbles with rounded corners"
            selected={messageLayout === 'modern'}
            onClick={() => setMessageLayout('modern')}
            preview={
              <div className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-red-500 text-white px-3 py-2 rounded-2xl rounded-br-md max-w-xs">
                    <p className="text-sm">Hey! How are you?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-2xl rounded-bl-md max-w-xs">
                    <p className="text-sm">I'm doing great, thanks!</p>
                  </div>
                </div>
              </div>
            }
          />

          {/* Message Bubbles Layout */}
          <MessageLayoutOption
            icon={<MessageCircle className="w-5 h-5" />}
            title="Message Bubbles"
            description="Traditional chat bubbles with tails and shadows"
            selected={messageLayout === 'bubbles'}
            onClick={() => setMessageLayout('bubbles')}
            preview={
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="relative bg-red-500 text-white px-4 py-2 rounded-2xl max-w-xs shadow-md">
                    <p className="text-sm">Hey! How are you?</p>
                    <div className="absolute -bottom-1 right-3 w-3 h-3 bg-red-500 transform rotate-45"></div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="relative bg-white text-gray-800 px-4 py-2 rounded-2xl max-w-xs shadow-md border">
                    <p className="text-sm">I'm doing great, thanks!</p>
                    <div className="absolute -bottom-1 left-3 w-3 h-3 bg-white border-r border-b transform rotate-45"></div>
                  </div>
                </div>
              </div>
            }
          />

          {/* IRC Layout */}
          <MessageLayoutOption
            icon={<Hash className="w-5 h-5" />}
            title="IRC (Experimental)"
            description="Classic IRC-style text layout with timestamps"
            selected={messageLayout === 'irc'}
            onClick={() => setMessageLayout('irc')}
            preview={
              <div className="bg-black text-green-400 p-3 rounded font-mono text-xs space-y-1">
                <div>[14:32] &lt;Alice&gt; Hey! How are you?</div>
                <div>[14:33] &lt;You&gt; I'm doing great, thanks!</div>
                <div>[14:33] &lt;Alice&gt; That's awesome to hear</div>
              </div>
            }
            experimental={true}
          />
        </div>
      </div>

      {/* Font Size */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Type className="w-5 h-5 mr-2" />
          Font Size
        </h4>
        <p className="element-text-small text-gray-600 mb-6">
          Adjust the size of text throughout the app
        </p>
        
        <div className="space-y-6">
          {/* Font Size Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="element-text-small text-gray-600">Size</span>
              <span className="element-text font-medium">{fontSize}px</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFontSize(Math.max(10, fontSize - 1))}
                className="element-button-secondary p-2"
                disabled={fontSize <= 10}
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  }
                  .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #dc2626;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  }
                `}</style>
              </div>
              
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                className="element-button-secondary p-2"
                disabled={fontSize >= 24}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          {/* Font Size Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-3">Preview</h5>
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-red-500 text-white px-3 py-2 rounded-2xl rounded-br-md max-w-xs">
                  <p style={{ fontSize: `${fontSize}px` }}>
                    This is how your messages will look
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-2xl rounded-bl-md max-w-xs">
                  <p style={{ fontSize: `${fontSize}px` }}>
                    Perfect! The text is easy to read
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Font Size Presets */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-3">Quick Presets</h5>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setFontSize(12)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  fontSize === 12
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">Small</div>
                  <div className="text-xs text-gray-500">12px</div>
                </div>
              </button>
              
              <button
                onClick={() => setFontSize(14)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  fontSize === 14
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">Default</div>
                  <div className="text-xs text-gray-500">14px</div>
                </div>
              </button>
              
              <button
                onClick={() => setFontSize(16)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  fontSize === 16
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">Medium</div>
                  <div className="text-xs text-gray-500">16px</div>
                </div>
              </button>
              
              <button
                onClick={() => setFontSize(18)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  fontSize === 18
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">Large</div>
                  <div className="text-xs text-gray-500">18px</div>
                </div>
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setFontSize(14)}
              className="element-button-secondary flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Default</span>
            </button>
          </div>
        </div>
      </div>

      {/* Display Settings */}
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
            title="Show message status"
            description="Display delivery and read receipts"
            enabled={true}
            onChange={() => {}}
          />
          <ToggleItem
            title="Animate message bubbles"
            description="Enable smooth animations for new messages"
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
      case 'notifications':
        return renderNotifications();
      case 'account':
        return renderGenericSection('Account', <UserCheck className="w-5 h-5 mr-2" />);
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
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  preview: React.ReactNode;
  experimental?: boolean;
}

const MessageLayoutOption: React.FC<MessageLayoutOptionProps> = ({ 
  icon, 
  title, 
  description, 
  selected, 
  onClick, 
  preview,
  experimental = false 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
        selected
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className={`${selected ? 'text-red-600' : 'text-gray-600'}`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="element-text font-medium">{title}</h4>
              {experimental && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                  Experimental
                </span>
              )}
            </div>
            <p className="element-text-small text-gray-500">{description}</p>
          </div>
          {selected && <Check className="w-5 h-5 text-red-600" />}
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {preview}
        </div>
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