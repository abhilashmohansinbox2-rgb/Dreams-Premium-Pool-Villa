import React, { useState } from 'react';
import { VideoTour } from '../types/index.ts';
import { VILLA_CONTACT } from '../data/villaData.ts';

interface VideoModalProps {
  video: VideoTour | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen || !video) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#002720] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#bfecdf]/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#133e35] border-b border-[#bfecdf]/15">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-[#725b38] text-white font-mono text-xs uppercase font-bold">
              {video.badge}
            </span>
            <span className="text-sm font-semibold text-[#bfecdf]">
              {video.title} ({video.duration})
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#002720] hover:bg-[#254e44] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close video tour"
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Video Player Mockup Stage */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover opacity-85"
          />

          {/* Playing Simulation Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs bg-red-600 px-2 py-0.5 rounded text-white font-bold tracking-wider uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Playing 4K Master
              </span>
              <span className="text-xs text-[#bfecdf] font-mono">3840 x 2160 @ 60 FPS</span>
            </div>

            {/* Central Play/Pause Toggle */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#725b38]/90 hover:bg-[#725b38] text-white flex items-center justify-center shadow-xl transition-all cursor-pointer backdrop-blur-md active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-4xl">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {/* Video Scrubber Bar & Controls */}
            <div className="flex flex-col gap-2">
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className={`h-full bg-[#bfecdf] rounded-full ${isPlaying ? 'w-2/3 transition-all duration-1000' : 'w-1/3'}`} />
              </div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg cursor-pointer">volume_up</span>
                  <span>01:14 / {video.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#fedeb2] font-semibold">{video.category}</span>
                  <span className="material-symbols-outlined text-lg cursor-pointer">fullscreen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Narrative Info */}
        <div className="p-6 bg-[#002720] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <h3 className="font-serif text-lg font-bold text-[#bfecdf]">{video.title}</h3>
            <p className="text-sm text-[#e5e2dc]/80 leading-relaxed">{video.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#725b38] text-white text-xs font-semibold hover:bg-[#584323] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              Schedule Private Live Video Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
