/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  mode: "jit",
  content: [ 
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
  ],
};
