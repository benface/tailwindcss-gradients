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
    const defaultBackgroundImageVariants = ['responsive'];
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
    const defaultConicGradientStartingAngles = {
      'default': '0',
    };
    const defaultConicGradientPositions = {
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
    const defaultConicGradientColors = {};
    const defaultConicGradientVariants = ['responsive'];
    const defaultRepeatingLinearGradientDirections = defaultLinearGradientDirections;
    const defaultRepeatingLinearGradientColors = {};
    const defaultRepeatingLinearGradientLengths = {};
    const defaultRepeatingLinearGradientVariants = ['responsive'];
    const defaultRepeatingRadialGradientShapes = defaultRadialGradientShapes;
    const defaultRepeatingRadialGradientSizes = {
      'default': 'farthest-corner',
    };
    const defaultRepeatingRadialGradientPositions = defaultRadialGradientPositions;
    const defaultRepeatingRadialGradientColors = {};
    const defaultRepeatingRadialGradientLengths = {};
    const defaultRepeatingRadialGradientVariants = ['responsive'];
    const defaultRepeatingConicGradientStartingAngles = defaultConicGradientStartingAngles;
    const defaultRepeatingConicGradientPositions = defaultConicGradientPositions;
    const defaultRepeatingConicGradientColors = {};
    const defaultRepeatingConicGradientLengths = {};
    const defaultRepeatingConicGradientVariants = ['responsive'];

    const backgroundImageVariants = variants('backgroundImage', defaultBackgroundImageVariants);
    const linearGradientDirections = theme('linearGradients.directions', defaultLinearGradientDirections);
    const linearGradientColors = theme('linearGradients.colors', defaultLinearGradientColors);
    const linearGradientVariants = variants('linearGradients', defaultLinearGradientVariants);
    const radialGradientShapes = theme('radialGradients.shapes', defaultRadialGradientShapes);
    const radialGradientSizes = theme('radialGradients.sizes', defaultRadialGradientSizes);
    const radialGradientPositions = theme('radialGradients.positions', defaultRadialGradientPositions);
    const radialGradientColors = theme('radialGradients.colors', defaultRadialGradientColors);
    const radialGradientVariants = variants('radialGradients', defaultRadialGradientVariants);
    const conicGradientStartingAngles = theme('conicGradients.startingAngles', defaultConicGradientStartingAngles);
    const conicGradientPositions = theme('conicGradients.positions', defaultConicGradientPositions);
    const conicGradientColors = theme('conicGradients.colors', defaultConicGradientColors);
    const conicGradientVariants = variants('conicGradients', defaultConicGradientVariants);
    const repeatingLinearGradientDirections = theme('repeatingLinearGradients.directions', defaultRepeatingLinearGradientDirections);
    const repeatingLinearGradientColors = theme('repeatingLinearGradients.colors', defaultRepeatingLinearGradientColors);
    const repeatingLinearGradientLengths = theme('repeatingLinearGradients.lengths', defaultRepeatingLinearGradientLengths);
    const repeatingLinearGradientVariants = variants('repeatingLinearGradients', defaultRepeatingLinearGradientVariants);
    const repeatingRadialGradientShapes = theme('repeatingRadialGradients.shapes', defaultRepeatingRadialGradientShapes);
    const repeatingRadialGradientSizes = theme('repeatingRadialGradients.sizes', defaultRepeatingRadialGradientSizes);
    const repeatingRadialGradientPositions = theme('repeatingRadialGradients.positions', defaultRepeatingRadialGradientPositions);
    const repeatingRadialGradientColors = theme('repeatingRadialGradients.colors', defaultRepeatingRadialGradientColors);
    const repeatingRadialGradientLengths = theme('repeatingRadialGradients.lengths', defaultRepeatingRadialGradientLengths);
    const repeatingRadialGradientVariants = variants('repeatingRadialGradients', defaultRepeatingRadialGradientVariants);
    const repeatingConicGradientStartingAngles = theme('repeatingConicGradients.startingAngles', defaultRepeatingConicGradientStartingAngles);
    const repeatingConicGradientPositions = theme('repeatingConicGradients.positions', defaultRepeatingConicGradientPositions);
    const repeatingConicGradientColors = theme('repeatingConicGradients.colors', defaultRepeatingConicGradientColors);
    const repeatingConicGradientLengths = theme('repeatingConicGradients.lengths', defaultRepeatingConicGradientLengths);
    const repeatingConicGradientVariants = variants('repeatingConicGradients', defaultRepeatingConicGradientVariants);

    const linearGradientSelector = function(directionKey, colorKey, lengthKey) {
      return `.${e(`bg-gradient-${directionKey}-${colorKey}${lengthKey ? `-${lengthKey}` : ''}`)}`;
    };

    const linearGradientValue = function(direction, colors, length) {
      const cssDefaultLinearGradientDirections = ['to bottom', '180deg', '0.5turn', '200grad', '3.1416rad'];
      return `${!_.isNil(length) ? 'repeating-' : ''}linear-gradient(${_.includes(cssDefaultLinearGradientDirections, direction) ? '' : `${direction}, `}${colors.join(', ')}${length ? ` ${length}` : ''})`;
    };

    const radialGradientSelector = function(shapeKey, sizeKey, positionKey, colorKey, lengthKey) {
      return `.${e(`bg-radial${shapeKey === 'default' ? '' : `-${shapeKey}`}${sizeKey === 'default' ? '' : `-${sizeKey}`}${positionKey === 'default' ? '' : `-${positionKey}`}-${colorKey}${lengthKey ? `-${lengthKey}` : ''}`)}`;
    };

    const radialGradientValue = function(shape, size, position, colors, length) {
      const cssDefaultRadialGradientShape = 'ellipse';
      const cssDefaultRadialGradientSize = 'farthest-corner';
      const cssDefaultRadialGradientPositions = ['center', 'center center', '50%', '50% 50%', 'center 50%', '50% center'];
      const firstArgumentValues = [];
      if (shape !== cssDefaultRadialGradientShape) {
        firstArgumentValues.push(shape);
      }
      if (size !== cssDefaultRadialGradientSize) {
        firstArgumentValues.push(size);
      }
      if (!_.includes(cssDefaultRadialGradientPositions, position)) {
        firstArgumentValues.push(`at ${position}`);
      }
      return `${!_.isNil(length) ? 'repeating-' : ''}radial-gradient(${firstArgumentValues.length > 0 ? `${firstArgumentValues.join(' ')}, ` : ''}${colors.join(', ')}${length ? ` ${length}` : ''})`;
    };

    const conicGradientSelector = function(startingAngleKey, positionKey, colorKey, lengthKey) {
      return `.${e(`bg-conic${startingAngleKey === 'default' ? '' : `-${startingAngleKey}`}${positionKey === 'default' ? '' : `-${positionKey}`}-${colorKey}${lengthKey ? `-${lengthKey}` : ''}`)}`;
    };

    const conicGradientValue = function(startingAngle, position, colors, length) {
      const cssDefaultConicGradientStartingAngles = ['0', '0deg', '0%', '0turn', '0grad', '0rad'];
      const cssDefaultConicGradientPositions = ['center', 'center center', '50%', '50% 50%', 'center 50%', '50% center'];
      const firstArgumentValues = [];
      if (!_.includes(cssDefaultConicGradientStartingAngles, startingAngle)) {
        firstArgumentValues.push(`from ${startingAngle}`);
      }
      if (!_.includes(cssDefaultConicGradientPositions, position)) {
        firstArgumentValues.push(`at ${position}`);
      }
      return `${!_.isNil(length) ? 'repeating-' : ''}conic-gradient(${firstArgumentValues.length > 0 ? `${firstArgumentValues.join(' ')}, ` : ''}${colors.join(', ')}${length ? ` ${length}` : ''})`;
    };

    const backgroundImageUtilities = {
      '.bg-none': {
        backgroundImage: 'none',
      },
    };

    const linearGradientUtilities = (function() {
      const utilities = {};
      _.forEach(linearGradientColors, (colors, colorKey) => {
        colors = normalizeColors(colors, true);
        if (!colors) {
          return; // continue
        }
        _.forEach(linearGradientDirections, (direction, directionKey) => {
          utilities[linearGradientSelector(directionKey, colorKey)] = {
            backgroundImage: linearGradientValue(direction, colors),
          };
        });
      });
      return utilities;
    })();

    const radialGradientUtilities = (function() {
      const utilities = {};
      _.forEach(radialGradientColors, (colors, colorKey) => {
        colors = normalizeColors(colors, false);
        if (!colors) {
          return; // continue
        }
        _.forEach(radialGradientPositions, (position, positionKey) => {
          _.forEach(radialGradientSizes, (size, sizeKey) => {
            _.forEach(radialGradientShapes, (shape, shapeKey) => {
              utilities[radialGradientSelector(shapeKey, sizeKey, positionKey, colorKey)] = {
                backgroundImage: radialGradientValue(shape, size, position, colors),
              };
            });
          });
        });
      });
      return utilities;
    })();

    const conicGradientUtilities = (function() {
      const utilities = {};
      _.forEach(conicGradientColors, (colors, colorKey) => {
        colors = normalizeColors(colors, false);
        if (!colors) {
          return; // continue
        }
        _.forEach(conicGradientPositions, (position, positionKey) => {
          _.forEach(conicGradientStartingAngles, (startingAngle, startingAngleKey) => {
            utilities[conicGradientSelector(startingAngleKey, positionKey, colorKey)] = {
              backgroundImage: conicGradientValue(startingAngle, position, colors),
            };
          });
        });
      });
      return utilities;
    })();

    const repeatingLinearGradientUtilities = (function() {
      const utilities = {};
      _.forEach(repeatingLinearGradientLengths, (length, lengthKey) => {
        _.forEach(repeatingLinearGradientColors, (colors, colorKey) => {
          colors = normalizeColors(colors, true);
          if (!colors) {
            return; // continue
          }
          _.forEach(repeatingLinearGradientDirections, (direction, directionKey) => {
            utilities[linearGradientSelector(directionKey, colorKey, lengthKey)] = {
              backgroundImage: linearGradientValue(direction, colors, length),
            };
          });
        });
      });
      return utilities;
    })();

    const repeatingRadialGradientUtilities = (function() {
      const utilities = {};
      _.forEach(repeatingRadialGradientLengths, (length, lengthKey) => {
        _.forEach(repeatingRadialGradientColors, (colors, colorKey) => {
          colors = normalizeColors(colors, false);
          if (!colors) {
            return; // continue
          }
          _.forEach(repeatingRadialGradientPositions, (position, positionKey) => {
            _.forEach(repeatingRadialGradientSizes, (size, sizeKey) => {
              _.forEach(repeatingRadialGradientShapes, (shape, shapeKey) => {
                utilities[radialGradientSelector(shapeKey, sizeKey, positionKey, colorKey, lengthKey)] = {
                  backgroundImage: radialGradientValue(shape, size, position, colors, length),
                };
              });
            });
          });
        });
      });
      return utilities;
    })();

    const repeatingConicGradientUtilities = (function() {
      const utilities = {};
      _.forEach(repeatingConicGradientLengths, (length, lengthKey) => {
        _.forEach(repeatingConicGradientColors, (colors, colorKey) => {
          colors = normalizeColors(colors, false);
          if (!colors) {
            return; // continue
          }
          _.forEach(repeatingConicGradientPositions, (position, positionKey) => {
            _.forEach(repeatingConicGradientStartingAngles, (startingAngle, startingAngleKey) => {
              utilities[conicGradientSelector(startingAngleKey, positionKey, colorKey, lengthKey)] = {
                backgroundImage: conicGradientValue(startingAngle, position, colors, length),
              };
            });
          });
        });
      });
      return utilities;
    })();

    addUtilities(backgroundImageUtilities, backgroundImageVariants);
    addUtilities(linearGradientUtilities, linearGradientVariants);
    addUtilities(radialGradientUtilities, radialGradientVariants);
    addUtilities(conicGradientUtilities, conicGradientVariants);
    addUtilities(repeatingLinearGradientUtilities, repeatingLinearGradientVariants);
    addUtilities(repeatingRadialGradientUtilities, repeatingRadialGradientVariants);
    addUtilities(repeatingConicGradientUtilities, repeatingConicGradientVariants);
  };
};
