# Gradients Tailwind CSS Plugin

## Installation

```bash
npm install tailwindcss-gradients
```

## Usage

```js
// In your Tailwind CSS config
{
  plugins: [
    require('tailwindcss-gradients')({
      variants: ['responsive'],
      directions: {
        't': 'to top',
        'r': 'to right',
        'b': 'to bottom',
        'l': 'to left',
      },
      gradients: {
        'red': '#f00',
        'red-blue': ['#f00', '#00f'],
        'red-green-blue': ['#f00', '#0f0', '#00f'],
      },
    }),
  ],
}
```

This plugin generates the following utilities:

```css
/* configurable with the "directions" and "gradients" options */
.bg-gradient-[direction-name]-[gradient-name] {
  background-image: linear-gradient([direction-value], [gradient-color-1], [gradient-color-2], [...])
}
```

Note: The `directions` option is optional and defaults to:
```js
{
  't': 'to top',
  'tr': 'to top right',
  'r': 'to right',
  'br': 'to bottom right',
  'b': 'to bottom',
  'bl': 'to bottom left',
  'l': 'to left',
  'tl': 'to top left',
}
```