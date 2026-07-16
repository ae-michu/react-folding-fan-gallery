# react-folding-fan-gallery

![Demo](https://raw.githubusercontent.com/ae-michu/react-folding-fan-gallery/main/demo.gif)

A React component that arranges cards in an **interactive folding-fan arc**. Hover or focus any card to bring it to the front — surrounding cards shift scale and z-order to stay out of the way.

---

## Why use it?

- **Visually striking** ✨ — arc-based layout with smooth scale and z-index transitions that feel natural and polished
- **Highly customizable** 🎛️ — tune the arc radius, spread angle, anchor point, and active/inactive scales to match your design
- **Performance-focused** ⚡ — positional updates bypass React's render cycle by writing CSS custom properties directly; only the active card re-renders on hover
- **Dynamic bounding box** 📐 — optionally auto-sizes the container to fully contain all card corners, so the gallery plays nicely with surrounding page content
- **Bring your own card** 🃏 — a `renderer` prop accepts any React node, letting you drop in photos, product tiles, or any custom component
- **Accessible** ♿ — cards are focusable `role="button"` elements with `aria-pressed`; fully keyboard-navigable with `Tab`, `Enter`, and `Space`
- **Typed** 🔷 — written in TypeScript with full generic support for your card data

---

## Installation

```sh
npm install react-folding-fan-gallery
```

---

## Quick start

```tsx
import { Gallery, Card } from 'react-folding-fan-gallery';

const photos = [
	{ image: '/img/a.jpg', alt: 'Mountain' },
	{ image: '/img/b.jpg', alt: 'Forest' },
	{ image: '/img/c.jpg', alt: 'Lake' },
];

// cards.length must be odd
<Gallery cards={photos} renderer={(item) => <Card {...item} />} />;
```

> **Requirement:** `cards` must always contain an **odd** number of items so the fan has an unambiguous center card.

---

## Documentation

For full API reference, prop descriptions, live playground, and interactive examples visit the docs:

**[ae-michu.github.io/react-folding-fan-gallery](https://ae-michu.github.io/react-folding-fan-gallery/)**
