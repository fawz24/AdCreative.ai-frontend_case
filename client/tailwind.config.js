/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-1": "#264cc5",
        "blue-2": "#254cc6",
        "gray-1": "#f7f7f7",
        "gray-2": "#cccbc5",
        "gray-3": "#4f4f4f",
      },
    },
  },
  plugins: [],
};
