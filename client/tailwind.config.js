/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        info:{
          1:'#3E7ECF',
          2:'#1571E3'
        },
      
      }
    },
  },
  plugins: [],
}