import { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        primary: '#00FF00', // Green
        highlight: '#808080',
        lightBackground: '#FFFFFF',
        lightForeground: '#1a1a1a',
        lightHighlight: '#C0C0C0',
        retroRed: '#FF3333', // Added red color for markers
      },
      fontFamily: {
        dos: ['Courier New', 'Courier', 'monospace'],
      },
      fontSize: {
        dos: ['16px', '1.5'],
      },
      lineHeight: {
        dos: '1.5',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      borderRadius: {
        retro: '0.25rem',
      },
      boxShadow: {
        retro: '4px 4px 0px #808080',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
};

export default config;
