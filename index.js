const _ = require('lodash');

module.exports = ({
  variants = {},
  gradients = {},
} = {}) =>
  ({ e, addUtilities }) => {
    addUtilities(
      {
        ...Object.assign(
          {},
          ..._.map(gradients, (colors, name) => {
            if (!_.isArray(colors)) {
              colors = ['transparent', colors];
            }
            return {
              [`.bg-gradient-to-top-${e(name)}`]: { backgroundImage: `linear-gradient(to top, ${colors.join(', ')})` },
              [`.bg-gradient-to-right-${e(name)}`]: { backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` },
              [`.bg-gradient-to-bottom-${e(name)}`]: { backgroundImage: `linear-gradient(to bottom, ${colors.join(', ')})` },
              [`.bg-gradient-to-left-${e(name)}`]: { backgroundImage: `linear-gradient(to left, ${colors.join(', ')})` },
            };
          }),
        ),
      },
      variants,
    );
  };
