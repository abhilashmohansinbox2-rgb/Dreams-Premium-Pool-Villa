import React, { useEffect } from 'react';
import { GalleryImage } from '../types/index.ts';

interface LightboxModalProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Container - Stop propagation on inner content */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center bg-[#133e35] rounded-2xl overflow-hidden shadow-2xl border border-[#bfecdf]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between px-6 py-4 bg-[#002720] border-b border-[#bfecdf]/20 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase bg-[#725b38] text-white px-2.5 py-0.5 rounded font-bold">
              {currentImage.tag || 'Estate Photo'}
            </span>
            <span className="text-sm font-semibold text-[#bfecdf]">
              {currentIndex + 1} of {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#133e35] hover:bg-[#254e44] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close image gallery"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Image Stage with Prev / Next Navigation */}
        <div className="relative w-full h-[65vh] bg-black/60 flex items-center justify-center overflow-hidden">
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            className="max-h-full max-w-full object-contain transition-transform duration-300 select-none"
          />

          {/* Prev Button */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 w-12 h-12 rounded-full bg-[#002720]/80 hover:bg-[#002720] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur shadow-lg active:scale-90"
            aria-label="Previous image"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 w-12 h-12 rounded-full bg-[#002720]/80 hover:bg-[#002720] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur shadow-lg active:scale-90"
            aria-label="Next image"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>

        {/* Caption & Metadata Footer */}
        <div className="w-full p-6 bg-[#002720] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-lg font-bold text-[#bfecdf]">
              {currentImage.title}
            </h3>
            <p className="text-sm text-[#e5e2dc]/80">
              {currentImage.subtitle || currentImage.alt}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={currentImage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#133e35] hover:bg-[#254e44] text-xs font-semibold text-[#bfecdf] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              View Full Resolution
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
