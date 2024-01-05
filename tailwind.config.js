module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      heading: ['Roboto Slab', 'serif'],
      subHeading: ['Roboto', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
      // body: ['Poppins', 'sans-serif'],
      // body: ['Montserrat', 'sans-serif'],
      bangla: ['Hind Siliguri', 'sans-serif'],
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'primary-bg': '#14752b',
        'main-bg': '#ffffff',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        primary: '#14752b',
        color: 'rgba(0, 0, 0, 0.1)',
      },
      textColor: {
        nav: '#000000',
        navWhite: '#ffffff',
        primary: '#14752b',
        headerMain: '#173F56',
        headerSub: '#264751',
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
    },
  },
  plugins: [],
};
