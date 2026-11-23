/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdfa',
          100: '#fef9f0',
          200: '#fdf3e2',
          300: '#fae7cb',
          400: '#f5d3a5',
          500: '#eeb877',
        },
        solar: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Core Vibrant Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        espresso: {
          950: '#0c0a09', // Darkest background
          900: '#141210', // Dark card
          850: '#1a1714',
          800: '#26211c', // Dark border / surface
          700: '#383028',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.45)',
        'glow-orange-sm': '0 0 15px -3px rgba(249, 115, 22, 0.35)',
        'dock-light': '0 20px 40px -15px rgba(234, 88, 12, 0.15)',
        'dock-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'card-light': '0 12px 32px -8px rgba(180, 83, 9, 0.08)',
        'card-dark': '0 12px 32px -8px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
