const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.js",
    "./src/app/**/*.js",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        titles: ["var(--font-titles)"],
        txt: ["var(--font-txt)"],
        numbers: ["var(--font-numbers)"],
      },
      colors: {
        beige: "#e6d9c1",
        darkBlue: "#1f344a",
        lightRed: "#dd3254",
        musicColor: "#253142",
      },
      backgroundImage: {
        beigePattern: "url('/assets/backgrounds/bg-beige-desktop.webp')",
        beigePatternTablet: "url('/assets/backgrounds/bg-beige-tablet.webp')",
        beigePatternMobile: "url('/assets/backgrounds/bg-beige-mobile.webp')",
        redPattern: "url('/assets/backgrounds/bg-red-desktop.webp')",
        redPatternTablet: "url('/assets/backgrounds/bg-red-tablet.webp')",
        redPatternMobile: "url('/assets/backgrounds/bg-red-mobile.webp')",
        bluePattern: "url('/assets/backgrounds/bg-blue-desktop.webp')",
        bluePatternTablet: "url('/assets/backgrounds/bg-blue-tablet.webp')",
        bluePatternMobile: "url('/assets/backgrounds/bg-blue-mobile.webp')",
      },
      screens: {
        xs: "380px",
        xs2: "400px",
        xs3: "410px",
        md1: "600px",
        md2: "790px",
        md3: "820px",
        "1xl": "1360px",
        "1xxl": "1440px",
        "3xl": "1600px",
        "4xl": "1680px",
        fullHD: "1920px",
        "2k": "2560px",
        "4k": "3840px",
        "iphone-1": "390px",
        "iphone-2": "414px",
        "iphone-3": "428px",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/aspect-ratio")],
  corePlugins: {
    aspectRatio: false,
  },
};
