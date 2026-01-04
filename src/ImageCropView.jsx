import React, { useState, useRef, useEffect } from "react";

const ImageCropView = ({
  src,
  alt = "Croppable image",
  containerWidth = 800,
  containerHeight = 400,
  isEditing,
  zoom = 1,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      let width = containerWidth;
      let height = containerWidth / aspectRatio;

      if (width < containerWidth || height < containerHeight) {
        const containerRatio = containerWidth / containerHeight;
        if (aspectRatio > containerRatio) {
          height = containerHeight;
          width = containerHeight * aspectRatio;
        } else {
          width = containerWidth;
          height = containerWidth / aspectRatio;
        }
      }

      width *= zoom;
      height *= zoom;

      setImageSize({ width, height });
      setPosition({
        x: (containerWidth - width) / 2,
        y: (containerHeight - height) / 2
      });
    };

    image.onerror = (err) => {
      console.error("ImageCropView: Failed to load image", src, err);
    };
  }, [src, containerWidth, containerHeight, zoom]);

  const constrain = (x, y) => {
    const minX = containerWidth - imageSize.width;
    const maxX = 0;
    const minY = containerHeight - imageSize.height;
    const maxY = 0;

    return {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y))
    };
  };

  const handleMouseDown = (e) => {
    if (!isEditing) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isEditing || !isDragging) {
      return;
    }

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    setPosition(constrain(newX, newY));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!isEditing) return;
    setIsDragging(true);
    setStartPos({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    });
  };

  const handleTouchMove = (e) => {
    if (!isEditing || !isDragging) return;
    if (e.cancelable) e.preventDefault();

    const newX = e.touches[0].clientX - startPos.x;
    const newY = e.touches[0].clientY - startPos.y;
    setPosition(constrain(newX, newY));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (!isEditing) return;

    const step = 20;
    let { x: newX, y: newY } = position;

    switch (e.key) {
      case 'ArrowUp':
        newY -= step;
        break;
      case 'ArrowDown':
        newY += step;
        break;
      case 'ArrowLeft':
        newX -= step;
        break;
      case 'ArrowRight':
        newX += step;
        break;
      default:
        return;
    }

    e.preventDefault();
    setPosition(constrain(newX, newY));
  };

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Image Cropper"
      aria-description="Use Arrow keys to adjust image position."
      tabIndex={isEditing ? 0 : -1}
      onKeyDown={handleKeyDown}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#f0f0f0",
        cursor: isEditing ? (isDragging ? "grabbing" : "grab") : "default",
        outline: "none",
      }}
      onMouseLeave={handleMouseUp}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          width: imageSize.width,
          height: imageSize.height,
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isDragging ? "none" : "transform 0.1s ease",
          userSelect: "none",
          objectFit: "fill",
          pointerEvents: isEditing ? "auto" : "none",
          touchAction: "none"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        draggable={false}
      />
    </div>
  );
};

export default ImageCropView;
