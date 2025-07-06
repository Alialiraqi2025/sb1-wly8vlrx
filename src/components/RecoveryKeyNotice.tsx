import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  X, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Lock,
  Smartphone,
  Monitor,
  Clock
} from 'lucide-react';

interface RecoveryKeyNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  onSetupRecoveryKey: () => void;
  onRemindLater: () => void;
  userEmail: string;
}

const RecoveryKeyNotice: React.FC<RecoveryKeyNoticeProps> = ({
  isOpen,
  onClose,
  onSetupRecoveryKey,
  onRemindLater,
  userEmail
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleSetupNow = () => {
    setIsClosing(true);
    setTimeout(() => {
      onSetupRecoveryKey();
      setIsClosing(false);
    }, 200);
  };

  const handleRemindLater = () => {
    setIsClosing(true);
    setTimeout(() => {
      onRemindLater();
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Your Account</h2>
            <p className="text-gray-600">Set up a recovery key to protect your encrypted messages</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6 overflow-y-auto modal-scrollbar max-h-[calc(90vh-120px)]">
          {/* Account Info */}
          <div className="element-card p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {userEmail.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-blue-900">Account: {userEmail}</p>
                <p className="text-sm text-blue-700">Logged in successfully</p>
              </div>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* Why Recovery Key */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Key className="w-5 h-5 mr-2 text-red-600" />
              Why do you need a recovery key?
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                  <Monitor className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Device Verification</p>
                  <p className="text-xs text-gray-600">Verify new devices when logging in from different locations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                  <Lock className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Message Protection</p>
                  <p className="text-xs text-gray-600">Secure access to your encrypted conversations and files</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                  <Smartphone className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Account Recovery</p>
                  <p className="text-xs text-gray-600">Recover your account if you lose access to your device</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="element-card p-4 border-amber-200 bg-amber-50">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Important Security Notice</h4>
                <p className="text-sm text-amber-800">
                  Without a recovery key, you may lose access to your encrypted messages if you lose your device or forget your password.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSetupNow}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Shield className="w-5 h-5" />
              <span>Set Up Recovery Key Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleRemindLater}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Remind Me Later</span>
            </button>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Skip for now (not recommended)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryKeyNotice;