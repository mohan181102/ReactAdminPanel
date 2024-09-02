/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': { 'max': '650px' },
        // => @media (min-width: 640px) { ... }

        'md': { 'max': '768px' },
        // => @media (min-width: 768px) { ... }

        'lg': { 'max': '1024px' },
        // => @media (min-width: 1024px) { ... }

        'xl': { 'max': '1280px' },
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

