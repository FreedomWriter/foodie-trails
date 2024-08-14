// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        retroBrown: 'rgb(76, 58, 50)',
        retroYellow: 'rgb(245, 215, 110)',
        retroGreen: 'rgb(59, 83, 35)',
        retroBlue: 'rgb(58, 95, 205)',
        retroOrange: 'rgb(211, 84, 0)',
        retroRed: 'rgb(231, 76, 60)',
        retroGray: 'rgb(189, 195, 199)',
        retroDark: 'rgb(44, 62, 80)',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'Courier New', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
};
