# Gradients Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-gradients
```

## Usage

### Simple

```js
{
  theme: {
    colors: {
      'red': '#f00',
      'blue': '#00f',
    },
    linearGradients: theme => ({
      colors: theme('colors'),
    }),
    radialGradients: theme => ({
      colors: theme('colors'),
    }),
  },
  plugins: [
    require('tailwindcss-gradients')(),
  ],
}
```

### Advanced

```js
// tailwind.config.js
{
  theme: {
    linearGradients: {
      directions: { // defaults to these values
        't': 'to top',
        'tr': 'to top right',
        'r': 'to right',
        'br': 'to bottom right',
        'b': 'to bottom',
        'bl': 'to bottom left',
        'l': 'to left',
        'tl': 'to top left',
      },
      colors: { // defaults to {}
        'red': '#f00',
        'red-blue': ['#f00', '#00f'],
        'red-green-blue': ['#f00', '#0f0', '#00f'],
        'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
      },
    },
    radialGradients: {
      shapes: { // defaults to this value
        'default': 'ellipse',
      },
      sizes: { // defaults to this value
        'default': 'closest-side',
      },
      positions: { // defaults to these values
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
      colors: { // defaults to {}
        'red': '#f00',
        'red-blue': ['#f00', '#00f'],
        'red-green-blue': ['#f00', '#0f0', '#00f'],
        'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
      },
    },
    repeatingLinearGradients: theme => ({
      directions: theme('linearGradients.directions'), // defaults to the same values as linearGradients’ directions
      colors: theme('linearGradients.colors'), // defaults to {}
      lengths: { // defaults to {}
        'sm': '25px',
        'md': '50px',
        'lg': '100px',
      },
    }),
    repeatingRadialGradients: theme => ({
      shapes: { // defaults to this value
        'default': 'ellipse',
      },
      sizes: { // defaults to this value
        'default': 'farthest-corner',
      },
      positions: theme('radialGradients.positions'), // defaults to the same values as radialGradients’ positions
      colors: theme('radialGradients.colors'), // defaults to {}
      lengths: { // defaults to {}
        'sm': '25px',
        'md': '50px',
        'lg': '100px',
      },
    }),
  },
  variants: {
    linearGradients: ['responsive'], // defaults to ['responsive']
    radialGradients: ['responsive'], // defaults to ['responsive']
    repeatingLinearGradients: ['responsive'], // defaults to ['responsive']
    repeatingRadialGradients: ['responsive'], // defaults to ['responsive']
  },
  plugins: [
    require('tailwindcss-gradients')(),
  ],
}
```

This plugin generates the following utilities:

```css
/* configurable with the "linearGradients" theme object */
.bg-gradient-[direction-key]-[color-key] {
  background-image: linear-gradient([direction-value], [color-value-1], [color-value-2], [...]);
}

/* configurable with the "radialGradients" theme object */
/* note that the "default" [shape-key], [size-key], and [position-key] are omitted from the class */
.bg-radial-[shape-key]-[size-key]-[position-key]-[color-key] {
  background-image: radial-gradient([shape-value] [size-value] at [position-value], [color-value-1], [color-value-2], [...]);
}

/* configurable with the "repeatingLinearGradients" theme object */
.bg-gradient-[direction-key]-[color-key]-[length-key] {
  background-image: repeating-linear-gradient([direction-value], [color-value-1], [color-value-2], [...] [length-value]);
}

/* configurable with the "repeatingRadialGradients" theme object */
/* note that the "default" [shape-key], [size-key], and [position-key] are omitted from the class */
.bg-radial-[shape-key]-[size-key]-[position-key]-[color-key]-[length-key] {
  background-image: repeating-radial-gradient([shape-value] [size-value] at [position-value], [color-value-1], [color-value-2], [...] [length-value]);
}
```
