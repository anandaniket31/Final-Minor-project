/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a4d2e", // Deep Forest Green
        secondary: "#4f9d69", // Fresh Leaf Green
        accent: "#ffb703", // Sunny Yellow
        background: "#f9f7f2", // Off-white/Cream
        surface: "#ffffff", // White
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
