/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors (Deep Slate)
        slate: {
          850: '#1e293b', // Sidebar
          900: '#0f172a', // Main Background
          950: '#020617', // Darker accents
        },
        // Brand colors (Indigo)
        primary: {
          400: '#818cf8', // Hover light
          500: '#6366f1', // Main Brand Color
          600: '#4f46e5', // Active/Darker
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}