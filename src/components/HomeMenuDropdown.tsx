import React, { useState, useRef, useEffect } from 'react';
import { 
  Home,
  Smartphone,
  Bell,
  Shield,
  Settings,
  LogOut,
  ChevronDown,
  Link,
  Lock,
  User,
  Key
} from 'lucide-react';

interface HomeMenuDropdownProps {
  onLinkDevice: () => void;
  onNotifications: () => void;
  onSecurityPrivacy: () => void;
  onAllSettings: () => void;
  onSignOut: () => void;
}

const HomeMenuDropdown: React.FC<HomeMenuDropdownProps> = ({
  onLinkDevice,
  onNotifications,
  onSecurityPrivacy,
  onAllSettings,
  onSignOut
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: Link,
      label: 'Link new device',
      description: 'Connect another device to your account',
      onClick: () => {
        onLinkDevice();
        setIsOpen(false);
      },
      color: 'text-blue-600'
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification preferences',
      onClick: () => {
        onNotifications();
        setIsOpen(false);
      },
      color: 'text-green-600'
    },
    {
      icon: Shield,
      label: 'Security & Privacy',
      description: 'Password, recovery key, and privacy settings',
      onClick: () => {
        onSecurityPrivacy();
        setIsOpen(false);
      },
      color: 'text-red-600'
    },
    {
      icon: Settings,
      label: 'All Settings',
      description: 'Complete settings and preferences',
      onClick: () => {
        onAllSettings();
        setIsOpen(false);
      },
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Home Button with Dropdown Indicator */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 p-2 rounded-lg transition-all duration-200 ${
          isOpen
            ? 'bg-red-100 text-red-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Home className="w-5 h-5" />
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-scale-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Home className="w-5 h-5 mr-2 text-red-600" />
              Quick Actions
            </h3>
            <p className="text-sm text-gray-600 mt-1">Manage your account and settings</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all duration-200 flex items-start space-x-3 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center transition-all duration-200`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                    {item.label}
                  </h4>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Separator */}
          <div className="border-t border-gray-100"></div>

          {/* Sign Out */}
          <div className="p-2">
            <button
              onClick={() => {
                onSignOut();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-red-50 transition-all duration-200 flex items-center space-x-3 group rounded-lg"
            >
              <div className="w-10 h-10 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-all duration-200">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-red-700 group-hover:text-red-800">
                  Sign out
                </h4>
                <p className="text-sm text-red-500 group-hover:text-red-600">
                  Log out of your account
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeMenuDropdown;