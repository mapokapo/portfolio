/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "gradient-move": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        "gradient-move": "gradient-move 5s ease infinite",
      },
      screens: {
        xs: "327px",
        "xs-max": {
          max: "327px",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
