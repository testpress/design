/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        institute: {
          50: 'rgb(var(--institute-50) / <alpha-value>)',
          100: 'rgb(var(--institute-100) / <alpha-value>)',
          200: 'rgb(var(--institute-200) / <alpha-value>)',
          300: 'rgb(var(--institute-300) / <alpha-value>)',
          400: 'rgb(var(--institute-400) / <alpha-value>)',
          500: 'rgb(var(--institute-500) / <alpha-value>)',
          600: 'rgb(var(--institute-600) / <alpha-value>)',
          700: 'rgb(var(--institute-700) / <alpha-value>)',
          800: 'rgb(var(--institute-800) / <alpha-value>)',
          900: 'rgb(var(--institute-900) / <alpha-value>)',
          950: 'rgb(var(--institute-950) / <alpha-value>)',
        },
      },
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
