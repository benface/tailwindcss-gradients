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
        background-image: linear-gradient(rgba(255, 0, 0, 0), #f00);
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
        background-image: radial-gradient(closest-side, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-t-red {
        background-image: radial-gradient(closest-side at top, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-tr-red {
        background-image: radial-gradient(closest-side at top right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-r-red {
        background-image: radial-gradient(closest-side at right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-br-red {
        background-image: radial-gradient(closest-side at bottom right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-b-red {
        background-image: radial-gradient(closest-side at bottom, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-bl-red {
        background-image: radial-gradient(closest-side at bottom left, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-l-red {
        background-image: radial-gradient(closest-side at left, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-tl-red {
        background-image: radial-gradient(closest-side at top left, #f00, rgba(255, 0, 0, 0));
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
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, rgba(0, 255, 0, 0), #0f0);
      }
      .bg-gradient-to-top-blue {
        background-image: linear-gradient(to top, rgba(0, 0, 255, 0), #00f);
      }
      .bg-radial-off-center-red {
        background-image: radial-gradient(closest-side at 55% 60%, #f00, rgba(255, 0, 0, 0));
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
        background-image: linear-gradient(#f00, #0f0);
      }
      .bg-gradient-to-bottom-red-green-blue {
        background-image: linear-gradient(#f00, #0f0, #00f);
      }
      .bg-radial-red-green {
        background-image: radial-gradient(closest-side, #f00, #0f0);
      }
      .bg-radial-red-green-blue {
        background-image: radial-gradient(closest-side, #f00, #0f0, #00f);
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
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-to-bottom-red {
        background-image: linear-gradient(rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, rgba(0, 255, 0, 0), #0f0);
      }
      .bg-gradient-to-bottom-green {
        background-image: linear-gradient(rgba(0, 255, 0, 0), #0f0);
      }
      .bg-radial-top-red {
        background-image: radial-gradient(closest-side at top, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-bottom-red {
        background-image: radial-gradient(closest-side at bottom, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-top-green {
        background-image: radial-gradient(closest-side at top, #0f0, rgba(0, 255, 0, 0));
      }
      .bg-radial-bottom-green {
        background-image: radial-gradient(closest-side at bottom, #0f0, rgba(0, 255, 0, 0));
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
        background-image: linear-gradient(rgba(255, 0, 0, 0), #f00);
      }
      .bg-gradient-b-blue {
        background-image: linear-gradient(rgba(0, 0, 255, 0), #00f);
      }
    `);
  });
});

test('color keywords are accepted', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'white': 'white',
        'black': 'black',
        'transparent': 'transparent',
        'current': 'currentColor',
      },
      linearGradients: theme => ({
        directions: {
          't': 'to top',
        },
        colors: theme('colors'),
      }),
      radialGradients: theme => ({
        positions: {
          't': 'top',
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
      .bg-gradient-t-white {
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0), white);
      }
      .bg-gradient-t-black {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0), black);
      }
      .bg-gradient-t-transparent {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0), transparent);
      }
      .bg-gradient-t-current {
        background-image: linear-gradient(to top, transparent, currentColor);
      }
      .bg-radial-t-white {
        background-image: radial-gradient(closest-side at top, white, rgba(255, 255, 255, 0));
      }
      .bg-radial-t-black {
        background-image: radial-gradient(closest-side at top, black, rgba(0, 0, 0, 0));
      }
      .bg-radial-t-transparent {
        background-image: radial-gradient(closest-side at top, transparent, rgba(0, 0, 0, 0));
      }
      .bg-radial-t-current {
        background-image: radial-gradient(closest-side at top, currentColor, transparent);
      }
    `);
  });
});

test('some keywords such as inherit are skipped', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'inherit': 'inherit',
        'red': '#f00',
        'initial': 'initial',
        'unset': 'unset',
        'revert': 'revert',
      },
      linearGradients: theme => ({
        directions: {
          't': 'to top',
        },
        colors: theme('colors'),
      }),
      radialGradients: theme => ({
        positions: {
          't': 'top',
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
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-radial-t-red {
        background-image: radial-gradient(closest-side at top, #f00, rgba(255, 0, 0, 0));
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
        background-image: radial-gradient(circle closest-side, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-ellipse-red {
        background-image: radial-gradient(closest-side, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-cover-red {
        background-image: radial-gradient(circle, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-ellipse-cover-red {
        background-image: radial-gradient(#f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-tr-red {
        background-image: radial-gradient(circle closest-side at top right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-ellipse-tr-red {
        background-image: radial-gradient(closest-side at top right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-cover-tr-red {
        background-image: radial-gradient(circle at top right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-ellipse-cover-tr-red {
        background-image: radial-gradient(at top right, #f00, rgba(255, 0, 0, 0));
      }
      .bg-radial-green-blue {
        background-image: radial-gradient(circle closest-side, #0f0, #00f);
      }
      .bg-radial-ellipse-green-blue {
        background-image: radial-gradient(closest-side, #0f0, #00f);
      }
      .bg-radial-cover-green-blue {
        background-image: radial-gradient(circle, #0f0, #00f);
      }
      .bg-radial-ellipse-cover-green-blue {
        background-image: radial-gradient(#0f0, #00f);
      }
      .bg-radial-tr-green-blue {
        background-image: radial-gradient(circle closest-side at top right, #0f0, #00f);
      }
      .bg-radial-ellipse-tr-green-blue {
        background-image: radial-gradient(closest-side at top right, #0f0, #00f);
      }
      .bg-radial-cover-tr-green-blue {
        background-image: radial-gradient(circle at top right, #0f0, #00f);
      }
      .bg-radial-ellipse-cover-tr-green-blue {
        background-image: radial-gradient(at top right, #0f0, #00f);
      }
    `);
  });
});

test('there is no output for repeating gradients without lengths', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'red': '#f00',
        'blue': '#00f',
      },
      repeatingLinearGradients: theme => ({
        directions: {
          't': 'to top',
        },
        colors: theme('colors'),
      }),
      repeatingRadialGradients: theme => ({
        colors: theme('colors'),
      }),
    },
    variants: {
      repeatingLinearGradients: [],
      repeatingRadialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('lengths can be customized', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'red': '#f00',
        'blue': '#00f',
      },
      repeatingLinearGradients: theme => ({
        directions: {
          't': 'to top',
        },
        colors: theme('colors'),
        lengths: {
          'sm': '25px',
          'md': '50px',
          'lg': '100px',
        },
      }),
      repeatingRadialGradients: theme => ({
        positions: {
          'default': 'center',
        },
        colors: theme('colors'),
        lengths: {
          'sm': '10px',
          'md': '20px',
          'lg': '30px',
        },
      }),
    },
    variants: {
      repeatingLinearGradients: [],
      repeatingRadialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red-sm {
        background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 25px);
      }
      .bg-gradient-t-blue-sm {
        background-image: repeating-linear-gradient(to top, rgba(0, 0, 255, 0), #00f 25px);
      }
      .bg-gradient-t-red-md {
        background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 50px);
      }
      .bg-gradient-t-blue-md {
        background-image: repeating-linear-gradient(to top, rgba(0, 0, 255, 0), #00f 50px);
      }
      .bg-gradient-t-red-lg {
        background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 100px);
      }
      .bg-gradient-t-blue-lg {
        background-image: repeating-linear-gradient(to top, rgba(0, 0, 255, 0), #00f 100px);
      }
      .bg-radial-red-sm {
        background-image: repeating-radial-gradient(#f00, rgba(255, 0, 0, 0) 10px);
      }
      .bg-radial-blue-sm {
        background-image: repeating-radial-gradient(#00f, rgba(0, 0, 255, 0) 10px);
      }
      .bg-radial-red-md {
        background-image: repeating-radial-gradient(#f00, rgba(255, 0, 0, 0) 20px);
      }
      .bg-radial-blue-md {
        background-image: repeating-radial-gradient(#00f, rgba(0, 0, 255, 0) 20px);
      }
      .bg-radial-red-lg {
        background-image: repeating-radial-gradient(#f00, rgba(255, 0, 0, 0) 30px);
      }
      .bg-radial-blue-lg {
        background-image: repeating-radial-gradient(#00f, rgba(0, 0, 255, 0) 30px);
      }
    `);
  });
});

test('color stops can be customized', () => {
  return generatePluginCss({
    theme: {
      linearGradients: {
        directions: {
          'r': 'to right',
        },
        colors: {
          'custom': ['#000', '#000 45%', '#fff 55%', '#fff'],
        },
      },
      radialGradients: {
        positions: {
          'default': 'center',
        },
        colors: {
          'custom': ['#000', '#000 45%', '#fff 55%', '#fff'],
        },
      },
      repeatingLinearGradients: theme => ({
        directions: theme('linearGradients.directions'),
        colors: {
          'custom': ['#000', '#000 10px', '#fff 10px', '#fff 20px'],
        },
        lengths: {
          'repeating': '',
        },
      }),
      repeatingRadialGradients: theme => ({
        positions: theme('radialGradients.positions'),
        colors: {
          'custom': ['#000', '#000 10px', '#fff 10px', '#fff 20px'],
        },
        lengths: {
          'repeating': '',
        },
      }),
    },
    variants: {
      linearGradients: [],
      radialGradients: [],
      repeatingLinearGradients: [],
      repeatingRadialGradients: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-r-custom {
        background-image: linear-gradient(to right, #000, #000 45%, #fff 55%, #fff);
      }
      .bg-radial-custom {
        background-image: radial-gradient(closest-side, #000, #000 45%, #fff 55%, #fff);
      }
      .bg-gradient-r-custom-repeating {
        background-image: repeating-linear-gradient(to right, #000, #000 10px, #fff 10px, #fff 20px);
      }
      .bg-radial-custom-repeating {
        background-image: repeating-radial-gradient(#000, #000 10px, #fff 10px, #fff 20px);
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
      repeatingLinearGradients: theme => ({
        directions: theme('linearGradients.directions'),
        colors: theme('linearGradients.colors'),
        lengths: {
          'repeating': '20px',
        },
      }),
      repeatingRadialGradients: theme => ({
        positions: theme('radialGradients.positions'),
        colors: theme('radialGradients.colors'),
        lengths: {
          'repeating': '10px',
        },
      }),
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
      }
      .bg-radial-red {
        background-image: radial-gradient(closest-side, #f00, rgba(255, 0, 0, 0));
      }
      .bg-gradient-t-red-repeating {
        background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 20px);
      }
      .bg-radial-red-repeating {
        background-image: repeating-radial-gradient(#f00, rgba(255, 0, 0, 0) 10px);
      }
      @media (min-width: 640px) {
        .sm\\:bg-gradient-t-red {
          background-image: linear-gradient(to top, rgba(255, 0, 0, 0), #f00);
        }
        .sm\\:bg-radial-red {
          background-image: radial-gradient(closest-side, #f00, rgba(255, 0, 0, 0));
        }
        .sm\\:bg-gradient-t-red-repeating {
          background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 20px);
        }
        .sm\\:bg-radial-red-repeating {
          background-image: repeating-radial-gradient(#f00, rgba(255, 0, 0, 0) 10px);
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
      repeatingLinearGradients: theme => ({
        directions: theme('linearGradients.directions'),
        colors: theme('linearGradients.colors'),
        lengths: {
          'repeating': '20px',
        },
      }),
      repeatingRadialGradients: theme => ({
        positions: theme('radialGradients.positions'),
        colors: theme('radialGradients.colors'),
        lengths: {
          'repeating': '10px',
        },
      }),
    },
    variants: {
      linearGradients: ['hover', 'active'],
      radialGradients: ['group-hover'],
      repeatingLinearGradients: ['active'],
      repeatingRadialGradients: ['hover'],
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
      .bg-radial-b-blue {
        background-image: radial-gradient(closest-side at bottom, #00f, rgba(0, 0, 255, 0));
      }
      .group:hover .group-hover\\:bg-radial-b-blue {
        background-image: radial-gradient(closest-side at bottom, #00f, rgba(0, 0, 255, 0));
      }
      .bg-gradient-t-red-repeating {
        background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 20px);
      }
      .active\\:bg-gradient-t-red-repeating:active {
        background-image: repeating-linear-gradient(to top, rgba(255, 0, 0, 0), #f00 20px);
      }
      .bg-radial-b-blue-repeating {
        background-image: repeating-radial-gradient(at bottom, #00f, rgba(0, 0, 255, 0) 10px);
      }
      .hover\\:bg-radial-b-blue-repeating:hover {
        background-image: repeating-radial-gradient(at bottom, #00f, rgba(0, 0, 255, 0) 10px);
      }
    `);
  });
});
