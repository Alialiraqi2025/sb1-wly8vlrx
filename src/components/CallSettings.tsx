import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Camera, 
  Volume2, 
  Settings, 
  Monitor,
  Smartphone,
  Headphones,
  X,
  Check,
  RefreshCw
} from 'lucide-react';
import { MediaDeviceSettings } from '../types';
import { DeviceManager } from '../utils/webrtc';

interface CallSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: MediaDeviceSettings;
  onSettingsChange: (settings: MediaDeviceSettings) => void;
}

const CallSettings: React.FC<CallSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [audioInputDevices, setAudioInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<MediaDeviceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testStream, setTestStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadDevices();
    }
    
    return () => {
      if (testStream) {
        testStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const loadDevices = async () => {
    setIsLoading(true);
    try {
      const [audioInputs, videoInputs, audioOutputs] = await Promise.all([
        DeviceManager.getAudioInputDevices(),
        DeviceManager.getVideoInputDevices(),
        DeviceManager.getAudioOutputDevices()
      ]);
      
      setAudioInputDevices(audioInputs);
      setVideoInputDevices(videoInputs);
      setAudioOutputDevices(audioOutputs);
    } catch (error) {
      console.error('Error loading devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testMicrophone = async () => {
    try {
      if (testStream) {
        testStream.getTracks().forEach(track => track.stop());
        setTestStream(null);
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: settings.audioInputId },
        video: false
      });
      
      setTestStream(stream);
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        setTestStream(null);
      }, 5000);
    } catch (error) {
      console.error('Error testing microphone:', error);
      alert('Unable to test microphone. Please check your device connection.');
    }
  };

  const testCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: settings.videoInputId },
        audio: false
      });
      
      // Create a temporary video element to test
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // Stop after 3 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
      }, 3000);
      
      alert('Camera test successful!');
    } catch (error) {
      console.error('Error testing camera:', error);
      alert('Unable to test camera. Please check your device connection.');
    }
  };

  const updateSettings = (updates: Partial<MediaDeviceSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>Call Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="element-spinner mx-auto mb-4"></div>
              <p className="text-gray-600">Loading devices...</p>
            </div>
          ) : (
            <>
              {/* Audio Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Mic className="w-5 h-5" />
                    <span>Microphone</span>
                  </h3>
                  <button
                    onClick={testMicrophone}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      testStream 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {testStream ? 'Stop Test' : 'Test Mic'}
                  </button>
                </div>
                
                <select
                  value={settings.audioInputId || ''}
                  onChange={(e) => updateSettings({ audioInputId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Default Microphone</option>
                  {audioInputDevices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
                    </option>
                  ))}
                </select>
                
                {/* Audio Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio Quality
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map(quality => (
                      <button
                        key={quality}
                        onClick={() => updateSettings({ audioQuality: quality as any })}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          settings.audioQuality === quality
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium capitalize">{quality}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {quality === 'low' && '16 kbps'}
                            {quality === 'medium' && '32 kbps'}
                            {quality === 'high' && '64 kbps'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Video Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Camera</span>
                  </h3>
                  <button
                    onClick={testCamera}
                    className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    Test Camera
                  </button>
                </div>
                
                <select
                  value={settings.videoInputId || ''}
                  onChange={(e) => updateSettings({ videoInputId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Default Camera</option>
                  {videoInputDevices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                    </option>
                  ))}
                </select>
                
                {/* Video Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Quality
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map(quality => (
                      <button
                        key={quality}
                        onClick={() => updateSettings({ videoQuality: quality as any })}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          settings.videoQuality === quality
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium capitalize">{quality}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {quality === 'low' && '480p'}
                            {quality === 'medium' && '720p'}
                            {quality === 'high' && '1080p'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audio Output */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <span>Speaker</span>
                </h3>
                
                <select
                  value={settings.audioOutputId || ''}
                  onChange={(e) => updateSettings({ audioOutputId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Default Speaker</option>
                  {audioOutputDevices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Speaker ${device.deviceId.slice(0, 8)}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Audio Processing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Audio Processing</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.echoCancellation}
                      onChange={(e) => updateSettings({ echoCancellation: e.target.checked })}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Echo Cancellation</div>
                      <div className="text-sm text-gray-500">Reduces echo during calls</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.noiseSuppression}
                      onChange={(e) => updateSettings({ noiseSuppression: e.target.checked })}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Noise Suppression</div>
                      <div className="text-sm text-gray-500">Filters background noise</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoGainControl}
                      onChange={(e) => updateSettings({ autoGainControl: e.target.checked })}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Auto Gain Control</div>
                      <div className="text-sm text-gray-500">Automatically adjusts microphone volume</div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={loadDevices}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Devices</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallSettings;