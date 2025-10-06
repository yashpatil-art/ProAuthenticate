/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A6B2F',
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bce1bd',
          300: '#8dcc8f',
          400: '#57b15b',
          500: '#1A6B2F',
          600: '#15832a',
          700: '#126724',
          800: '#115220',
          900: '#0f441d',
        },
        secondary: {
          DEFAULT: '#8B4513',
          500: '#8B4513',
        },
        accent: {
          DEFAULT: '#FFD700',
          500: '#FFD700',
        },
        dark: {
          DEFAULT: '#2D3748',
          500: '#2D3748',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    // Remove the forms plugin for now
  ],
}