import React, { useState, useRef, useEffect } from "react";

const ImageCropView = ({
  src,
  alt = "Croppable image",
  containerWidth = 800,
  containerHeight = 400,
  isEditing,
}) => {
  const [position, setPosition] = useState({ y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      let width = containerWidth;
      let height = containerWidth / aspectRatio;


      if (height < containerHeight) {
        height = containerHeight;
        width = containerHeight * aspectRatio;
      }

      setImageSize({ width, height });
      setPosition({ y: (containerHeight - height) / 2 });
    };
  }, [src, containerWidth, containerHeight]);

  const constrainY = (y) => {
    const minY = containerHeight - imageSize.height;
    const maxY = 0;
    return Math.min(maxY, Math.max(minY, y));
  };

  const handleMouseDown = (e) => {
    if (!isEditing) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.clientY - position.y);
  };

  const handleMouseMove = (e) => {
    if (!isEditing || !isDragging) {
      return;
    }

    const newY = e.clientY - startY;
    setPosition({ y: constrainY(newY) });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!isEditing) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY - position.y);
  };

  const handleTouchMove = (e) => {
    if (!isEditing || !isDragging) return;
    if (e.cancelable) e.preventDefault();

    const newY = e.touches[0].clientY - startY;
    setPosition({ y: constrainY(newY) });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (!isEditing) return;

    const step = 20;
    let newY = position.y;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      newY -= step;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      newY += step;
    } else {
      return;
    }

    setPosition({ y: constrainY(newY) });
  };

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Image Cropper"
      aria-description="Use Up and Down arrow keys to adjust current image position."
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
          left: "50%",
          transform: `translateX(-50%) translateY(${position.y}px)`,
          transition: isDragging ? "none" : "transform 0.1s ease",
          userSelect: "none",
          objectFit: "cover",
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
