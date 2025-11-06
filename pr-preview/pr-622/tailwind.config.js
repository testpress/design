/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const patterns = [
  "jigsaw", "overcast", "formalinvitation", "topography", "texture", "jupiter",
  "architect", "cutout", "hideout", "graphpaper", "yyy", "squares",
  "fallingtriangles", "pianoman", "piefactory", "dominos", "hexagons",
  "charliebrown", "autumn", "temple", "stampcollection", "deathstar",
  "churchonsunday", "ilikefood", "overlappinghexagons", "fourpointstars",
  "bamboo", "bathroomfloor", "corkscrew", "happyintersection", "kiwi",
  "lips", "lisbon", "randomshapes", "steelbeams", "tinycheckers", "xequals",
  "anchorsaway", "bevelcircle", "brickwall", "fancyrectangles", "heavyrain",
  "overlappingcircles", "plus", "roundedplusconnected", "volcanolamp", "wiggle",
  "bubbles", "cage", "connections", "current", "diagonalstripes", "flippeddiamonds",
  "floatingcogs", "glamorous", "houndstooth", "leaf", "linesinmotion",
  "moroccan", "morphingdiamonds", "rails", "rain", "skulls", "squaresinsquares",
  "stripes", "tictactoe", "zigzag", "aztec", "banknote", "boxes", "circlessquares",
  "circuitboard", "curtain", "diagonallines", "endlessclouds", "eyes",
  "floortile", "groovy", "intersectingcircles", "melt", "overlappingdiamonds",
  "parkayfloor", "pixeldots", "polkadots", "signal", "slantedstars", "wallpaper"
];


const colorNames = Object.keys(colors).filter(
  (name) =>
    typeof colors[name] === 'object' && // ignore things like 'inherit'
    !name.startsWith('lightBlue') &&
    !name.startsWith('warmGray') &&
    !name.startsWith('trueGray') &&
    !name.startsWith('coolGray') &&
    !name.startsWith('blueGray')
);

const safelist = [
  // Existing heropattern combinations
  ...patterns.flatMap(p =>
    colorNames.flatMap(c => [
      `heropattern-${p}-${c}-100`,
      `heropattern-${p}-${c}-200`,
    ])
  ),

  // Add all bg-colorname-100 classes
  ...colorNames.map(c => `bg-${c}-100`),
];

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/preline/dist/*.js",
    "node_modules/@themesberg/tailwind-datepicker/dist/js/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: colors.blue[50],
          100: colors.blue[100],
          200: colors.blue[200],
          300: colors.blue[300],
          400: colors.blue[400],
          500: colors.blue[500],
          600: colors.blue[600],
          700: colors.blue[700],
          800: colors.blue[800],
          900: colors.blue[900],
        }
      }
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    }
  },
    safelist: safelist,
  plugins: [
    require('tailwindcss-hero-patterns'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('preline/plugin'),
  ],
};
