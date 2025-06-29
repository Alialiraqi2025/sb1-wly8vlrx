import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedRestaurants';
import Deals from './components/Deals';
import PopularProducts from './components/PopularDishes';
import QuickActions from './components/QuickActions';
import BottomNavigation from './components/BottomNavigation';
import Account from './components/Account';
import Cart from './components/Cart';
import Search from './components/Search';
import Auth from './components/Auth';
import Chat from './components/Chat';
import AdminAuth from './components/Admin/AdminAuth';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle viewport height for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Check for admin access in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdminAuth(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleAdminLogin = (adminData: any) => {
    setAdmin(adminData);
    setShowAdminAuth(false);
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    // Remove admin parameter from URL
    const url = new URL(window.location);
    url.searchParams.delete('admin');
    window.history.replaceState({}, document.title, url.pathname);
  };

  // If admin is logged in, show admin dashboard
  if (admin) {
    return (
      <AdminDashboard 
        admin={admin} 
        onLogout={handleAdminLogout}
        screenSize={screenSize}
      />
    );
  }

  // If admin auth is requested, show admin login
  if (showAdminAuth) {
    return (
      <AdminAuth 
        onLogin={handleAdminLogin}
        onClose={() => setShowAdminAuth(false)}
        screenSize={screenSize}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'account':
        if (!user) {
          setShowAuth(true);
          setCurrentView('home');
          return (
            <>
              <Hero />
              <Categories />
              <FeaturedProducts />
              <Deals />
              <PopularProducts />
              <QuickActions />
            </>
          );
        }
        return <Account user={user} onLogout={handleLogout} />;
      case 'cart':
        return <Cart />;
      case 'search':
        return <Search />;
      case 'categories':
        return <Categories />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Deals />
            <PopularProducts />
            <QuickActions />
          </>
        );
    }
  };

  // Dynamic container class based on screen size
  const getContainerClass = () => {
    if (screenSize.isDesktop) {
      return 'min-h-screen bg-gray-50 pb-20 max-w-6xl mx-auto';
    } else if (screenSize.isTablet) {
      return 'min-h-screen bg-gray-50 pb-20 max-w-4xl mx-auto';
    } else {
      return 'min-h-screen bg-gray-50 pb-20';
    }
  };

  // Dynamic chat button positioning
  const getChatButtonClass = () => {
    if (screenSize.isDesktop) {
      return 'fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 touch-target';
    } else {
      return 'fixed bottom-32 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 touch-target';
    }
  };

  return (
    <div className={`${getContainerClass()} ios-safe-area android-optimized text-crisp`}>
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        user={user}
        onShowAuth={() => setShowAuth(true)}
        onShowChat={() => setShowChat(true)}
        screenSize={screenSize}
      />
      
      <main className="smooth-scroll">
        {renderCurrentView()}
      </main>
      
      {/* Bottom Navigation - only show on mobile and tablet */}
      {!screenSize.isDesktop && (
        <BottomNavigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          onShowAdminAuth={() => setShowAdminAuth(true)}
          screenSize={screenSize}
        />
      )}
      
      {/* Desktop Navigation - only show on desktop */}
      {screenSize.isDesktop && (
        <nav className="fixed top-20 left-8 bg-white rounded-2xl shadow-lg p-4 z-30 no-print">
          <div className="flex flex-col space-y-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'search', label: 'Search' },
              { id: 'categories', label: 'Categories' },
              { id: 'cart', label: 'Cart' },
              { id: 'account', label: 'Account' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all touch-target ${
                  currentView === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Desktop Admin Access */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAdminAuth(true)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Admin</span>
            </button>
          </div>
        </nav>
      )}
      
      {/* Auth Modal */}
      {showAuth && (
        <Auth 
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          screenSize={screenSize}
        />
      )}

      {/* Chat Modal */}
      {showChat && (
        <Chat 
          onClose={() => setShowChat(false)}
          user={user}
          screenSize={screenSize}
        />
      )}

      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className={`${getChatButtonClass()} ios-button android-button hover-lift touch-active focus-ring`}
          aria-label="Open chat support"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default App;