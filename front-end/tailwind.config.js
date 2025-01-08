/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors :{
      'primary': '#1d4ed8',
      'secondary': '#60a5fa',
      'white' : '#FFF',
      'black' : '#000',
      'slate-200' : '#f1f5f9', 
    },
    extend: {
      backgroundImage:{
        bannerImg : "url('./brain_google.svg')"
      }
    },
  },
  plugins: [],
}