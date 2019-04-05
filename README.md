# Gradients Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-gradients
```

## Usage

```js
// In your Tailwind CSS config
{
  theme: {
    gradients: {
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
      },
    },
  },
  variants: {
    gradients: ['responsive', 'hover'], // defaults to ['responsive']
  },
  plugins: [
    require('tailwindcss-gradients')(),
  ],
}
```
or you can reference your existing theme colors:
```js
{
  theme: {
    colors: {
      'red': '#f00',
      'blue': '#00f',
    },
    gradients: theme => ({
      // directions: { ... },
      colors: theme('colors'),
    }),
  },
  plugins: [
    require('tailwindcss-gradients')(),
  ],
}
```

This plugin generates the following utilities:

```css
/* configurable with the "gradients" theme key */
.bg-gradient-[direction-key]-[color-key] {
  background-image: linear-gradient([direction-value], [color-value-1], [color-value-2], [...]);
}
```
