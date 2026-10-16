import React, { useState } from 'react';
import { WALKTHROUGH_ZONES, VILLA_CONTACT } from '../data/villaData.ts';

interface OverviewPageProps {
  onNavigateToBooking: (dates?: { start: string; end: string; guests: string }) => void;
  onOpenVideoTour: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigateToBooking,
  onOpenVideoTour,
}) => {
  // Hero quick search state
  const [heroCheckIn, setHeroCheckIn] = useState('2025-10-14');
  const [heroCheckOut, setHeroCheckOut] = useState('2025-10-18');
  const [heroGuests, setHeroGuests] = useState('8-adults');

  // Interactive walkthrough zone
  const [activeZoneId, setActiveZoneId] = useState<'pavilion' | 'cabana' | 'pooldeck' | 'gardens'>('pavilion');

  // VIP Date hold inquiry form state
  const [vipName, setVipName] = useState('');
  const [vipPhone, setVipPhone] = useState('');
  const [vipDates, setVipDates] = useState('');
  const [vipNotes, setVipNotes] = useState('');
  const [vipSubmitted, setVipSubmitted] = useState(false);

  const activeZone = WALKTHROUGH_ZONES.find((z) => z.id === activeZoneId) || WALKTHROUGH_ZONES[0];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToBooking({
      start: heroCheckIn,
      end: heroCheckOut,
      guests: heroGuests,
    });
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vipName.trim() || !vipPhone.trim()) return;
    setVipSubmitted(true);
    setTimeout(() => {
      setVipSubmitted(false);
      setVipName('');
      setVipPhone('');
      setVipDates('');
      setVipNotes('');
    }, 6000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Hero Area */}
      <section className="relative w-full -mt-28 min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Atmospheric Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDC_pW199fd0p8Xc118UO2D04fhF_rT6EtX2oCi2L67Q2l4AtR_v2CCSaTJOO1gsNgX32cnSRq-bw6quzT0Y1sQr-aV7NvHxoyjOOUPVsls7NeT_XL6_bcLKD8UeffqPGfJ8PYwSFEpgtAeqA2aB-AZgbfLqJaZjcByHE98tzBcDdEAZlXsYJlwyTxX1aDDjkjHv-gfUh0OpFT6qrNlNSo2ORBFnRwmqXWmrdariMzrW8oI0GGbRTSMu14yKWnSkKTxjRU")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002720] via-[#002720]/50 to-[#002720]/35 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#002720]/25 to-[#002720]/75 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 pt-44 pb-12 flex flex-col justify-end w-full flex-grow">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-[#fedeb2] text-sm">star</span>
              Airbnb Superhost 4.96 ★
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-[#bfecdf] text-sm">verified</span>
              MakeMyTrip Premium Select
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-[#fedeb2] text-sm">shield_with_heart</span>
              100% Direct Booking Protection
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#fedeb2] block mb-2 font-bold">
              Exclusive Private Villa Sanctuary · Malaparamba, Kozhikode, Kerala
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold drop-shadow-md leading-tight mb-4">
              Experience Ultimate Luxury: Your Private 4-Bedroom Sanctuary
            </h1>
            <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed mb-8">
              Escape to a world of elegance in this premium 4-bedroom villa, where modern luxury meets total comfort. Designed for those who appreciate the finer things, this private sanctuary boasts an indoor swimming pool, dual gourmet kitchens, an exclusive private bar lounge, full laundry amenities, and secure gated parking.
            </p>
          </div>

          {/* Direct Quick-Search Availability Engine Bar */}
          <div className="w-full bg-white rounded-2xl shadow-2xl p-4 md:p-6 text-[#1c1c18]">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
              {/* Check-In */}
              <div className="lg:col-span-3 flex flex-col p-3 rounded-xl bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
                <label className="text-[11px] font-bold text-[#414846] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm text-[#725b38]">calendar_today</span>
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={heroCheckIn}
                  onChange={(e) => setHeroCheckIn(e.target.value)}
                  className="bg-transparent text-sm md:text-base font-bold text-[#002720] focus:outline-none cursor-pointer mt-1"
                />
                <span className="text-[11px] text-[#717976]">Flexible check-in allowed</span>
              </div>

              {/* Check-Out */}
              <div className="lg:col-span-3 flex flex-col p-3 rounded-xl bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
                <label className="text-[11px] font-bold text-[#414846] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm text-[#725b38]">event_available</span>
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={heroCheckOut}
                  onChange={(e) => setHeroCheckOut(e.target.value)}
                  className="bg-transparent text-sm md:text-base font-bold text-[#002720] focus:outline-none cursor-pointer mt-1"
                />
                <span className="text-[11px] text-[#717976]">Direct Best Rate Guarantee</span>
              </div>

              {/* Guests */}
              <div className="lg:col-span-3 flex flex-col p-3 rounded-xl bg-[#f6f3ed] hover:bg-[#f0eee8] transition-colors">
                <label className="text-[11px] font-bold text-[#414846] flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm text-[#725b38]">group</span>
                  Guests &amp; Party
                </label>
                <select
                  value={heroGuests}
                  onChange={(e) => setHeroGuests(e.target.value)}
                  className="bg-transparent text-sm md:text-base font-bold text-[#002720] focus:outline-none cursor-pointer mt-1"
                >
                  <option value="4-adults">4 Adults (Full Villa)</option>
                  <option value="6-adults">6 Adults (Full Villa)</option>
                  <option value="8-adults">Up to 8 Guests + 3 Kids (≤6 yrs)</option>
                  <option value="10-adults">10 Adults (Includes Extra Mattresses)</option>
                  <option value="12-adults">12 Max Capacity Group</option>
                </select>
                <span className="text-[11px] text-[#725b38] font-semibold">Kids ≤6 yrs complimentary</span>
              </div>

              {/* Submit CTA */}
              <div className="lg:col-span-3 flex flex-col justify-center h-full gap-1">
                <button
                  type="submit"
                  className="w-full h-14 rounded-xl bg-[#002720] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#133e35] transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Check Rates (From ₹14k/nt)</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#717976]">
                  <span className="material-symbols-outlined text-xs text-[#002720]">sync</span>
                  <span>Syncs live with Airbnb &amp; MakeMyTrip</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Key Architectural Highlights Bento Grid */}
      <section className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold">
              Estate Anatomy &amp; Distinction
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#002720] mt-1">
              Six Pillars of Luxury Living
            </h2>
          </div>
          <p className="text-sm text-[#414846] max-w-md">
            Every square foot is engineered for privacy, relaxation, and grand entertaining in tropical Malaparamba.
          </p>
        </div>

        {/* 6 Bento Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pillar 01 */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#ebe8e2]">
            <div className="relative h-60 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxdu7CJizMVG0kswIVHtuKrTmEmgLGNHtnkQIijMfPCEJ2W3rViRb3eeMUKCbmmjWcuOj0z-eq1TclbpPB0MKsCKJ35LRB4H6h2NzwmNoeNtH_BMW7YjQ75Ox0UwsAc-O2q61D7kS0AC5ZtLWKJAIW3Pd1uu4kpjyKn944TfyZkuz41474oE0bYaoy0Trk_QAExv5guY0PUOyE4ZiqxOa77n75RMUiwDUscewxb9QB-mq4M0L21tOsdROsHWd0pdlWtmk")',
                }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#002720] text-white text-[11px] font-bold uppercase rounded tracking-wider shadow">
                Pillar 01
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#725b38] mb-1">
                  <span className="material-symbols-outlined text-lg">bedroom_parent</span>
                  <span className="text-[11px] uppercase font-bold">Palatial Living</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002720] mb-2">
                  Four Air-Conditioned En-Suite Bedrooms
                </h3>
                <p className="text-sm text-[#414846] leading-relaxed">
                  Four air-conditioned premium bedrooms, each featuring a private en-suite bathroom and continuous hot water.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#414846]">
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Private En-Suite Baths</span>
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Continuous Hot Water</span>
              </div>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#ebe8e2]">
            <div className="relative h-60 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNjT9iAEEsmO43Mgy4TKTh40X4jGa2YsT_-jeXevFdTtpjS5Wx7yLbUyEYiEXqjl3ZLymBk12cuR8u1RbQ3QkY6kkCJntxvPZnzILnW6Un631uMyJzUSrgT1zoM9Bgx_xebgl9Z0VjOsghSH_NbPKo7pjz5XAGyuP0p_RWgrxWaylYdQZy8Dl0QGHOf37x8UjhifYJ1tOEvN44wznlNHPC94RSy9Ic9ZErmyEuJ6uD4YM3JNS8Up0hGAv0R1zt3bZ7l84")',
                }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#725b38] text-white text-[11px] font-bold uppercase rounded tracking-wider shadow">
                Pillar 02
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#725b38] mb-1">
                  <span className="material-symbols-outlined text-lg">pool</span>
                  <span className="text-[11px] uppercase font-bold">Private Wellness</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002720] mb-2">
                  Large Indoor Swimming Pool
                </h3>
                <p className="text-sm text-[#414846] leading-relaxed">
                  Dive into your large indoor swimming pool, complete with its own dedicated changing facilities.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#414846]">
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Large Indoor Pool</span>
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Dedicated Changing Rooms</span>
              </div>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#ebe8e2]">
            <div className="relative h-60 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYHLyOb0_5H8re38XiLU5aCTbPUDzzWmOIfYPgxSEWy9Ce4QvPK_5zpc0Bc4dS2fn5BimGpQrDobGHZS9CaWnO5WJxfqR-zrQhb3jnSrNSiFxCm67rUIFHhzM_yeDKqCEOXzgy3oeMDtOwy-28WRL9NbkyEayKZ5TQ2uEXhFvxwUWkQp6b90grKbuIbKA2gTwSbfG9ZMv73CqefSUzNT2eYOnq7nZhEbzm5mWTZhAWpKsLnt92VJokfjHoJ2GctmpEWpo")',
                }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#002720] text-white text-[11px] font-bold uppercase rounded tracking-wider shadow">
                Pillar 03
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#725b38] mb-1">
                  <span className="material-symbols-outlined text-lg">sports_bar</span>
                  <span className="text-[11px] uppercase font-bold">Entertainment &amp; Leisure</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002720] mb-2">
                  Dual Living Rooms &amp; Private Bar
                </h3>
                <p className="text-sm text-[#414846] leading-relaxed">
                  Two expansive living rooms and a private bar equipped with sofa seating and games (available upon special request). Enjoy shows on two large flat-screen TVs with DTH.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#414846]">
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">2 Flat-Screen TVs</span>
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Games on Request</span>
              </div>
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#ebe8e2]">
            <div className="relative h-60 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAoOpPSnIdVYqMA_l-7WbP5IQmxfKzQrx-tkPv0zHoDaAYs6nHc_1pr_Se6mqoS-D98kQ8Djmr_dPi3pooZcuaCabbGdm0KnU8zzVArEd55tDPBJV7QAqEBkQNecCkb68wcAPTUVRh-9F8NADP7HAwsHtEsMNPZyts-vwaOgpMlHgIPNV9N3C_pDc6TnxptTl34VAUrcZWPyo67EY57arsicuC3lRx3GtVbxUFuQOOnyUqQ2vUmMuhhq9x1K0uTJc99l4")',
                }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#725b38] text-white text-[11px] font-bold uppercase rounded tracking-wider shadow">
                Pillar 04
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#725b38] mb-1">
                  <span className="material-symbols-outlined text-lg">restaurant</span>
                  <span className="text-[11px] uppercase font-bold">Gourmet Ready</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002720] mb-2">
                  Two Fully-Equipped Kitchens &amp; Dining Hall
                </h3>
                <p className="text-sm text-[#414846] leading-relaxed">
                  Two fully-equipped kitchens with modern appliances (large fridge, microwave, water purifier, and stovetops) and a spacious dining hall for grand meals.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#414846]">
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Large Fridge &amp; Microwave</span>
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Grand Dining</span>
              </div>
            </div>
          </div>

          {/* Pillar 05 */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#ebe8e2]">
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOJaFgbG157AzZxSUp49EBedkYgQnbBnUlzFemjQKSEC72VLmvcLgoTYshHjLiw7MLtN045MfT8srlk3I-k0VKxQpCSGLl_j1fm6bh1BLPvutnq2Tczxtj3g0B9sTQw3jk1UBQ3KRpvj4vombwCL7p7KW8khcQic3y5xza-u01li9tsbX23N1vl0QXLR3j8iQ6xZxwsfX21LWWniivrCEN0LHlYjE2TEW2Ht8bAq6uzsIaIp5foVOqxxJftT5dGgGWJaU"
                alt="Covered open-air terrace laundry drying area"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#002720] text-white text-[11px] font-bold uppercase rounded tracking-wider shadow">
                Pillar 05
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#725b38] mb-1">
                  <span className="material-symbols-outlined text-lg">wifi</span>
                  <span className="text-[11px] uppercase font-bold">The Comforts of Home</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002720] mb-2">
                  High-Speed Wi-Fi &amp; Automatic Laundry
                </h3>
                <p className="text-sm text-[#414846] leading-relaxed">
                  High-speed Free Wi-Fi, a fully automatic washing machine, and a dedicated, covered drying area on the terrace for complete laundry care.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#414846]">
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">300 Mbps Wi-Fi</span>
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">Covered Drying Area</span>
              </div>
            </div>
          </div>

          {/* Pillar 06 */}
          <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col group border border-[#ebe8e2]">
            <div className="relative h-60 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAExBhYCwZqkk0bC1qxrZFxyXodk1MFwmbmkxFKhDUDRUNC48F_VQugeyk4zS8KMGrr6BFeshl03c4jVvs35PkgKTszcL2HFdorB_AeoqIzin1JCMeTzIlrNWLDnPAg3CUfSQ2AsWklxm22g_fTf3bIv0YlGNP1GiEP5LTvkuaWPaJt5--iTWDX4VXErdkafiSDNGhuA_5BTN4vWW7JKPGqwv0Q_OCTTmz8CvnTdvvDSvkRKUdtAHuici9Ko27bd1A3PDs")',
                }}
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#725b38] text-white text-[11px] font-bold uppercase rounded tracking-wider shadow">
                Pillar 06
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#725b38] mb-1">
                  <span className="material-symbols-outlined text-lg">shield</span>
                  <span className="text-[11px] uppercase font-bold">Total Peace of Mind</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002720] mb-2">
                  Secure 3-Car Parking &amp; 24/7 CCTV
                </h3>
                <p className="text-sm text-[#414846] leading-relaxed">
                  Secure parking for up to 3 cars and 24/7 external CCTV monitoring for your privacy and round-the-clock safety.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#414846]">
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">3 Covered Parking</span>
                <span className="bg-[#f0eee8] px-2.5 py-1 rounded">24/7 External Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Walkthrough Section */}
      <section className="w-full bg-[#f6f3ed] py-20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
            <div className="lg:w-1/2 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold">
                Interactive Walkthrough
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#002720]">
                Flowing Architecture Crafted for Seamless Indoor-Outdoor Living
              </h2>
              <p className="text-sm md:text-base text-[#414846] leading-relaxed">
                Dreams Villa is designed around a central sun-bathed axis. Every common room expands directly into the open air through massive sliding doors, blurring boundaries between landscaped greenery and shaded living sanctuaries.
              </p>

              {/* Walkthrough Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {WALKTHROUGH_ZONES.map((zone) => {
                  const isSelected = activeZoneId === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZoneId(zone.id)}
                      className={`text-left p-4 rounded-xl shadow-sm flex flex-col gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-2 border-[#725b38] ring-2 ring-[#fedeb2]'
                          : 'bg-white/70 hover:bg-white border border-[#ebe8e2]'
                      }`}
                      type="button"
                    >
                      <span className="text-[11px] uppercase font-bold text-[#725b38]">
                        {zone.zoneNumber}
                      </span>
                      <span className="font-bold text-sm text-[#002720]">{zone.title}</span>
                      <span className="text-xs text-[#717976]">{zone.subtitle}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenVideoTour}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#002720] text-white text-xs font-semibold hover:bg-[#133e35] transition-all shadow-md cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">play_circle</span>
                  Watch 4K Drone Film (2:30 min)
                </button>
                <a
                  href={VILLA_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#e5e2dc] text-[#002720] text-xs font-semibold hover:bg-[#dcdad4] transition-all"
                >
                  <span className="material-symbols-outlined text-lg text-[#725b38]">chat</span>
                  Inquire via WhatsApp
                </a>
              </div>
            </div>

            {/* Interactive Image Display Stage */}
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#e5e2dc]">
                <img
                  src={activeZone.image}
                  alt={activeZone.alt}
                  className="w-full h-[460px] md:h-[500px] object-cover transition-all duration-500"
                />

                {/* Hotspot Indicators */}
                {activeZone.hotspots.map((hs) => (
                  <div
                    key={hs.number}
                    className="absolute group cursor-pointer"
                    style={{ top: hs.top, left: hs.left }}
                  >
                    <span className="relative flex h-8 w-8">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fedeb2] opacity-75" />
                      <span className="relative inline-flex rounded-full h-8 w-8 bg-[#002720] text-white text-xs items-center justify-center font-bold shadow-lg border-2 border-white">
                        {hs.number}
                      </span>
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#002720] text-white rounded-lg text-xs whitespace-nowrap shadow-xl pointer-events-none z-30">
                      {hs.tooltip}
                    </div>
                  </div>
                ))}

                {/* Floorplan Marker HUD */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#725b38] tracking-wider block">
                      Interactive Floorplan Dimension
                    </span>
                    <p className="font-serif text-base font-bold text-[#002720]">
                      {activeZone.areaLabel}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#002720] text-white">
                    <span className="material-symbols-outlined text-base">crop_free</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Platform Comparison Widget: Why Book Direct vs OTAs */}
      <section className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold">
            Direct Host Transparency
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#002720] mt-1">
            Book Direct &amp; Receive Guaranteed Lowest Rates
          </h2>
          <p className="text-sm text-[#414846] mt-2">
            Third-party booking platforms take up to 18% in commissions and service charges. We pass those savings directly back to you.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ebe8e2]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f0eee8] text-sm text-[#002720]">
                  <th className="py-4 px-6 font-bold w-2/5">Included Villa Privileges</th>
                  <th className="py-4 px-6 font-bold bg-[#bfecdf]/30 text-center w-1/5 relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002720] text-white text-[10px] uppercase font-bold px-3 py-0.5 rounded-full shadow">
                      Recommended
                    </span>
                    Direct Official Website
                  </th>
                  <th className="py-4 px-6 font-bold text-[#414846] text-center w-1/5">Airbnb</th>
                  <th className="py-4 px-6 font-bold text-[#414846] text-center w-1/5">MakeMyTrip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe8e2] text-sm">
                <tr className="hover:bg-[#fcf9f3] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#002720] block">Direct Nightly Rate Guarantee</span>
                    <span className="text-xs text-[#717976]">Guaranteed lowest base tariff per night with no hidden platform commission</span>
                  </td>
                  <td className="py-4 px-6 bg-[#bfecdf]/10 text-center font-bold text-[#002720]">
                    <div className="text-base text-[#002720] font-bold">₹14,000 / nt (Wkday)</div>
                    <span className="block text-xs font-semibold text-[#725b38]">₹15,000 / nt (Wknd)</span>
                    <span className="block text-[11px] font-bold text-[#002720] mt-0.5">0% Guest Service Fee</span>
                  </td>
                  <td className="py-4 px-6 text-center text-[#414846]">
                    ₹16,200 / nt
                    <span className="block text-xs text-[#ba1a1a] font-medium">+ 14.2% Airbnb Fee</span>
                  </td>
                  <td className="py-4 px-6 text-center text-[#414846]">
                    ₹16,500 / nt
                    <span className="block text-xs text-[#ba1a1a] font-medium">+ Convenience Fee</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#fcf9f3] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#002720] block">Bespoke &amp; Custom Requests</span>
                    <span className="text-xs text-[#717976]">Early baggage drop, customized food arrangements, flexible hours</span>
                  </td>
                  <td className="py-4 px-6 bg-[#bfecdf]/10 text-center">
                    <div className="inline-flex items-center gap-1 text-[#002720] font-semibold text-xs">
                      <span className="material-symbols-outlined text-base text-[#725b38]">check_circle</span>
                      <span>Directly Addressed by Host</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center text-xs text-[#717976]">Automated In-App Queue</td>
                  <td className="py-4 px-6 text-center text-xs text-[#717976]">Rigid Platform Policy</td>
                </tr>

                <tr className="hover:bg-[#fcf9f3] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#002720] block">Direct WhatsApp Concierge Desk</span>
                    <span className="text-xs text-[#717976]">Fast communication with resident curator Abhilash Mohan</span>
                  </td>
                  <td className="py-4 px-6 bg-[#bfecdf]/10 text-center">
                    <div className="inline-flex items-center gap-1 text-[#002720] font-semibold text-xs">
                      <span className="material-symbols-outlined text-base text-[#725b38]">check_circle</span>
                      <span>Instant Direct Chat</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center text-xs text-[#717976]">Platform chat only</td>
                  <td className="py-4 px-6 text-center text-xs text-[#717976]">Call center queue</td>
                </tr>

                <tr className="hover:bg-[#fcf9f3] transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-[#002720] block">Private Bar Lounge &amp; Dual Kitchen Privileges</span>
                    <span className="text-xs text-[#717976]">Bar access setup on request; discounted kitchen access on direct stays</span>
                  </td>
                  <td className="py-4 px-6 bg-[#bfecdf]/10 text-center">
                    <div className="inline-flex items-center gap-1 text-[#002720] font-semibold text-xs">
                      <span className="material-symbols-outlined text-base text-[#725b38]">check_circle</span>
                      <span>Priority Setup</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center text-xs text-[#717976]">Standardized list</td>
                  <td className="py-4 px-6 text-center text-xs text-[#717976]">Not Included</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#f0eee8] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-[#725b38]">savings</span>
              <span className="text-xs sm:text-sm text-[#002720] font-medium">
                Save up to <strong>18% over OTA fees</strong> with guaranteed best rates and direct host access.
              </span>
            </div>
            <button
              onClick={() => onNavigateToBooking()}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#002720] text-white text-xs font-semibold hover:bg-[#133e35] transition-all shadow-md cursor-pointer whitespace-nowrap"
              type="button"
            >
              <span>Lock Your Direct Rate Now</span>
              <span className="material-symbols-outlined text-sm">lock</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Guest Testimonial Spotlight */}
      <section className="w-full bg-[#ebe8e2] py-20">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-1 text-[#725b38]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span className="text-xs uppercase font-bold text-[#414846] ml-2">
                  5.0 Star Guest Rating
                </span>
              </div>
              <blockquote className="font-serif text-2xl lg:text-3xl text-[#002720] italic leading-snug">
                "The sheer tranquility of Dreams Villa exceeded every expectation. Swimming under the palms at night while Chef Anand prepared fresh tiger prawns felt like our own private boutique resort."
              </blockquote>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#002720] shadow">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa238IPsf8JcYaMO13MfdjPeDqMHM3nOOuOIDmDwCHweZlp32nYLcad_XhFH5rdmv-HJok_61Pft1atzvxAe4p6cOq4rnj0khZB8alNQdIETF9sfx0KWd5uCVY3gdtsp2Da5nv7DmpXbuuLrzlDC8TtLyG6xXKhh38zdhTHzlmH7tCT9noiX27O9eVZGwfbXJyhPo5YUvjx-W8davyTR2o55h-PMv-Vmm3RZkpWTDMhOGxOdfyCCKGOg"
                    alt="Dev and Natasha Singhania"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#002720]">Dev &amp; Natasha Singhania</p>
                  <p className="text-xs text-[#414846]">Stayed 6 Nights · Family Anniversary Retreat</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-72">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBejmTfbFznAhBhrbzQs43nke58mnNwc62se8UImHIT-AmxavulanZx3C--y1fzfDHkHZLrh94tbBXBmlNqmczd4rJ_ktv4aCIIILtudGzN4yb4WMdOZRe45ZhJCFQAqJXNiXcjKlZmrySY4MNpHfWLr3QcOra1_ybD_-h94X_ru080vsdEQLy2EJDvycCtkGP9vS_D9Tp32-PQQwoZ9S5FLGJexjuug_vaxRWqGJ38_9me47_UJ2FoGERYTQKB1YCUkB4"
                  alt="Floating breakfast"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-72 mt-8">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFST-_FtosmSjIclLZYaqkGjc8eIPTnwNbom7rz4cf1wM1ogAWtFD23bRT1tVRwOm54Gw9BxDXLl9tlU-01fk4T2YsRkPOt8Cq3fNJlO6X4ptVjtxOLZtIQTbEBRXx_14_SISuJ-teA4p_YN-8rTA-5PpDB_kU6rivPSgryyKXr_Hm5gdvqdDiiEBbH7tkZz4ARolBx7uM4fWLt14ogKtN8Zc9dg7pqK2Dsh02PbW_K4pT6-zvRcxjn0DCDHlfl-irBrE"
                  alt="Balcony swing evening relaxation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Estate Protocols & Stay Standards */}
      <section className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold">
            Estate Etiquette &amp; Guest Protocols
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#002720] mt-1">
            Curated For An Uncompromised Sanctuary
          </h2>
          <p className="text-sm text-[#414846] mt-2">
            To ensure an exceptional experience for all guests, please review our quiet residential guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#ebe8e2] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#725b38]">
                <span className="material-symbols-outlined text-2xl">badge</span>
                <span className="text-xs uppercase font-bold tracking-wider">Arrival &amp; Entry</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#002720]">Arrival &amp; Occupancy</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#414846] divide-y divide-[#ebe8e2]">
                <li className="pt-1.5"><strong>ID:</strong> Government photo ID required prior to check-in.</li>
                <li className="pt-1.5"><strong>Capacity:</strong> Max 8 adults + 3 kids (≤6 yrs) standard base.</li>
                <li className="pt-1.5"><strong>Footwear:</strong> Outdoor shoes to be placed in veranda shoe rack.</li>
                <li className="pt-1.5"><strong>Bachelor Groups:</strong> Strictly by prior approval from owner desk.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#ebe8e2] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#725b38]">
                <span className="material-symbols-outlined text-2xl">energy_savings_leaf</span>
                <span className="text-xs uppercase font-bold tracking-wider">Peace &amp; Solitude</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#002720]">House Conduct &amp; Eco Care</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#414846] divide-y divide-[#ebe8e2]">
                <li className="pt-1.5"><strong>Smoke-Free:</strong> 100% smoke-free indoors (outdoor zone only).</li>
                <li className="pt-1.5"><strong>Sound:</strong> Respectful sound levels in residential neighborhood.</li>
                <li className="pt-1.5"><strong>Energy:</strong> Turn off ACs and geysers when stepping out.</li>
                <li className="pt-1.5"><strong>Pool Glass:</strong> Avoid heavy splashing against glass partitions.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#ebe8e2] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#725b38]">
                <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                <span className="text-xs uppercase font-bold tracking-wider">Dining &amp; Kitchen</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#002720]">Kitchen Usage Rules</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#414846] divide-y divide-[#ebe8e2]">
                <li className="pt-1.5"><strong>Light Use:</strong> Boiling milk, tea/coffee &amp; baby food is free.</li>
                <li className="pt-1.5"><strong>Full Cooking:</strong> 24h notice + ₹300 gas utility &amp; cleaning fee.</li>
                <li className="pt-1.5"><strong>Location:</strong> Food consumption strictly in dining hall.</li>
                <li className="pt-1.5"><strong>Waste:</strong> Separate bins for wet food and plastic waste.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#ebe8e2] flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#725b38]">
                <span className="material-symbols-outlined text-2xl">explore</span>
                <span className="text-xs uppercase font-bold tracking-wider">Proximity &amp; Transit</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#002720]">Location &amp; Distance</h3>
              <div className="flex flex-col gap-1.5 text-xs text-[#414846]">
                <p>• Calicut Int. Airport: <strong>27 km</strong></p>
                <p>• Calicut Railway Station: <strong>8 km</strong></p>
                <p>• Sarovaram Bio Park: <strong>2.2 km</strong></p>
                <p>• Calicut Beach: <strong>5.8 km</strong></p>
                <p>• Lakkidi (Wayanad): <strong>49 km</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Fast Direct Priority Inquiry Strip */}
      <section className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 pb-20 w-full" id="booking-strip">
        <div className="bg-[#002720] text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Host Info */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#133e35] text-[#bfecdf] text-xs font-bold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Direct Estate Host Online
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Speak Directly with the Villa Custodian
              </h2>
              <p className="text-sm text-white/80 max-w-xl leading-relaxed">
                Have customized dietary requirements, celebrating an anniversary, or planning a group retreat? Bypass algorithms and connect directly with resident owner {VILLA_CONTACT.ownerName}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl text-[#fedeb2]">phone_in_talk</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#bfecdf] block">24/7 Front Desk</span>
                    <a className="font-semibold text-white hover:text-[#fedeb2] transition-colors" href={`tel:${VILLA_CONTACT.receptionPhoneTel}`}>
                      {VILLA_CONTACT.receptionPhone}
                    </a>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl text-[#fedeb2]">support_agent</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#bfecdf] block">Owner Desk · {VILLA_CONTACT.ownerName}</span>
                    <a className="font-semibold text-white hover:text-[#fedeb2] transition-colors" href={`tel:${VILLA_CONTACT.ownerPhoneTel}`}>
                      {VILLA_CONTACT.ownerPhone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: VIP Date Hold Request Form */}
            <div className="lg:col-span-5 bg-white text-[#1c1c18] p-6 sm:p-8 rounded-2xl shadow-xl">
              <h3 className="font-serif text-xl font-bold text-[#002720] mb-1">
                Send a VIP Booking Request
              </h3>
              <p className="text-xs text-[#717976] mb-4">
                Receive confirmed villa dates and personalized banquet menu options within 30 minutes.
              </p>

              <form onSubmit={handleVipSubmit} className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[#414846]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={vipName}
                    onChange={(e) => setVipName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rao"
                    className="w-full p-2.5 rounded-lg bg-[#f6f3ed] text-sm text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-[#414846]">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={vipPhone}
                      onChange={(e) => setVipPhone(e.target.value)}
                      placeholder="+91 98..."
                      className="w-full p-2.5 rounded-lg bg-[#f6f3ed] text-sm text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-bold uppercase tracking-wider text-[#414846]">Preferred Dates</label>
                    <input
                      type="text"
                      value={vipDates}
                      onChange={(e) => setVipDates(e.target.value)}
                      placeholder="e.g. Oct 14 - 18"
                      className="w-full p-2.5 rounded-lg bg-[#f6f3ed] text-sm text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[#414846]">Special Notes / Group Size</label>
                  <input
                    type="text"
                    value={vipNotes}
                    onChange={(e) => setVipNotes(e.target.value)}
                    placeholder="e.g. 8 adults, family anniversary, private chef"
                    className="w-full p-2.5 rounded-lg bg-[#f6f3ed] text-sm text-[#1c1c18] border border-[#c0c8c4] focus:outline-none focus:ring-1 focus:ring-[#725b38] mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-xl bg-[#002720] hover:bg-[#133e35] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>Submit VIP Date Hold Request</span>
                </button>

                {vipSubmitted && (
                  <div className="p-3 bg-[#bfecdf] text-[#002720] rounded-lg text-center font-bold">
                    ✓ VIP date hold request transmitted! Host Abhilash Mohan will reply in ~15 mins.
                  </div>
                )}
                <span className="text-center text-[10px] text-[#717976]">
                  Guaranteed privacy · Zero spam policy · Direct property rates
                </span>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
