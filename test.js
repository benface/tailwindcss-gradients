const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const gradientsPlugin = require('./index.js');

const generatePluginCss = (config) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            'sm': '640px',
          },
        },
        corePlugins: (function() {
          let disabledCorePlugins = {};
          Object.keys(defaultConfig.variants).forEach(corePlugin => {
            disabledCorePlugins[corePlugin] = false;
          });
          return disabledCorePlugins;
        })(),
        plugins: [
          gradientsPlugin(),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities;', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('there is no output by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(``);
  });
});

test('there is no output without directions', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {},
        colors: {
          'red': '#f00',
          'green': '#0f0',
          'blue': '#00f',
        },
      },
    },
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('there is no output without colors', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {
          't': 'to top',
          'r': 'to right',
          'b': 'to bottom',
          'l': 'to left',
        },
        colors: {},
      },
    },
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('there are default directions', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        colors: {
          'red': '#f00',
        },
      },
    },
    variants: {
      gradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-tr-red {
        background-image: linear-gradient(to top right, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-r-red {
        background-image: linear-gradient(to right, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-br-red {
        background-image: linear-gradient(to bottom right, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-b-red {
        background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-bl-red {
        background-image: linear-gradient(to bottom left, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-l-red {
        background-image: linear-gradient(to left, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-tl-red {
        background-image: linear-gradient(to top left, rgba(255, 0, 0, 0), #f00);
      }
    `);
  });
});

test('directions can be customized', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {
          'to-top': 'to top',
        },
        colors: {
          'red': '#f00',
          'green': '#0f0',
          'blue': '#00f',
        },
      },
    },
    variants: {
      gradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-top-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, rgba(0, 255, 0, 0), #0f0);
      }
      .bg-gradient-to-top-blue {
        background-image: linear-gradient(to top, rgba(0, 0, 255, 0), #00f);
      }
    `);
  });
});

test('gradients can have multiple colors', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {
          'to-bottom': 'to bottom',
        },
        colors: {
          'red-green': ['#f00', '#0f0'],
          'red-green-blue': ['#f00', '#0f0', '#00f'],
        },
      },
    },
    variants: {
      gradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-bottom-red-green {
        background-image: linear-gradient(to bottom, #f00, #0f0);
      }
      .bg-gradient-to-bottom-red-green-blue {
        background-image: linear-gradient(to bottom, #f00, #0f0, #00f);
      }
    `);
  });
});

test('multiple directions and multiple gradients can be used together', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {
          'to-top': 'to top',
          'to-bottom': 'to bottom',
        },
        colors: {
          'red': ['#f00'],
          'green': ['#0f0'],
        },
      },
    },
    variants: {
      gradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-top-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-to-bottom-red {
        background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, rgba(0, 255, 0, 0), #0f0);
      }
      .bg-gradient-to-bottom-green {
        background-image: linear-gradient(to bottom, rgba(0, 255, 0, 0), #0f0);
      }
    `);
  });
});

test('colors can be referenced from the theme with a closure', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'red': '#f00',
        'blue': '#00f',
      },
      gradients: theme => ({
        directions: {
          'b': 'to bottom',
        },
        colors: theme('colors'),
      }),
    },
    variants: {
      gradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-b-red {
        background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-b-blue {
        background-image: linear-gradient(to bottom, rgba(0, 0, 255, 0), #00f);
      }
    `);
  });
});

test('responsive utilities are generated by default', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {
          't': 'to top',
        },
        colors: {
          'red': '#f00',
        },
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      @media (min-width: 640px) {
        .sm\\:bg-gradient-t-red {
          background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
        }
      }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      gradients: {
        directions: {
          't': 'to top',
        },
        colors: {
          'red': '#f00',
        },
      },
    },
    variants: {
      gradients: ['hover', 'active'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .hover\\:bg-gradient-t-red:hover {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .active\\:bg-gradient-t-red:active {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
    `);
  });
});
