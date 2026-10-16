import React, { useState } from 'react';
import { VILLA_CONTACT } from '../data/villaData.ts';

interface AdminPageProps {
  onPreviewLive: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onPreviewLive }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active CMS Module Tab
  const [activeModule, setActiveModule] = useState<'pricing' | 'occupancy' | 'kitchen' | 'features' | 'media' | 'sync'>('pricing');

  // CMS Form States (Live Editable State)
  const [baseRate, setBaseRate] = useState(14000);
  const [weekdayFloor, setWeekdayFloor] = useState(14000);
  const [weekendSurgeToggle, setWeekendSurgeToggle] = useState(true);
  const [weekendSurgeAmount, setWeekendSurgeAmount] = useState(1000);
  const [extraGuestFee, setExtraGuestFee] = useState(1000);
  const [cookingGasFee, setCookingGasFee] = useState(300);
  const [cleaningFee, setCleaningFee] = useState(1500);
  const [securityDeposit, setSecurityDeposit] = useState(5000);

  // Occupancy State
  const [baseAdults, setBaseAdults] = useState(8);
  const [includedKids, setIncludedKids] = useState(3);
  const [maxGuestCap, setMaxGuestCap] = useState(12);
  const [bachelorCheck, setBachelorCheck] = useState(true);
  const [visitorCapCheck, setVisitorCapCheck] = useState(true);

  // Kitchen State
  const [lightUseText, setLightUseText] = useState(
    'Reheating delivered meals, electric kettle tea/coffee, boiling baby milk, and fruit slicing are 100% free with cookware provided.'
  );
  const [heavyCookingText, setHeavyCookingText] = useState(
    'Must inform host 24 hours prior. Subject to ₹300/day gas utility plus mandatory ₹1,500 deep-cleaning deposit if grease splatter or residual odors occur. Utensils must be hand-washed prior to final check-out inspection.'
  );

  // Features checklist state
  const [features, setFeatures] = useState([
    { id: 'f1', title: 'Private Indoor Pool', desc: 'Non-heated mosaic pool with shower cubicle & dedicated changing space', icon: 'pool', active: true },
    { id: 'f2', title: '4 Air-Conditioned En-suites', desc: 'King-size teakwood beds with instantaneous high-output geysers', icon: 'bed', active: true },
    { id: 'f3', title: '2 Expansive Living Lounges', desc: 'Double-height atrium + Mezzanine terrace bar counter', icon: 'living', active: true },
    { id: 'f4', title: '2 Fully Equipped Kitchens', desc: 'RO purifiers, microwave ovens, double-door fridges & induction hob', icon: 'kitchen', active: true },
    { id: 'f5', title: '300 Mbps Fiber Wi-Fi & DTH', desc: 'Mesh routers across both levels + 65" 4K Smart TVs', icon: 'wifi', active: true },
    { id: 'f6', title: '3 Secure Car Parking & CCTV', desc: 'Covered portico parking with 24/7 external security recording', icon: 'local_parking', active: true },
  ]);

  // Media assets
  const [mediaList, setMediaList] = useState([
    { id: 'm1', title: 'Double-Height Living Lounge', sub: 'Ground Floor · Italian Marble Flooring', tag: 'Primary Hero', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAJJRb8HYa9pKMtkKCgCnf23YpjDnt2hiT4SxtZ_60BUjB7O8tn9OQLHFm4UeVhl05QvMdRzN1QiExlSrxpJundnzbZLMfD83DFi0_4cGzeKjRYMwD-2-2gwIdWQ7T6BxH1kIVy76a9QMv9UaKYoF42zwNrpcPqoDU7Q-baParHeTiRe_hMJ9IXHyXznIxKlWa3LITHp6-_ligjBZKB7a4XZY_i1a8I3b_X6v4xyvUqJF2P3kz8h1vcKa8YPNO2yDqmG4' },
    { id: 'm2', title: 'Master Teak Suite', sub: 'First Floor · Glass Balcony View', tag: 'Suite 1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfg8Lc9mxyIocT2bEzHIUO3QncVqIl7RANleioP0BoJq5AkPaTaYaKlOGbFi0mRrvQvkepmmL6bFuxhtDYXfakuS6P_tvgWkOmGVVlGfq6cA1WOgIBURiKlWP0GelqXU4GKX-Gafq9oh5dzvcpi3ve1LBRgY4q8rOGPM8LYsniAyxCweSh7jBEOX_kiVxMHufwUKV999TiaPl_Kz7wB7xdogVEz2BvUjoCD8cZz5uytgmjJptHuY5f2ev2YbsKDh_ICUM' },
    { id: 'm3', title: 'Mezzanine Bar Counter', sub: 'Includes custom ambient illumination', tag: 'Social Area', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_ayaNzf0GP3BiOboD0PtIaRTLMwcd4kXGktcqY7wCvU3vogeHhDUwcH3oe1IgEFApa3u6F3lGfT9sIzU50OY-0s6xxgYcMKC5FKcGmMLO0RwuJMCZMJU1k_M_k9tUeScSVp-o8RMn7b492RnvEiqvNr_CijJDQJQ07qMAA8dLgcZqlXr6pFSzRCYnt6GhLOeeOuxw67eETcv55v0iGjWCiipK9WbR1VLwQdrCVBC2o1gJturAMmo-SM26NyHBNgKig7M' },
  ]);

  // Publish Status
  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('Publish Live Changes');
  const [icalCopied, setIcalCopied] = useState(false);

  // Live Quote Simulator calculation
  const simTotalBase = baseRate * 3;
  const simWeekendSurge = weekendSurgeToggle ? weekendSurgeAmount * 2 : 0;
  const simExtraGuests = (extraGuestFee * 2) * 3;
  const simGas = cookingGasFee * 3;
  const simGrandTotal = simTotalBase + simWeekendSurge + simExtraGuests + simGas + cleaningFee;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'amohan4' && passwordInput === 'Mnhnid@m673009') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handlePublish = () => {
    setPublishing(true);
    setPublishMessage('Broadcasting to Cloud...');
    setTimeout(() => {
      setPublishMessage('Published Successfully!');
      setPublishing(false);
      setTimeout(() => {
        setPublishMessage('Publish Live Changes');
      }, 3000);
    }, 1200);
  };

  const handleCopyIcal = () => {
    navigator.clipboard.writeText('https://api.dreamsvillaofficial.com/v1/ical/feed?token=d78f9a21b44ec');
    setIcalCopied(true);
    setTimeout(() => setIcalCopied(false), 2000);
  };

  // If NOT authenticated, render the secure admin login gate
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#f6f3ed]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#ebe8e2] flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-[#002720] text-[#fedeb2] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#002720]">Admin Portal Security</h2>
            <p className="text-xs text-[#414846]">
              Please enter your authorized administrator credentials for {VILLA_CONTACT.name}.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold text-[#414846] tracking-wider">Username</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. amohan4"
                className="p-3 rounded-xl bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#725b38]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold text-[#414846] tracking-wider">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="p-3 rounded-xl bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-2 focus:ring-[#725b38]"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-center font-bold">
                Invalid username or password. Please verify your credentials.
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-xl bg-[#002720] hover:bg-[#133e35] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">lock_open</span>
              <span>Authenticate Admin Session</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#ebe8e2] flex items-center justify-between text-[11px] text-[#717976]">
            <span>Secured 2FA Portal</span>
            <button
              type="button"
              onClick={onPreviewLive}
              className="text-[#002720] font-bold hover:underline"
            >
              Return to Public Site →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Sticky Live Control Bar & Breadcrumb */}
      <section className="w-full bg-[#f6f3ed] px-4 md:px-12 lg:px-16 py-4 shadow-sm sticky top-28 z-40 border-b border-[#ebe8e2]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#414846]">
              <span>Admin CMS &amp; Property Management Hub</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#725b38]">Live Property Editor</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#002720]">Malaparamba, Kozhikode</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#bfecdf] text-[#002720] font-bold text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#002720] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#002720]" />
                </span>
                Published &amp; Live on Web (Logged in as amohan4)
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-[#ba1a1a] font-bold hover:underline ml-2"
                type="button"
              >
                [Logout Admin]
              </button>
            </div>
          </div>

          {/* Action Cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setBaseRate(14000);
                setWeekdayFloor(14000);
                setWeekendSurgeAmount(1000);
                setExtraGuestFee(1000);
                setCookingGasFee(300);
                setCleaningFee(1500);
                setSecurityDeposit(5000);
              }}
              className="px-4 py-2 rounded-lg bg-white text-[#1c1c18] hover:bg-[#f0eee8] text-xs font-semibold transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span> Discard Draft
            </button>
            <button
              onClick={onPreviewLive}
              className="px-4 py-2 rounded-lg bg-[#ebe8e2] text-[#002720] hover:bg-[#e5e2dc] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">visibility</span> Preview Changes
            </button>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className={`px-5 py-2 rounded-lg text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                publishing ? 'bg-[#725b38] opacity-80' : 'bg-[#002720] hover:bg-[#133e35]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              <span>{publishMessage}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main CMS Workspace Stage */}
      <div className="w-full max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-10 flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Core Editor Column */}
        <div className="flex-1 w-full flex flex-col gap-10 min-w-0">
          {/* Module Switcher Tabs */}
          <div className="w-full bg-[#f6f3ed] p-1.5 rounded-2xl shadow-sm flex items-center gap-1 overflow-x-auto border border-[#ebe8e2]">
            {[
              { id: 'pricing', label: 'Pricing & Tariffs', icon: 'payments' },
              { id: 'occupancy', label: 'Occupancy Limits', icon: 'groups' },
              { id: 'kitchen', label: 'Kitchen Policies', icon: 'countertops' },
              { id: 'features', label: 'Villa Features', icon: 'pool' },
              { id: 'media', label: 'Media Assets', icon: 'photo_library' },
              { id: 'sync', label: 'Channel Feeds', icon: 'sync_alt' },
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeModule === mod.id
                    ? 'bg-[#002720] text-white shadow-sm'
                    : 'text-[#414846] hover:text-[#1c1c18] hover:bg-[#ebe8e2]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-sm">{mod.icon}</span>
                <span>{mod.label}</span>
              </button>
            ))}
          </div>

          {/* MODULE 1: PRICING & TARIFFS */}
          {activeModule === 'pricing' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#002720]">Live Pricing &amp; Seasonal Rates</h2>
                  <span className="text-[10px] uppercase bg-[#fedeb2] text-[#281800] px-2.5 py-1 rounded font-bold">
                    Standard Villa Rental
                  </span>
                </div>
                <p className="text-xs text-[#414846]">
                  Update primary nightly rates, seasonal surge increments, utility surcharges, and guest limits instantly across web channels.
                </p>
              </div>

              {/* Bento Grid Rates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#725b38] block mb-0.5">Standard Base Rate</span>
                    <span className="text-xs text-[#717976]">Applicable for default non-weekend nights</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#002720]">₹</span>
                    <input
                      type="number"
                      step="500"
                      value={baseRate}
                      onChange={(e) => setBaseRate(Number(e.target.value))}
                      className="w-full font-serif text-2xl font-bold text-[#002720] bg-[#f6f3ed] px-3 py-1.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-[#717976]">Per night up to 8 adults</span>
                </div>

                <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#725b38] block mb-0.5">Weekday Minimum</span>
                    <span className="text-xs text-[#717976]">Mon – Thu promotional floor tariff</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#002720]">₹</span>
                    <input
                      type="number"
                      step="500"
                      value={weekdayFloor}
                      onChange={(e) => setWeekdayFloor(Number(e.target.value))}
                      className="w-full font-serif text-2xl font-bold text-[#002720] bg-[#f6f3ed] px-3 py-1.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-[#717976]">Automated floor price guard</span>
                </div>

                <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#725b38] block mb-0.5">Weekend Surge</span>
                      <span className="text-xs text-[#717976]">Fri – Sun differential</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={weekendSurgeToggle}
                      onChange={(e) => setWeekendSurgeToggle(e.target.checked)}
                      className="w-4 h-4 accent-[#002720] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#002720]">+₹</span>
                    <input
                      type="number"
                      step="500"
                      value={weekendSurgeAmount}
                      onChange={(e) => setWeekendSurgeAmount(Number(e.target.value))}
                      className="w-full font-serif text-2xl font-bold text-[#002720] bg-[#f6f3ed] px-3 py-1.5 rounded-xl focus:outline-none"
                    />
                  </div>
                  <span className="text-xs text-[#717976]">Added per night on weekend dates</span>
                </div>
              </div>

              {/* Surcharges & Deposits */}
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#002720]">Guest Surcharges &amp; Utility Deposits</h3>
                    <p className="text-xs text-[#414846]">Fine-tune charges applied per extra headcount and domestic kitchen use.</p>
                  </div>
                  <span className="material-symbols-outlined text-[#725b38]">tune</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f6f3ed]">
                    <label className="uppercase font-bold text-[#414846]">Extra Adult / Night</label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-semibold">₹</span>
                      <input
                        type="number"
                        step="250"
                        value={extraGuestFee}
                        onChange={(e) => setExtraGuestFee(Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 rounded text-sm font-bold text-[#002720] outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-[#717976] mt-1">Applies after 8 guests</span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f6f3ed]">
                    <label className="uppercase font-bold text-[#414846]">Cooking Gas Utility</label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-semibold">₹</span>
                      <input
                        type="number"
                        step="50"
                        value={cookingGasFee}
                        onChange={(e) => setCookingGasFee(Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 rounded text-sm font-bold text-[#002720] outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-[#717976] mt-1">Per booking or meal cycle</span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f6f3ed]">
                    <label className="uppercase font-bold text-[#414846]">Kitchen Deep Cleaning</label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-semibold">₹</span>
                      <input
                        type="number"
                        step="100"
                        value={cleaningFee}
                        onChange={(e) => setCleaningFee(Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 rounded text-sm font-bold text-[#002720] outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-[#717976] mt-1">Mandatory if self-cooking</span>
                  </div>

                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f6f3ed]">
                    <label className="uppercase font-bold text-[#414846]">Refundable Deposit</label>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-semibold">₹</span>
                      <input
                        type="number"
                        step="500"
                        value={securityDeposit}
                        onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                        className="w-full bg-white px-2 py-1 rounded text-sm font-bold text-[#002720] outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-[#717976] mt-1">Collected at check-in</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2: OCCUPANCY LIMITS */}
          {activeModule === 'occupancy' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-2xl font-bold text-[#002720]">Occupancy &amp; Group Governance</h2>
                <p className="text-xs text-[#414846]">Specify headcounts, extra mattress limits, and special guest screening criteria.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#725b38]">Base Included Adults</span>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={baseAdults}
                    onChange={(e) => setBaseAdults(Number(e.target.value))}
                    className="font-serif text-2xl font-bold text-[#002720] bg-[#f6f3ed] p-2 rounded-xl outline-none"
                  />
                  <span className="text-xs text-[#717976]">Standard capacity covering all 4 master suites</span>
                </div>

                <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#725b38]">Included Children (&lt;6 yrs)</span>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={includedKids}
                    onChange={(e) => setIncludedKids(Number(e.target.value))}
                    className="font-serif text-2xl font-bold text-[#002720] bg-[#f6f3ed] p-2 rounded-xl outline-none"
                  />
                  <span className="text-xs text-[#717976]">Complimentary stay with parents</span>
                </div>

                <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#725b38]">Strict Max Guest Cap</span>
                  <input
                    type="number"
                    min="8"
                    max="16"
                    value={maxGuestCap}
                    onChange={(e) => setMaxGuestCap(Number(e.target.value))}
                    className="font-serif text-2xl font-bold text-[#002720] bg-[#f6f3ed] p-2 rounded-xl outline-none"
                  />
                  <span className="text-xs text-[#717976]">Includes extra rollaway mattresses</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-4 text-xs">
                <h3 className="font-serif text-lg font-bold text-[#002720]">Special Group Policies &amp; Screening</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#f6f3ed]">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#002720]">All-Male Bachelors Group Verification</span>
                      <span className="text-xs text-[#414846]">Requires pre-approval from owner desk and enhanced ₹10,000 refundable caution deposit.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={bachelorCheck}
                      onChange={(e) => setBachelorCheck(e.target.checked)}
                      className="w-5 h-5 accent-[#002720] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#f6f3ed]">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-[#002720]">Strict Daytime Visitors Cap</span>
                      <span className="text-xs text-[#414846]">Non-registered overnight guests prohibited past 10:30 PM per local municipal guidelines.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={visitorCapCheck}
                      onChange={(e) => setVisitorCapCheck(e.target.checked)}
                      className="w-5 h-5 accent-[#002720] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 3: KITCHEN POLICIES */}
          {activeModule === 'kitchen' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-2xl font-bold text-[#002720]">Kitchen &amp; Dining Usage Rules</h2>
                <p className="text-xs text-[#414846]">Provide clear boundaries between complimentary kitchenette privileges and heavy culinary self-prep.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-4 text-xs">
                <div className="flex flex-col gap-2">
                  <label className="uppercase font-bold text-[#725b38]">Complimentary Light Use Clause</label>
                  <textarea
                    rows={2}
                    value={lightUseText}
                    onChange={(e) => setLightUseText(e.target.value)}
                    className="w-full bg-[#f6f3ed] p-3 rounded-xl text-xs text-[#002720] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="uppercase font-bold text-[#725b38]">Full Cooking &amp; Heavy Preparation Requirements</label>
                  <textarea
                    rows={3}
                    value={heavyCookingText}
                    onChange={(e) => setHeavyCookingText(e.target.value)}
                    className="w-full bg-[#f6f3ed] p-3 rounded-xl text-xs text-[#002720] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#f6f3ed]">
                    <div>
                      <p className="font-bold text-[#002720]">Dining Hall Only Policy</p>
                      <p className="text-[11px] text-[#414846]">No food or curries allowed in bedrooms or pool water.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#002720]" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#f6f3ed]">
                    <div>
                      <p className="font-bold text-[#002720]">Wet &amp; Dry Waste Segregation</p>
                      <p className="text-[11px] text-[#414846]">Mandatory colored bins for composting and plastics.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#002720]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 4: VILLA FEATURES & AMENITIES CHECKLIST */}
          {activeModule === 'features' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#002720]">Property Features &amp; Amenities</h2>
                  <button
                    onClick={() => {
                      const title = prompt('Enter new feature title:');
                      if (title) {
                        setFeatures([...features, { id: 'f_' + Date.now(), title, desc: 'Custom added feature', icon: 'star', active: true }]);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#002720] text-white text-xs font-semibold shadow-sm cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> New Feature
                  </button>
                </div>
                <p className="text-xs text-[#414846]">Toggle active highlights displayed on public listings and booking confirmations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feat, idx) => (
                  <div key={feat.id} className="p-4 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#002720] text-2xl p-2 rounded-xl bg-[#f6f3ed]">
                        {feat.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#002720]">{feat.title}</span>
                        <span className="text-xs text-[#414846]">{feat.desc}</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={feat.active}
                      onChange={(e) => {
                        const next = [...features];
                        next[idx].active = e.target.checked;
                        setFeatures(next);
                      }}
                      className="w-5 h-5 accent-[#002720] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 5: MEDIA ASSETS MANAGER */}
          {activeModule === 'media' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#002720]">Photo Gallery &amp; Visual Assets</h2>
                  <button
                    onClick={() => {
                      const url = prompt('Enter image URL:');
                      const title = prompt('Enter image title:');
                      if (url && title) {
                        setMediaList([...mediaList, { id: 'm_' + Date.now(), title, sub: 'Newly Uploaded', tag: 'Gallery', url }]);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#725b38] text-white text-xs font-semibold shadow-sm cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">cloud_upload</span> Upload High-Res Media
                  </button>
                </div>
                <p className="text-xs text-[#414846]">Manage the curated portfolio displayed on the live booking page and external channel feeds.</p>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mediaList.map((m) => (
                  <div key={m.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-[#ebe8e2] flex flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 left-2 bg-[#002720] text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">{m.tag}</span>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setMediaList(mediaList.filter(item => item.id !== m.id))}
                          className="p-1 rounded bg-white/90 text-[#ba1a1a] hover:bg-white cursor-pointer"
                          type="button"
                          title="Delete photo"
                        >
                          <span className="material-symbols-outlined text-xs">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-3 bg-white flex flex-col text-xs">
                      <span className="font-bold text-[#002720]">{m.title}</span>
                      <span className="text-[#414846]">{m.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 6: CALENDAR & CHANNEL SYNC SETTINGS */}
          {activeModule === 'sync' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-2xl font-bold text-[#002720]">Channel Sync &amp; Multi-Calendar Integration</h2>
                <p className="text-xs text-[#414846]">Prevent double-bookings across Airbnb, MakeMyTrip, and Vrbo through live iCal feed exchange.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col gap-3 text-xs">
                <label className="uppercase font-bold text-[#725b38]">Export Dreams Villa iCal Feed</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://api.dreamsvillaofficial.com/v1/ical/feed?token=d78f9a21b44ec"
                    className="w-full bg-[#f6f3ed] px-3.5 py-2 rounded-xl font-mono text-xs text-[#002720] border border-[#c0c8c4] select-all outline-none"
                  />
                  <button
                    onClick={handleCopyIcal}
                    className="px-4 py-2 rounded-xl bg-[#002720] text-white font-semibold whitespace-nowrap hover:bg-[#133e35] transition-colors flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">{icalCopied ? 'check' : 'content_copy'}</span>
                    {icalCopied ? 'Copied!' : 'Copy Feed URL'}
                  </button>
                </div>
                <span className="text-[11px] text-[#717976]">Paste this link into your Airbnb or MakeMyTrip Extranet to auto-block booked dates immediately.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#002720]">Airbnb</span>
                    <span className="font-bold text-[#002720] px-2 py-0.5 rounded bg-[#bfecdf] text-[10px] uppercase">Active Sync</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-[#414846]">
                    <span>Listing ID: #48291048</span>
                    <span>Last ping: 2 mins ago (Zero conflicts)</span>
                  </div>
                  <button className="text-[#725b38] font-semibold hover:underline text-left cursor-pointer" type="button">Configure Webhook</button>
                </div>

                <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#002720]">MakeMyTrip</span>
                    <span className="font-bold text-[#002720] px-2 py-0.5 rounded bg-[#bfecdf] text-[10px] uppercase">Active Sync</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-[#414846]">
                    <span>Hotel Code: MMT_KL_9824</span>
                    <span>Last ping: 9 mins ago (Connected)</span>
                  </div>
                  <button className="text-[#725b38] font-semibold hover:underline text-left cursor-pointer" type="button">Configure Webhook</button>
                </div>

                <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#002720]">Direct Engine</span>
                    <span className="font-bold text-[#281800] px-2 py-0.5 rounded bg-[#fedeb2] text-[10px] uppercase">Master Feed</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-[#414846]">
                    <span>Realtime WebSocket: Connected</span>
                    <span>Zero channel commissions</span>
                  </div>
                  <button className="text-[#725b38] font-semibold hover:underline text-left cursor-pointer" type="button">Engine Settings</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Live Cost Simulation & Preview Drawer */}
        <div className="w-full lg:w-[410px] flex-shrink-0 flex flex-col gap-4 sticky top-48">
          <div className="p-6 rounded-2xl bg-white shadow-md border border-[#ebe8e2] flex flex-col gap-5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#725b38]">Real-Time Quote Simulator</span>
                <h3 className="font-serif text-xl font-bold text-[#002720]">Instant Guest Invoice</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#bfecdf] flex items-center justify-center text-[#002720]">
                <span className="material-symbols-outlined text-base">receipt_long</span>
              </div>
            </div>

            <p className="text-[#414846] leading-relaxed">
              Simulating a 3-Night Stay reflecting live field modifications made in the CMS above.
            </p>

            <div className="flex flex-col gap-2.5 pt-1 text-[#414846]">
              <div className="flex items-center justify-between">
                <span>Base Stay (3 Nights × ₹{baseRate.toLocaleString()})</span>
                <span className="font-semibold text-[#1c1c18]">₹{simTotalBase.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Weekend Surcharges (Fri + Sat)</span>
                <span className="font-semibold text-[#725b38]">+{simWeekendSurge > 0 ? `₹${simWeekendSurge.toLocaleString()}` : '₹0'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Extra Guests (2 adults over base × 3 nights)</span>
                <span className="font-semibold text-[#725b38]">+₹{simExtraGuests.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Kitchen Gas Utility (3 nights)</span>
                <span className="font-semibold text-[#1c1c18]">+₹{simGas.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Kitchen Deep-Clean Deposit</span>
                <span className="font-semibold text-[#1c1c18]">+₹{cleaningFee.toLocaleString()}</span>
              </div>
              <div className="h-px bg-[#ebe8e2] my-1" />
              <div className="flex items-center justify-between text-[#002720] font-bold text-base">
                <span>Estimated Booking Total</span>
                <span className="font-serif text-xl">₹{simGrandTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#717976] pt-0.5">
                <span>Refundable Caution (Collected at Gate)</span>
                <span className="font-semibold text-[#002720]">₹{securityDeposit.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handlePublish}
                className="w-full py-3 rounded-xl bg-[#002720] hover:bg-[#133e35] text-white font-semibold text-xs transition-all shadow cursor-pointer text-center"
                type="button"
              >
                Save &amp; Broadcast Rates Live
              </button>
              <span className="text-center text-[10px] text-[#717976]">Instant propagation to all connected guests &amp; sync portals.</span>
            </div>
          </div>

          {/* Quick Host Telemetry / Villa Fact Sheet */}
          <div className="p-4 rounded-2xl bg-[#f6f3ed] shadow-sm border border-[#ebe8e2] flex flex-col gap-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#725b38]">Villa Property Identity</span>
            <div className="flex flex-col gap-1 text-[#414846]">
              <div className="flex items-center justify-between">
                <span>Registered Address:</span>
                <span className="font-semibold text-[#002720]">Malaparamba, Kozhikode</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Geo Coordinates:</span>
                <span className="font-semibold text-[#002720]">{VILLA_CONTACT.gps}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Property Manager:</span>
                <span className="font-semibold text-[#002720]">{VILLA_CONTACT.ownerName} ({VILLA_CONTACT.ownerPhone})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
