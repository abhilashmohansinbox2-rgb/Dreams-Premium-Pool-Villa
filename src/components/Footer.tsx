import React, { useState } from 'react';
import { NavigationTab } from '../types/index.ts';
import { VILLA_CONTACT } from '../data/villaData.ts';

interface FooterProps {
  onTabChange: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const [quickEmail, setQuickEmail] = useState('');
  const [quickDates, setQuickDates] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setQuickEmail('');
      setQuickDates('');
    }, 4500);
  };

  return (
    <footer className="w-full bg-[#f6f3ed] text-[#1c1c18] mt-24 border-t border-[#ebe8e2]">
      {/* Top Pre-Footer Inquiry Strip */}
      <div className="bg-[#ebe8e2] py-10 px-4 md:px-12 lg:px-16">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-serif text-2xl font-bold text-[#002720]">
              Bespoke Villa Inquiries &amp; Private Bookings
            </span>
            <p className="text-sm text-[#414846]">
              Connect instantly with resident owner {VILLA_CONTACT.ownerName} for customized Kozhikode itineraries and private group reservations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#002720] text-white text-sm font-semibold hover:bg-[#133e35] transition-all shadow-sm"
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Direct WhatsApp Inquiry</span>
            </a>
            <a
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#002720] text-sm font-semibold hover:bg-[#f0eee8] transition-all shadow-sm border border-[#c0c8c4]/40"
              href={`tel:${VILLA_CONTACT.receptionPhoneTel}`}
            >
              <span className="material-symbols-outlined text-base text-[#725b38]">call</span>
              <span>Call Reception 24/7</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand & Credentials */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              alt="Dreams Premium Pool Villa Logo"
              className="h-9 w-auto object-contain"
              src={VILLA_CONTACT.logoUrl}
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-[#002720]">Dreams Villa</span>
              <span className="text-[10px] text-[#725b38] uppercase font-bold tracking-[0.2em]">Kozhikode, Kerala</span>
            </div>
          </div>
          <p className="text-sm text-[#414846] leading-relaxed">
            An exclusive 4-bedroom private estate offering architectural seclusion, signature indoor pool luxury, dual kitchens, and personalized tropical Malabar hospitality.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#725b38]">
              Verified Partner
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#e5e2dc] text-[#1c1c18] text-[11px] font-semibold">
                Airbnb Superhost ★ 4.96
              </span>
              <span className="px-3 py-1 rounded bg-[#e5e2dc] text-[#1c1c18] text-[11px] font-semibold">
                MakeMyTrip Luxe
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#002720] uppercase tracking-wider">
            Estate Navigation
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-[#414846]">
            <li>
              <button
                onClick={() => { onTabChange('overview'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#002720] transition-colors cursor-pointer text-left"
              >
                Overview &amp; Villa Tour
              </button>
            </li>
            <li>
              <button
                onClick={() => { onTabChange('facilities'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#002720] transition-colors cursor-pointer text-left"
              >
                Facilities &amp; Amenities
              </button>
            </li>
            <li>
              <button
                onClick={() => { onTabChange('guide'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#002720] transition-colors cursor-pointer text-left"
              >
                Calicut Local Field Guide
              </button>
            </li>
            <li>
              <button
                onClick={() => { onTabChange('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#002720] transition-colors cursor-pointer text-left"
              >
                Multi-Calendar Direct Booking
              </button>
            </li>
            <li>
              <button
                onClick={() => { onTabChange('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#002720] transition-colors cursor-pointer text-left"
              >
                Guest Reviews &amp; Host Desk
              </button>
            </li>
            <li>
              <button
                onClick={() => { onTabChange('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-1 font-semibold text-[#725b38] hover:text-[#002720] transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-[15px]">tune</span>
                Admin CMS &amp; Property Rates
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Contacts & Geo */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#002720] uppercase tracking-wider">
            Direct Contacts
          </h3>
          <div className="flex flex-col gap-2.5 text-sm text-[#414846]">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-[18px] shrink-0 mt-0.5">location_on</span>
              <div className="flex flex-col gap-0.5">
                <span className="leading-snug">{VILLA_CONTACT.location}</span>
                <a
                  className="inline-flex items-center gap-1 text-xs text-[#725b38] font-semibold hover:underline mt-1"
                  href={VILLA_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-xs">map</span>
                  GPS: {VILLA_CONTACT.gps} · View Map
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-[18px] shrink-0">phone_in_talk</span>
              <span>Reception: <a className="hover:text-[#002720] font-medium" href={`tel:${VILLA_CONTACT.receptionPhoneTel}`}>{VILLA_CONTACT.receptionPhone}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-[18px] shrink-0">support_agent</span>
              <span>Owner Desk: <a className="hover:text-[#002720] font-medium" href={`tel:${VILLA_CONTACT.ownerPhoneTel}`}>{VILLA_CONTACT.ownerPhone}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-[18px] shrink-0">mail</span>
              <span>Email: <a className="hover:text-[#002720] font-medium" href={`mailto:${VILLA_CONTACT.email}`}>{VILLA_CONTACT.email}</a></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-[18px] shrink-0">chat</span>
              <span>WhatsApp: <a className="hover:text-[#002720] font-medium" href={VILLA_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">{VILLA_CONTACT.ownerPhone}</a></span>
            </div>
          </div>
        </div>

        {/* Column 4: Quick Inquiry Form */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#002720] uppercase tracking-wider">
            Quick Date Query
          </h3>
          <p className="text-xs text-[#414846]">
            Send an instant date hold inquiry directly to our on-site villa concierge desk.
          </p>
          <form onSubmit={handleQuickSubmit} className="flex flex-col gap-2.5">
            <input
              type="email"
              value={quickEmail}
              onChange={(e) => setQuickEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="px-3 py-2 rounded-lg bg-white text-sm text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
            />
            <input
              type="text"
              value={quickDates}
              onChange={(e) => setQuickDates(e.target.value)}
              placeholder="Intended stay dates (e.g. Nov 14 - 18)"
              className="px-3 py-2 rounded-lg bg-white text-sm text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#002720] text-white text-xs font-semibold hover:bg-[#133e35] transition-colors shadow-sm"
            >
              Request Availability
            </button>
            {inquirySent && (
              <span className="text-xs text-[#002720] font-semibold bg-[#bfecdf] p-2 rounded text-center">
                Inquiry transmitted to Concierge desk!
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Legal Sub-Footer */}
      <div className="border-t border-[#ebe8e2] py-6 px-4 md:px-12 lg:px-16 text-xs text-[#414846]">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Dreams Premium Pool Villa, Kozhikode. All rights reserved.</p>
          <div className="flex items-center gap-6 uppercase tracking-wider text-[11px] font-medium">
            <span className="hover:text-[#002720]">Direct Booking Best Rate Guarantee</span>
            <span>•</span>
            <span className="hover:text-[#002720]">Quiet Residential Hours</span>
            <span>•</span>
            <button
              onClick={() => { onTabChange('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[#725b38] hover:text-[#002720] font-semibold cursor-pointer"
            >
              Admin CMS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
