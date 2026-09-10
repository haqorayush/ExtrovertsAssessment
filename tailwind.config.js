/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#000000',
          card: '#0D0A18',
          border: '#272042',
          purple: '#8B5CF6',
          violet: '#7C3AED',
          magenta: '#EC4899',
          pink: '#FF6B6B',
        }
      }
    },
  },
  plugins: [],
}
