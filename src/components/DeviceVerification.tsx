import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Key, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft,
  RefreshCw,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Clock,
  MapPin
} from 'lucide-react';
import { validateRecoveryKey, getDeviceInfo } from '../utils/recoveryKey';
import { TrustedDevice } from '../types';

interface DeviceVerificationProps {
  onVerified: (deviceId: string) => void;
  onBack: () => void;
  userEmail: string;
  storedRecoveryKey?: string;
}

const DeviceVerification: React.FC<DeviceVerificationProps> = ({ 
  onVerified, 
  onBack, 
  userEmail,
  storedRecoveryKey 
}) => {
  const [step, setStep] = useState<'device-info' | 'recovery-key' | 'verifying' | 'success'>('device-info');
  const [recoveryKeyInput, setRecoveryKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  useEffect(() => {
    const info = getDeviceInfo();
    setDeviceInfo(info);
  }, []);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-8 h-8" />;
      case 'tablet':
        return <Tablet className="w-8 h-8" />;
      default:
        return <Monitor className="w-8 h-8" />;
    }
  };

  const handleVerifyKey = async () => {
    if (!recoveryKeyInput.trim()) {
      setError('Please enter your recovery key');
      return;
    }

    if (!storedRecoveryKey) {
      setError('No recovery key found for this account');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isValid = validateRecoveryKey(recoveryKeyInput, storedRecoveryKey);

    if (isValid) {
      setStep('success');
      setTimeout(() => {
        onVerified(deviceInfo?.id || 'unknown-device');
      }, 1500);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setError(`Maximum verification attempts exceeded. Please try again later or contact support.`);
      } else {
        setError(`Invalid recovery key. ${maxAttempts - newAttempts} attempts remaining.`);
      }
    }

    setIsVerifying(false);
  };

  const renderDeviceInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Verification Required</h2>
        <p className="text-gray-600">We need to verify this device for your security</p>
      </div>

      <div className="element-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Device Information
        </h3>
        
        {deviceInfo && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-gray-600">
                {getDeviceIcon(deviceInfo.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{deviceInfo.name}</h4>
                <p className="text-sm text-gray-600">Device ID: {deviceInfo.id}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2"><strong>Account:</strong> {userEmail}</p>
              <p><strong>Location:</strong> Approximate location based on IP</p>
            </div>
          </div>
        )}
      </div>

      <div className="element-card p-6 border-amber-200 bg-amber-50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Security Notice</h4>
            <p className="text-sm text-amber-800">
              This device is not recognized. To protect your account, we need to verify your identity using your recovery key.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 element-button-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>
        <button
          onClick={() => setStep('recovery-key')}
          className="flex-1 element-button"
        >
          <Key className="w-4 h-4" />
          Verify with Recovery Key
        </button>
      </div>
    </div>
  );

  const renderRecoveryKeyStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Key className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Recovery Key</h2>
        <p className="text-gray-600">Use your 64-character recovery key to verify this device</p>
      </div>

      <div className="element-card p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Recovery Key
          </label>
          <button
            onClick={() => setShowKey(!showKey)}
            className="element-button-secondary p-2"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        
        <textarea
          type={showKey ? 'text' : 'password'}
          value={recoveryKeyInput}
          onChange={(e) => {
            setRecoveryKeyInput(e.target.value);
            setError('');
          }}
          placeholder="Enter your recovery key (with or without dashes)"
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm resize-none"
          disabled={isVerifying || attempts >= maxAttempts}
        />
        
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </p>
          </div>
        )}

        {attempts > 0 && attempts < maxAttempts && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              {maxAttempts - attempts} verification attempts remaining
            </p>
          </div>
        )}
      </div>

      <div className="element-card p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Recovery Key Format</h4>
            <p className="text-sm text-blue-800">
              Your recovery key is 64 characters long and may include dashes for readability (e.g., ABCD-EFGH-...).
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setStep('device-info')}
          className="flex-1 element-button-secondary"
          disabled={isVerifying}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleVerifyKey}
          className="flex-1 element-button"
          disabled={!recoveryKeyInput.trim() || isVerifying || attempts >= maxAttempts}
        >
          {isVerifying ? (
            <>
              <div className="element-spinner"></div>
              Verifying...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              Verify Device
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Verified Successfully</h2>
        <p className="text-gray-600">Welcome back to TELE IRAQ</p>
      </div>

      <div className="element-card p-6">
        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
          <div className="text-green-600">
            {deviceInfo && getDeviceIcon(deviceInfo.type)}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-green-900">
              {deviceInfo?.name || 'This Device'} is now trusted
            </h4>
            <p className="text-sm text-green-700">
              You won't need to verify this device again
            </p>
          </div>
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      </div>

      <div className="element-card p-6 border-green-200 bg-green-50">
        <div className="flex items-start space-x-3">
          <Unlock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Security Status</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Device successfully added to trusted devices</li>
              <li>• End-to-end encryption is active</li>
              <li>• Your messages and data are secure</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="element-spinner mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Completing login...</p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'device-info':
        return renderDeviceInfoStep();
      case 'recovery-key':
        return renderRecoveryKeyStep();
      case 'success':
        return renderSuccessStep();
      default:
        return renderDeviceInfoStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-y-auto device-verification-container device-verification-scrollbar universal-scrollbar">
      <div className="w-full max-w-md">
        <div className="element-card p-8 my-4">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default DeviceVerification;