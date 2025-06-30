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
  Speaker,
  MicOff,
  VideoOff,
  PhoneCall,
  PhoneOff,
  Zap,
  Wifi,
  WifiOff,
  Activity,
  BarChart3,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Signal,
  Bluetooth,
  Usb,
  Radio,
  Waves
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
  
  // Language and timezone states
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar'>('en');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Baghdad');
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12');
  const [dateFormat, setDateFormat] = useState<'dmy' | 'mdy' | 'ymd'>('dmy');
  const [useArabicNumerals, setUseArabicNumerals] = useState(false);
  
  // Voice & Video states
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [videoQuality, setVideoQuality] = useState<'low' | 'medium' | 'high' | 'hd'>('high');
  const [audioQuality, setAudioQuality] = useState<'low' | 'medium' | 'high'>('high');
  const [selectedMicrophone, setSelectedMicrophone] = useState('default');
  const [selectedCamera, setSelectedCamera] = useState('default');
  const [selectedSpeaker, setSelectedSpeaker] = useState('default');
  const [microphoneVolume, setMicrophoneVolume] = useState(75);
  const [speakerVolume, setSpeakerVolume] = useState(80);
  const [cameraResolution, setCameraResolution] = useState<'480p' | '720p' | '1080p' | '4k'>('720p');
  const [frameRate, setFrameRate] = useState<'15' | '30' | '60'>('30');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇮🇶', direction: 'rtl' }
  ];

  const iraqTimezones = [
    { value: 'Asia/Baghdad', label: 'Baghdad', city: 'بغداد', offset: '+3' },
    { value: 'Asia/Erbil', label: 'Erbil', city: 'أربيل', offset: '+3' },
    { value: 'Asia/Basra', label: 'Basra', city: 'البصرة', offset: '+3' },
    { value: 'Asia/Mosul', label: 'Mosul', city: 'الموصل', offset: '+3' },
    { value: 'Asia/Najaf', label: 'Najaf', city: 'النجف', offset: '+3' },
    { value: 'Asia/Karbala', label: 'Karbala', city: 'كربلاء', offset: '+3' }
  ];

  const worldTimezones = [
    { value: 'UTC', label: 'UTC (Universal)', offset: '+0' },
    { value: 'Europe/London', label: 'London', offset: '+0/+1' },
    { value: 'Europe/Paris', label: 'Paris', offset: '+1/+2' },
    { value: 'Europe/Istanbul', label: 'Istanbul', offset: '+3' },
    { value: 'Asia/Dubai', label: 'Dubai', offset: '+4' },
    { value: 'Asia/Tehran', label: 'Tehran', offset: '+3:30/+4:30' },
    { value: 'Asia/Riyadh', label: 'Riyadh', offset: '+3' },
    { value: 'Asia/Kuwait', label: 'Kuwait', offset: '+3' },
    { value: 'America/New_York', label: 'New York', offset: '-5/-4' },
    { value: 'America/Los_Angeles', label: 'Los Angeles', offset: '-8/-7' },
    { value: 'Asia/Tokyo', label: 'Tokyo', offset: '+9' },
    { value: 'Australia/Sydney', label: 'Sydney', offset: '+10/+11' }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: selectedTimezone,
      hour12: timeFormat === '12',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return now.toLocaleTimeString(selectedLanguage === 'ar' ? 'ar-IQ' : 'en-US', options);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: selectedTimezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return now.toLocaleDateString(selectedLanguage === 'ar' ? 'ar-IQ' : 'en-US', options);
  };

  const formatDateExample = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    
    switch (dateFormat) {
      case 'dmy':
        return `${day}/${month}/${year}`;
      case 'mdy':
        return `${month}/${day}/${year}`;
      case 'ymd':
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  const convertToArabicNumerals = (text: string) => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return text.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
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
          description="Language and timezone settings"
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
          highlight={true}
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

  const renderVoiceVideo = () => (
    <div className="space-y-6">
      {/* Device Status */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-600" />
          Device Status
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
              microphoneEnabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {microphoneEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </div>
            <p className="font-medium">Microphone</p>
            <p className={`text-sm ${microphoneEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {microphoneEnabled ? 'Active' : 'Disabled'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
              cameraEnabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {cameraEnabled ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
            </div>
            <p className="font-medium">Camera</p>
            <p className={`text-sm ${cameraEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {cameraEnabled ? 'Active' : 'Disabled'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
              speakerEnabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {speakerEnabled ? <Speaker className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </div>
            <p className="font-medium">Speaker</p>
            <p className={`text-sm ${speakerEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {speakerEnabled ? 'Active' : 'Disabled'}
            </p>
          </div>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Mic className="w-5 h-5 mr-2" />
          Audio Settings
        </h4>
        
        <div className="space-y-6">
          {/* Microphone Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Microphone Device
            </label>
            <select
              value={selectedMicrophone}
              onChange={(e) => setSelectedMicrophone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="default">Default - Built-in Microphone</option>
              <option value="usb">USB Microphone - Audio-Technica</option>
              <option value="bluetooth">Bluetooth Headset - AirPods Pro</option>
              <option value="external">External Microphone - Blue Yeti</option>
            </select>
          </div>

          {/* Microphone Volume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Microphone Volume: {microphoneVolume}%
            </label>
            <div className="flex items-center space-x-3">
              <MicOff className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={microphoneVolume}
                onChange={(e) => setMicrophoneVolume(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Mic className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Muted</span>
              <span>Maximum</span>
            </div>
          </div>

          {/* Speaker Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speaker/Headphones
            </label>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="default">Default - Built-in Speakers</option>
              <option value="headphones">Wired Headphones - Sony WH-1000XM4</option>
              <option value="bluetooth">Bluetooth Headphones - AirPods Pro</option>
              <option value="usb">USB Headset - Logitech G Pro X</option>
            </select>
          </div>

          {/* Speaker Volume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speaker Volume: {speakerVolume}%
            </label>
            <div className="flex items-center space-x-3">
              <VolumeX className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={speakerVolume}
                onChange={(e) => setSpeakerVolume(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <Volume2 className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Muted</span>
              <span>Maximum</span>
            </div>
          </div>

          {/* Audio Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audio Quality
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'medium', 'high'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setAudioQuality(quality)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    audioQuality === quality
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium capitalize">{quality}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {quality === 'low' && '32 kbps'}
                      {quality === 'medium' && '64 kbps'}
                      {quality === 'high' && '128 kbps'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Audio Enhancement */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900">Audio Enhancement</h5>
            
            <ToggleItem
              title="Noise Cancellation"
              description="Reduce background noise during calls"
              enabled={noiseCancellation}
              onChange={setNoiseCancellation}
            />
            
            <ToggleItem
              title="Echo Cancellation"
              description="Prevent audio feedback and echo"
              enabled={echoCancellation}
              onChange={setEchoCancellation}
            />
            
            <ToggleItem
              title="Auto Gain Control"
              description="Automatically adjust microphone sensitivity"
              enabled={autoGainControl}
              onChange={setAutoGainControl}
            />
          </div>

          {/* Test Audio */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-3">Test Audio</h5>
            <div className="flex space-x-3">
              <button className="element-button-secondary flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Test Microphone</span>
              </button>
              <button className="element-button-secondary flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span>Test Speakers</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2" />
          Video Settings
        </h4>
        
        <div className="space-y-6">
          {/* Camera Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Camera Device
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="default">Default - Built-in Camera</option>
              <option value="usb">USB Camera - Logitech C920</option>
              <option value="external">External Camera - Canon EOS Webcam</option>
              <option value="phone">Phone Camera (via USB)</option>
            </select>
          </div>

          {/* Video Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Quality
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['low', 'medium', 'high', 'hd'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setVideoQuality(quality)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    videoQuality === quality
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium capitalize">
                      {quality === 'hd' ? 'HD' : quality}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {quality === 'low' && '240p'}
                      {quality === 'medium' && '360p'}
                      {quality === 'high' && '480p'}
                      {quality === 'hd' && '720p+'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Resolution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Camera Resolution
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['480p', '720p', '1080p', '4k'] as const).map((resolution) => (
                <button
                  key={resolution}
                  onClick={() => setCameraResolution(resolution)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    cameraResolution === resolution
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{resolution}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {resolution === '480p' && '640×480'}
                      {resolution === '720p' && '1280×720'}
                      {resolution === '1080p' && '1920×1080'}
                      {resolution === '4k' && '3840×2160'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Frame Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frame Rate (FPS)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['15', '30', '60'] as const).map((fps) => (
                <button
                  key={fps}
                  onClick={() => setFrameRate(fps)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    frameRate === fps
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{fps} FPS</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {fps === '15' && 'Battery Saver'}
                      {fps === '30' && 'Standard'}
                      {fps === '60' && 'Smooth'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-3">Camera Preview</h5>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-3">
              <div className="text-center text-white">
                <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">Camera preview will appear here</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="element-button-secondary flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Test Camera</span>
              </button>
              <button className="element-button-secondary flex items-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Flip Camera</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <PhoneCall className="w-5 h-5 mr-2" />
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
            description="Hold spacebar to speak during calls"
            enabled={false}
            onChange={() => {}}
          />
          
          <ToggleItem
            title="Show call statistics"
            description="Display connection quality and bandwidth usage"
            enabled={true}
            onChange={() => {}}
          />
          
          <ToggleItem
            title="Record calls"
            description="Automatically record voice and video calls"
            enabled={false}
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
            description="Optimize for slower internet connections"
            enabled={false}
            onChange={() => {}}
          />
          
          <ToggleItem
            title="Hardware acceleration"
            description="Use GPU for video processing (recommended)"
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

        {/* Connection Status */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Signal className="w-5 h-5 text-green-600" />
            <div>
              <h5 className="font-medium text-green-900">Connection Status</h5>
              <p className="text-sm text-green-700">
                Excellent connection quality • 45ms latency • 50 Mbps
              </p>
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
          <button className="w-full element-button-secondary text-left p-4 flex items-center justify-between">
            <div>
              <h5 className="font-medium">Reset audio settings</h5>
              <p className="text-sm text-gray-500">Restore default audio configuration</p>
            </div>
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button className="w-full element-button-secondary text-left p-4 flex items-center justify-between">
            <div>
              <h5 className="font-medium">Reset video settings</h5>
              <p className="text-sm text-gray-500">Restore default video configuration</p>
            </div>
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button className="w-full element-button-secondary text-left p-4 flex items-center justify-between">
            <div>
              <h5 className="font-medium">Run connection test</h5>
              <p className="text-sm text-gray-500">Test your network connection quality</p>
            </div>
            <Activity className="w-4 h-4" />
          </button>
          
          <button className="w-full element-button-secondary text-left p-4 flex items-center justify-between">
            <div>
              <h5 className="font-medium">Download logs</h5>
              <p className="text-sm text-gray-500">Export diagnostic information</p>
            </div>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Language Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Application Language
        </h4>
        
        <div className="space-y-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setSelectedLanguage(language.code as 'en' | 'ar')}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedLanguage === language.code
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{language.flag}</div>
                <div className="flex-1 text-left">
                  <h5 className="font-medium">{language.name}</h5>
                  <p className="text-sm text-gray-500">{language.nativeName}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {language.direction === 'rtl' ? 'Right-to-left layout' : 'Left-to-right layout'}
                  </p>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Language Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-3">Interface Preview</h5>
          <div className={`text-sm space-y-2 ${selectedLanguage === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center justify-between">
              <span>{selectedLanguage === 'ar' ? 'الرسائل' : 'Messages'}</span>
              <span className="text-gray-500">
                {selectedLanguage === 'ar' && useArabicNumerals ? '٥' : '5'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{selectedLanguage === 'ar' ? 'الإعدادات' : 'Settings'}</span>
              <span className="text-gray-500">→</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{selectedLanguage === 'ar' ? 'المكالمات' : 'Calls'}</span>
              <span className="text-gray-500">
                {selectedLanguage === 'ar' && useArabicNumerals ? '٢' : '2'}
              </span>
            </div>
          </div>
        </div>

        {/* Arabic Options */}
        {selectedLanguage === 'ar' && (
          <div className="mt-6 space-y-4">
            <h5 className="font-medium text-gray-900">Arabic Language Options</h5>
            <ToggleItem
              title="Use Arabic-Indic numerals"
              description="Display numbers as ٠١٢٣٤٥٦٧٨٩ instead of 0123456789"
              enabled={useArabicNumerals}
              onChange={setUseArabicNumerals}
            />
          </div>
        )}

        {/* Language Support Notice */}
        <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-red-900">TELE IRAQ Language Support</h5>
              <p className="text-sm text-red-700 mt-1">
                TELE IRAQ fully supports both English and Arabic interfaces with proper RTL layout, 
                cultural localization, and Arabic typography for the best user experience in Iraq.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timezone Settings */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2" />
          Display Time
        </h4>

        {/* Current Time Display */}
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="font-medium text-red-900">Current Time</h5>
              <p className="text-lg font-semibold text-red-800">
                {useArabicNumerals && selectedLanguage === 'ar' 
                  ? convertToArabicNumerals(getCurrentTime())
                  : getCurrentTime()
                }
              </p>
              <p className="text-sm text-red-700">{getCurrentDate()}</p>
            </div>
          </div>
        </div>

        {/* Iraq Timezones */}
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 mb-3">Iraq Cities</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {iraqTimezones.map((timezone) => (
              <button
                key={timezone.value}
                onClick={() => setSelectedTimezone(timezone.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedTimezone === timezone.value
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="font-medium">{timezone.label}</h6>
                    <p className="text-sm text-gray-500">{timezone.city}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-600">GMT{timezone.offset}</span>
                    {selectedTimezone === timezone.value && (
                      <Check className="w-4 h-4 text-red-600 mt-1" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* World Timezones */}
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 mb-3">World Timezones</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {worldTimezones.map((timezone) => (
              <button
                key={timezone.value}
                onClick={() => setSelectedTimezone(timezone.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedTimezone === timezone.value
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="font-medium">{timezone.label}</h6>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-600">GMT{timezone.offset}</span>
                    {selectedTimezone === timezone.value && (
                      <Check className="w-4 h-4 text-red-600 mt-1" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Auto-detect */}
        <button className="w-full element-button-secondary p-4 flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Auto-detect timezone</span>
        </button>
      </div>

      {/* Time & Date Format */}
      <div className="element-card p-6">
        <h4 className="element-text font-semibold mb-4">Time & Date Format</h4>
        
        <div className="space-y-6">
          {/* Time Format */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Time Format</h5>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTimeFormat('12')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  timeFormat === '12'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <h6 className="font-medium">12-hour</h6>
                  <p className="text-sm text-gray-500 mt-1">2:30 PM</p>
                  {timeFormat === '12' && <Check className="w-4 h-4 text-red-600 mx-auto mt-2" />}
                </div>
              </button>
              
              <button
                onClick={() => setTimeFormat('24')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  timeFormat === '24'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <h6 className="font-medium">24-hour</h6>
                  <p className="text-sm text-gray-500 mt-1">14:30</p>
                  {timeFormat === '24' && <Check className="w-4 h-4 text-red-600 mx-auto mt-2" />}
                </div>
              </button>
            </div>
          </div>

          {/* Date Format */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Date Format</h5>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setDateFormat('dmy')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  dateFormat === 'dmy'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <h6 className="font-medium">DD/MM/YYYY</h6>
                  <p className="text-sm text-gray-500 mt-1">25/12/2024</p>
                  <p className="text-xs text-gray-400 mt-1">Iraq/Middle East</p>
                  {dateFormat === 'dmy' && <Check className="w-4 h-4 text-red-600 mx-auto mt-2" />}
                </div>
              </button>
              
              <button
                onClick={() => setDateFormat('mdy')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  dateFormat === 'mdy'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <h6 className="font-medium">MM/DD/YYYY</h6>
                  <p className="text-sm text-gray-500 mt-1">12/25/2024</p>
                  <p className="text-xs text-gray-400 mt-1">US Format</p>
                  {dateFormat === 'mdy' && <Check className="w-4 h-4 text-red-600 mx-auto mt-2" />}
                </div>
              </button>
              
              <button
                onClick={() => setDateFormat('ymd')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  dateFormat === 'ymd'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <h6 className="font-medium">YYYY-MM-DD</h6>
                  <p className="text-sm text-gray-500 mt-1">2024-12-25</p>
                  <p className="text-xs text-gray-400 mt-1">ISO Format</p>
                  {dateFormat === 'ymd' && <Check className="w-4 h-4 text-red-600 mx-auto mt-2" />}
                </div>
              </button>
            </div>
          </div>

          {/* Format Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-3">Format Preview</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current time:</span>
                <span className="font-medium">
                  {useArabicNumerals && selectedLanguage === 'ar' 
                    ? convertToArabicNumerals(getCurrentTime())
                    : getCurrentTime()
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Today's date:</span>
                <span className="font-medium">
                  {useArabicNumerals && selectedLanguage === 'ar' 
                    ? convertToArabicNumerals(formatDateExample())
                    : formatDateExample()
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Message timestamp:</span>
                <span className="font-medium">
                  {useArabicNumerals && selectedLanguage === 'ar' 
                    ? convertToArabicNumerals('2:30 PM')
                    : timeFormat === '12' ? '2:30 PM' : '14:30'
                  }
                </span>
              </div>
            </div>
          </div>
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
      case 'voice-video':
        return renderVoiceVideo();
      case 'preferences':
        return renderPreferences();
      case 'security-privacy':
        return renderSecurityPrivacy();
      case 'appearance':
        return renderAppearance();
      case 'notifications':
        return renderNotifications();
      case 'account':
        return renderGenericSection('Account', <UserCheck className="w-5 h-5 mr-2" />);
      case 'sessions':
        return renderGenericSection('Sessions', <Smartphone className="w-5 h-5 mr-2" />);
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