/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors :{
      'primary': '#661F71',
      'secondary': '#D3BED5',
      'beige' : '#FFF0DB'
    },
    extend: {
      backgroundImage:{
        bannerImg : "url('./brain_google.svg')"
      }
    },
  },
  plugins: [],
}