import React, { useState } from 'react';
import { calculateStay, formatINR } from '../utils/pricing.ts';
import { VILLA_CONTACT } from '../data/villaData.ts';
import { ChannelSyncModal } from '../components/ChannelSyncModal.tsx';
import { VoucherModal } from '../components/VoucherModal.tsx';

interface BookingPageProps {
  initialDates?: { start: string; end: string; guests: string };
}

export const BookingPage: React.FC<BookingPageProps> = ({ initialDates }) => {
  // Booking Form State
  const [startDate, setStartDate] = useState(initialDates?.start || '2025-10-14');
  const [endDate, setEndDate] = useState(initialDates?.end || '2025-10-18');
  const [adultsCount, setAdultsCount] = useState(8);
  const [childrenCount, setChildrenCount] = useState(0);

  // Add-ons
  const [includeKitchen, setIncludeKitchen] = useState(false);
  const [includeBbq, setIncludeBbq] = useState(false);
  const [includeGas, setIncludeGas] = useState(false);

  // Checkout Form
  const [guestName, setGuestName] = useState('Vikramaditya Rao');
  const [guestPhone, setGuestPhone] = useState('+91 98200 44551');
  const [guestEmail, setGuestEmail] = useState('vikram.rao@enterprise.in');
  const [bookingRef, setBookingRef] = useState('');

  // Modals
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  // Active tab inside booking panel: 'instant' | 'query' | 'whatsapp'
  const [activeBookingTab, setActiveBookingTab] = useState<'instant' | 'query' | 'whatsapp'>('instant');

  // Month navigation in calendar
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);

  const calcResult = calculateStay({
    startDate,
    endDate,
    adultsCount,
    childrenCount,
    includeKitchen,
    includeBbq,
    includeGas,
  });

  const handleInstantReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `DVP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsVoucherModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner & Sync Status Hub */}
      <section className="w-full bg-[#f6f3ed] py-12 px-4 md:px-12 lg:px-16 border-b border-[#ebe8e2]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <span className="text-[11px] uppercase font-bold text-[#725b38] tracking-widest">
                Secluded Luxury Sanctuary · Malaparamba, Kozhikode, Kerala
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#002720] tracking-tight font-bold">
                Multi-Platform Synced Direct Reservation Engine
              </h1>
              <p className="text-sm md:text-base text-[#414846] leading-relaxed">
                Spacious 4-Bedroom Villa — Welcome to your home away from home. Perfectly equipped for large families and long-term stays. Zero intermediary commissions, real-time availability mirrored seamlessly across international OTA channels, guaranteed lowest rate with direct estate benefits.
              </p>
            </div>

            {/* Channel Manager Hub Trigger */}
            <div className="flex flex-col gap-2 bg-white p-4 rounded-2xl shadow-sm border border-[#ebe8e2]">
              <div className="flex items-center justify-between gap-4 border-b border-[#ebe8e2] pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#25D366] animate-ping" />
                  <span className="px-2.5 py-0.5 rounded-full bg-[#002720]/10 text-[#002720] font-bold text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#725b38]">sync</span>
                    2-Way iCal Engine: Active (5 Channels)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSyncModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#002720] text-white hover:bg-[#133e35] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm text-[#fedeb2]">tune</span>
                  Channel Manager Hub
                </button>
              </div>

              {/* Channels Status Mini Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#f6f3ed] border border-[#ebe8e2]">
                  <span className="w-2 h-2 rounded-full bg-[#ff5a5f]" />
                  <span className="font-medium text-[#002720] truncate">Airbnb iCal</span>
                  <span className="text-[#725b38] text-[10px] ml-auto">2m ago</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#f6f3ed] border border-[#ebe8e2]">
                  <span className="w-2 h-2 rounded-full bg-[#eb2026]" />
                  <span className="font-medium text-[#002720] truncate">MakeMyTrip</span>
                  <span className="text-[#725b38] text-[10px] ml-auto">2m ago</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#f6f3ed] border border-[#ebe8e2]">
                  <span className="w-2 h-2 rounded-full bg-[#003580]" />
                  <span className="font-medium text-[#002720] truncate">Booking.com</span>
                  <span className="text-[#725b38] text-[10px] ml-auto">1m ago</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#f6f3ed] border border-[#ebe8e2]">
                  <span className="w-2 h-2 rounded-full bg-[#7b2cbf]" />
                  <span className="font-medium text-[#002720] truncate">Agoda iCal</span>
                  <span className="text-[#725b38] text-[10px] ml-auto">4m ago</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#f6f3ed] border border-[#ebe8e2]">
                  <span className="w-2 h-2 rounded-full bg-[#0077b6]" />
                  <span className="font-medium text-[#002720] truncate">Vrbo iCal</span>
                  <span className="text-[#725b38] text-[10px] ml-auto">3m ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sync Guarantee Ribbon */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#002720] text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#133e35] flex items-center justify-center text-[#fedeb2]">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white">Guaranteed Real-Time Cross-Platform Lock</span>
                <span className="text-xs text-[#bfecdf]">
                  Synchronized dynamically across Airbnb, MakeMyTrip, Booking.com &amp; VRBO. Double-booking protection indemnity enabled. <strong>Lowest Direct Rate</strong> (Exempt from OTA commissions).
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-[11px] uppercase font-bold text-[#fedeb2] tracking-wider whitespace-nowrap">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> 100% Best Price</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Zero OTA Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 12-Column Grid: Calendar & Calculation Engine */}
      <section className="w-full max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 Cols): Multi-Calendar & Visuals */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Legend Strip */}
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#25D366]" /><span className="font-semibold">Available</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#002720]" /><span className="font-semibold">Selected Range</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff5a5f]" /><span className="text-[#414846]">Airbnb</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#003580]" /><span className="text-[#414846]">Booking.com</span></div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#eb2026]" /><span className="text-[#414846]">MakeMyTrip</span></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#725b38]">Click dates to set stay</span>
            </div>

            {/* Dual Calendar Viewport */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-[#ebe8e2] flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCalendarMonthOffset(calendarMonthOffset - 1)}
                    className="w-9 h-9 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] flex items-center justify-center text-[#002720] transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <h2 className="font-serif text-xl font-bold text-[#002720]">
                    {calendarMonthOffset === 0 ? 'October & November 2025' : 'December 2025 & January 2026'}
                  </h2>
                  <button
                    onClick={() => setCalendarMonthOffset(calendarMonthOffset + 1)}
                    className="w-9 h-9 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] flex items-center justify-center text-[#002720] transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#fedeb2] text-[#281800] text-[10px] uppercase font-bold">
                  Whole-Villa Private Lockout
                </span>
              </div>

              {/* Grid of Months */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Month 1 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-bold text-[#002720]">
                    <span>{calendarMonthOffset === 0 ? 'October 2025' : 'December 2025'}</span>
                    <span className="text-xs text-[#725b38]">From ₹14,000/nt</span>
                  </div>
                  <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#717976] py-1">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  <div className="grid grid-cols-1 grid-flow-row grid-cols-7 gap-1 text-center text-xs">
                    {Array.from({ length: 31 }, (_, i) => {
                      const dayNum = i + 1;
                      const dayDateStr = `2025-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                      const isSelected = dayDateStr >= startDate && dayDateStr <= endDate;
                      const isBlockedAirbnb = dayNum >= 18 && dayNum <= 21;
                      const isBlockedBooking = dayNum >= 24 && dayNum <= 27;

                      return (
                        <button
                          key={i}
                          disabled={isBlockedAirbnb || isBlockedBooking}
                          onClick={() => {
                            if (!isBlockedAirbnb && !isBlockedBooking) {
                              setStartDate(dayDateStr);
                            }
                          }}
                          className={`py-2 rounded transition-colors text-xs font-medium cursor-pointer ${
                            isBlockedAirbnb
                              ? 'bg-[#ff5a5f]/20 text-[#ff5a5f] cursor-not-allowed font-bold text-[10px]'
                              : isBlockedBooking
                              ? 'bg-[#003580]/20 text-[#003580] cursor-not-allowed font-bold text-[10px]'
                              : isSelected
                              ? 'bg-[#002720] text-white font-bold'
                              : 'hover:bg-[#fedeb2]/40 text-[#1c1c18]'
                          }`}
                          type="button"
                        >
                          {dayNum}
                          {isBlockedAirbnb && <span className="block text-[8px]">ABNB</span>}
                          {isBlockedBooking && <span className="block text-[8px]">BKNG</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Month 2 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm font-bold text-[#002720]">
                    <span>{calendarMonthOffset === 0 ? 'November 2025' : 'January 2026'}</span>
                    <span className="text-xs text-[#725b38]">From ₹14,000/nt</span>
                  </div>
                  <div className="grid grid-cols-7 text-center text-[11px] font-bold text-[#717976] py-1">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  <div className="grid grid-cols-1 grid-flow-row grid-cols-7 gap-1 text-center text-xs">
                    {Array.from({ length: 30 }, (_, i) => {
                      const dayNum = i + 1;
                      const isBlockedMmt = dayNum >= 6 && dayNum <= 8;
                      const isBlockedAgoda = dayNum >= 15 && dayNum <= 17;
                      const isBlockedVrbo = dayNum >= 22 && dayNum <= 24;

                      return (
                        <button
                          key={i}
                          disabled={isBlockedMmt || isBlockedAgoda || isBlockedVrbo}
                          className={`py-2 rounded transition-colors text-xs font-medium cursor-pointer ${
                            isBlockedMmt
                              ? 'bg-[#eb2026]/20 text-[#eb2026] cursor-not-allowed font-bold text-[10px]'
                              : isBlockedAgoda
                              ? 'bg-[#7b2cbf]/20 text-[#7b2cbf] cursor-not-allowed font-bold text-[10px]'
                              : isBlockedVrbo
                              ? 'bg-[#0077b6]/20 text-[#0077b6] cursor-not-allowed font-bold text-[10px]'
                              : 'hover:bg-[#fedeb2]/40 text-[#1c1c18]'
                          }`}
                          type="button"
                        >
                          {dayNum}
                          {isBlockedMmt && <span className="block text-[8px]">MMT</span>}
                          {isBlockedAgoda && <span className="block text-[8px]">AGDA</span>}
                          {isBlockedVrbo && <span className="block text-[8px]">VRBO</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-[#414846] border-t border-[#ebe8e2]">
                <span className="material-symbols-outlined text-sm text-[#725b38]">info</span>
                <span>Check-in: <strong>2:00 PM</strong> • Check-out: <strong>11:00 AM</strong>. Early check-in allowed upon availability.</span>
              </div>
            </div>

            {/* Villa Visual Vignettes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNjT9iAEEsmO43Mgy4TKTh40X4jGa2YsT_-jeXevFdTtpjS5Wx7yLbUyEYiEXqjl3ZLymBk12cuR8u1RbQ3QkY6kkCJntxvPZnzILnW6Un631uMyJzUSrgT1zoM9Bgx_xebgl9Z0VjOsghSH_NbPKo7pjz5XAGyuP0p_RWgrxWaylYdQZy8Dl0QGHOf37x8UjhifYJ1tOEvN44wznlNHPC94RSy9Ic9ZErmyEuJ6uD4YM3JNS8Up0hGAv0R1zt3bZ7l84"
                  alt="Pool"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002720]/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm">Exclusive Indoor Pool</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxdu7CJizMVG0kswIVHtuKrTmEmgLGNHtnkQIijMfPCEJ2W3rViRb3eeMUKCbmmjWcuOj0z-eq1TclbpPB0MKsCKJ35LRB4H6h2NzwmNoeNtH_BMW7YjQ75Ox0UwsAc-O2q61D7kS0AC5ZtLWKJAIW3Pd1uu4kpjyKn944TfyZkuz41474oE0bYaoy0Trk_QAExv5guY0PUOyE4ZiqxOa77n75RMUiwDUscewxb9QB-mq4M0L21tOsdROsHWd0pdlWtmk"
                  alt="Bedroom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002720]/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm">Master Suite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Live Calculation & Checkout Engine */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebe8e2]">
              {/* Card Header */}
              <div className="bg-[#133e35] text-white p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#fedeb2] tracking-wider">
                    Live Direct Tariff
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#725b38] text-white text-[10px] uppercase font-bold">
                    Best Rate Guarantee
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-white">
                    {formatINR(calcResult.effectiveNightlyAverage)}
                  </span>
                  <span className="text-xs text-[#bfecdf]">/ night average</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="bg-[#002720]/70 p-2.5 rounded-xl flex flex-col">
                    <span className="text-[10px] uppercase text-[#bfecdf] font-bold">Check-In</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                  <div className="bg-[#002720]/70 p-2.5 rounded-xl flex flex-col">
                    <span className="text-[10px] uppercase text-[#bfecdf] font-bold">Check-Out</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#fedeb2] pt-1">
                  <span>{calcResult.totalNights} Nights Selected</span>
                  <span>Max 8 Adults + 3 Kids</span>
                </div>
              </div>

              {/* Add-ons & Calculations */}
              <div className="p-6 flex flex-col gap-4 bg-[#f6f3ed]/60 text-xs">
                <span className="font-bold text-sm text-[#002720]">Curated Villa Add-ons</span>
                <div className="flex flex-col gap-2">
                  <label className="flex items-start justify-between p-3 rounded-xl bg-white hover:bg-[#f6f3ed] transition-colors cursor-pointer shadow-sm border border-[#ebe8e2]">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={includeKitchen}
                        onChange={(e) => setIncludeKitchen(e.target.checked)}
                        className="w-4 h-4 accent-[#725b38] rounded mt-0.5"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#002720]">Full Kitchen Access &amp; Deep Clean</span>
                        <span className="text-[11px] text-[#717976]">Pre-booked heavy cooking &amp; post-stay deep sanitization</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#725b38]">+₹2,500</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f6f3ed] transition-colors cursor-pointer shadow-sm border border-[#ebe8e2]">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={includeBbq}
                        onChange={(e) => setIncludeBbq(e.target.checked)}
                        className="w-4 h-4 accent-[#725b38] rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#002720]">Private Poolside BBQ Soirée</span>
                        <span className="text-[11px] text-[#717976]">Chef-prepared coastal sea bass &amp; kebabs</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#725b38]">+₹4,500</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f6f3ed] transition-colors cursor-pointer shadow-sm border border-[#ebe8e2]">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={includeGas}
                        onChange={(e) => setIncludeGas(e.target.checked)}
                        className="w-4 h-4 accent-[#725b38] rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#002720]">Cooking Gas Utility</span>
                        <span className="text-[11px] text-[#717976]">₹300 / night gas cylinder support</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#725b38]">+{formatINR(calcResult.gasFeeTotal)}</span>
                  </label>
                </div>

                {/* Ledger Breakdown */}
                <div className="pt-2 flex flex-col gap-2 text-[#414846] border-t border-[#ebe8e2]">
                  <div className="flex justify-between items-center">
                    <span>Base Stay ({calcResult.totalNights} nights @ ₹14k)</span>
                    <span className="font-semibold text-[#1c1c18]">{formatINR(calcResult.baseStayTotal)}</span>
                  </div>
                  {calcResult.weekendSurgeTotal > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Weekend Surcharge ({calcResult.weekendNights} weekend nights)</span>
                      <span className="font-semibold text-[#725b38]">+{formatINR(calcResult.weekendSurgeTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[#002720] font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#725b38]">savings</span>
                      Direct Saving vs OTA Airbnb/MMT
                    </span>
                    <span className="font-bold text-[#725b38]">Saved {formatINR(calcResult.directSavings)}</span>
                  </div>
                  {calcResult.addonsTotal > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Selected Add-ons</span>
                      <span className="font-semibold text-[#1c1c18]">{formatINR(calcResult.addonsTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span>Applicable GST (18%)</span>
                    <span>{formatINR(calcResult.gstAmount)}</span>
                  </div>
                  <div className="h-px bg-[#c0c8c4]/40 my-1" />
                  <div className="flex justify-between items-baseline font-bold text-base text-[#002720]">
                    <span>Total Direct Payable</span>
                    <span className="font-serif text-xl">{formatINR(calcResult.grandTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#717976]">
                    <span>Refundable Caution Deposit (Gate)</span>
                    <span className="font-semibold text-[#002720]">{formatINR(calcResult.refundableDeposit)}</span>
                  </div>
                </div>

                {/* Tabbed Action Modes */}
                <div className="pt-3 border-t border-[#ebe8e2]">
                  <div className="flex rounded-lg bg-[#f0eee8] p-1 gap-1 mb-4">
                    <button
                      onClick={() => setActiveBookingTab('instant')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        activeBookingTab === 'instant' ? 'bg-white text-[#002720] shadow-sm' : 'text-[#414846]'
                      }`}
                      type="button"
                    >
                      Instant Reserve
                    </button>
                    <button
                      onClick={() => setActiveBookingTab('query')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        activeBookingTab === 'query' ? 'bg-white text-[#002720] shadow-sm' : 'text-[#414846]'
                      }`}
                      type="button"
                    >
                      Hold &amp; Query
                    </button>
                    <button
                      onClick={() => setActiveBookingTab('whatsapp')}
                      className={`flex-1 py-1.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        activeBookingTab === 'whatsapp' ? 'bg-[#25D366] text-white shadow-sm' : 'text-[#414846]'
                      }`}
                      type="button"
                    >
                      WhatsApp
                    </button>
                  </div>

                  {/* Panel 1: Instant Reserve */}
                  {activeBookingTab === 'instant' && (
                    <form onSubmit={handleInstantReserve} className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Guest Name"
                          className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                        />
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="Mobile (+91)"
                          className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                        />
                      </div>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Email for Voucher"
                        className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#002720] hover:bg-[#133e35] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">lock</span>
                        <span>Lock Dates &amp; Generate Voucher ({formatINR(calcResult.grandTotal)})</span>
                      </button>
                      <span className="text-center text-[10px] text-[#717976]">
                        Accepts UPI, NetBanking, Visa, MasterCard &amp; Amex
                      </span>
                    </form>
                  )}

                  {/* Panel 2: Hold & Query */}
                  {activeBookingTab === 'query' && (
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name & City"
                        className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4]"
                      />
                      <textarea
                        rows={2}
                        placeholder="Custom requests, celebration notes, dietary asks..."
                        className="px-3 py-2 bg-white rounded-lg border border-[#c0c8c4]"
                      />
                      <button
                        type="button"
                        onClick={() => alert('Your query has been dispatched to resident owner Abhilash Mohan.')}
                        className="w-full py-2.5 rounded-xl bg-[#725b38] hover:bg-[#584323] text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Submit Priority Query to Owner
                      </button>
                    </div>
                  )}

                  {/* Panel 3: WhatsApp */}
                  {activeBookingTab === 'whatsapp' && (
                    <div className="flex flex-col gap-3">
                      <div className="p-3 bg-[#bfecdf]/40 rounded-xl text-xs text-[#002720]">
                        Clicking below opens WhatsApp with stay dates (<strong>{startDate} to {endDate}</strong>) and quote pre-filled for instant confirmation.
                      </div>
                      <a
                        href={`https://wa.me/917559894574?text=Hello%20Dreams%20Villa,%20I%20would%20like%20to%20reserve%20direct%20for%20${startDate}%20to%20${endDate}%20(${calcResult.totalNights}%20Nights,%20Total%20${calcResult.grandTotal}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-base">forum</span>
                        <span>Chat with Host on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Host Contact Card */}
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={VILLA_CONTACT.hostAvatar}
                  alt={VILLA_CONTACT.ownerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#fedeb2]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#002720]">{VILLA_CONTACT.ownerName}</h4>
                  <p className="text-xs text-[#725b38]">Villa Proprietor &amp; Resident Host</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${VILLA_CONTACT.ownerPhoneTel}`}
                  className="w-9 h-9 rounded-lg bg-[#f6f3ed] hover:bg-[#002720] hover:text-white flex items-center justify-center text-[#002720] transition-colors"
                  title="Call Owner"
                >
                  <span className="material-symbols-outlined text-base">phone</span>
                </a>
                <a
                  href={VILLA_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#f6f3ed] hover:bg-[#25D366] hover:text-white flex items-center justify-center text-[#002720] transition-colors"
                  title="WhatsApp Owner"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ChannelSyncModal isOpen={isSyncModalOpen} onClose={() => setIsSyncModalOpen(false)} />
      <VoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        bookingRef={bookingRef}
        guestName={guestName}
        guestPhone={guestPhone}
        guestEmail={guestEmail}
        startDate={startDate}
        endDate={endDate}
        adultsCount={adultsCount}
        calcResult={calcResult}
      />
    </div>
  );
};
