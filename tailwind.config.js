module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      bangla: ["Hind Siliguri", "sans-serif"],
      heading: ["Roboto Slab", "serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "primary-bg": "#d6295f",
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#020268",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#f0f0f0",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        primary: "#d6295f",
        color: "rgba(0, 0, 0, 0.1)",
      },
      textColor: {
        input: "#929292",
        primary: "#d6295f",
        headerMain: "#26346E",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('/Background/banner-bg.jpg')",
      },
      lineHeight: {
        20: "80px",
      },
    },
  },
  plugins: [],
};
