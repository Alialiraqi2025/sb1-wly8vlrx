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
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  const handleMenuItemClick = (action: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      action();
      setIsOpen(false);
      setIsClosing(false);
    }, 100);
  };

  const menuItems = [
    {
      icon: Link,
      label: 'Link new device',
      description: 'Connect another device to your account',
      onClick: () => handleMenuItemClick(onLinkDevice),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverBg: 'group-hover:bg-blue-200'
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification preferences',
      onClick: () => handleMenuItemClick(onNotifications),
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverBg: 'group-hover:bg-green-200'
    },
    {
      icon: Shield,
      label: 'Security & Privacy',
      description: 'Password, recovery key, and privacy settings',
      onClick: () => handleMenuItemClick(onSecurityPrivacy),
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      hoverBg: 'group-hover:bg-red-200'
    },
    {
      icon: Settings,
      label: 'All Settings',
      description: 'Complete settings and preferences',
      onClick: () => handleMenuItemClick(onAllSettings),
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      hoverBg: 'group-hover:bg-gray-200'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Home Button with Dropdown Indicator */}
      <button
        onClick={handleToggle}
        className={`flex items-center space-x-1 p-2 rounded-lg transition-all duration-200 ${
          isOpen
            ? 'bg-red-100 text-red-700 shadow-md'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Home className="w-5 h-5" />
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-[100] overflow-hidden ${
          isClosing ? 'animate-scale-out' : 'animate-scale-in'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-red-100">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Home className="w-5 h-5 mr-2 text-red-600" />
              Quick Actions
            </h3>
            <p className="text-sm text-gray-600 mt-1">Manage your account and settings</p>
          </div>

          {/* Menu Items */}
          <div className="py-2 max-h-80 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-all duration-200 flex items-start space-x-3 group"
              >
                <div className={`w-10 h-10 rounded-lg ${item.bgColor} ${item.hoverBg} flex items-center justify-center transition-all duration-200`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-gray-700 truncate">
                    {item.label}
                  </h4>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600 line-clamp-2">
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
              onClick={() => handleMenuItemClick(onSignOut)}
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