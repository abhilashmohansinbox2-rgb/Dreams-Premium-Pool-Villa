import React, { useState } from 'react';
import { NavigationTab } from '../types/index.ts';
import { VILLA_CONTACT } from '../data/villaData.ts';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onReserveClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onReserveClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'overview', label: 'Overview & Tour' },
    { id: 'facilities', label: 'Facilities & Amenities' },
    { id: 'guide', label: 'Local Guide & Attractions' },
    { id: 'booking', label: 'Live Booking & Sync' },
    { id: 'reviews', label: 'Guest Reviews' },
    { id: 'admin', label: 'Property Admin' },
  ];

  const handleSelectTab = (tab: NavigationTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f3]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#ebe8e2]">
      {/* Top Announcement Bar */}
      <div className="bg-[#002720] text-white px-4 md:px-12 lg:px-16 py-1.5 text-xs font-medium">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between uppercase tracking-wider text-[11px]">
          <div className="flex items-center gap-4 lg:gap-6">
            <span className="flex items-center gap-1.5 text-[#bfecdf]">
              <span className="material-symbols-outlined text-[15px]">phone_in_talk</span>
              <span className="hidden sm:inline">Reception 24/7:</span>
              <a className="hover:text-white transition-colors underline-offset-2 hover:underline" href={`tel:${VILLA_CONTACT.receptionPhoneTel}`}>
                {VILLA_CONTACT.receptionPhone}
              </a>
            </span>
            <span className="hidden lg:inline text-[#c0c8c4]/40">|</span>
            <span className="hidden lg:flex items-center gap-1.5 text-[#bfecdf]">
              <span className="material-symbols-outlined text-[15px]">person</span>
              <span>Owner Desk ({VILLA_CONTACT.ownerName}):</span>
              <a className="hover:text-white transition-colors underline-offset-2 hover:underline" href={`tel:${VILLA_CONTACT.ownerPhoneTel}`}>
                {VILLA_CONTACT.ownerPhone}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSelectTab('admin')}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors shadow-sm ${
                activeTab === 'admin'
                  ? 'bg-[#fedeb2] text-[#281800]'
                  : 'bg-[#725b38] text-white hover:bg-[#584323]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span>Admin Portal</span>
            </button>
            <span className="hidden md:inline text-[#fedeb2] text-[11px] font-medium">
              Best Rate Direct Booking Guarantee
            </span>
            <a
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#133e35] text-[#bfecdf] hover:bg-[#bfecdf] hover:text-[#002720] transition-colors text-[11px] font-semibold"
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              <span className="hidden sm:inline">WhatsApp Quick-Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleSelectTab('overview')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <img
            alt="Dreams Premium Pool Villa Logo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            src={VILLA_CONTACT.logoUrl}
          />
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-[#002720] tracking-tight leading-none">
              Dreams
            </span>
            <span className="text-[10px] text-[#725b38] font-bold uppercase tracking-[0.25em] mt-0.5">
              Premium Pool Villa
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 h-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`h-full flex items-center text-sm font-medium transition-all relative cursor-pointer px-1 ${
                  isActive
                    ? 'text-[#002720] font-semibold'
                    : 'text-[#414846] hover:text-[#002720]'
                }`}
                type="button"
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#725b38] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Host Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReserveClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#002720] text-white text-sm font-semibold hover:bg-[#133e35] transition-all shadow-[0_2px_8px_rgba(0,39,32,0.18)] cursor-pointer active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] mr-1.5">calendar_month</span>
            Reserve Direct
          </button>

          {/* Host Avatar Badge */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#ebe8e2]">
            <img
              alt="Host Abhilash Mohan"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#fedeb2] shadow-sm"
              src={VILLA_CONTACT.hostAvatar}
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#1c1c18] leading-tight flex items-center gap-1">
                {VILLA_CONTACT.ownerName}
                <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
              </span>
              <span className="text-[11px] text-[#725b38] font-medium leading-tight">
                Villa Host · Online
              </span>
            </div>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#f0eee8] text-[#002720] hover:bg-[#e5e2dc] transition-colors"
            type="button"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fcf9f3] border-t border-[#ebe8e2] px-6 py-4 shadow-xl flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[#002720] text-white font-semibold'
                  : 'text-[#1c1c18] hover:bg-[#f0eee8]'
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#ebe8e2] flex flex-col gap-2">
            <button
              onClick={() => {
                onReserveClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#002720] text-white font-semibold text-sm flex items-center justify-center gap-2"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Reserve Direct
            </button>
            <div className="flex items-center justify-between text-xs text-[#414846] px-1 pt-1">
              <span>Reception: <a href={`tel:${VILLA_CONTACT.receptionPhoneTel}`} className="font-semibold text-[#002720]">{VILLA_CONTACT.receptionPhone}</a></span>
              <span>Owner: <a href={`tel:${VILLA_CONTACT.ownerPhoneTel}`} className="font-semibold text-[#002720]">{VILLA_CONTACT.ownerPhone}</a></span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
