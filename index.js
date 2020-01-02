const plugin = require('tailwindcss/plugin');
const _ = require('lodash');
const Color = require('color');

const flattenColorPalette = function(colors) {
  return _(colors)
    .flatMap((color, name) => {
      if (!_.isPlainObject(color)) {
        return [[name, color]];
      }
      return _.map(color, (value, key) => {
        const suffix = key === 'default' ? '' : `-${key}`;
        return [`${name}${suffix}`, value];
      });
    })
    .fromPairs()
    .value();
};

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

module.exports = plugin(function({ theme, variants, e, addUtilities }) {
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
    _.forEach(flattenColorPalette(theme('linearGradientColors')), (colors, colorKey) => {
      colors = normalizeColors(colors, true);
      if (!colors) {
        return; // continue
      }
      _.forEach(theme('linearGradientDirections'), (direction, directionKey) => {
        utilities[linearGradientSelector(directionKey, colorKey)] = {
          backgroundImage: linearGradientValue(direction, colors),
        };
      });
    });
    return utilities;
  })();

  const radialGradientUtilities = (function() {
    const utilities = {};
    _.forEach(flattenColorPalette(theme('radialGradientColors')), (colors, colorKey) => {
      colors = normalizeColors(colors, false);
      if (!colors) {
        return; // continue
      }
      _.forEach(theme('radialGradientPositions'), (position, positionKey) => {
        _.forEach(theme('radialGradientSizes'), (size, sizeKey) => {
          _.forEach(theme('radialGradientShapes'), (shape, shapeKey) => {
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
    _.forEach(flattenColorPalette(theme('conicGradientColors')), (colors, colorKey) => {
      colors = normalizeColors(colors, false);
      if (!colors) {
        return; // continue
      }
      _.forEach(theme('conicGradientPositions'), (position, positionKey) => {
        _.forEach(theme('conicGradientStartingAngles'), (startingAngle, startingAngleKey) => {
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
    _.forEach(theme('repeatingLinearGradientLengths'), (length, lengthKey) => {
      _.forEach(flattenColorPalette(theme('repeatingLinearGradientColors')), (colors, colorKey) => {
        colors = normalizeColors(colors, true);
        if (!colors) {
          return; // continue
        }
        _.forEach(theme('repeatingLinearGradientDirections'), (direction, directionKey) => {
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
    _.forEach(theme('repeatingRadialGradientLengths'), (length, lengthKey) => {
      _.forEach(flattenColorPalette(theme('repeatingRadialGradientColors')), (colors, colorKey) => {
        colors = normalizeColors(colors, false);
        if (!colors) {
          return; // continue
        }
        _.forEach(theme('repeatingRadialGradientPositions'), (position, positionKey) => {
          _.forEach(theme('repeatingRadialGradientSizes'), (size, sizeKey) => {
            _.forEach(theme('repeatingRadialGradientShapes'), (shape, shapeKey) => {
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
    _.forEach(theme('repeatingConicGradientLengths'), (length, lengthKey) => {
      _.forEach(flattenColorPalette(theme('repeatingConicGradientColors')), (colors, colorKey) => {
        colors = normalizeColors(colors, false);
        if (!colors) {
          return; // continue
        }
        _.forEach(theme('repeatingConicGradientPositions'), (position, positionKey) => {
          _.forEach(theme('repeatingConicGradientStartingAngles'), (startingAngle, startingAngleKey) => {
            utilities[conicGradientSelector(startingAngleKey, positionKey, colorKey, lengthKey)] = {
              backgroundImage: conicGradientValue(startingAngle, position, colors, length),
            };
          });
        });
      });
    });
    return utilities;
  })();

  addUtilities(backgroundImageUtilities, variants('backgroundImage'));
  addUtilities(linearGradientUtilities, variants('linearGradients'));
  addUtilities(radialGradientUtilities, variants('radialGradients'));
  addUtilities(conicGradientUtilities, variants('conicGradients'));
  addUtilities(repeatingLinearGradientUtilities, variants('repeatingLinearGradients'));
  addUtilities(repeatingRadialGradientUtilities, variants('repeatingRadialGradients'));
  addUtilities(repeatingConicGradientUtilities, variants('repeatingConicGradients'));
}, {
  theme: {
    linearGradientDirections: {
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left',
    },
    linearGradientColors: {},
    radialGradientShapes: {
      'default': 'ellipse',
    },
    radialGradientSizes: {
      'default': 'closest-side',
    },
    radialGradientPositions: {
      'default': 'center',
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    },
    radialGradientColors: {},
    conicGradientStartingAngles: {
      'default': '0',
    },
    conicGradientPositions: {
      'default': 'center',
      't': 'top',
      'tr': 'top right',
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left',
    },
    conicGradientColors: {},
    repeatingLinearGradientDirections: theme => theme('linearGradientDirections'),
    repeatingLinearGradientColors: {},
    repeatingLinearGradientLengths: {},
    repeatingRadialGradientShapes: theme => theme('radialGradientShapes'),
    repeatingRadialGradientSizes: {
      'default': 'farthest-corner',
    },
    repeatingRadialGradientPositions: theme => theme('radialGradientPositions'),
    repeatingRadialGradientColors: {},
    repeatingRadialGradientLengths: {},
    repeatingConicGradientStartingAngles: theme => theme('conicGradientStartingAngles'),
    repeatingConicGradientPositions: theme => theme('conicGradientPositions'),
    repeatingConicGradientColors: {},
    repeatingConicGradientLengths: {},
  },
  variants: {
    backgroundImage: ['responsive'],
    linearGradients: ['responsive'],
    radialGradients: ['responsive'],
    conicGradients: ['responsive'],
    repeatingLinearGradients: ['responsive'],
    repeatingRadialGradients: ['responsive'],
    repeatingConicGradients: ['responsive'],
  },
});
