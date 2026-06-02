/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dmk-red': '#CC0000',
        'gold':    '#FFD700',
      },
      fontFamily: {
        cinzel:   ['Cinzel', 'serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        tiro:     ['Tiro Tamil', 'serif'],
      },
      backgroundImage: {
        'dmk-gradient': 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #E5C200 100%)',
      },
      boxShadow: {
        'red-glow':  '0 0 25px rgba(204,0,0,0.5), 0 0 50px rgba(204,0,0,0.2)',
        'gold-glow': '0 0 25px rgba(255,215,0,0.4), 0 0 50px rgba(255,215,0,0.15)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float':      'float 5s ease-in-out infinite',
        'shimmer':    'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
};
