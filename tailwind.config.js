/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mystic: {
          bg: '#0A0A0F',      // Fondo principal oscuro
          surface: '#1A1A2E',  // Cards/surfaces
          accent: '#C9A86A',   // Dorado
          cream: '#F4EAD5',    // Crema
          burgundy: '#6B2D2D'  // Burdeos
        }
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],      // Títulos místicos
        body: ['"Inter"', 'sans-serif']      // Body legible
      }
    },
  },
  plugins: [],
}
