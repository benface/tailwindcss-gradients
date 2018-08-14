const plugin = require('./index.js');

let generatedUtilities = {};

plugin({
  gradients: {
    'red': '#f00',
    'red-blue': ['#f00', '#00f'],
    'red-green-blue': ['#f00', '#0f0', '#00f'],
  },
})({
  e: value => value,
  addUtilities: (utilities) => {
    generatedUtilities = utilities;
  },
});

console.log('generatedUtilities', generatedUtilities);
