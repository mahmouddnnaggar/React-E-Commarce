/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '50px',
        screens: {
          sm: '600px',
          md: '720px',
          lg: '990px',
          xl: '1200px',
          '2xl': '1490px',
        },
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      boxShadow: {
        cstm: '0 0 2px rgba(0, 0, 0, 0.2)',
        cstmlg: '0 0 3px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
