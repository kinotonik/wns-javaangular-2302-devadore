/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "green-slide": "#219725",
        "purple-slide": "#69256E",
        "red-slide": "#EB3D49",
        "orange-slide": "#CB7D28",
        "blue-slide": "#286A9A",
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'bounce-short': 'bounce 1s ease-in-out 3'
      },
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      koulen: ["Koulen", "sans-serif"],
      lilita: ["Lilita One", "sans-serif"],
      lexend: ["Lexend", "sans-serif"]
    },
  },
  plugins: [],
};
