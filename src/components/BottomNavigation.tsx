import React from 'react';
import { Home, Search, Grid3X3, ShoppingBag, User, Lock } from 'lucide-react';

interface BottomNavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onShowAdminAuth?: () => void;
  screenSize?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentView, 
  setCurrentView,
  onShowAdminAuth,
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'categories', icon: Grid3X3, label: 'Categories' },
    { id: 'cart', icon: ShoppingBag, label: 'Cart' },
    { id: 'account', icon: User, label: 'Account' }
  ];

  // Dynamic bottom navigation class
  const getBottomNavClass = () => {
    return 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-bottom';
  };

  // Dynamic container class
  const getContainerClass = () => {
    if (screenSize.isTablet) {
      return 'max-w-4xl mx-auto';
    } else {
      return 'max-w-md mx-auto';
    }
  };

  // Dynamic button size
  const getButtonClass = (isActive: boolean) => {
    const baseClass = `flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 touch-target ios-button android-button hover-lift touch-active focus-ring`;
    const activeClass = isActive ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600';
    
    if (screenSize.isTablet) {
      return `${baseClass} ${activeClass} py-3 px-4`;
    } else {
      return `${baseClass} ${activeClass}`;
    }
  };

  // Dynamic icon size
  const getIconClass = (isActive: boolean) => {
    const baseClass = `mb-1 transition-transform`;
    const scaleClass = isActive ? 'scale-110' : '';
    
    if (screenSize.isTablet) {
      return `${baseClass} ${scaleClass} h-6 w-6`;
    } else {
      return `${baseClass} ${scaleClass} h-5 w-5`;
    }
  };

  // Dynamic text size
  const getTextClass = () => {
    if (screenSize.isTablet) {
      return 'text-sm font-medium';
    } else {
      return 'text-xs font-medium';
    }
  };

  return (
    <>
      {/* Admin Login Button - Positioned above bottom navigation */}
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={onShowAdminAuth}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300 hover:scale-110 touch-target ios-button android-button hover-lift touch-active focus-ring"
          aria-label="Admin login"
          title="Admin Access"
        >
          <Lock className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className={getBottomNavClass()}>
        <div className={getContainerClass()}>
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={getButtonClass(currentView === item.id)}
                aria-label={`Navigate to ${item.label}`}
              >
                <item.icon className={getIconClass(currentView === item.id)} />
                <span className={getTextClass()}>{item.label}</span>
                {item.id === 'cart' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;