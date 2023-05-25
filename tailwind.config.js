/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  mode: "jit",
  content: [ 
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{ts,tsx}",
    "./public/**/*.html"
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: { 
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
