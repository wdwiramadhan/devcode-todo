const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        primary: "#16ABF8",
        danger: "#ED4C5C",
        "secondary-1": "#111111",
        "secondary-2": "#555555",
        "secondary-3": "#888888",
        "secondary-4": "#C7C7C7",
        "secondary-5": "#E5E5E5",
        "secondary-6": "#4A4A4A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
