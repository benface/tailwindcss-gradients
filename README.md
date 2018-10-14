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

/* Short Classnames */
.bg-g-t-[name] {
  background-image: linear-gradient(to top, [color-1], [color-2], [...])
}

.bg-g-t-r-[name] {
  background-image: linear-gradient(to top right, [color-1], [color-2], [...])
}

.bg-g-t-l-[name] {
  background-image: linear-gradient(to top left, [color-1], [color-2], [...])
}

.bg-g-r-[name] {
  background-image: linear-gradient(to right, [color-1], [color-2], [...])
}

.bg-g-b-[name] {
  background-image: linear-gradient(to bottom, [color-1], [color-2], [...])
}

.bg-g-b-r-[name] {
  background-image: linear-gradient(to bottom right, [color-1], [color-2], [...])
}

.bg-g-b-l-[name] {
  background-image: linear-gradient(to bottom left, [color-1], [color-2], [...])
}

.bg-g-l-[name] {
  background-image: linear-gradient(to left, [color-1], [color-2], [...])
}

/* Long Classnames */
.bg-gradient-to-top-[name] {
  background-image: linear-gradient(to top, [color-1], [color-2], [...])
}

.bg-gradient-to-top-right-[name] {
  background-image: linear-gradient(to top right, [color-1], [color-2], [...])
}

.bg-gradient-to-top-left-[name] {
  background-image: linear-gradient(to top left, [color-1], [color-2], [...])
}

.bg-gradient-to-right-[name] {
  background-image: linear-gradient(to right, [color-1], [color-2], [...])
}

.bg-gradient-to-bottom-[name] {
  background-image: linear-gradient(to bottom, [color-1], [color-2], [...])
}

.bg-gradient-to-bottom-right-[name] {
  background-image: linear-gradient(to bottom right, [color-1], [color-2], [...])
}

.bg-gradient-to-bottom-left-[name] {
  background-image: linear-gradient(to bottom left, [color-1], [color-2], [...])
}

.bg-gradient-to-left-[name] {
  background-image: linear-gradient(to left, [color-1], [color-2], [...])
}
```
