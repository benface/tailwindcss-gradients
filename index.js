const _ = require('lodash');

module.exports = ({
  variants = {},
  gradients = {},
} = {}) => ({ e, addUtilities }) => {
  addUtilities(
    {
      ...Object.assign(
        {},
        ..._.map(gradients, (colors, name) => {
          if (!_.isArray(colors)) {
            colors = ['transparent', colors];
          }

          return {
            [`.${e(`bg-gradient-to-top-${name}`)}`]: { backgroundImage: `linear-gradient(to top, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-top-right-${name}`)}`]: { backgroundImage: `linear-gradient(to top right, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-top-left-${name}`)}`]: { backgroundImage: `linear-gradient(to top left, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-right-${name}`)}`]: { backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-bottom-${name}`)}`]: { backgroundImage: `linear-gradient(to bottom, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-bottom-right-${name}`)}`]: { backgroundImage: `linear-gradient(to bottom right, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-bottom-left-${name}`)}`]: { backgroundImage: `linear-gradient(to bottom left, ${colors.join(', ')})` },
            [`.${e(`bg-gradient-to-left-${name}`)}`]: { backgroundImage: `linear-gradient(to left, ${colors.join(', ')})` },
            [`.${e(`bg-g-t-${name}`)}`]: { backgroundImage: `linear-gradient(to top, ${colors.join(', ')})` },
            [`.${e(`bg-g-t-r-${name}`)}`]: { backgroundImage: `linear-gradient(to top right, ${colors.join(', ')})` },
            [`.${e(`bg-g-t-l-${name}`)}`]: { backgroundImage: `linear-gradient(to top left, ${colors.join(', ')})` },
            [`.${e(`bg-g-r-${name}`)}`]: { backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` },
            [`.${e(`bg-g-b-${name}`)}`]: { backgroundImage: `linear-gradient(to bottom, ${colors.join(', ')})` },
            [`.${e(`bg-g-b-r-${name}`)}`]: { backgroundImage: `linear-gradient(to bottom right, ${colors.join(', ')})` },
            [`.${e(`bg-g-b-l-${name}`)}`]: { backgroundImage: `linear-gradient(to bottom left, ${colors.join(', ')})` },
            [`.${e(`bg-g-l-${name}`)}`]: { backgroundImage: `linear-gradient(to left, ${colors.join(', ')})` }
          };
        }),
      ),
    },
    variants,
  );
};
