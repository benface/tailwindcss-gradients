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
    linearGradientColors: theme => theme('colors'),
    radialGradientColors: theme => theme('colors'),
    conicGradientColors: theme => theme('colors'),
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}
```

### Advanced

```js
// tailwind.config.js
module.exports = {
  theme: {
    linearGradientDirections: { // defaults to these values
      't': 'to top',
      'tr': 'to top right',
      'r': 'to right',
      'br': 'to bottom right',
      'b': 'to bottom',
      'bl': 'to bottom left',
      'l': 'to left',
      'tl': 'to top left',
    },
    linearGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
    },
    radialGradientShapes: { // defaults to this value
      'default': 'ellipse',
    },
    radialGradientSizes: { // defaults to this value
      'default': 'closest-side',
    },
    radialGradientPositions: { // defaults to these values
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
    radialGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'black-white-with-stops': ['#000', '#000 45%', '#fff 55%', '#fff'],
    },
    conicGradientStartingAngles: { // defaults to this value
      'default': '0',
    },
    conicGradientPositions: { // defaults to these values
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
    conicGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'checkerboard': ['white 90deg', 'black 90deg 180deg', 'white 180deg 270deg', 'black 270deg'],
    },
    repeatingLinearGradientDirections: theme => theme('linearGradientDirections'), // defaults to this value
    repeatingLinearGradientColors: theme('linearGradientColors'), // defaults to {}
    repeatingLinearGradientLengths: { // defaults to {}
      'sm': '25px',
      'md': '50px',
      'lg': '100px',
    },
    repeatingRadialGradientShapes: theme => theme('radialGradientShapes'), // defaults to this value
    repeatingRadialGradientSizes: { // defaults to this value
      'default': 'farthest-corner',
    },
    repeatingRadialGradientPositions: theme => theme('radialGradientPositions'), // defaults to this value
    repeatingRadialGradientColors: theme('radialGradientColors'), // defaults to {}
    repeatingRadialGradientLengths: { // defaults to {}
      'sm': '25px',
      'md': '50px',
      'lg': '100px',
    },
    repeatingConicGradientStartingAngles: theme => theme('conicGradientStartingAngles'), // defaults to this value
    repeatingConicGradientPositions: theme => theme('conicGradientPositions'), // defaults to this value
    repeatingConicGradientColors: { // defaults to {}
      'red': '#f00',
      'red-blue': ['#f00', '#00f'],
      'red-green-blue': ['#f00', '#0f0', '#00f'],
      'starburst': ['white 0 5deg', 'blue 5deg'],
    },
    repeatingConicGradientLengths: { // defaults to {}
      'sm': '10deg',
      'md': '20deg',
      'lg': '40deg',
    },
  },
  variants: { // all the following default to ['responsive']
    backgroundImage: ['responsive'], // this is for the "bg-none" utility
    linearGradients: ['responsive'],
    radialGradients: ['responsive'],
    conicGradients: ['responsive'],
    repeatingLinearGradients: ['responsive'],
    repeatingRadialGradients: ['responsive'],
    repeatingConicGradients: ['responsive'],
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
};
```

This plugin generates the following utilities:

```css
.bg-none {
  background-image: none;
}

/* configurable with the "linearGradientDirections" and "linearGradientColors" theme objects */
.bg-gradient-[direction-key]-[color-key] {
  background-image: linear-gradient([direction-value], [color-value-1], [color-value-2], [...]);
}

/* configurable with the "radialGradientShapes", "radialGradientSizes", "radialGradientPositions", and "radialGradientColors" theme objects */
/* note that the "default" [shape-key], [size-key], and [position-key] are omitted from the class */
.bg-radial-[shape-key]-[size-key]-[position-key]-[color-key] {
  background-image: radial-gradient([shape-value] [size-value] at [position-value], [color-value-1], [color-value-2], [...]);
}

/* configurable with the "conicGradientStartingAngles", "conicGradientPositions", and "conicGradientColors" theme objects */
/* note that the "default" [starting-angle-key] and [position-key] are omitted from the class */
.bg-conic-[starting-angle-key]-[position-key]-[color-key] {
  background-image: conic-gradient(from [starting-angle-value] at [position-value], [color-value-1], [color-value-2], [...]);
}

/* configurable with the "repeatingLinearGradientDirections", "repeatingLinearGradientColors", and "repeatingLinearGradientLengths" theme objects */
.bg-gradient-[direction-key]-[color-key]-[length-key] {
  background-image: repeating-linear-gradient([direction-value], [color-value-1], [color-value-2], [...] [length-value]);
}

/* configurable with the "repeatingRadialGradientShapes", "repeatingRadialGradientSizes", "repeatingRadialGradientPositions", "repeatingRadialGradientColors", and "repeatingRadialGradientLengths" theme objects */
/* note that the "default" [shape-key], [size-key], and [position-key] are omitted from the class */
.bg-radial-[shape-key]-[size-key]-[position-key]-[color-key]-[length-key] {
  background-image: repeating-radial-gradient([shape-value] [size-value] at [position-value], [color-value-1], [color-value-2], [...] [length-value]);
}

/* configurable with the "repeatingConicGradientStartingAngles", "repeatingConicGradientPositions", "repeatingConicGradientColors", and "repeatingConicGradientLengths" theme objects */
/* note that the "default" [starting-angle-key] and [position-key] are omitted from the class */
.bg-conic-[starting-angle-key]-[position-key]-[color-key]-[length-key] {
  background-image: repeating-conic-gradient(from [starting-angle-value] at [position-value], [color-value-1], [color-value-2], [...] [length-value]);
}
```
