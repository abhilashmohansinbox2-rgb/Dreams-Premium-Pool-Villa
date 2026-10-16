import React, { useState } from 'react';
import { GALLERY_IMAGES, VIDEO_TOURS, VILLA_CONTACT } from '../data/villaData.ts';
import { GalleryImage, VideoTour } from '../types/index.ts';

interface FacilitiesPageProps {
  onOpenLightbox: (images: GalleryImage[], index: number) => void;
  onOpenVideo: (video: VideoTour) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  onOpenLightbox,
  onOpenVideo,
}) => {
  // Amenity category filter
  const [amenityFilter, setAmenityFilter] = useState('all');
  // Photo category filter
  const [photoFilter, setPhotoFilter] = useState('all');

  // Priority Inquiry Form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDates, setInquiryDates] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sendToWa, setSendToWa] = useState(true);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const amenitiesList = [
    {
      category: 'pool-outdoor',
      tag: 'Private Wellness',
      badge: 'INDOOR POOL',
      title: 'Indoor Swimming Pool & Changing Facilities',
      desc: 'Large indoor swimming pool with dedicated changing facilities, hydrotherapy jets, and ambient poolside lounging for private year-round wellness.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNjT9iAEEsmO43Mgy4TKTh40X4jGa2YsT_-jeXevFdTtpjS5Wx7yLbUyEYiEXqjl3ZLymBk12cuR8u1RbQ3QkY6kkCJntxvPZnzILnW6Un631uMyJzUSrgT1zoM9Bgx_xebgl9Z0VjOsghSH_NbPKo7pjz5XAGyuP0p_RWgrxWaylYdQZy8Dl0QGHOf37x8UjhifYJ1tOEvN44wznlNHPC94RSy9Ic9ZErmyEuJ6uD4YM3JNS8Up0hGAv0R1zt3bZ7l84',
      chips: ['Large Indoor Pool', 'Changing Facilities', 'Total Privacy'],
    },
    {
      category: 'bed-bath',
      tag: 'Palatial Living',
      badge: '4 EN-SUITE AC ROOMS',
      title: '4 Air-Conditioned En-Suite Bedrooms',
      desc: '4 air-conditioned bedrooms featuring private en-suite bathrooms, continuous 24/7 hot water, bespoke joinery, and plush premium mattress bedding.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxdu7CJizMVG0kswIVHtuKrTmEmgLGNHtnkQIijMfPCEJ2W3rViRb3eeMUKCbmmjWcuOj0z-eq1TclbpPB0MKsCKJ35LRB4H6h2NzwmNoeNtH_BMW7YjQ75Ox0UwsAc-O2q61D7kS0AC5ZtLWKJAIW3Pd1uu4kpjyKn944TfyZkuz41474oE0bYaoy0Trk_QAExv5guY0PUOyE4ZiqxOa77n75RMUiwDUscewxb9QB-mq4M0L21tOsdROsHWd0pdlWtmk',
      chips: ['Climate Controlled', 'Continuous Hot Water', '4 Private Baths'],
    },
    {
      category: 'dining-chef',
      tag: 'Gourmet Ready',
      badge: 'DUAL KITCHENS & DINING',
      title: 'Two Fully-Equipped Kitchens & Dining Hall',
      desc: 'Two fully-equipped kitchens outfitted with large refrigerator, microwave, water purifier, and gas stovetops, paired with an expansive family dining hall.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD117Ol4amx_TQNKwzrV3oak7G81wPfzi4lntiGelrWW0j8AbxD3xBDkZ0KwwQ2S5CT1Lslu_hmSp1V7ua83S71UQ3bB1ES_UUFdh5Q0XLmbuWCshXkWK_Hxlg-9CSycqmnnEaJhwn7LXSrVHHb5VCHzPQeiK-ykuw_K5ymJ00n0JTj9RrXO_W7nhMGew8mxSF_jJFqAP72CC8-f4ZfWVVE1fd-7bnO3mXg9kf3TKrbShvvljpkwjRhfnMSxgv2XZl44gI',
      chips: ['Large Fridge & Microwave', 'Water Purifier', 'Spacious Dining Hall'],
    },
    {
      category: 'tech-ent',
      tag: 'Entertainment & Leisure',
      badge: 'DUAL SALONS & BAR',
      title: 'Two Expansive Living Rooms & Private Bar',
      desc: 'Two expansive living rooms, private bar with lounge sofa seating & board games (upon special request), and 2 large flat-screen TVs with high-definition DTH connectivity.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg4yWAh_7vbrnIJkhk4aHxELgeqkUSMd6RWxKtxSYrtqpPgCcptzlzWkjA6SCcmWZNnMgM1tCp82c0a8GTA_rDKG8_CnYUWzL3NtT0ATuWQQP0yCyLgJ5S8EwhHnRPcdkQ-qz4ThiQZrMQ5perlrpRA297sFf1j_jL9cJODdZvSvHapqRGUm6zZS-ezXr0igYAuQ2cFOBtqwcdZt0xYSRLTQ-xj33TwMYEgWLf9eJewQg3x8SYXFUe0BbW5NYzHdjkrUc',
      chips: ['2 Large Living Rooms', 'Bar & Games on Request', '2 Flat-Screen TVs'],
    },
    {
      category: 'safety-comfort',
      tag: 'Total Peace of Mind',
      badge: 'SECURE & GATED',
      title: '3-Car Secure Parking & 24/7 CCTV Monitoring',
      desc: 'Private secured on-site parking for up to 3 cars with automated gate security and round-the-clock 24/7 external CCTV monitoring perimeter safety.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAExBhYCwZqkk0bC1qxrZFxyXodk1MFwmbmkxFKhDUDRUNC48F_VQugeyk4zS8KMGrr6BFeshl03c4jVvs35PkgKTszcL2HFdorB_AeoqIzin1JCMeTzIlrNWLDnPAg3CUfSQ2AsWklxm22g_fTf3bIv0YlGNP1GiEP5LTvkuaWPaJt5--iTWDX4VXErdkafiSDNGhuA_5BTN4vWW7JKPGqwv0Q_OCTTmz8CvnTdvvDSvkRKUdtAHuici9Ko27bd1A3PDs',
      chips: ['Parking for 3 Cars', '24/7 External CCTV', '100% DG Backup'],
    },
    {
      category: 'convenience-laundry',
      tag: 'The Comforts of Home',
      badge: 'WI-FI & LAUNDRY',
      title: 'High-Speed Free Wi-Fi & Full Laundry',
      desc: 'High-speed Free Wi-Fi throughout the entire estate, fully automatic washing machine, and dedicated covered terrace drying area for ultimate guest convenience.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOJaFgbG157AzZxSUp49EBedkYgQnbBnUlzFemjQKSEC72VLmvcLgoTYshHjLiw7MLtN045MfT8srlk3I-k0VKxQpCSGLl_j1fm6bh1BLPvutnq2Tczxtj3g0B9sTQw3jk1UBQ3KRpvj4vombwCL7p7KW8khcQic3y5xza-u01li9tsbX23N1vl0QXLR3j8iQ6xZxwsfX21LWWniivrCEN0LHlYjE2TEW2Ht8bAq6uzsIaIp5foVOqxxJftT5dGgGWJaU',
      chips: ['High-Speed Free Wi-Fi', 'Automatic Washer', 'Covered Drying Area'],
    },
  ];

  const filteredAmenities =
    amenityFilter === 'all'
      ? amenitiesList
      : amenitiesList.filter((a) => a.category === amenityFilter);

  const filteredPhotos =
    photoFilter === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((p) => p.category === photoFilter);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    if (sendToWa) {
      const waText = encodeURIComponent(
        `Hello Dreams Villa Concierge, my name is ${inquiryName} (${inquiryPhone}). Stay Dates: ${inquiryDates || 'Flexible'}. Question: ${inquiryMessage}`
      );
      window.open(`https://wa.me/917559894574?text=${waText}`, '_blank');
    }

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryEmail('');
      setInquiryDates('');
      setInquiryMessage('');
    }, 6000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Header Banner & Ambient Metrics */}
      <section className="relative w-full overflow-hidden bg-[#f6f3ed] px-4 md:px-12 lg:px-16 py-16">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="max-w-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-8 h-[2px] bg-[#725b38]" />
              <span className="text-xs uppercase font-bold text-[#725b38] tracking-widest">
                Specifications &amp; Inclusions
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#002720] tracking-tight">
              Curated Villa Facilities &amp; Amenities
            </h1>
            <p className="text-sm md:text-base text-[#414846] leading-relaxed">
              Every appointment reflects thoughtful hospitality—from our private 45-foot indoor pool and dual kitchens to our 300 Mbps mesh Wi-Fi network and 24/7 dedicated reception.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl shadow-sm border border-[#ebe8e2]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#725b38]">Private Pool</span>
              <span className="font-serif text-2xl font-bold text-[#002720]">45 Ft.</span>
              <span className="text-xs text-[#717976]">Indoor Sanctuary</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#725b38]">Estate Living</span>
              <span className="font-serif text-2xl font-bold text-[#002720]">7,200 sq.ft</span>
              <span className="text-xs text-[#717976]">Gated Private Plot</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#725b38]">Direct Rates</span>
              <span className="font-serif text-2xl font-bold text-[#002720]">₹14k - ₹15k</span>
              <span className="text-xs text-[#717976]">Weekday / Weekend</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#725b38]">Power Backup</span>
              <span className="font-serif text-2xl font-bold text-[#002720]">100% DG</span>
              <span className="text-xs text-[#717976]">Continuous AC/Light</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature Amenities Grid with Category Tabs */}
      <section className="w-full px-4 md:px-12 lg:px-16 py-16 max-w-[1360px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-[#725b38] tracking-wider">
              Explore Spaces
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#002720] mt-1">
              Signature Estate Amenities
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Spaces' },
              { id: 'pool-outdoor', label: 'Pool & Outdoor' },
              { id: 'bed-bath', label: 'Bed & Bath' },
              { id: 'dining-chef', label: 'Dining & Chef' },
              { id: 'tech-ent', label: 'Tech & Sound' },
              { id: 'safety-comfort', label: 'Safety & Comfort' },
              { id: 'convenience-laundry', label: 'Laundry & Long-Stay' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAmenityFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  amenityFilter === tab.id
                    ? 'bg-[#002720] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#414846] hover:bg-[#e5e2dc]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amenity Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAmenities.map((amenity, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#ebe8e2]"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded bg-[#002720]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {amenity.tag}
                </span>
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded bg-white/90 backdrop-blur-md text-[#002720] text-[10px] font-bold">
                  {amenity.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-lg font-bold text-[#002720]">
                    {amenity.title}
                  </h3>
                  <p className="text-xs text-[#414846] leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ebe8e2]">
                  {amenity.chips.map((chip, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-[#f0eee8] text-[#1c1c18] font-medium"
                    >
                      <span className="material-symbols-outlined text-xs text-[#725b38]">check_circle</span>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Video Tours Showcase */}
      <section className="w-full bg-[#002720] text-white py-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-[2px] bg-[#fedeb2]" />
                <span className="text-xs uppercase font-bold text-[#fedeb2] tracking-widest">
                  Motion &amp; Perspective
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Villa Video Tours</h2>
            </div>
            <p className="max-w-md text-sm text-[#bfecdf]/80">
              Take a visual journey through the estate. Examine layout flows, hear the rustle of palms, and envision your private stay.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Feature: Drone 4K */}
            <div
              onClick={() => onOpenVideo(VIDEO_TOURS[0])}
              className="lg:col-span-7 flex flex-col group relative rounded-2xl overflow-hidden bg-[#133e35] shadow-xl cursor-pointer"
            >
              <div className="relative h-96 lg:h-full min-h-[360px] w-full overflow-hidden">
                <img
                  src={VIDEO_TOURS[0].thumbnail}
                  alt={VIDEO_TOURS[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002720] via-[#002720]/30 to-transparent" />
                <button
                  type="button"
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <span className="w-20 h-20 rounded-full bg-[#725b38] text-white flex items-center justify-center shadow-2xl pl-1">
                    <span className="material-symbols-outlined text-4xl">play_arrow</span>
                  </span>
                </button>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-[#002720]/90 text-[#bfecdf] text-xs font-bold uppercase tracking-wider">
                    {VIDEO_TOURS[0].badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex flex-col gap-1 max-w-md">
                    <span className="font-serif text-xl font-bold text-white">
                      {VIDEO_TOURS[0].title}
                    </span>
                    <span className="text-xs text-[#bfecdf]">
                      {VIDEO_TOURS[0].subtitle}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#002720]/80 backdrop-blur text-[#fedeb2] text-xs font-bold">
                    {VIDEO_TOURS[0].duration}
                  </span>
                </div>
              </div>
            </div>

            {/* 2 Vertical Video Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {VIDEO_TOURS.slice(1).map((v) => (
                <div
                  key={v.id}
                  onClick={() => onOpenVideo(v)}
                  className="relative group rounded-2xl overflow-hidden bg-[#133e35] shadow-md flex flex-col sm:flex-row h-full cursor-pointer hover:bg-[#1a4e43] transition-colors"
                >
                  <div className="relative h-44 sm:h-auto sm:w-1/2 overflow-hidden flex-shrink-0">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-[#725b38]/90 text-white flex items-center justify-center shadow pl-0.5">
                        <span className="material-symbols-outlined text-2xl">play_arrow</span>
                      </span>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#002720]/80 text-[#fedeb2] text-[10px] font-bold">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between gap-2 flex-grow">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase text-[#fedeb2]">
                        {v.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white">
                        {v.title}
                      </h3>
                      <p className="text-xs text-[#bfecdf]/75 line-clamp-2">
                        {v.subtitle}
                      </p>
                    </div>
                    <span className="text-xs text-[#bfecdf] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">play_circle</span>
                      Click to watch tour
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. High-Definition Photo Gallery */}
      <section className="w-full px-4 md:px-12 lg:px-16 py-20 max-w-[1360px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-[#725b38] tracking-wider">
              Visual Index
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#002720] mt-1">
              Estate Gallery ({GALLERY_IMAGES.length} Photos)
            </h2>
          </div>

          {/* Photo Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: `All (${GALLERY_IMAGES.length})` },
              { id: 'pool', label: 'Private Pool' },
              { id: 'master-bedroom', label: 'Master Bedroom' },
              { id: 'gardens', label: 'Tropical Garden' },
              { id: 'living', label: 'Living Pavilion' },
              { id: 'dining', label: 'Sunset Dining' },
              { id: 'convenience', label: 'Laundry & Utility' },
            ].map((pTab) => (
              <button
                key={pTab.id}
                type="button"
                onClick={() => setPhotoFilter(pTab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  photoFilter === pTab.id
                    ? 'bg-[#002720] text-white shadow-sm'
                    : 'bg-[#f0eee8] text-[#414846] hover:bg-[#e5e2dc]'
                }`}
              >
                {pTab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, pIdx) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(filteredPhotos, pIdx)}
              className="relative h-64 md:h-72 rounded-2xl overflow-hidden group shadow-sm border border-[#ebe8e2] cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002720]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div className="flex flex-col text-white">
                  <span className="text-[10px] font-bold uppercase text-[#fedeb2] tracking-wider">
                    {photo.tag || 'Estate Photo'}
                  </span>
                  <span className="font-serif text-base font-bold">{photo.title}</span>
                  <span className="text-xs text-white/80">{photo.subtitle}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-white">
                <span className="material-symbols-outlined text-sm">fullscreen</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Media Portal Vault Teaser */}
        <div className="w-full bg-[#f0eee8] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#ebe8e2]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#fedeb2] text-[#78603e] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">photo_library</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-serif text-lg font-bold text-[#002720]">
                Guest Media Portal &amp; Uncompressed Photo Vault
              </h3>
              <p className="text-xs text-[#414846] max-w-xl">
                Reserved guests gain access to our cloud vault with 120+ uncompressed RAW images, floor plans, and high-resolution architecture renders.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenLightbox(GALLERY_IMAGES, 0)}
            className="px-6 py-2.5 rounded-lg bg-[#002720] hover:bg-[#133e35] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            type="button"
          >
            <span className="material-symbols-outlined text-base">photo_library</span>
            Launch Full Screen Gallery
          </button>
        </div>
      </section>

      {/* 5. Priority Concierge Desk & Working Inquiry Form */}
      <section className="w-full bg-[#ebe8e2] py-20 px-4 md:px-12 lg:px-16">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Call Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-[#725b38] tracking-widest">
                Immediate Personal Concierge
              </span>
              <h2 className="font-serif text-3xl text-[#002720]">
                Have a Question About Amenities or Pool Access?
              </h2>
              <p className="text-sm text-[#414846] leading-relaxed">
                Whether you require tailored private chef menus, pool timings &amp; safety, baby crib arrangements, or early luggage drop-offs, our resident management is standing by.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-[#c0c8c4]/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#002720] text-[#bfecdf] flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">support_agent</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#002720]">Villa Reception 24/7</span>
                    <span className="text-xs text-[#717976]">Instant on-site inquiries &amp; directions</span>
                  </div>
                </div>
                <a
                  href={`tel:${VILLA_CONTACT.receptionPhoneTel}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#f0eee8] text-[#002720] text-xs font-semibold hover:bg-[#002720] hover:text-white transition-colors"
                >
                  Call
                </a>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-[#c0c8c4]/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#725b38] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">shield_person</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#002720]">Owner Desk · {VILLA_CONTACT.ownerName}</span>
                    <span className="text-xs text-[#717976]">Private buyouts &amp; long-stay privileges</span>
                  </div>
                </div>
                <a
                  href={`tel:${VILLA_CONTACT.ownerPhoneTel}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#f0eee8] text-[#002720] text-xs font-semibold hover:bg-[#002720] hover:text-white transition-colors"
                >
                  Call
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#414846] pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#725b38]">verified</span>
                Direct Rates: ₹14,000 wd / ₹15,000 we
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#725b38]">lock</span>
                Secure In-House Care
              </span>
            </div>
          </div>

          {/* Right Column: Working Priority Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#ebe8e2]">
            <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1 border-b border-[#ebe8e2] pb-3">
                <span className="uppercase font-bold text-[#725b38] tracking-wider text-[10px]">
                  Priority Communication
                </span>
                <h3 className="font-serif text-xl font-bold text-[#002720]">
                  Send Priority Inquiry
                </h3>
                <p className="text-xs text-[#717976]">
                  Direct routing to the Estate Concierge WhatsApp and Email dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold text-[#414846] tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="p-2.5 rounded-lg bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold text-[#414846] tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="p-2.5 rounded-lg bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold text-[#414846] tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="dreamsvillaclt@gmail.com"
                    className="p-2.5 rounded-lg bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold text-[#414846] tracking-wider">
                    Intended Stay Dates
                  </label>
                  <input
                    type="text"
                    value={inquiryDates}
                    onChange={(e) => setInquiryDates(e.target.value)}
                    placeholder="e.g., Nov 20 - Nov 25, 2025"
                    className="p-2.5 rounded-lg bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="uppercase font-bold text-[#414846] tracking-wider">
                  Specific Question or Request
                </label>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Inquire about pool depth for kids, custom vegetarian banquet menus, airport chauffeur arrangements..."
                  className="p-2.5 rounded-lg bg-[#f6f3ed] border border-[#c0c8c4] text-sm text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                />
              </div>

              {/* WhatsApp Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f6f3ed]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#bfecdf] text-[#002720] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm font-bold">chat</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#002720]">
                      Also dispatch directly to WhatsApp
                    </span>
                    <span className="text-[11px] text-[#717976]">
                      Receive rapid response within 5-10 minutes
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={sendToWa}
                  onChange={(e) => setSendToWa(e.target.checked)}
                  className="w-5 h-5 accent-[#002720] cursor-pointer"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-[#717976]">Guaranteed private inquiry. No spam.</span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#002720] hover:bg-[#133e35] text-white font-semibold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Transmit Inquiry</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              {inquirySubmitted && (
                <div className="p-3 bg-[#bfecdf] text-[#002720] rounded-xl text-center font-bold">
                  ✓ Thank you! Your inquiry has been routed to the Estate Manager. We will connect shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
