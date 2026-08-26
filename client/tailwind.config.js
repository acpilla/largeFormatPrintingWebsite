/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        background: "#F2F2F7",
        card: "#FFFFFF",
        text: "#1C1C1E"
      },
      borderRadius: {
        xl: "1rem"
      }
    },
  },
  plugins: [],
}