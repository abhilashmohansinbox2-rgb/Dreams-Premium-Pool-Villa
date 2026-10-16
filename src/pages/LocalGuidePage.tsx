import React, { useState } from 'react';
import { LOCAL_ATTRACTIONS, VILLA_CONTACT } from '../data/villaData.ts';
import { LocalAttraction } from '../types/index.ts';

interface LocalGuidePageProps {
  onReserveClick: () => void;
}

export const LocalGuidePage: React.FC<LocalGuidePageProps> = ({ onReserveClick }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'dining' | 'coastal' | 'heritage' | 'nature'>('all');

  const filteredAttractions =
    activeFilter === 'all'
      ? LOCAL_ATTRACTIONS
      : LOCAL_ATTRACTIONS.filter((item) => item.categories.includes(activeFilter));

  const diningAttractions = filteredAttractions.filter((item) =>
    item.categories.includes('dining')
  );
  const placesAttractions = filteredAttractions.filter(
    (item) => !item.categories.includes('dining') || activeFilter !== 'all'
  );

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Narrative */}
      <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 flex flex-col gap-8">
          {/* Micro Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#ebe8e2]">
            <div className="flex items-center gap-2 text-[#725b38] text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Malaparamba Estate Private Field Guide · UNESCO City of Gastronomy</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#414846]">
              <span className="font-semibold text-[#002720]">Malaparamba Hub</span>
              <span>•</span>
              <span>15–20 Mins to Coastal &amp; Culinary Core</span>
              <span>•</span>
              <span className="font-bold text-[#725b38]">₹14k Wkday / ₹15k Wkend</span>
            </div>
          </div>

          {/* Headline & Concierge Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#725b38] font-bold">
                Curated by Resident Host {VILLA_CONTACT.ownerName}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#002720] leading-tight font-bold">
                Curated Calicut Guide: <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#725b38]">Legendary Flavors</span> &amp; Coastal Wonders
              </h1>
              <p className="text-sm md:text-base text-[#414846] max-w-3xl leading-relaxed">
                Malaparamba affords you peaceful, private pool seclusion shielded from urban commotion, while placing Calicut’s world-celebrated Dum Biryanis, Moplah tea salons, ancient dhow shipyards, and Arabian Sea promenades within an effortless 10 to 35-minute ride.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#f6f3ed] p-5 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#002720] font-bold text-sm">
                <span className="material-symbols-outlined text-[#725b38]">concierge</span>
                <span>Villa Mobility &amp; Transit Concierge</span>
              </div>
              <p className="text-xs text-[#414846] leading-relaxed">
                Pre-vetted private chauffeurs, Tuk-Tuk drivers, and door-to-door food deliveries (Swiggy &amp; Zomato pin: Euro Kids / Balan Nair Rd).
              </p>
              <a
                href={`tel:${VILLA_CONTACT.receptionPhoneTel}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002720] hover:text-[#725b38] transition-colors pt-1"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                24/7 Desk: {VILLA_CONTACT.receptionPhone}
              </a>
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'all', label: `All Curated Picks (${LOCAL_ATTRACTIONS.length})` },
              { id: 'dining', label: 'Iconic Dining & Cafes (6)' },
              { id: 'coastal', label: 'Beaches & Coastal Charms (4)' },
              { id: 'heritage', label: 'Heritage & Culture (4)' },
              { id: 'nature', label: 'Nature & Leisure (3)' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === pill.id
                    ? 'bg-[#002720] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#1c1c18] hover:bg-[#e5e2dc]'
                }`}
                type="button"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Mobility & Distance Matrix Strip */}
      <section className="w-full bg-[#f6f3ed] py-8 border-y border-[#ebe8e2]">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#ebe8e2]">
              <div className="w-10 h-10 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#725b38]">
                <span className="material-symbols-outlined text-lg">local_taxi</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#717976]">Average Auto Fare</span>
                <p className="font-bold text-[#002720] text-base">₹80 – ₹180</p>
                <span className="text-[11px] text-[#414846]">To City Center &amp; Mavoor Rd</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#ebe8e2]">
              <div className="w-10 h-10 rounded-full bg-[#bfecdf] flex items-center justify-center text-[#002720]">
                <span className="material-symbols-outlined text-lg">directions_car</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#717976]">Air-Conditioned Cab</span>
                <p className="font-bold text-[#002720] text-base">₹250 – ₹450</p>
                <span className="text-[11px] text-[#414846]">Uber / On-call Chauffeur</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#ebe8e2]">
              <div className="w-10 h-10 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#725b38]">
                <span className="material-symbols-outlined text-lg">schedule</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#717976]">Proximity Advantage</span>
                <p className="font-bold text-[#002720] text-base">6 to 18 Mins</p>
                <span className="text-[11px] text-[#414846]">Sarovaram, Beach, SM Street</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#002720] p-4 rounded-xl text-white shadow-sm">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#bfecdf] font-bold block">
                  Host Chauffeur Desk
                </span>
                <p className="text-xs font-semibold">Doorstep Pick-Up</p>
                <span className="text-[11px] text-[#bfecdf]/80">Book via Abhilash Mohan</span>
              </div>
              <a
                href={`https://wa.me/917559894574?text=Hi%20Abhilash,%20could%20you%20help%20arrange%20a%20cab%20from%20Dreams%20Villa?`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#133e35] hover:bg-[#bfecdf] hover:text-[#002720] transition-all text-white"
                aria-label="Book cab on WhatsApp"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Spatial Geography & Map Anchor */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map Visual */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#725b38]">map</span>
                  <span className="text-xs uppercase font-bold text-[#725b38]">Villa Geography</span>
                  <h2 className="font-serif text-xl font-bold text-[#002720]">
                    Malaparamba To Calicut Hubs
                  </h2>
                </div>
                <a
                  href={VILLA_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#725b38] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <span className="material-symbols-outlined text-xs">launch</span>
                </a>
              </div>

              {/* Static Scenic Map Graphic */}
              <div
                className="w-full h-80 lg:h-96 bg-cover bg-center rounded-2xl shadow-md relative overflow-hidden flex items-end p-5"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCt2yBZOpDK7xPq4I_1qTJ-ePLqHYANZDU2aABI-N0rjmPawcnHroSBqUJcw0wePPA8cYfs8lWNAJq5-TG4_gncUhGgS00ywe11qlP-hqN5OQzrkEsN4_2-JhId9rbK2WLuNw7eMy1PkM017_Gx4jj_9slukPEzPKiyiqq-U9R6sfMApfaCVttzOCYwj0ocp6ORb7KyA2g-F4EVbdk9192azJT5ofwHQcN8b03MXMT4m2FcFYVrmiUVNg")',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#002720]/80 via-[#002720]/30 to-transparent" />
                <div className="relative z-10 flex flex-wrap items-center justify-between w-full text-white gap-3 bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-[#fedeb2]">home_pin</span>
                    <div>
                      <p className="font-bold text-sm leading-tight">{VILLA_CONTACT.name}</p>
                      <p className="text-xs text-white/90">Balan Nair Rd, Malaparamba · GPS: {VILLA_CONTACT.gps}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#fedeb2] text-[#281800] text-[10px] font-bold uppercase">
                    Zero City Noise
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Distance Radar */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-[#f6f3ed] p-6 rounded-2xl border border-[#ebe8e2] shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#ebe8e2] pb-2">
                  <span className="text-xs uppercase font-bold text-[#725b38] tracking-wider">
                    Transit Radar
                  </span>
                  <span className="text-xs text-[#717976]">From Balan Nair Rd</span>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#002720]">Sarovaram Bio Park</span>
                    <span className="font-bold text-[#725b38]">2.2 km · 6 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#002720]">Paragon &amp; Mavoor Rd</span>
                    <span className="font-bold text-[#725b38]">4.2 km · 12 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#002720]">SM Street (Halwa Bazaar)</span>
                    <span className="font-bold text-[#725b38]">4.6 km · 14 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#002720]">Calicut Beach &amp; Pier</span>
                    <span className="font-bold text-[#725b38]">5.8 km · 18 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#002720]">Beypore Uru Shipyard</span>
                    <span className="font-bold text-[#725b38]">14.5 km · 35 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#002720]">Kappad Blue Flag Beach</span>
                    <span className="font-bold text-[#725b38]">16.8 km · 35 min</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#ebe8e2]">
                <p className="text-xs text-[#414846]">
                  Tuk-Tuk stand 120m away or reception dispatches private cabs on demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Culinary Institutions & Dining */}
      {(activeFilter === 'all' || activeFilter === 'dining') && (
        <section className="w-full bg-[#f6f3ed] py-16 px-4 md:px-12 lg:px-16">
          <div className="max-w-[1360px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1 max-w-2xl">
                <span className="text-xs uppercase font-bold text-[#725b38] tracking-wider">
                  Gastronomic Capital of Kerala
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#002720]">
                  Calicut’s Culinary Institutions
                </h2>
                <p className="text-sm text-[#414846]">
                  From centenary Dum Biryani recipes to seaside spiced mussels, here is where our hosts personally dine.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#725b38] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">delivery_dining</span>
                Swiggy &amp; Zomato deliver to villa
              </span>
            </div>

            {/* Culinary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {diningAttractions.map((attr) => (
                <article
                  key={attr.id}
                  className="flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#ebe8e2] group"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={attr.image}
                        alt={attr.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${attr.tagBg}`}>
                        {attr.tag}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 rounded text-[#002720] text-xs font-bold shadow-sm">
                        {attr.distance} · {attr.duration}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#725b38] font-semibold uppercase">{attr.location}</span>
                        <span className="text-[#717976]">{attr.timings}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#002720]">{attr.name}</h3>
                      <p className="text-xs text-[#414846] leading-relaxed">{attr.description}</p>
                      <div className="bg-[#f6f3ed] p-3 rounded-xl mt-1">
                        <span className="text-[10px] uppercase font-bold text-[#725b38] block mb-0.5">
                          {attr.signaturesTitle}:
                        </span>
                        <p className="text-xs text-[#002720] font-medium">{attr.signatures}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-[#ebe8e2] mt-2">
                    <span className="text-[#717976]">Auto fare ~{attr.autoFare}</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(attr.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#002720] hover:text-[#725b38] transition-colors"
                    >
                      <span>Directions</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Prominent Tourist Attractions & Heritage Wonders */}
      {(activeFilter === 'all' || activeFilter !== 'dining') && (
        <section className="w-full bg-white py-16 px-4 md:px-12 lg:px-16">
          <div className="max-w-[1360px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1 max-w-2xl">
                <span className="text-xs uppercase font-bold text-[#725b38] tracking-wider">
                  Zamorin Legacies &amp; Marine Wonder
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#002720]">
                  Prominent Attractions &amp; Heritage
                </h2>
                <p className="text-sm text-[#414846]">
                  From 1,500-year-old Arabian dhow shipbuilding in Beypore to untouched mangrove reserves and spice bazaars.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#002720] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#725b38]">verified</span>
                Verified Driving Distances from Malaparamba
              </span>
            </div>

            {/* Attractions Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {placesAttractions.map((attr) => (
                <article
                  key={attr.id}
                  className="flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#ebe8e2] group"
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={attr.image}
                        alt={attr.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${attr.tagBg}`}>
                        {attr.tag}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 rounded text-[#002720] text-xs font-bold shadow-sm">
                        {attr.distance} · {attr.duration}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#725b38] font-semibold uppercase">{attr.location}</span>
                        <span className="text-[#717976]">{attr.timings}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#002720]">{attr.name}</h3>
                      <p className="text-xs text-[#414846] leading-relaxed">{attr.description}</p>
                      <div className="bg-[#f6f3ed] p-3 rounded-xl mt-1">
                        <span className="text-[10px] uppercase font-bold text-[#725b38] block mb-0.5">
                          {attr.signaturesTitle}:
                        </span>
                        <p className="text-xs text-[#002720] font-medium">{attr.signatures}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-[#ebe8e2] mt-2">
                    <span className="text-[#717976]">Transit ~{attr.autoFare}</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(attr.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#002720] hover:text-[#725b38] transition-colors"
                    >
                      <span>Directions</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Curated Day Itineraries Tailored for Villa Guests */}
      <section className="w-full bg-[#f6f3ed] py-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs uppercase font-bold text-[#725b38] tracking-widest">
              Thoughtfully Designed Day Plans
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002720]">
              Seamless Calicut Day Itineraries
            </h2>
            <p className="text-sm text-[#414846]">
              Designed specifically to start from and conclude at Dreams Villa, ensuring you experience the best culinary timings, tide windows, and sunset angles without transit fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Itinerary A */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#ebe8e2] pb-3">
                  <span className="px-3 py-1 rounded bg-[#fedeb2] text-[#281800] text-[10px] font-bold uppercase">
                    1-Day Itinerary A
                  </span>
                  <span className="text-xs font-semibold text-[#725b38]">Culinary &amp; City Soul</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#002720]">The Essence of Malabar</h3>
                <p className="text-xs text-[#414846]">
                  The definitive cultural initiation: tranquil morning wetlands, Michelin-caliber biryani, royal sweet bazaars, beachside twilight, and legendary beef dishes.
                </p>

                <div className="flex flex-col gap-3 pt-2 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002720] text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <strong className="text-[#002720]">08:00 AM · Sarovaram Boardwalk:</strong> 6-minute zip from villa. Fresh air along wetland boardwalks.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002720] text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <strong className="text-[#002720]">12:30 PM · Paragon Dum Biryani:</strong> Arrive slightly early on Mavoor Rd for Kaima rice biryani &amp; fish mango curry.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002720] text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <strong className="text-[#002720]">03:30 PM · SM Street Halwa Stroll:</strong> Taste warm ghee halwa; pick up vacuum-sealed banana chips.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002720] text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    <div>
                      <strong className="text-[#002720]">05:30 PM · Calicut Beach Promenade:</strong> Sulaimani tea, salted mangoes &amp; sunset by the ruined iron pier.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#002720] text-white flex items-center justify-center text-xs font-bold shrink-0">5</span>
                    <div>
                      <strong className="text-[#002720]">08:30 PM · Rahmath Dinner &amp; Villa Pool:</strong> Savor Rahmath’s beef fry with porotta, then return for a secluded night swim.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/917559894574?text=Hi%20Abhilash,%20could%20you%20help%20me%20plan%20Itinerary%20A%20(Essence%20of%20Malabar)?`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#002720] hover:bg-[#133e35] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Request Host Assistance for Itinerary A
              </a>
            </div>

            {/* Itinerary B */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[#ebe8e2] pb-3">
                  <span className="px-3 py-1 rounded bg-[#fedeb2] text-[#281800] text-[10px] font-bold uppercase">
                    1-Day Itinerary B
                  </span>
                  <span className="text-xs font-semibold text-[#725b38]">Ocean, Shipyards &amp; History</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#002720]">Coastal Heritage &amp; Maritime</h3>
                <p className="text-xs text-[#414846]">
                  Delve into world-historical spice routes, master boatbuilders, celebrated fresh catch seafood, and blue-flag ocean sunsets.
                </p>

                <div className="flex flex-col gap-3 pt-2 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <strong className="text-[#002720]">09:00 AM · Beypore Uru Yard &amp; Breakwater:</strong> Colossal wooden dhow craftsmanship and 2km stone pathway into the sea.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <strong className="text-[#002720]">01:00 PM · Fresh Catch Seafood at Sagar:</strong> Karimeen Pollichathu, Neymeen tawa fry, and aromatic ghee rice.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <strong className="text-[#002720]">03:30 PM · Moplah High Tea at Zains:</strong> Convent Cross Road for Unnakaya banana pockets and sweet Mutta Mala.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    <div>
                      <strong className="text-[#002720]">05:00 PM · Kappad Blue Flag Beach:</strong> Rocky outcrops, clean breezes, and historic Da Gama landing monument.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center text-xs font-bold shrink-0">5</span>
                    <div>
                      <strong className="text-[#002720]">08:00 PM · Poolside Seafood BBQ at Villa:</strong> Host Abhilash arranges freshly grilled fish on the poolside patio under Malaparamba stars.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/917559894574?text=Hi%20Abhilash,%20could%20you%20help%20me%20plan%20Itinerary%20B%20(Coastal%20Heritage)?`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#725b38] hover:bg-[#584323] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Request Host Assistance for Itinerary B
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Direct Booking CTA Card */}
      <section className="w-full px-4 md:px-12 lg:px-16 pb-20">
        <div className="max-w-[1360px] mx-auto bg-[#002720] text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs uppercase font-bold text-[#fedeb2] tracking-wider">
              Host Guarantees
            </span>
            <h2 className="font-serif text-3xl font-bold">
              Stay in Total Seclusion. Explore Calicut with Zero Friction.
            </h2>
            <p className="text-sm text-[#bfecdf]/80 leading-relaxed">
              Host Abhilash Mohan personally curates daily driver schedules, locks in peak biryani table reservations, and guides you to artisanal halwa batches.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onReserveClick}
              className="px-6 py-3 rounded-xl bg-[#fedeb2] text-[#281800] text-xs font-bold hover:bg-white transition-all shadow-md cursor-pointer"
              type="button"
            >
              Reserve Direct from ₹14,000/nt
            </button>
            <a
              href={VILLA_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#133e35] text-white text-xs font-semibold hover:bg-[#bfecdf] hover:text-[#002720] transition-all"
            >
              Chat with Abhilash
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
