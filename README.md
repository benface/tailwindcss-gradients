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
      directions: {
        't': 'to top',
        'tr': 'to top right',
        'r': 'to right',
        'br': 'to bottom right',
        'b': 'to bottom',
        'bl': 'to bottom left',
        'l': 'to left',
        'tl': 'to top left',
      },
      colors: {
        'red': '#f00',
        'red-blue': ['#f00', '#00f'],
        'red-green-blue': ['#f00', '#0f0', '#00f'],
      },
    },
  },
  variants: {
    gradients: ['responsive'],
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

Note: The `directions` key in `theme.gradients` is optional and defaults to the above values. Also, the `gradients` variants key defaults to `['responsive']`.
