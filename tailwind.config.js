/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030710',
          900: '#0B1523',   // page background — matches BYU app
          800: '#162236',   // card background — visibly lighter than page
          700: '#1D2E47',   // elevated card / active state
          600: '#243655',   // borders, dividers
          500: '#2C4169',   // subtle highlights
        },
        cougar: {
          DEFAULT: '#002E5D',
          light: '#003F80',
          bright: '#0062B8',
        },
        electric: {
          DEFAULT: '#38BDF8',
          dim: '#0EA5E9',
          glow: '#7DD3FC',
        },
        tan: {
          DEFAULT: '#C5A670',
          dark: '#A88A56',
          light: '#D4BC91',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'swipe-left': 'swipeLeft 0.35s ease-out forwards',
        'swipe-right': 'swipeRight 0.35s ease-out forwards',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        swipeLeft: {
          '100%': { transform: 'translateX(-130%) rotate(-12deg)', opacity: '0' },
        },
        swipeRight: {
          '100%': { transform: 'translateX(130%) rotate(12deg)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.7)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
