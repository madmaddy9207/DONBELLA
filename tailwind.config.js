/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'metal-jade': '#dfdcdc  ',
        'ultra-black': '#0A0A0A',
        'pale-charcoal': '#6B6B6B',
        'muted-sable': '#011117  ',
        'raven-black': '#1C1C1C'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'fashion': ['Cormorant Garamond', 'serif'],
        'modern': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}