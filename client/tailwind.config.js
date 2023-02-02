/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // primary: "#292D51",
        // secondary: "#292D51",
        // dimWhite: "#292D51",
        // dimBlue: "#292D51",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xy: "373px",
      xx: "415px",
      xs: "480px",
      xm: "575px",
      ss: "620px",
      sm: "768px",
      sd: "991px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
};


