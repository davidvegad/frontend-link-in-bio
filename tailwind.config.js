/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#750a97',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  safelist: [
    'text-white',
    'text-black',
    'bg-black',
    'bg-white',
    'bg-opacity-50',
  ],
};