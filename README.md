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
/* configurable with the "gradients" option */
.bg-gradient-to-top-[name] {
  background-image: linear-gradient(to top, [color-1], [color-2], [...])
}
.bg-gradient-to-right-[name] {
  background-image: linear-gradient(to right, [color-1], [color-2], [...])
}
.bg-gradient-to-bottom-[name] {
  background-image: linear-gradient(to bottom, [color-1], [color-2], [...])
}
.bg-gradient-to-left-[name] {
  background-image: linear-gradient(to left, [color-1], [color-2], [...])
}
```