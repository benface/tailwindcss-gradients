const _ = require('lodash');
const Color = require('color');

const normalizeColors = function(colors, transparentFirst = true) {
  colors = _.castArray(colors);
  const unsupportedColorKeywords = ['inherit', 'initial', 'unset', 'revert'];
  if (_.intersection(unsupportedColorKeywords, colors).length > 0) {
    return null;
  }
  if (colors.length === 1) {
    const color = colors[0];
    let transparentColor = 'transparent';
    try {
      const parsedColor = Color(color);
      transparentColor = parsedColor.alpha(0).rgb().string();
    }
    catch (e) {
    }
    colors = transparentFirst ? [transparentColor, color] : [color, transparentColor];
  }
  return colors;
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

    const cssDefaultLinearGradientDirections = ['to bottom', '180deg', '0.5turn', '200grad', '3.1416rad'];
    const cssDefaultRadialGradientShape = 'ellipse';
    const cssDefaultRadialGradientSize = 'farthest-corner';
    const cssDefaultRadialGradientPositions = ['center', 'center center', '50%', '50% 50%', 'center 50%', '50% center'];

    const linearGradientUtilities = (function() {
      let utilities = {};
      _.forEach(linearGradientColors, (colors, colorKey) => {
        colors = normalizeColors(colors, true);
        if (!colors) {
          return; // continue
        }
        _.forEach(linearGradientDirections, (direction, directionKey) => {
          utilities[`.${e(`bg-gradient-${directionKey}-${colorKey}`)}`] = {
            backgroundImage: `linear-gradient(${_.includes(cssDefaultLinearGradientDirections, direction) ? '' : `${direction}, `}${colors.join(', ')})`,
          };
        });
      });
      return utilities;
    })();

    const radialGradientUtilities = (function() {
      let utilities = {};
      _.forEach(radialGradientColors, (colors, colorKey) => {
        colors = normalizeColors(colors, false);
        if (!colors) {
          return; // continue
        }
        _.forEach(radialGradientPositions, (position, positionKey) => {
          _.forEach(radialGradientSizes, (size, sizeKey) => {
            _.forEach(radialGradientShapes, (shape, shapeKey) => {
              let firstArgumentValues = [];
              if (shape !== cssDefaultRadialGradientShape) {
                firstArgumentValues.push(shape);
              }
              if (size !== cssDefaultRadialGradientSize) {
                firstArgumentValues.push(size);
              }
              if (!_.includes(cssDefaultRadialGradientPositions, position)) {
                firstArgumentValues.push(`at ${position}`);
              }
              utilities[`.${e(`bg-radial${shapeKey === 'default' ? '' : `-${shapeKey}`}${sizeKey === 'default' ? '' : `-${sizeKey}`}${positionKey === 'default' ? '' : `-${positionKey}`}-${colorKey}`)}`] = {
                backgroundImage: `radial-gradient(${firstArgumentValues.length > 0 ? `${firstArgumentValues.join(' ')}, ` : ''}${colors.join(', ')})`,
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
