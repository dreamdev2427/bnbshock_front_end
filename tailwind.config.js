/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/**/*.html",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
      extend: {
        colors:{
          'primary-dark-100' : 'rgb(64, 69, 108)',
          'primary-dark-600' : 'rgb(28, 30, 47)',
          'primaryGreen'       : '#51ff0d',
          'lightGreen'       : '#7fff4d',
          'primary-dark-900' : 'rgb(6, 6, 10)',
          'primary-dark-700' : 'rgb(20, 22, 34)',
          'primary-dark-500' : 'rgb(35, 38, 59)',
        }, 
        fill:{
          'primary-dark-300' : '#313554',
          'primary-purple-100' : '#c723d4',
          'primary-green-100' : '#7fff4d',
          'primary-green-300' : '#51ff0d',
        },
        stroke:{
          'primary-green-100' : '#7fff4d',
          'primary-dark-300' : '#313554',
        },
        dropShadow:{
          'neon-pink-sm' : '0px 0px 3px rgba(194,90,236,.7)',
          'neon-pink-md' : '0px 0px 5px rgba(194,90,236,.8)',
          'green-sm' : '0px 0px 3px rgba(81, 255, 13, 0.7)',
          'green-md' : '0px 0px 5px rgba(81, 255, 13, 0.8)',
          
        }
      },
  },
  plugins: [require('flowbite/plugin')],
}
