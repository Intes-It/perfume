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
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%": { transform: "translatex(-120%)" },
        },
        bottomToTop: {
          "0%": { transform: "translatey(0.5rem)", opacity: 0 },
        },
        crescendo: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        wiggle: "wiggle 2s",
        bottomToTop: "bottomToTop 0.3s",
        crescendo: "crescendo .5s alternate ease-in",
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
