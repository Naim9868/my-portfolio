const { color } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
              'initialColor': 'rgb(39, 245, 156)',
              'hero-color1': 'rgba(39, 245, 156, 1)',
              'hero-color2': 'rgba(0, 255, 221, 1)',
              'hero-color3': 'rgba(0, 191, 255, 1)',
              'hero-color4': '#27f5b4',
              'gray-transparent': 'rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'suse-mono': ['SUSE Mono', 'monospace'],
        'courgette': ['Courgette', 'cursive'],
        'italianno': ['Italianno', 'cursive'],
        'carter-one': ['Carter One', 'cursive'],
      },
      animation: {
        'slide-in': 'slideIn 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out 0.8s both',
        'float': 'float 3s ease-in-out infinite',
        
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #64ffda, 0 0 40px #64ffda' },
          '50%': { boxShadow: '0 0 40px #64ffda, 0 0 80px #64ffda' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      },
      }
    },
  },
  plugins: []
}