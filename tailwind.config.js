/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#f9f5f1',
          100: '#f0e6da',
          200: '#e1cdb6',
          300: '#d2b492',
          400: '#c39b6e',
          500: '#b4824a',
          600: '#a6783d',
          700: '#8c6533',
          800: '#725229',
          900: '#5a401f',
        },
        secondary: {
          50: '#f3f7f8',
          100: '#e7eef0',
          200: '#d0dfe3',
          300: '#b8cfd5',
          400: '#a1bfc9',
          500: '#8aafbc',
          600: '#7da0ae',
          700: '#6a8c99',
          800: '#577885',
          900: '#446470',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair-display)', 'serif'],
      },
    },
  },
  plugins: [],
}; 