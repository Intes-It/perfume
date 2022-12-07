module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translatex(-120%)'},
        }
       },
       animation: {
        wiggle: 'wiggle 2s',
       }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
