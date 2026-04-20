/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#E31C5F',
        textPrimary: '#222222',
        textSecondary: '#666666',
        surface: '#F8F9FA',
        border: '#E0E0E0',
        error: '#DC3545',
        success: '#28A745',
      }
    },
  },
  plugins: [],
};