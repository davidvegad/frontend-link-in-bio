/** @type {import('tailwindcss').Config} */

// 1. Importamos los temas por defecto de Tailwind
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 2. Añadimos esta sección para que la clase 'font-sans' use nuestra variable
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        'inter': ['var(--font-inter)', ...fontFamily.sans],
        'roboto-mono': ['var(--font-roboto-mono)', ...fontFamily.mono],
        'lora': ['var(--font-lora)', ...fontFamily.serif],
        'playfair-display': ['var(--font-playfair-display)', ...fontFamily.serif],
        'montserrat': ['var(--font-montserrat)', ...fontFamily.sans],
        'poppins': ['var(--font-poppins)', ...fontFamily.sans],
        'roboto': ['var(--font-roboto)', ...fontFamily.sans],
        'quicksand': ['var(--font-quicksand)', ...fontFamily.sans],
        'merriweather': ['var(--font-merriweather)', ...fontFamily.serif],
        'ubuntu': ['var(--font-ubuntu)', ...fontFamily.sans],
        'nunito': ['var(--font-nunito)', ...fontFamily.sans],
        'fira-sans': ['var(--font-fira-sans)', ...fontFamily.sans],
        'work-sans': ['var(--font-work-sans)', ...fontFamily.sans],
        'caveat': ['var(--font-caveat)', ...fontFamily.sans],
        'pacifico': ['var(--font-pacifico)', ...fontFamily.sans],
        'open-sans': ['var(--font-open-sans)', ...fontFamily.sans],
        'lato': ['var(--font-lato)', ...fontFamily.sans],
        'oswald': ['var(--font-oswald)', ...fontFamily.sans],
        'pt-sans': ['var(--font-pt-sans)', ...fontFamily.sans],
        'crimson-text': ['var(--font-crimson-text)', ...fontFamily.serif],
        'libre-baskerville': ['var(--font-libre-baskerville)', ...fontFamily.serif],
        'source-sans-3': ['var(--font-source-sans-3)', ...fontFamily.sans],
        'spectral': ['var(--font-spectral)', ...fontFamily.serif],
        'karla': ['var(--font-karla)', ...fontFamily.sans],
        'mulish': ['var(--font-mulish)', ...fontFamily.sans],
        'jost': ['var(--font-jost)', ...fontFamily.sans],
        'arvo': ['var(--font-arvo)', ...fontFamily.serif],
        'itim': ['var(--font-itim)', ...fontFamily.sans],
        'comfortaa': ['var(--font-comfortaa)', ...fontFamily.sans],
        'outfit': ['var(--font-outfit)', ...fontFamily.sans],
        'dancing-script': ['var(--font-dancing-script)', ...fontFamily.sans],
        'raleway': ['var(--font-raleway)', ...fontFamily.sans],
        'comic-neue': ['var(--font-comic-neue)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};