/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html","./src/**/*.{js,jsx,ts,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js',

],
  theme: {
    extend: {
      backgroundImage: theme => ({
         'purple-gradient': 'linear-gradient(to bottom, #442661, #1f2937)',
      })
    }  },
  plugins: [    require('flowbite/plugin'),
],
}

