/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main": "#0aad0a",
        "light": "#f0f3f2"
      }
    },
    container:{
      center:true,
      padding:'1rem'
    }
  },
  plugins: [],
  darkMode: 'class',
}