const { and } = require('firebase/firestore');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // heading: ['Roboto Slab', 'serif'],
      // subHeading: ['Roboto', 'sans-serif'],
      // body: ['Roboto', 'sans-serif'],
      heading: ['Hind Siliguri', 'sans-serif'],
      subHeading: ['Hind Siliguri', 'sans-serif'],
      body: ['Hind Siliguri', 'sans-serif'],

      // body: ['Poppins', 'sans-serif'],
      // body: ['Montserrat', 'sans-serif'],
      bangla: ['Hind Siliguri', 'sans-serif'],
    },
    extend: {
      scrollbar: ['webkit'],
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem', // Default size for headings
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      backgroundColor: {
        'primary-bg': '#fd6406',
        'main-bg': '#ffffff',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        primary: '#fd6406',
        color: 'rgba(0, 0, 0, 0.1)',
      },
      textColor: {
        nav: '#000000',
        navWhite: '#ffffff',
        primary: '#fd6406',
        headerMain: '#101828',
        headerSub: '#101828',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },

      lineHeight: {
        20: '80px',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(.9)' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        pulse: 'pulse 4s infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
