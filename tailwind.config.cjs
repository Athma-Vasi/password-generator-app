/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myLightGrey: "#24232b",
        myDarkGrey: "#18171f",
        myWhite: "#f7f6fb",
        myTeal: "#a4ffaf",
        myLightOrange: "#f4ca66",
      },
      fontFamily: {
        inconsolata: ["Inconsolata", "monospace"],
      },
    },
    screens: {
      xs: "350px",
      sm: "768px",
      md: "1440px",
    },
  },

  plugins: [],
};
