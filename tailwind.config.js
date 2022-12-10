/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.tsx",
    "./public/**/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { transform: "translatex(-120%)" },
        },
      },
      animation: {
        wiggle: "wiggle 2s",
      },
      screens: {
        tablet: { min: "740px", max: "1023px" },
        md: "740px",
        mobile: { max: "739px" },
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
