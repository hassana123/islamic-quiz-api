/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Irish Grover", "system-ui"],
        custom2: ["Montserrat", "sans-serif"],
        custom3: ["Inter", "sans-serif"],
      },
    },
    colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      customGreen: "var(--green)",
      highlight: "var( --highlight-color)",
      redish: "var( --redish)",
      opaquebg: "var(--opaque-bg)",
      lightGreen: "var(--light-green)",
    },
  },
  plugins: [],
};