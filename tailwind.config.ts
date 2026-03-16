import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'Georgia', 'serif'],
        decorative: ['Cinzel Decorative', 'Georgia', 'serif'],
        body: ['EB Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        parchment: {
          DEFAULT: '#F5E6C8',
          dark: '#E8D5A3',
          deeper: '#D4BC7A',
        },
        ink: {
          DEFAULT: '#2C1F0E',
          light: '#4A3520',
          mid: '#6B4F2A',
        },
        sepia: {
          DEFAULT: '#8B6914',
          light: '#C49A2E',
        },
        stone: '#9E8B6E',
        glow: '#F9C84A',
      },
      backgroundImage: {
        'parchment-gradient': 'linear-gradient(135deg, #F5E6C8 0%, #E8D5A3 50%, #F5E6C8 100%)',
        'stone-gradient': 'linear-gradient(180deg, #D4BC7A 0%, #C49A2E 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,200,74,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(249,200,74,0.6)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
