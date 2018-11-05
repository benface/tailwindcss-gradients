const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig')();
const gradientsPlugin = require('./index.js');

const disabledModules = {};
Object.keys(defaultConfig.modules).forEach(module => {
  disabledModules[module] = false;
});

const generatePluginCss = (options = {}) => {
  return postcss(tailwindcss({
    modules: disabledModules,
    plugins: [gradientsPlugin(options)],
  })).process('@tailwind utilities;', {
    from: undefined,
  }).then(result => {
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
    directions: {},
    gradients: {
      'red': '#f00',
      'green': '#0f0',
      'blue': '#00f',
    },
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('there is no output without gradients', () => {
  return generatePluginCss({
    directions: {
      't': 'to top',
      'r': 'to right',
      'b': 'to bottom',
      'l': 'to left',
    },
    gradients: {},
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('there are default directions', () => {
  return generatePluginCss({
    gradients: {
      'red': '#f00',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, transparent, #f00);
      }
      .bg-gradient-tr-red {
        background-image: linear-gradient(to top right, transparent, #f00);
      }
      .bg-gradient-r-red {
        background-image: linear-gradient(to right, transparent, #f00);
      }
      .bg-gradient-br-red {
        background-image: linear-gradient(to bottom right, transparent, #f00);
      }
      .bg-gradient-b-red {
        background-image: linear-gradient(to bottom, transparent, #f00);
      }
      .bg-gradient-bl-red {
        background-image: linear-gradient(to bottom left, transparent, #f00);
      }
      .bg-gradient-l-red {
        background-image: linear-gradient(to left, transparent, #f00);
      }
      .bg-gradient-tl-red {
        background-image: linear-gradient(to top left, transparent, #f00);
      }
    `);
  });
});

test('directions can be customized', () => {
  return generatePluginCss({
    directions: {
      'to-top': 'to top',
    },
    gradients: {
      'red': '#f00',
      'green': '#0f0',
      'blue': '#00f',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-top-red {
        background-image: linear-gradient(to top, transparent, #f00);
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, transparent, #0f0);
      }
      .bg-gradient-to-top-blue {
        background-image: linear-gradient(to top, transparent, #00f);
      }
    `);
  });
});

test('gradients can have multiple colors', () => {
  return generatePluginCss({
    directions: {
      'to-bottom': 'to bottom',
    },
    gradients: {
      'red-green': ['#f00', '#0f0'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
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
    directions: {
      'to-top': 'to top',
      'to-bottom': 'to bottom',
    },
    gradients: {
      'red': ['#f00'],
      'green': ['#0f0'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-to-top-red {
        background-image: linear-gradient(to top, transparent, #f00);
      }
      .bg-gradient-to-bottom-red {
        background-image: linear-gradient(to bottom, transparent, #f00);
      }
      .bg-gradient-to-top-green {
        background-image: linear-gradient(to top, transparent, #0f0);
      }
      .bg-gradient-to-bottom-green {
        background-image: linear-gradient(to bottom, transparent, #0f0);
      }
    `);
  });
});

test('variants are supported', () => {
  return generatePluginCss({
    variants: ['hover', 'active'],
    directions: {
      't': 'to top',
    },
    gradients: {
      'red': '#f00',
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .bg-gradient-t-red {
        background-image: linear-gradient(to top, transparent, #f00);
      }
      .hover\\:bg-gradient-t-red:hover {
        background-image: linear-gradient(to top, transparent, #f00);
      }
      .active\\:bg-gradient-t-red:active {
        background-image: linear-gradient(to top, transparent, #f00);
      }
    `);
  });
});
