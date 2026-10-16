import React, { useState } from 'react';

interface ChannelSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChannelSyncModal: React.FC<ChannelSyncModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [importPlatform, setImportPlatform] = useState('Google Calendar');
  const [importUrl, setImportUrl] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isOpen) return null;

  const exportUrl = 'https://sync.dreamspoolvilla.com/ical/export/dreams-villa-malaparamba.ics';

  const handleCopy = () => {
    navigator.clipboard.writeText(exportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;
    setImportSuccess(true);
    setTimeout(() => {
      setImportSuccess(false);
      setImportUrl('');
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-[#fcf9f3] text-[#1c1c18] rounded-2xl shadow-2xl overflow-hidden border border-[#ebe8e2] my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#002720] text-white p-6 flex items-center justify-between border-b border-[#bfecdf]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#133e35] flex items-center justify-center text-[#bfecdf]">
              <span className="material-symbols-outlined text-2xl">sync</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Channel Manager &amp; 2-Way iCal Sync</h2>
              <span className="text-xs text-[#fedeb2] font-medium">
                Live bidirectional sync with Google Calendar, Airbnb, MakeMyTrip, Vrbo &amp; Agoda
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

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Export Feed Box */}
          <div className="p-5 rounded-xl bg-white border border-[#ebe8e2] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-[#725b38] tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">file_download</span>
                Official Dreams Villa Calendar Export Feed (.ics)
              </span>
              <span className="px-2 py-0.5 rounded bg-[#bfecdf] text-[#002720] text-[10px] font-bold uppercase">
                2-Way Master Feed
              </span>
            </div>
            <p className="text-xs text-[#414846]">
              Add this link to your Google Calendar, Airbnb, MakeMyTrip, or Vrbo Extranet to instantly reflect direct website reservations and block double bookings.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={exportUrl}
                className="w-full bg-[#f6f3ed] px-3.5 py-2 rounded-lg font-mono text-xs text-[#002720] border border-[#c0c8c4] select-all outline-none"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#002720] hover:bg-[#133e35] text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  {copied ? 'check' : 'content_copy'}
                </span>
                {copied ? 'Copied!' : 'Copy Feed'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(exportUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#002720] hover:underline"
              >
                <span className="material-symbols-outlined text-sm text-[#725b38]">event</span>
                Subscribe via Google Calendar
              </a>
              <span className="text-[#c0c8c4]">•</span>
              <a
                href={`webcal://${exportUrl.replace('https://', '')}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#002720] hover:underline"
              >
                <span className="material-symbols-outlined text-sm text-[#725b38]">calendar_month</span>
                Webcal 1-Click Subscribe (Apple/Outlook)
              </a>
            </div>
          </div>

          {/* Active Synced Channels Grid */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase font-bold text-[#002720] tracking-wider">
              Connected Channel Feeds
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-[#ebe8e2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a5f]" />
                  <span className="font-semibold text-[#002720]">Airbnb iCal Feed</span>
                </div>
                <span className="text-[#725b38] font-mono text-[11px]">Synced 2m ago</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#ebe8e2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#003580]" />
                  <span className="font-semibold text-[#002720]">Booking.com Pulse</span>
                </div>
                <span className="text-[#725b38] font-mono text-[11px]">Synced 1m ago</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#ebe8e2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eb2026]" />
                  <span className="font-semibold text-[#002720]">MakeMyTrip Extranet</span>
                </div>
                <span className="text-[#725b38] font-mono text-[11px]">Synced 2m ago</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-[#ebe8e2] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0077b6]" />
                  <span className="font-semibold text-[#002720]">Vrbo / HomeAway</span>
                </div>
                <span className="text-[#725b38] font-mono text-[11px]">Synced 3m ago</span>
              </div>
            </div>
          </div>

          {/* Import New Feed Form */}
          <form onSubmit={handleImportSubmit} className="p-5 rounded-xl bg-[#f6f3ed] flex flex-col gap-3">
            <span className="text-xs uppercase font-bold text-[#002720] tracking-wider">
              Import New External iCal Feed
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={importPlatform}
                onChange={(e) => setImportPlatform(e.target.value)}
                className="bg-white px-3 py-2 rounded-lg text-xs font-semibold text-[#1c1c18] border border-[#c0c8c4] focus:outline-none"
              >
                <option>Google Calendar</option>
                <option>Airbnb</option>
                <option>MakeMyTrip</option>
                <option>Vrbo</option>
                <option>Agoda</option>
                <option>Custom iCal (.ics)</option>
              </select>
              <input
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://platform.com/calendar/ical/feed.ics"
                required
                className="flex-1 bg-white px-3 py-2 rounded-lg text-xs text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#002720] hover:bg-[#133e35] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Connect Feed
              </button>
            </div>
            {importSuccess && (
              <span className="text-xs text-[#002720] bg-[#bfecdf] p-2 rounded font-semibold">
                Feed linked successfully! Queued for 15-minute sync interval.
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
