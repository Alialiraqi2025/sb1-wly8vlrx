import React, { useState } from 'react';
import { Menu, X, ShoppingBasket, Search, ShoppingCart, ArrowLeft, User, MessageCircle } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user?: any;
  onShowAuth: () => void;
  onShowChat: () => void;
  screenSize?: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  user, 
  onShowAuth, 
  onShowChat,
  screenSize = { width: 0, height: 0, isMobile: true, isTablet: false, isDesktop: false }
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getTitle = () => {
    switch (currentView) {
      case 'account':
        return 'My Account';
      case 'search':
        return 'Search Products';
      case 'cart':
        return 'Shopping Cart';
      case 'categories':
        return 'Categories';
      default:
        return 'Durra Market 2';
    }
  };

  const showBackButton = currentView !== 'home';

  const handleAccountClick = () => {
    if (user) {
      setCurrentView('account');
    } else {
      onShowAuth();
    }
    setIsMenuOpen(false);
  };

  // Enhanced header class with better Apple device handling
  const getHeaderClass = () => {
    const baseClass = 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm';
    
    // Enhanced safe area handling for all devices
    if (screenSize.isMobile) {
      return `${baseClass} pt-safe-top`;
    } else {
      return `${baseClass} safe-top`;
    }
  };

  // Dynamic container class with better responsive handling
  const getContainerClass = () => {
    if (screenSize.isDesktop) {
      return 'max-w-6xl mx-auto px-6';
    } else if (screenSize.isTablet) {
      return 'max-w-4xl mx-auto px-4';
    } else {
      return 'max-w-md mx-auto px-3';
    }
  };

  // Enhanced header content class with better mobile spacing
  const getHeaderContentClass = () => {
    if (screenSize.isMobile) {
      // Optimized for mobile with better spacing and alignment
      return 'flex justify-between items-center py-3 min-h-[60px]';
    } else if (screenSize.isTablet) {
      return 'flex justify-between items-center py-4 min-h-[64px]';
    } else {
      return 'flex justify-between items-center py-4 min-h-[68px]';
    }
  };

  // Enhanced logo/title section with better mobile layout
  const getLogoSectionClass = () => {
    if (screenSize.isMobile) {
      return 'flex items-center space-x-2 flex-1 min-w-0 mr-2';
    } else {
      return 'flex items-center space-x-3 flex-1 min-w-0';
    }
  };

  // Enhanced title class with better mobile typography
  const getTitleClass = () => {
    if (screenSize.isDesktop) {
      return 'text-2xl font-bold text-gray-900';
    } else if (screenSize.isTablet) {
      return 'text-xl font-bold text-gray-900';
    } else {
      // Mobile-optimized title with better sizing and truncation
      return 'text-base font-bold text-gray-900 truncate max-w-[140px] sm:max-w-[180px]';
    }
  };

  // Enhanced action buttons section
  const getActionSectionClass = () => {
    if (screenSize.isMobile) {
      return 'flex items-center space-x-1 flex-shrink-0';
    } else {
      return 'flex items-center space-x-2 flex-shrink-0';
    }
  };

  // Enhanced button class for mobile
  const getButtonClass = () => {
    if (screenSize.isMobile) {
      return 'p-2 hover:bg-gray-100 rounded-full transition-colors touch-target ios-button android-button hover-lift focus-ring';
    } else {
      return 'p-2 hover:bg-gray-100 rounded-full transition-colors touch-target ios-button android-button hover-lift focus-ring';
    }
  };

  // Enhanced menu button class with orange color
  const getMenuButtonClass = () => {
    if (screenSize.isMobile) {
      return 'p-2 hover:bg-orange-50 rounded-full transition-colors touch-target ios-button android-button hover-lift focus-ring';
    } else {
      return 'p-2 hover:bg-orange-50 rounded-full transition-colors touch-target ios-button android-button hover-lift focus-ring';
    }
  };

  return (
    <header className={getHeaderClass()}>
      <div className={getContainerClass()}>
        <div className={getHeaderContentClass()}>
          {/* Logo/Back Button and Title Section */}
          <div className={getLogoSectionClass()}>
            {showBackButton ? (
              <button
                onClick={() => setCurrentView('home')}
                className={`${getButtonClass()} flex-shrink-0`}
                aria-label="Go back to home"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            ) : (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl flex-shrink-0">
                <ShoppingBasket className={`${screenSize.isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
              </div>
            )}
            
            {/* Title with better mobile handling */}
            <div className="flex-1 min-w-0">
              <h1 className={getTitleClass()} title={getTitle()}>
                {getTitle()}
              </h1>
              {/* Subtitle for mobile home view */}
              {screenSize.isMobile && currentView === 'home' && (
                <p className="text-xs text-gray-500 truncate">Your Local Food Store</p>
              )}
            </div>
          </div>

          {/* Action Icons Section */}
          <div className={getActionSectionClass()}>
            {/* Desktop-specific actions */}
            {screenSize.isDesktop && currentView === 'home' && (
              <>
                <button 
                  onClick={() => setCurrentView('search')}
                  className={getButtonClass()}
                  aria-label="Search products"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setCurrentView('cart')}
                  className={`${getButtonClass()} relative`}
                  aria-label="View shopping cart"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <button
                  onClick={onShowChat}
                  className={getButtonClass()}
                  aria-label="Open chat support"
                >
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                </button>
              </>
            )}

            {/* Mobile/Tablet-specific actions */}
            {!screenSize.isDesktop && currentView === 'home' && (
              <>
                <button 
                  onClick={() => setCurrentView('search')}
                  className={getButtonClass()}
                  aria-label="Search products"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setCurrentView('cart')}
                  className={`${getButtonClass()} relative`}
                  aria-label="View shopping cart"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
              </>
            )}
            
            {/* User Avatar or Login Button */}
            {user ? (
              <button
                onClick={handleAccountClick}
                className={`flex items-center space-x-2 bg-orange-50 hover:bg-orange-100 transition-colors touch-target ios-button android-button hover-lift focus-ring ${
                  screenSize.isMobile ? 'px-2 py-2 rounded-full' : 'px-3 py-2 rounded-full'
                }`}
                aria-label="View account"
              >
                <div className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center ${
                  screenSize.isMobile ? 'w-5 h-5' : 'w-6 h-6'
                }`}>
                  <User className={`${screenSize.isMobile ? 'h-3 w-3' : 'h-3 w-3'} text-white`} />
                </div>
                {screenSize.isDesktop && (
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={onShowAuth}
                className={`bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg transition-all ios-button android-button hover-lift touch-active focus-ring ${
                  screenSize.isMobile 
                    ? 'px-3 py-2 rounded-full text-xs' 
                    : 'px-4 py-2 rounded-full text-sm'
                }`}
                aria-label="Login or sign up"
              >
                {screenSize.isMobile ? 'Login' : 'Login'}
              </button>
            )}

            {/* Menu Button - only on mobile/tablet with orange color */}
            {!screenSize.isDesktop && (
              <button
                className={getMenuButtonClass()}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-orange-600" />
                ) : (
                  <Menu className="h-5 w-5 text-orange-600" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Mobile/Tablet Navigation */}
        {!screenSize.isDesktop && isMenuOpen && (
          <div className="bg-white border-t border-gray-200 py-4 mx-3 mb-4 rounded-b-2xl shadow-lg animate-slide-down">
            <nav className="flex flex-col space-y-1">
              <button 
                onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }}
                className={`text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium px-4 py-3 text-left rounded-lg touch-target ios-button android-button hover-lift focus-ring ${
                  currentView === 'home' ? 'text-orange-600 bg-orange-50' : ''
                }`}
              >
                🏠 Home
              </button>
              <button 
                onClick={() => { setCurrentView('search'); setIsMenuOpen(false); }}
                className={`text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium px-4 py-3 text-left rounded-lg touch-target ios-button android-button hover-lift focus-ring ${
                  currentView === 'search' ? 'text-orange-600 bg-orange-50' : ''
                }`}
              >
                🔍 Search Products
              </button>
              <button 
                onClick={() => { setCurrentView('categories'); setIsMenuOpen(false); }}
                className={`text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium px-4 py-3 text-left rounded-lg touch-target ios-button android-button hover-lift focus-ring ${
                  currentView === 'categories' ? 'text-orange-600 bg-orange-50' : ''
                }`}
              >
                📂 Categories
              </button>
              <button 
                onClick={() => { setCurrentView('cart'); setIsMenuOpen(false); }}
                className={`text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium px-4 py-3 text-left rounded-lg touch-target ios-button android-button hover-lift focus-ring ${
                  currentView === 'cart' ? 'text-orange-600 bg-orange-50' : ''
                }`}
              >
                🛒 Shopping Cart
              </button>
              <button 
                onClick={handleAccountClick}
                className={`text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium px-4 py-3 text-left rounded-lg touch-target ios-button android-button hover-lift focus-ring ${
                  currentView === 'account' ? 'text-orange-600 bg-orange-50' : ''
                }`}
              >
                👤 {user ? 'My Account' : 'Login / Sign Up'}
              </button>
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>
              
              <button 
                onClick={() => { onShowChat(); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors font-medium px-4 py-3 text-left rounded-lg flex items-center space-x-2 touch-target ios-button android-button hover-lift focus-ring"
              >
                <MessageCircle className="h-4 w-4" />
                <span>💬 Contact Support</span>
              </button>
              
              {/* Store Info */}
              <div className="px-4 py-3 bg-gray-50 rounded-lg mx-2 mt-2">
                <div className="text-xs text-gray-600">
                  <p className="font-medium text-gray-800 mb-1">📍 Store Location</p>
                  <p>Haifa Street, Al-Karkh, Baghdad</p>
                  <p className="mt-1">📞 +964 770 123 4567</p>
                  <p>⭐ 4.9 Store Rating</p>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;