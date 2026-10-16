import React from 'react';
import { StayCalculationResult, formatINR } from '../utils/pricing.ts';
import { VILLA_CONTACT } from '../data/villaData.ts';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  startDate: string;
  endDate: string;
  adultsCount: number;
  calcResult: StayCalculationResult;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  bookingRef,
  guestName,
  guestPhone,
  guestEmail,
  startDate,
  endDate,
  adultsCount,
  calcResult,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#fcf9f3] text-[#1c1c18] rounded-2xl shadow-2xl overflow-hidden border border-[#ebe8e2] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#002720] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="Dreams Villa Logo"
              className="h-10 w-auto object-contain"
              src={VILLA_CONTACT.logoUrl}
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold">Dreams Premium Pool Villa</span>
              <span className="text-[10px] uppercase font-bold text-[#fedeb2] tracking-[0.2em]">
                Direct Booking Official Voucher
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#133e35] hover:bg-[#254e44] text-white flex items-center justify-center transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Voucher Status Ribbon */}
        <div className="bg-[#bfecdf] text-[#002720] px-6 py-2.5 flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">check_circle</span>
            Confirmed Direct Hold · Guaranteed Lowest Tariff
          </span>
          <span className="font-mono uppercase text-sm tracking-wider font-bold">
            Ref: {bookingRef}
          </span>
        </div>

        {/* Voucher Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Guest & Reservation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-xl border border-[#ebe8e2] shadow-sm text-sm">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#725b38] font-bold block mb-1">
                Primary Guest
              </span>
              <p className="font-bold text-[#002720] text-base">{guestName || 'Valued Guest'}</p>
              <p className="text-xs text-[#414846]">{guestPhone}</p>
              <p className="text-xs text-[#414846]">{guestEmail}</p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-[#725b38] font-bold block mb-1">
                Stay Particulars
              </span>
              <p className="font-bold text-[#002720] text-base">
                {startDate} to {endDate}
              </p>
              <p className="text-xs text-[#414846]">
                {calcResult.totalNights} Nights ({calcResult.weekdayNights} Weekdays, {calcResult.weekendNights} Weekend Nights)
              </p>
              <p className="text-xs text-[#414846]">
                Party: {adultsCount} Adults (Whole 4-Bedroom Villa Private Use)
              </p>
            </div>
          </div>

          {/* Breakdown Ledger */}
          <div className="flex flex-col gap-2.5 bg-[#f6f3ed] p-5 rounded-xl text-sm">
            <span className="text-xs uppercase font-bold text-[#002720] tracking-wider mb-1">
              Billing Ledger &amp; Direct Privileges
            </span>
            <div className="flex justify-between items-center text-xs text-[#414846]">
              <span>Base Accommodation ({calcResult.totalNights} nights)</span>
              <span className="font-semibold text-[#1c1c18]">{formatINR(calcResult.baseStayTotal)}</span>
            </div>
            {calcResult.weekendSurgeTotal > 0 && (
              <div className="flex justify-between items-center text-xs text-[#414846]">
                <span>Weekend Differential ({calcResult.weekendNights} nights @ +₹1,000)</span>
                <span className="font-semibold text-[#725b38]">{formatINR(calcResult.weekendSurgeTotal)}</span>
              </div>
            )}
            {calcResult.extraGuestsTotal > 0 && (
              <div className="flex justify-between items-center text-xs text-[#414846]">
                <span>Extra Guests ({calcResult.extraGuestCount} guest(s) @ ₹1,000/nt)</span>
                <span className="font-semibold text-[#725b38]">{formatINR(calcResult.extraGuestsTotal)}</span>
              </div>
            )}
            {calcResult.addonsTotal > 0 && (
              <div className="flex justify-between items-center text-xs text-[#414846]">
                <span>Selected Add-ons (Kitchen/BBQ/Gas)</span>
                <span className="font-semibold text-[#1c1c18]">{formatINR(calcResult.addonsTotal)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-[#414846]">
              <span>Applicable GST (18%)</span>
              <span className="font-semibold text-[#1c1c18]">{formatINR(calcResult.gstAmount)}</span>
            </div>
            <div className="h-px bg-[#c0c8c4]/40 my-1" />
            <div className="flex justify-between items-baseline font-bold text-base text-[#002720]">
              <span>Total Payable</span>
              <span className="font-serif text-xl">{formatINR(calcResult.grandTotal)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-[#725b38] font-medium pt-1">
              <span>Direct Booking Savings (vs OTA Platforms):</span>
              <span className="font-bold">Save {formatINR(calcResult.directSavings)}</span>
            </div>
          </div>

          {/* Check-In Key Information */}
          <div className="text-xs text-[#414846] flex flex-col gap-1.5 border-t border-[#ebe8e2] pt-4">
            <div className="flex items-center gap-2 font-semibold text-[#002720]">
              <span className="material-symbols-outlined text-sm text-[#725b38]">hotel</span>
              <span>Check-in: 2:00 PM | Check-out: 11:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#725b38]">badge</span>
              <span>Mandatory government photo ID required prior to arrival for all staying guests.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#725b38]">location_on</span>
              <span>{VILLA_CONTACT.location} (Coordinates: {VILLA_CONTACT.gps})</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-[#f0eee8] text-xs font-semibold text-[#002720] border border-[#c0c8c4] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-base">print</span>
              Print Voucher
            </button>
            <a
              href={`https://wa.me/917559894574?text=Hello%20Abhilash%2C%20I%20have%20my%20confirmed%20booking%20voucher%20${bookingRef}%20for%20${startDate}%20to%20${endDate}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1eb757] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp Host Confirmation
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-[#002720] hover:bg-[#133e35] text-white text-xs font-semibold transition-all"
              type="button"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
