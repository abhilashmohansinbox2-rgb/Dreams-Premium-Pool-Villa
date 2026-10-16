import React, { useState } from 'react';
import { GuestReview } from '../types/index.ts';

interface DeleteReviewModalProps {
  review: GuestReview | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: (reviewId: string, reason: string) => void;
}

export const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  review,
  isOpen,
  onClose,
  onConfirmDelete,
}) => {
  const [justification, setJustification] = useState(
    'Malicious / No Corresponding PMS Booking Found (Extortion/Fake)'
  );

  if (!isOpen || !review) return null;

  const handleConfirm = () => {
    onConfirmDelete(review.id, justification);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#fcf9f3] text-[#1c1c18] rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col gap-5 border border-[#ebe8e2]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">warning</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-[#ba1a1a] tracking-wider">
              Owner Moderation Protocol
            </span>
            <h3 className="font-serif text-xl font-bold text-[#002720]">
              Confirm Review Removal
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-[#414846]">
          <p>
            You are logged in as <strong className="text-[#002720]">Abhilash Mohan (Owner &amp; Curator)</strong>. You have initiated the moderation deletion of the entry submitted by:
          </p>
          <div className="bg-white p-3 rounded-lg border border-[#ebe8e2] shadow-sm">
            <span className="font-bold text-[#002720] block">{review.guestName}</span>
            <span className="text-xs text-[#725b38] block">{review.channelBadge} · Ref {review.bookingRef}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-xs">
          <label className="uppercase font-bold text-[#002720] tracking-wider">
            Compulsory Audit Justification *
          </label>
          <select
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="p-2.5 rounded-lg bg-white text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-xs font-medium cursor-pointer"
          >
            <option>Malicious / No Corresponding PMS Booking Found (Extortion/Fake)</option>
            <option>Duplicate Entry Submitted in Error</option>
            <option>Contains Personal PII or Harassing Remarks</option>
            <option>Competitor Spam Bot Pattern Detected</option>
          </select>
        </div>

        <p className="text-[11px] text-[#717976] italic leading-relaxed">
          * Note: Genuine guest critiques of confirmed stays cannot be deleted under Superhost Integrity guidelines. This action is permanently recorded in the Dreams Villa Audit Ledger.
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ebe8e2]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white border border-[#c0c8c4] text-xs font-semibold text-[#1c1c18] hover:bg-[#f0eee8] transition-colors"
          >
            Cancel &amp; Preserve
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">delete_forever</span>
            Execute Permanent Deletion
          </button>
        </div>
      </div>
    </div>
  );
};
