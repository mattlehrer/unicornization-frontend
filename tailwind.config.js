const colors = {
  'primary-blue': '#0e2730',
};

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.svelte'],
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors,
    },
  },
  variants: {},
  plugins: [],
};
