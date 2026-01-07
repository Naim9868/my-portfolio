

'use client';

import { useEffect, useState, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";


export default function PhotoModal({ isOpen, onClose, src, alt }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  if (!isOpen || !src) return null;

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    setScale((prev) =>
      Math.min(Math.max(prev + (e.deltaY > 0 ? -0.1 : 0.1), 1), 4)
    );
  };

  // Drag start
  const handleMouseDown = (e) => {
    if (scale === 1) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Drag move
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  // Drag end
  const handleMouseUp = () => setIsDragging(false);

  // Click to zoom
  const handleClick = () => {
    if (scale === 1) setScale(2);
    else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-25 right-4 z-50 text-white bg-black/60 p-2 rounded-full hover:bg-black"
      >
        <RxCross2 size={20} />
      </button>

      {/* Image */}
      <div
        className="max-w-full max-h-full cursor-zoom-in"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-w-[90vw] max-h-[90vh] select-none transition-transform duration-200"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > 1 ? 'grab' : 'zoom-in',
          }}
        />
      </div>
    </div>
  );
}
