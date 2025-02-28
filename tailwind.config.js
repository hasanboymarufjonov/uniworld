/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DFDFEC",
        secondary: "#4F46E5",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
});
