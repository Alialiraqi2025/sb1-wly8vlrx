import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Key, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  Eye, 
  EyeOff,
  QrCode,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Lock,
  Unlock,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { generateRecoveryKey, formatRecoveryKey, RecoveryKeyInfo } from '../utils/recoveryKey';

interface RecoveryKeySetupProps {
  onComplete: (recoveryKey: string) => void;
  onBack: () => void;
  isFirstTime?: boolean;
}

const RecoveryKeySetup: React.FC<RecoveryKeySetupProps> = ({ 
  onComplete, 
  onBack, 
  isFirstTime = true 
}) => {
  const [step, setStep] = useState<'intro' | 'generate' | 'verify' | 'complete'>('intro');
  const [recoveryKeyInfo, setRecoveryKeyInfo] = useState<RecoveryKeyInfo | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmations, setConfirmations] = useState({
    saved: false,
    understood: false,
    responsibility: false
  });

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    
    // Simulate key generation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const keyInfo = generateRecoveryKey();
    setRecoveryKeyInfo(keyInfo);
    setIsGenerating(false);
    setStep('generate');
  };

  const handleCopyKey = async () => {
    if (!recoveryKeyInfo) return;
    
    try {
      await navigator.clipboard.writeText(recoveryKeyInfo.formattedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy recovery key:', error);
    }
  };

  const handleDownloadKey = () => {
    if (!recoveryKeyInfo) return;
    
    const content = `TELE IRAQ Recovery Key
Generated: ${recoveryKeyInfo.createdAt.toLocaleString()}

Recovery Key: ${recoveryKeyInfo.formattedKey}

IMPORTANT SECURITY INFORMATION:
- Keep this recovery key safe and secure
- Do not share it with anyone
- Store it in a secure location separate from your device
- You will need this key to verify new devices or recover your account
- If you lose this key, you may lose access to your encrypted messages

TELE IRAQ - Secure Communication for Iraq`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TELE-IRAQ-Recovery-Key-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleVerifyKey = () => {
    if (!recoveryKeyInfo) return;
    
    const normalizedInput = verificationInput.replace(/[-\s]/g, '').toUpperCase();
    const normalizedKey = recoveryKeyInfo.key.replace(/[-\s]/g, '').toUpperCase();
    
    if (normalizedInput === normalizedKey) {
      setStep('complete');
      setVerificationError('');
    } else {
      setVerificationError('Recovery key does not match. Please try again.');
    }
  };

  const handleComplete = () => {
    if (!recoveryKeyInfo) return;
    onComplete(recoveryKeyInfo.key);
  };

  const canProceedToVerification = () => {
    return confirmations.saved && confirmations.understood && confirmations.responsibility;
  };

  const renderIntroStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isFirstTime ? 'Set Up Recovery Key' : 'Generate New Recovery Key'}
        </h2>
        <p className="text-gray-600">
          Secure your account with a recovery key for device verification
        </p>
      </div>

      <div className="element-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Key className="w-5 h-5 mr-2 text-red-600" />
          What is a Recovery Key?
        </h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>A unique 64-character code that proves you own this account</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Required to verify new devices when logging in</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Needed to recover your account if you lose access</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
            <p>Protects your encrypted messages and conversations</p>
          </div>
        </div>
      </div>

      <div className="element-card p-6 border-amber-200 bg-amber-50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Important Security Notice</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Store your recovery key in a safe, secure location</li>
              <li>• Never share your recovery key with anyone</li>
              <li>• Keep it separate from your device and password</li>
              <li>• If lost, you may lose access to encrypted messages</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 element-button-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleGenerateKey}
          className="flex-1 element-button"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className="element-spinner"></div>
          ) : (
            <>
              <Key className="w-4 h-4" />
              Generate Recovery Key
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderGenerateStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recovery Key Generated</h2>
        <p className="text-gray-600">Save this key securely before continuing</p>
      </div>

      {recoveryKeyInfo && (
        <>
          <div className="element-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Recovery Key</h3>
              <button
                onClick={() => setShowKey(!showKey)}
                className="element-button-secondary p-2"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="font-mono text-lg text-center tracking-wider">
                {showKey ? recoveryKeyInfo.formattedKey : '••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••-••••'}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleCopyKey}
                className="flex-1 element-button-secondary"
                disabled={!showKey}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Key'}
              </button>
              <button
                onClick={handleDownloadKey}
                className="flex-1 element-button-secondary"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          <div className="element-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Checklist</h3>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmations.saved}
                  onChange={(e) => setConfirmations(prev => ({ ...prev, saved: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  I have saved my recovery key in a secure location
                </span>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmations.understood}
                  onChange={(e) => setConfirmations(prev => ({ ...prev, understood: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  I understand that losing this key may result in permanent data loss
                </span>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmations.responsibility}
                  onChange={(e) => setConfirmations(prev => ({ ...prev, responsibility: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  I take full responsibility for keeping this recovery key secure
                </span>
              </label>
            </div>
          </div>
        </>
      )}

      <div className="flex space-x-3">
        <button
          onClick={() => setStep('intro')}
          className="flex-1 element-button-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={() => setStep('verify')}
          className="flex-1 element-button"
          disabled={!canProceedToVerification()}
        >
          <Shield className="w-4 h-4" />
          Continue to Verification
        </button>
      </div>
    </div>
  );

  const renderVerifyStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Recovery Key</h2>
        <p className="text-gray-600">Enter your recovery key to confirm you've saved it correctly</p>
      </div>

      <div className="element-card p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recovery Key
        </label>
        <textarea
          value={verificationInput}
          onChange={(e) => {
            setVerificationInput(e.target.value);
            setVerificationError('');
          }}
          placeholder="Enter your recovery key (with or without dashes)"
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm resize-none"
        />
        {verificationError && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {verificationError}
          </p>
        )}
      </div>

      <div className="element-card p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Verification Purpose</h4>
            <p className="text-sm text-blue-800">
              This step ensures you have correctly saved your recovery key and can access it when needed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setStep('generate')}
          className="flex-1 element-button-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleVerifyKey}
          className="flex-1 element-button"
          disabled={!verificationInput.trim()}
        >
          <CheckCircle className="w-4 h-4" />
          Verify Key
        </button>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recovery Key Setup Complete</h2>
        <p className="text-gray-600">Your account is now secured with a recovery key</p>
      </div>

      <div className="element-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Unlock className="w-5 h-5 mr-2 text-green-600" />
          What's Next?
        </h3>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-start space-x-3">
            <Monitor className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Device Verification</p>
              <p className="text-gray-600">Use your recovery key to verify new devices when logging in</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Account Recovery</p>
              <p className="text-gray-600">Recover your account if you lose access to your device</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Message Security</p>
              <p className="text-gray-600">Your encrypted messages remain protected across devices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="element-card p-6 border-green-200 bg-green-50">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Security Reminder</h4>
            <p className="text-sm text-green-800">
              Keep your recovery key safe and never share it with anyone. You can always generate a new one from your account settings if needed.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="w-full element-button"
      >
        <CheckCircle className="w-4 h-4" />
        Complete Setup
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'intro':
        return renderIntroStep();
      case 'generate':
        return renderGenerateStep();
      case 'verify':
        return renderVerifyStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return renderIntroStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="element-card p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default RecoveryKeySetup;