const _ = require('lodash');

module.exports = ({
  variants = {},
  directions = {
    't': 'to top',
    'tr': 'to top right',
    'r': 'to right',
    'br': 'to bottom right',
    'b': 'to bottom',
    'bl': 'to bottom left',
    'l': 'to left',
    'tl': 'to top left',
  },
  gradients = {},
} = {}) => ({ e, addUtilities }) => {
  addUtilities(
    {
      ...(function() {
        const utilities = {};
        _.forEach(gradients, (gradientColors, gradientName) => {
          if (!_.isArray(gradientColors) || gradientColors.length === 1) {
            gradientColors = ['transparent', _.isArray(gradientColors) ? gradientColors[0] : gradientColors];
          }
          _.forEach(directions, (directionValue, directionName) => {
            utilities[`.${e(`bg-gradient-${directionName}-${gradientName}`)}`] = {
              backgroundImage: `linear-gradient(${directionValue}, ${gradientColors.join(', ')})`,
            };
          });
        });
        return utilities;
      })(),
    },
    variants,
  );
};
