/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "red-waves": "url('/public/bgimg.jpg')",
      },
    },
    fontFamily: {
      'alfa': ['Alfa Slab One']
    }
  },
  plugins: [],
}
