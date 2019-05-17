const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
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
        corePlugins: false,
        plugins: [
          gradientsPlugin(),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities', {
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

test('there is no output without directions or positions', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {},
        colors: {
          'red': '#f00',
          'green': '#0f0',
          'blue': '#00f',
        },
      },
      radialGradients: {
        positions: {},
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
      linearGradients: {
        directions: {
          't': 'to top',
          'r': 'to right',
          'b': 'to bottom',
          'l': 'to left',
        },
        colors: {},
      },
      radialGradients: {
        positions: {
          'default': 'center',
          't': 'top',
          'r': 'right',
          'b': 'bottom',
          'l': 'left',
        },
        colors: {},
      },
    },
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('linear gradients have default directions', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        colors: {
          'red': '#f00',
        },
      },
    },
    variants: {
      linearGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-tr-red {
        background-image: linear-gradient(to top right, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-r-red {
        background-image: linear-gradient(to right, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-br-red {
        background-image: linear-gradient(to bottom right, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-b-red {
        background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-bl-red {
        background-image: linear-gradient(to bottom left, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-l-red {
        background-image: linear-gradient(to left, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-tl-red {
        background-image: linear-gradient(to top left, rgba(255, 0, 0, 0), #f00)
      }
    `);
  });
});

test('radial gradients have default shapes, sizes, and positions', () => {
  return generatePluginCss({
    theme: {
      radialGradients: {
        colors: {
          'red': '#f00',
        },
      },
    },
    variants: {
      linearGradients: [],
      radialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-radial-red {
        background-image: radial-gradient(ellipse closest-side at center, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-t-red {
        background-image: radial-gradient(ellipse closest-side at top, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-tr-red {
        background-image: radial-gradient(ellipse closest-side at top right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-r-red {
        background-image: radial-gradient(ellipse closest-side at right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-br-red {
        background-image: radial-gradient(ellipse closest-side at bottom right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-b-red {
        background-image: radial-gradient(ellipse closest-side at bottom, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-bl-red {
        background-image: radial-gradient(ellipse closest-side at bottom left, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-l-red {
        background-image: radial-gradient(ellipse closest-side at left, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-tl-red {
        background-image: radial-gradient(ellipse closest-side at top left, #f00, rgba(255, 0, 0, 0))
      }
    `);
  });
});

test('directions and positions can be customized', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {
          'to-top': 'to top',
        },
        colors: {
          'red': '#f00',
          'green': '#0f0',
          'blue': '#00f',
        },
      },
      radialGradients: {
        positions: {
          'off-center': '55% 60%',
        },
        colors: {
          'red': '#f00',
        },
      },
    },
    variants: {
      linearGradients: [],
      radialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-top-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, rgba(0, 255, 0, 0), #0f0)
      }
      .bg-gradient-to-top-blue {
        background-image: linear-gradient(to top, rgba(0, 0, 255, 0), #00f)
      }
      .bg-radial-off-center-red {
        background-image: radial-gradient(ellipse closest-side at 55% 60%, #f00, rgba(255, 0, 0, 0))
      }
    `);
  });
});

test('gradients can have multiple colors', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {
          'to-bottom': 'to bottom',
        },
        colors: {
          'red-green': ['#f00', '#0f0'],
          'red-green-blue': ['#f00', '#0f0', '#00f'],
        },
      },
      radialGradients: {
        positions: {
          'default': 'center',
        },
        colors: {
          'red-green': ['#f00', '#0f0'],
          'red-green-blue': ['#f00', '#0f0', '#00f'],
        },
      },
    },
    variants: {
      linearGradients: [],
      radialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-bottom-red-green {
        background-image: linear-gradient(to bottom, #f00, #0f0)
      }
      .bg-gradient-to-bottom-red-green-blue {
        background-image: linear-gradient(to bottom, #f00, #0f0, #00f)
      }
      .bg-radial-red-green {
        background-image: radial-gradient(ellipse closest-side at center, #f00, #0f0)
      }
      .bg-radial-red-green-blue {
        background-image: radial-gradient(ellipse closest-side at center, #f00, #0f0, #00f)
      }
    `);
  });
});

test('multiple directions/positions and multiple colors can be used together', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {
          'to-top': 'to top',
          'to-bottom': 'to bottom',
        },
        colors: {
          'red': ['#f00'],
          'green': ['#0f0'],
        },
      },
      radialGradients: {
        positions: {
          'top': 'top',
          'bottom': 'bottom',
        },
        colors: {
          'red': ['#f00'],
          'green': ['#0f0'],
        },
      },
    },
    variants: {
      linearGradients: [],
      radialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-top-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-to-bottom-red {
        background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, rgba(0, 255, 0, 0), #0f0)
      }
      .bg-gradient-to-bottom-green {
        background-image: linear-gradient(to bottom, rgba(0, 255, 0, 0), #0f0)
      }
      .bg-radial-top-red {
        background-image: radial-gradient(ellipse closest-side at top, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-bottom-red {
        background-image: radial-gradient(ellipse closest-side at bottom, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-top-green {
        background-image: radial-gradient(ellipse closest-side at top, #0f0, rgba(0, 255, 0, 0))
      }
      .bg-radial-bottom-green {
        background-image: radial-gradient(ellipse closest-side at bottom, #0f0, rgba(0, 255, 0, 0))
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
      linearGradients: theme => ({
        directions: {
          'b': 'to bottom',
        },
        colors: theme('colors'),
      }),
    },
    variants: {
      linearGradients: [],
      radialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-b-red {
        background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #f00)
      }
      .bg-gradient-b-blue {
        background-image: linear-gradient(to bottom, rgba(0, 0, 255, 0), #00f)
      }
    `);
  });
});

test('radial gradient shapes and sizes can be customized', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'red': '#f00',
        'green-blue': ['#0f0', '#00f'],
      },
      radialGradients: theme => ({
        shapes: {
          'default': 'circle',
          'ellipse': 'ellipse',
        },
        sizes: {
          'default': 'closest-side',
          'cover': 'farthest-corner',
        },
        positions: {
          'default': 'center',
          'tr': 'top right',
        },
        colors: theme('colors'),
      }),
    },
    variants: {
      radialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-radial-red {
        background-image: radial-gradient(circle closest-side at center, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-ellipse-red {
        background-image: radial-gradient(ellipse closest-side at center, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-cover-red {
        background-image: radial-gradient(circle farthest-corner at center, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-ellipse-cover-red {
        background-image: radial-gradient(ellipse farthest-corner at center, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-tr-red {
        background-image: radial-gradient(circle closest-side at top right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-ellipse-tr-red {
        background-image: radial-gradient(ellipse closest-side at top right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-cover-tr-red {
        background-image: radial-gradient(circle farthest-corner at top right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-ellipse-cover-tr-red {
        background-image: radial-gradient(ellipse farthest-corner at top right, #f00, rgba(255, 0, 0, 0))
      }
      .bg-radial-green-blue {
        background-image: radial-gradient(circle closest-side at center, #0f0, #00f)
      }
      .bg-radial-ellipse-green-blue {
        background-image: radial-gradient(ellipse closest-side at center, #0f0, #00f)
      }
      .bg-radial-cover-green-blue {
        background-image: radial-gradient(circle farthest-corner at center, #0f0, #00f)
      }
      .bg-radial-ellipse-cover-green-blue {
        background-image: radial-gradient(ellipse farthest-corner at center, #0f0, #00f)
      }
      .bg-radial-tr-green-blue {
        background-image: radial-gradient(circle closest-side at top right, #0f0, #00f)
      }
      .bg-radial-ellipse-tr-green-blue {
        background-image: radial-gradient(ellipse closest-side at top right, #0f0, #00f)
      }
      .bg-radial-cover-tr-green-blue {
        background-image: radial-gradient(circle farthest-corner at top right, #0f0, #00f)
      }
      .bg-radial-ellipse-cover-tr-green-blue {
        background-image: radial-gradient(ellipse farthest-corner at top right, #0f0, #00f)
      }
    `);
  });
});

test('responsive variants are generated by default', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {
          't': 'to top',
        },
        colors: {
          'red': '#f00',
        },
      },
      radialGradients: {
        positions: {
          'default': 'center',
        },
        colors: {
          'red': '#f00',
        },
      },
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .bg-radial-red {
        background-image: radial-gradient(ellipse closest-side at center, #f00, rgba(255, 0, 0, 0))
      }
      @media (min-width: 640px) {
        .sm\\:bg-gradient-t-red {
          background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
        }
        .sm\\:bg-radial-red {
          background-image: radial-gradient(ellipse closest-side at center, #f00, rgba(255, 0, 0, 0))
        }
      }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {
          't': 'to top',
        },
        colors: {
          'red': '#f00',
        },
      },
      radialGradients: {
        positions: {
          'b': 'bottom',
        },
        colors: {
          'blue': '#00f',
        },
      },
    },
    variants: {
      linearGradients: ['hover', 'active'],
      radialGradients: ['group-hover'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .hover\\:bg-gradient-t-red:hover {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .active\\:bg-gradient-t-red:active {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00)
      }
      .bg-radial-b-blue {
        background-image: radial-gradient(ellipse closest-side at bottom, #00f, rgba(0, 0, 255, 0))
      }
      .group:hover .group-hover\\:bg-radial-b-blue {
        background-image: radial-gradient(ellipse closest-side at bottom, #00f, rgba(0, 0, 255, 0))
      }
    `);
  });
});
