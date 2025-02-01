/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      },
      colors: {
        yellow: {
          DEFAULT: '#FFD15B',
        },
        black: {
          DEFAULT: '#1B1B1B',
        },
        gray: {
          DEFAULT: '#7A7A7A',
          light: '#EDEDED',
        },
      }
    },
  },
  plugins: [
    "prettier-plugin-tailwind",
  ]
}

