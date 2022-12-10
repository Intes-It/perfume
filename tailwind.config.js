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
       },
       screens: {
        'tablet': {'min': '740px', 'max': '1023px'},
        'md':'740px',
        'mobile':{'max': '739px'},
       }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
