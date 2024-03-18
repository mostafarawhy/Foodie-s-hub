/** @type {import('tailwindcss').Config}*/
const tailwindConfig = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "890px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};

module.exports = tailwindConfig;
