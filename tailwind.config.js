/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2.5xl': '1.75rem', // Define the font size for `2.5xl`
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Define Roboto as a custom font family
      },
      colors: {
        primary: {
          500: '#e3e6f3', // Replace with your desired color value
          600: '#088168',
          700: '#009071',
          800: "rgb(44, 174, 186)", // background navbar.
          "coloring": " #f4e5ec"
        },
      },
      screens: {
        'custom-sm': '476px', // Define a custom breakpoint
        'custom2-sm': '430px'
      },
    },
  },
  plugins: [],
}