import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Monitor, 
  Tablet, 
  QrCode, 
  Key, 
  Shield, 
  CheckCircle,
  Copy,
  Download,
  RefreshCw,
  AlertTriangle,
  Wifi,
  Link
} from 'lucide-react';

interface LinkDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

const LinkDeviceModal: React.FC<LinkDeviceModalProps> = ({
  isOpen,
  onClose,
  userEmail
}) => {
  const [step, setStep] = useState<'method' | 'qr' | 'manual' | 'success'>('method');
  const [linkingCode, setLinkingCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateLinkingCode = async () => {
    setIsGenerating(true);
    
    // Simulate code generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const code = Math.random().toString(36).substring(2, 15).toUpperCase();
    setLinkingCode(code);
    setIsGenerating(false);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(linkingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleClose = () => {
    setStep('method');
    setLinkingCode('');
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  const renderMethodSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Link className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Link New Device</h2>
        <p className="text-gray-600">Choose how you want to connect your new device</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => {
            setStep('qr');
            generateLinkingCode();
          }}
          className="w-full p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
              <QrCode className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900">
                Scan QR Code
              </h3>
              <p className="text-gray-600 group-hover:text-blue-700">
                Use your new device to scan a QR code (Recommended)
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setStep('manual');
            generateLinkingCode();
          }}
          className="w-full p-8 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
              <Key className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-900">
                Manual Entry
              </h3>
              <p className="text-gray-600 group-hover:text-green-700">
                Enter a linking code manually on your new device
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="element-card p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Security Notice</h4>
            <p className="text-sm text-amber-800">
              Only link devices you own and trust. Linking codes expire after 10 minutes for security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQRCode = () => (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => setStep('method')}
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center mx-auto"
        >
          ← Back to methods
        </button>
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan QR Code</h2>
        <p className="text-gray-600">Use your new device to scan this code</p>
      </div>

      {isGenerating ? (
        <div className="text-center py-12">
          <div className="element-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Generating secure linking code...</p>
        </div>
      ) : (
        <>
          {/* QR Code Display */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-6" />
                <p className="text-lg text-gray-500">QR Code</p>
                <p className="text-xs text-gray-400 mt-1">Code: {linkingCode}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="element-card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Instructions</h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Open TELE IRAQ on your new device</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Go to Settings → Link Device</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Scan this QR code with your device camera</span>
              </li>
            </ol>
          </div>

          {/* Expiry Warning */}
          <div className="element-card p-4 bg-red-50 border-red-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-900">Code expires in 10 minutes</p>
                <p className="text-xs text-red-700">Generate a new code if this one expires</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex space-x-3">
        <button
          onClick={generateLinkingCode}
          disabled={isGenerating}
          className="flex-1 element-button-secondary"
        >
          <RefreshCw className="w-4 h-4" />
          Generate New Code
        </button>
        <button
          onClick={() => setStep('manual')}
          className="flex-1 element-button-secondary"
        >
          <Key className="w-4 h-4" />
          Use Manual Entry
        </button>
      </div>
    </div>
  );

  const renderManualEntry = () => (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => setStep('method')}
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center mx-auto"
        >
          ← Back to methods
        </button>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Key className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manual Entry</h2>
        <p className="text-gray-600">Enter this code on your new device</p>
      </div>

      {isGenerating ? (
        <div className="text-center py-12">
          <div className="element-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Generating secure linking code...</p>
        </div>
      ) : (
        <>
          {/* Linking Code */}
          <div className="element-card p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">Your Linking Code</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="font-mono text-2xl font-bold text-gray-900 tracking-wider mb-2">
                  {linkingCode}
                </div>
                <p className="text-sm text-gray-500">Enter this code exactly as shown</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleCopyCode}
                className="flex-1 element-button-secondary"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
              <button
                onClick={() => {
                  const content = `TELE IRAQ Device Linking Code\n\nCode: ${linkingCode}\nAccount: ${userEmail}\nGenerated: ${new Date().toLocaleString()}\n\nThis code expires in 10 minutes.`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `TELE-IRAQ-Link-Code-${Date.now()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="element-button-secondary"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="element-card p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Instructions</h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Open TELE IRAQ on your new device</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Go to Settings → Link Device → Manual Entry</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Enter the linking code: <strong>{linkingCode}</strong></span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Complete the verification process</span>
              </li>
            </ol>
          </div>

          {/* Expiry Warning */}
          <div className="element-card p-4 bg-red-50 border-red-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-900">Code expires in 10 minutes</p>
                <p className="text-xs text-red-700">Generate a new code if this one expires</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex space-x-3">
        <button
          onClick={generateLinkingCode}
          disabled={isGenerating}
          className="flex-1 element-button-secondary"
        >
          <RefreshCw className="w-4 h-4" />
          Generate New Code
        </button>
        <button
          onClick={() => setStep('qr')}
          className="flex-1 element-button-secondary"
        >
          <QrCode className="w-4 h-4" />
          Use QR Code
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto modal-scrollbar max-h-[calc(90vh-80px)]">
          {step === 'method' && renderMethodSelection()}
          {step === 'qr' && renderQRCode()}
          {step === 'manual' && renderManualEntry()}
        </div>
      </div>
    </div>
  );
};

export default LinkDeviceModal;