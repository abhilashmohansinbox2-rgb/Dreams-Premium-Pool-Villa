import React from 'react';
import { VILLA_CONTACT } from '../data/villaData.ts';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      <a
        className="relative group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#002720] text-white shadow-[0_12px_28px_-6px_rgba(19,62,53,0.3),0_4px_8px_-2px_rgba(0,0,0,0.1)] hover:bg-[#133e35] transition-all hover:scale-105 active:scale-95 border border-[#bfecdf]/30"
        href={VILLA_CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Villa Host on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fedeb2] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
        </span>
        <span className="material-symbols-outlined text-xl text-[#bfecdf]">chat</span>
        <span className="text-xs font-semibold pr-1 text-white">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
