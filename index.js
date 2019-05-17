const _ = require('lodash');
const Color = require('color');

const listColors = function(colors, transparentFirst = true) {
  if (!_.isArray(colors) || colors.length === 1) {
    const color = _.isArray(colors) ? colors[0] : colors;
    const parsedColor = Color(color);
    const transparentColor = parsedColor.alpha(0).rgb().string();
    colors = transparentFirst ? [transparentColor, color] : [color, transparentColor];
  }
  return colors.join(', ');
};

module.exports = function() {
  return ({ theme, variants, e, addUtilities }) => {
    const defaultLinearGradientDirections = {
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left',
    };
    const defaultLinearGradientColors = {};
    const defaultLinearGradientVariants = ['responsive'];
    const defaultRadialGradientShapes = {
      'default': 'ellipse',
    };
    const defaultRadialGradientSizes = {
      'default': 'closest-side',
    };
    const defaultRadialGradientPositions = {
      'default': 'center',
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    };
    const defaultRadialGradientColors = {};
    const defaultRadialGradientVariants = ['responsive'];

    const linearGradientDirections = theme('linearGradients.directions', defaultLinearGradientDirections);
    const linearGradientColors = theme('linearGradients.colors', defaultLinearGradientColors);
    const linearGradientVariants = variants('linearGradients', defaultLinearGradientVariants);
    const radialGradientShapes = theme('radialGradients.shapes', defaultRadialGradientShapes);
    const radialGradientSizes = theme('radialGradients.sizes', defaultRadialGradientSizes);
    const radialGradientPositions = theme('radialGradients.positions', defaultRadialGradientPositions);
    const radialGradientColors = theme('radialGradients.colors', defaultRadialGradientColors);
    const radialGradientVariants = variants('radialGradients', defaultRadialGradientVariants);

    const linearGradientUtilities = (function() {
      let utilities = {};
      _.forEach(linearGradientColors, (colors, colorKey) => {
        _.forEach(linearGradientDirections, (direction, directionKey) => {
          utilities[`.${e(`bg-gradient-${directionKey}-${colorKey}`)}`] = {
            backgroundImage: `linear-gradient(${direction}, ${listColors(colors, true)})`,
          };
        });
      });
      return utilities;
    })();

    const radialGradientUtilities = (function() {
      let utilities = {};
      _.forEach(radialGradientColors, (colors, colorKey) => {
        _.forEach(radialGradientPositions, (position, positionKey) => {
          _.forEach(radialGradientSizes, (size, sizeKey) => {
            _.forEach(radialGradientShapes, (shape, shapeKey) => {
              utilities[`.${e(`bg-radial${shapeKey === 'default' ? '' : `-${shapeKey}`}${sizeKey === 'default' ? '' : `-${sizeKey}`}${positionKey === 'default' ? '' : `-${positionKey}`}-${colorKey}`)}`] = {
                backgroundImage: `radial-gradient(${shape} ${size} at ${position}, ${listColors(colors, false)})`,
              };
            });
          });
        });
      });
      return utilities;
    })();

    addUtilities(linearGradientUtilities, linearGradientVariants);
    addUtilities(radialGradientUtilities, radialGradientVariants);
  };
};
