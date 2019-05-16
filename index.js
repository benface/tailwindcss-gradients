const _ = require('lodash');
const Color = require('color');

module.exports = function() {
  return ({ theme, variants, e, addUtilities }) => {
    const defaultGradientDirections = {
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left',
    };
    const defaultGradientColors = {};
    const defaultGradientVariants = ['responsive'];

    const gradientDirections = theme('gradients.directions', defaultGradientDirections);
    const gradientColors = theme('gradients.colors', defaultGradientColors);
    const gradientVariants = variants('gradients', defaultGradientVariants);

    const gradientUtilities = (function() {
      let utilities = {};
      _.forEach(gradientColors, (colors, colorKey) => {
        if (!_.isArray(colors) || colors.length === 1) {
          let color = _.isArray(colors) ? colors[0] : colors;
          let parsedColor = Color(color);
          colors = [parsedColor.alpha(0).rgb().string(), color];
        }
        _.forEach(gradientDirections, (direction, directionKey) => {
          utilities[`.${e(`bg-gradient-${directionKey}-${colorKey}`)}`] = {
            backgroundImage: `linear-gradient(${direction}, ${colors.join(', ')})`,
          };
        });
      });
      return utilities;
    })();

    addUtilities(gradientUtilities, gradientVariants);
  };
};
