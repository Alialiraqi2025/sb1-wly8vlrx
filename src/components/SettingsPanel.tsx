import React, { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  Lock, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  Smartphone, 
  Key, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Upload, 
  Trash2, 
  Edit3, 
  Save, 
  AlertTriangle,
  CheckCircle,
  Settings,
  LogOut,
  Download,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Clock,
  MapPin,
  Volume2,
  Vibrate,
  MessageSquare,
  Phone,
  Users,
  AtSign,
  Palette,
  Languages,
  HelpCircle,
  Info,
  FileText,
  Mail
} from 'lucide-react';
import { User as UserType } from '../types';
import RecoveryKeySetup from './RecoveryKeySetup';

interface SettingsPanelProps {
  user: UserType;
  onSignOut?: () => void;
}

type SettingsSection = 
  | 'main' 
  | 'profile' 
  | 'account' 
  | 'security' 
  | 'privacy' 
  | 'notifications' 
  | 'appearance' 
  | 'devices' 
  | 'language' 
  | 'help' 
  | 'about';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user, onSignOut }) => {
  // ... rest of the code remains the same ...

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {currentSection !== 'main' ? (
          <button
            onClick={() => setCurrentSection('main')}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
        <h2 className="text-lg font-semibold text-gray-900">
          {currentSection === 'main' ? 'Settings' : 
           currentSection === 'profile' ? 'Profile' :
           currentSection === 'security' ? 'Security & Privacy' :
           currentSection === 'notifications' ? 'Notifications' :
           currentSection === 'appearance' ? 'Appearance' :
           currentSection === 'devices' ? 'Devices' :
           currentSection === 'language' ? 'Language & Region' :
           currentSection === 'help' ? 'Help & Support' :
           currentSection === 'about' ? 'About' : 'Settings'}
        </h2>
        <div />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default SettingsPanel;