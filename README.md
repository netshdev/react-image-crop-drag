# react-image-crop-drag

A React component for creating draggable image views with automatic scaling and positioning. Perfect for concert posters, event banners, and profile headers.

## Features

- **Vertical drag adjustment** for perfect image positioning
- **Automatic image scaling** while maintaining aspect ratio
- **Smooth animations and transitions**
- **Accessibility first** with keyboard navigation
- **Touch device support** for mobile interactions
- **Center positioning** with smart constraints
- **No image overflow**
- **Zero dependencies** (except React)

## Installation

```bash
npm install react-image-crop-drag
```

## Example

```jsx
import { useState } from 'react';
import ImageCropView from 'react-image-crop-drag';

function App() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (cropData) => {
    setIsEditing(false);
  };

  return (
    <ImageCropView
      src="/path/to/concert-poster.jpg"
      alt="Concert Poster 2024" 
      containerWidth={800}
      containerHeight={400}
      isEditing={isEditing}
      onSave={handleSave}
    />
  );
}

```

## Accessibility

This component is built with accessibility in mind:

- **Keyboard Support**: When in editing mode, the container is focusable. Use **Up/Down Arrow keys** to adjust the image position.
- **Screen Readers**: Helper texts and ARIA attributes provide context to screen reader users.
- **Touch Support**: Full touch support for dragging on mobile devices.

## Props

| Prop              | Type     | Required | Default             | Description                     |
|-------------------|----------|----------|---------------------|---------------------------------|
| `src`             | string   | Yes      | -                   | Image source URL                |
| `alt`             | string   | No       | "Croppable image"   | Alt text for the image          |
| `containerWidth`  | number   | No       | 800                 | Width of the container          |
| `containerHeight` | number   | No       | 400                 | Height of the container         |
| `isEditing`       | boolean  | No       | false               | Enable/disable drag mode        |
| `onSave`          | function | No       | -                   | Callback with crop data         |

## Example Use Cases

- Concert posters and event banners
- Profile header images
- Cover photos for social media
- Featured image sections
- Banner advertisements

## Development

```bash
# Install dependencies
npm install

# Build package
npm run build
```

## License

MIT
