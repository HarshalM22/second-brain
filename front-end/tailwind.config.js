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
      'beige' : '#FFF0DB',
      'white' : '#FFF',
      'black' : '#000',
    },
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'serif': ['Merriweather', 'serif'],
      'mono': ['Inconsolata', 'monospace'],
      'asap' : ['', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        bannerImg : "url('./brain_google.svg')"
      }
    },
  },
  plugins: [],
}