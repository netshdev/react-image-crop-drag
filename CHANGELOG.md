# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-04

### Added

- **Accessibility**: Added `alt` prop to `ImageCropView` for better screen reader support (defaults to "Croppable image").
- **Keyboard Navigation**: Implemented ArrowUp/ArrowDown key support for adjusting image position.
- **Touch Support**: Added full touch event handling for mobile devices to support dragging.
- **ARIA**: Added `role="application"`, `aria-label`, and `aria-description` to the container.
- **Documentation**: Added "Accessibility" section to README and updated Props table.

### Changed

- Container is now focusable (`tabIndex={0}`) when in editing mode.
