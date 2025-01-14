module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      dash_heading: ['Roboto Slab', 'serif'],
      // dash_heading: ['Roboto', 'sans-serif'],
      // body: ['Roboto', 'sans-serif'],
      heading: ['Hind Siliguri', 'sans-serif'],
      subHeading: ['Hind Siliguri', 'sans-serif'],
      body: ['Hind Siliguri', 'sans-serif'],

      form: ['Jost', 'sans-serif'],
      // dash_heading: ['Montserrat', 'sans-serif'],
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
        dashboard_primary_bg: '#f9f9fa',
        primary_btn: '#001f3f',
        secondary_btn: '#3d9970',
        tertiary_btn: '#4c6ef5',
        brand_btn: '#fd6406',
        link_bg: '#fd65063a',
        hover_btn: '#fecb6c3a',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        primary: '#fd6406',
        color: 'rgba(0, 0, 0, 0.1)',
        dashboard_border: 'rgb(234, 236, 240)',
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
        body: '34px',
        20: '80px',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(.9)' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
        },
        growAndFade: {
          '0%': { opacity: 0.25, transform: 'scale(0)' },
          '100%': { opacity: 0, transform: 'scale(1)' },
        },
        pulseFade: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(2.5)', opacity: 0 },
        },
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        pulse: 'pulse 4s infinite',
        growAndFade: 'growAndFade 3s infinite ease-out',
        pulseFade: 'pulseFade 2s infinite ease-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
