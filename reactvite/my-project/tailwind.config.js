/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-blue': '#22409A', // Referans görseldeki tam mavi
        'theme-dark': '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fontun Inter olduğundan emin olalım
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}