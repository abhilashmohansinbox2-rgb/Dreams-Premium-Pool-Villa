import React, { useState } from 'react';
import { GuestReview } from '../types/index.ts';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (newReview: GuestReview) => void;
}

const STAR_LABELS = [
  '1.0 - Needs Significant Attention',
  '2.0 - Below Luxury Standard',
  '3.0 - Fair Tropical Stay',
  '4.0 - Highly Enjoyable Villa',
  '5.0 - Exceptional Sanctuary',
];

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitReview }) => {
  const [bookingRef, setBookingRef] = useState('');
  const [channel, setChannel] = useState<'Direct' | 'Airbnb' | 'MakeMyTrip'>('Direct');
  const [guestName, setGuestName] = useState('');
  const [dates, setDates] = useState('');
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !body.trim()) return;

    const newRev: GuestReview = {
      id: String(Date.now()),
      guestName: guestName.trim(),
      guestAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATh68b7GQm_tScvXtRYLnIaKpNSONbp2iOY7myJ6gx4CvmD-MOjL0dX-u-7A5Nw_rqM-ueTewNsMG1HjrjIdePPJODrjM08PuixAhz2kUbHEgB12yP5-y5ncWif04TQzmTGL3smdsU44QLdbzUGA-5KO4kxIz1tcG8YOFVCtgHukLVhWD5yRSeDk6hFP2uh3wVRzilWeobA9UefP8tmZ9b2k3o24XW4L7Pz0BVYklzwp7JCOnt0av0cg',
      channel,
      channelBadge: channel === 'Direct' ? 'Booked Direct Website' : `Stayed via ${channel}`,
      dates: dates || 'Recent Private Stay',
      stayType: 'Whole Villa Private Sanctuary',
      rating,
      bookingRef: bookingRef || `DVP-${Math.floor(1000 + Math.random() * 9000)}`,
      headline: headline.trim() || 'Unforgettable Tropical Seclusion in Kozhikode',
      body: body.trim(),
      hostReply: {
        author: 'Abhilash Mohan',
        role: 'Owner & Estate Host',
        avatar: '/owner_photo.png',
        repliedAt: 'Just now',
        text: 'Thank you for sharing your experience! We are delighted that you enjoyed your stay at Dreams Villa and look forward to welcoming you back soon.',
      },
    };

    onSubmitReview(newRev);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#fcf9f3] text-[#1c1c18] rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] my-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ebe8e2] pb-4">
          <div>
            <span className="text-xs uppercase font-bold text-[#725b38] tracking-widest block">
              Verified Stay Chronicle
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#002720]">
              Share Your Estate Experience
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#1c1c18] flex items-center justify-center transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold text-[#414846] tracking-wider">
                Booking Reference Number *
              </label>
              <input
                type="text"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="e.g. DVP-8820 or Airbnb Code"
                className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-sm text-[#1c1c18]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold text-[#414846] tracking-wider">
                Stay Channel *
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-sm text-[#1c1c18]"
              >
                <option value="Direct">Direct Booking via Website</option>
                <option value="Airbnb">Airbnb Superhost Platform</option>
                <option value="MakeMyTrip">MakeMyTrip Luxe</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold text-[#414846] tracking-wider">
                Guest Name(s) *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Rohan & Shreya Varma"
                className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-sm text-[#1c1c18]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold text-[#414846] tracking-wider">
                Dates of Stay *
              </label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. Jan 10 - Jan 14, 2026"
                className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-sm text-[#1c1c18]"
              />
            </div>
          </div>

          {/* Interactive Star Rating */}
          <div className="flex flex-col gap-1 pt-1">
            <label className="uppercase font-bold text-[#414846] tracking-wider">
              Overall Rating *
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-[#725b38]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>
              <span className="font-semibold text-sm text-[#002720]">
                {STAR_LABELS[rating - 1]}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="uppercase font-bold text-[#414846] tracking-wider">
              Review Title / Headline *
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Unrivaled serenity and exceptional private pool dining"
              className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-sm text-[#1c1c18]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="uppercase font-bold text-[#414846] tracking-wider">
              Detailed Experience *
            </label>
            <textarea
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your stay, the hospitality, infinity pool, chef service, or room ambiance..."
              className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] text-sm text-[#1c1c18]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#ebe8e2]">
            <span className="text-xs text-[#414846] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#725b38]">verified</span>
              Direct transparency with instant PMS linkage
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white border border-[#c0c8c4] text-xs font-semibold text-[#1c1c18] hover:bg-[#f0eee8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#002720] hover:bg-[#133e35] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                Publish Verified Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
