/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Device-specific breakpoints
        'mobile-sm': {'max': '480px'},
        'mobile-lg': {'min': '481px', 'max': '768px'},
        'tablet': {'min': '769px', 'max': '1024px'},
        'desktop': {'min': '1025px'},
        // Orientation breakpoints
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        // High DPI breakpoints
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
        // iPhone specific breakpoints
        'iphone-x': {'raw': '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'},
        'iphone-pro-max': {'raw': '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)'},
        'iphone-14-pro': {'raw': '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)'},
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        // Enhanced spacing for Apple devices
        'apple-safe-top': 'max(1.5rem, env(safe-area-inset-top))',
        'apple-safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
        'apple-header': 'max(5rem, calc(4rem + env(safe-area-inset-top)))',
      },
      minHeight: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        'dvh': '100dvh',
        'svh': '100svh',
        'lvh': '100lvh',
      },
      maxHeight: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        'dvh': '100dvh',
        'svh': '100svh',
        'lvh': '100lvh',
      },
      fontSize: {
        'responsive': 'clamp(0.875rem, 2.5vw, 1rem)',
        'responsive-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 2rem)',
        'responsive-2xl': 'clamp(2rem, 5vw, 3rem)',
      },
      borderRadius: {
        'responsive': 'clamp(0.5rem, 1.5vw, 1rem)',
        'responsive-lg': 'clamp(1rem, 2.5vw, 1.5rem)',
        'responsive-xl': 'clamp(1.5rem, 3vw, 2rem)',
      },
      padding: {
        'responsive': 'clamp(1rem, 3vw, 2rem)',
        'responsive-sm': 'clamp(0.5rem, 2vw, 1rem)',
        'responsive-lg': 'clamp(1.5rem, 4vw, 3rem)',
      },
      margin: {
        'responsive': 'clamp(1rem, 3vw, 2rem)',
        'responsive-sm': 'clamp(0.5rem, 2vw, 1rem)',
        'responsive-lg': 'clamp(1.5rem, 4vw, 3rem)',
      },
      gap: {
        'responsive': 'clamp(1rem, 3vw, 2rem)',
        'responsive-sm': 'clamp(0.5rem, 2vw, 1rem)',
        'responsive-lg': 'clamp(1.5rem, 4vw, 3rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Custom plugin for responsive utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.touch-pan-x': {
          'touch-action': 'pan-x',
        },
        '.touch-pan-y': {
          'touch-action': 'pan-y',
        },
        '.touch-pinch-zoom': {
          'touch-action': 'pinch-zoom',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.transform-gpu': {
          'transform': 'translateZ(0)',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-stroke': {
          '-webkit-text-stroke': '1px currentColor',
        },
        '.text-fill-transparent': {
          '-webkit-text-fill-color': 'transparent',
        },
        '.appearance-none': {
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          'appearance': 'none',
        },
        '.tap-highlight-transparent': {
          '-webkit-tap-highlight-color': 'transparent',
        },
        '.user-select-none': {
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        },
        '.overflow-scrolling-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
        '.font-smoothing-antialiased': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '.font-smoothing-auto': {
          '-webkit-font-smoothing': 'auto',
          '-moz-osx-font-smoothing': 'auto',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};