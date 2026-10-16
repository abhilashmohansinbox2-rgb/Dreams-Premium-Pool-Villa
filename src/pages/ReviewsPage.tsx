import React, { useState } from 'react';
import { INITIAL_REVIEWS, VILLA_CONTACT } from '../data/villaData.ts';
import { GuestReview } from '../types/index.ts';
import { ReviewModal } from '../components/ReviewModal.tsx';
import { DeleteReviewModal } from '../components/DeleteReviewModal.tsx';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<GuestReview[]>(INITIAL_REVIEWS);
  const [filterChannel, setFilterChannel] = useState<'All' | 'Direct' | 'Airbnb' | 'MakeMyTrip'>('All');
  const [sortBy, setSortBy] = useState<'Recent' | 'Highest' | 'Pinned'>('Recent');

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GuestReview | null>(null);

  // Host reply editing state
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleAddNewReview = (newRev: GuestReview) => {
    setReviews([newRev, ...reviews]);
    showToast('Your verified review has been published to the guest chronicle!');
  };

  const handleConfirmDelete = (reviewId: string, reason: string) => {
    setReviews(reviews.filter((r) => r.id !== reviewId));
    showToast(`Review removed successfully. Audit justification recorded: ${reason}`);
  };

  const handleTogglePin = (reviewId: string) => {
    setReviews(
      reviews.map((r) => {
        if (r.id === reviewId) {
          const nextPinned = !r.isPinned;
          showToast(nextPinned ? 'Review pinned to featured top placement.' : 'Review unpinned.');
          return { ...r, isPinned: nextPinned };
        }
        return r;
      })
    );
  };

  const handleSaveReply = (reviewId: string) => {
    setReviews(
      reviews.map((r) => {
        if (r.id === reviewId && r.hostReply) {
          return {
            ...r,
            hostReply: {
              ...r.hostReply,
              text: replyText,
              repliedAt: 'Just now (Updated)',
            },
          };
        }
        return r;
      })
    );
    setEditingReplyId(null);
    showToast('Host official response updated and published.');
  };

  // Filter & Sort
  const filteredReviews = reviews.filter((r) => {
    if (filterChannel === 'All') return true;
    return r.channel === filterChannel;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'Pinned') {
      return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
    }
    if (sortBy === 'Highest') {
      return b.rating - a.rating;
    }
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  });

  return (
    <div className="flex flex-col w-full">
      {/* Owner Moderation Bar (Top Global Control Ribbon) */}
      <section className="w-full bg-[#133e35] text-white">
        <div className="max-w-[1360px] mx-auto px-4 md:px-12 lg:px-16 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#fedeb2] text-[#002720]">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
            </span>
            <div className="flex items-center gap-2 font-medium">
              <span className="uppercase tracking-wider text-[#fedeb2] font-bold">Host Mode:</span>
              <span>Logged in as {VILLA_CONTACT.ownerName} (Resident Owner &amp; Curator)</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-[#bfecdf]">Audited Transparency Protocol</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#bfecdf]">
              <span className="material-symbols-outlined text-sm text-[#fedeb2]">verified_user</span>
              <span>{reviews.length} Published Reviews</span>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('moderationPolicySection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1 rounded bg-[#002720] text-[#fedeb2] text-[11px] uppercase font-bold tracking-wider hover:bg-white hover:text-[#002720] transition-all cursor-pointer"
              type="button"
            >
              Moderation Policy
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Header & Aggregate Scoreboard */}
      <section className="w-full px-4 md:px-12 lg:px-16 py-16 bg-white border-b border-[#ebe8e2]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#725b38]">
                <span>Verified Guest Chronicle</span>
                <span>•</span>
                <span className="text-[#414846]">Independent Stays Only</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#002720] tracking-tight font-bold">
                Unfiltered Reflections of Barefoot Seclusion
              </h1>
              <p className="text-sm md:text-base text-[#414846] leading-relaxed">
                Cross-channel transparency aggregated from verified reservations across Airbnb, MakeMyTrip, and Direct Luxury Stays.
              </p>
            </div>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#002720] text-white text-xs font-semibold hover:bg-[#133e35] transition-all shadow-md cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-base">edit_note</span>
              <span>Submit Verified Stay Review</span>
            </button>
          </div>

          {/* Reputation Bento Scoreboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Score Pillar */}
            <div className="lg:col-span-4 bg-[#f6f3ed] p-8 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#fedeb2] text-[#281800] text-[10px] font-bold uppercase">
                    Overall Estate Rating
                  </span>
                  <span className="material-symbols-outlined text-[#725b38]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    hotel_class
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl font-bold text-[#002720] leading-none">4.96</span>
                  <div className="flex flex-col">
                    <span className="text-xl font-serif text-[#725b38] font-bold leading-none">/ 5.0</span>
                    <span className="text-xs text-[#414846] mt-1">{reviews.length + 144} total records</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#725b38]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: s === 5 ? "'FILL' 0.5" : "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="text-xs font-semibold text-[#414846] ml-2">99.2% Recommend</span>
                </div>
              </div>

              {/* Owner Monogram */}
              <div className="mt-8 pt-4 border-t border-[#ebe8e2] flex items-center gap-3">
                <img
                  src={VILLA_CONTACT.ownerPortrait}
                  alt={VILLA_CONTACT.ownerName}
                  className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#fedeb2]"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-[#002720]">{VILLA_CONTACT.ownerName}</span>
                  <span className="text-xs text-[#725b38]">{VILLA_CONTACT.ownerTitle}</span>
                </div>
              </div>
            </div>

            {/* Channels & Performance Bars */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f6f3ed] p-5 rounded-2xl border border-[#ebe8e2] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#002720]">Airbnb</span>
                    <span className="px-2 py-0.5 rounded bg-white text-[#002720] text-[10px] font-bold uppercase">Superhost</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-[#002720]">4.98</span>
                    <span className="text-xs text-[#725b38] font-semibold">★ (86 verified)</span>
                  </div>
                  <p className="text-xs text-[#414846] mt-2">Ranked top 1% private villas in Kozhikode.</p>
                </div>

                <div className="bg-[#f6f3ed] p-5 rounded-2xl border border-[#ebe8e2] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#002720]">MakeMyTrip</span>
                    <span className="px-2 py-0.5 rounded bg-[#fedeb2] text-[#281800] text-[10px] font-bold uppercase">Luxe</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-[#002720]">4.94</span>
                    <span className="text-xs text-[#725b38] font-semibold">★ (42 verified)</span>
                  </div>
                  <p className="text-xs text-[#414846] mt-2">Platinum grade for privacy &amp; cleanliness.</p>
                </div>

                <div className="bg-[#f6f3ed] p-5 rounded-2xl border border-[#ebe8e2] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#002720]">Direct Booking</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#002720] text-[#bfecdf] text-[10px] font-bold uppercase">Concierge</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-[#002720]">5.0</span>
                    <span className="text-xs text-[#725b38] font-semibold">★ (20 verified)</span>
                  </div>
                  <p className="text-xs text-[#414846] mt-2">Tailored private chef family escapes.</p>
                </div>
              </div>

              {/* Granular Progress Bars */}
              <div className="bg-[#f6f3ed] p-6 rounded-2xl border border-[#ebe8e2]">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-base font-bold text-[#002720]">Granular Estate Performance</span>
                  <span className="text-[11px] uppercase font-bold text-[#725b38]">Audited Monthly</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[#1c1c18]">
                      <span className="font-medium">Cleanliness &amp; Sanitation</span>
                      <span className="font-bold text-[#002720]">5.0 / 5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#e5e2dc]">
                      <div className="h-2 rounded-full bg-[#002720] w-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[#1c1c18]">
                      <span className="font-medium">Staff Hospitality &amp; Chef</span>
                      <span className="font-bold text-[#002720]">5.0 / 5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#e5e2dc]">
                      <div className="h-2 rounded-full bg-[#002720] w-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[#1c1c18]">
                      <span className="font-medium">Infinity Pool &amp; Grounds</span>
                      <span className="font-bold text-[#002720]">4.9 / 5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#e5e2dc]">
                      <div className="h-2 rounded-full bg-[#002720] w-[98%]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[#1c1c18]">
                      <span className="font-medium">Location, Privacy &amp; Security</span>
                      <span className="font-bold text-[#002720]">4.9 / 5.0</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#e5e2dc]">
                      <div className="h-2 rounded-full bg-[#002720] w-[98%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Moderation Filter Bar */}
      <section className="w-full bg-[#f6f3ed] py-4 px-4 md:px-12 lg:px-16 border-b border-[#ebe8e2]">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#414846] font-medium pr-1">Filter By Channel:</span>
            {(['All', 'Direct', 'Airbnb', 'MakeMyTrip'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setFilterChannel(ch)}
                className={`px-4 py-1.5 rounded-full font-semibold transition-colors cursor-pointer ${
                  filterChannel === ch
                    ? 'bg-[#002720] text-white shadow-sm'
                    : 'bg-white text-[#1c1c18] hover:bg-[#e5e2dc]'
                }`}
                type="button"
              >
                {ch === 'All' ? `All (${reviews.length})` : ch}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#ebe8e2]">
              <span className="uppercase font-bold text-[#725b38]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-[#002720] focus:outline-none cursor-pointer"
              >
                <option value="Recent">Most Recent Stays</option>
                <option value="Highest">Highest Rated (5.0)</option>
                <option value="Pinned">Pinned by Host First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews Feed & Moderation Area */}
      <section className="w-full px-4 md:px-12 lg:px-16 py-20 bg-white">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-8">
          {sortedReviews.length === 0 ? (
            <div className="p-12 text-center bg-[#f6f3ed] rounded-2xl text-[#414846]">
              <p className="text-base font-bold text-[#002720]">No reviews match the selected filter.</p>
              <button
                onClick={() => setFilterChannel('All')}
                className="mt-3 px-4 py-2 bg-[#002720] text-white rounded-lg text-xs font-semibold"
                type="button"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            sortedReviews.map((rev) => (
              <article
                key={rev.id}
                id={`review-card-${rev.id}`}
                className={`bg-[#f6f3ed] p-6 md:p-8 rounded-2xl shadow-sm border flex flex-col gap-6 relative overflow-hidden transition-all ${
                  rev.isPinned ? 'border-2 border-[#725b38]' : 'border-[#ebe8e2]'
                }`}
              >
                {/* Pinned Ribbon */}
                {rev.isPinned && (
                  <div className="absolute top-0 right-0 bg-[#725b38] text-white px-4 py-1 rounded-bl-xl text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 shadow">
                    <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                      push_pin
                    </span>
                    Pinned by Estate Host
                  </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {rev.guestAvatar ? (
                      <img
                        src={rev.guestAvatar}
                        alt={rev.guestName}
                        className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-[#fedeb2]"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#e5e2dc] flex items-center justify-center font-bold text-[#002720] text-lg">
                        {rev.guestName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-serif text-lg font-bold text-[#002720]">
                          {rev.guestName}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#002720] text-[#bfecdf] text-[10px] font-bold uppercase">
                          {rev.channelBadge}
                        </span>
                      </div>
                      <span className="text-xs text-[#414846]">
                        {rev.dates} · {rev.stayType}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    <div className="flex items-center text-[#725b38]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono uppercase text-[#717976]">
                      Ref #{rev.bookingRef}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#002720]">
                    &ldquo;{rev.headline}&rdquo;
                  </h3>
                  <p className="text-sm text-[#414846] leading-relaxed">{rev.body}</p>
                </div>

                {/* Optional Photos */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {rev.photos.map((pUrl, pIdx) => (
                      <img
                        key={pIdx}
                        src={pUrl}
                        alt="Guest stay memory"
                        className="w-full h-32 rounded-xl object-cover shadow-sm border border-[#ebe8e2]"
                      />
                    ))}
                  </div>
                )}

                {/* Official Host Response Block */}
                {rev.hostReply && (
                  <div className="bg-white p-5 rounded-xl border border-[#ebe8e2] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.hostReply.avatar}
                          alt={rev.hostReply.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-[#002720]">{rev.hostReply.author}</span>
                          <span className="text-[#725b38] font-bold">• {rev.hostReply.role}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#717976]">Replied {rev.hostReply.repliedAt}</span>
                    </div>
                    <p className="text-xs text-[#1c1c18] pl-10 italic leading-relaxed">
                      &ldquo;{rev.hostReply.text}&rdquo;
                    </p>
                  </div>
                )}

                {/* Owner Moderation Control Bar */}
                <div className="pt-3 bg-[#ebe8e2]/60 p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#414846] font-bold uppercase text-[10px] tracking-wider">
                    <span className="material-symbols-outlined text-sm text-[#725b38]">admin_panel_settings</span>
                    <span>Host Moderation Suite</span>
                    <span>•</span>
                    <span className="text-[#002720]">Active Status: Verified</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingReplyId(rev.id);
                        setReplyText(rev.hostReply?.text || '');
                      }}
                      className="px-3 py-1 rounded bg-white text-[#002720] hover:bg-[#ebe8e2] transition-colors flex items-center gap-1 shadow-sm font-semibold cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">reply</span>
                      Edit Reply
                    </button>
                    <button
                      onClick={() => handleTogglePin(rev.id)}
                      className="px-3 py-1 rounded bg-white text-[#725b38] hover:bg-[#ebe8e2] transition-colors flex items-center gap-1 shadow-sm font-semibold cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">push_pin</span>
                      {rev.isPinned ? 'Unpin' : 'Pin to Top'}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(rev)}
                      className="px-3 py-1 rounded bg-[#ffdad6] text-[#93000a] hover:bg-[#ba1a1a] hover:text-white transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">delete_forever</span>
                      Flag / Delete
                    </button>
                  </div>
                </div>

                {/* Inline Edit Reply Drawer */}
                {editingReplyId === rev.id && (
                  <div className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-[#725b38]">
                    <label className="text-xs uppercase font-bold text-[#002720] tracking-wider">
                      Modify Host Response as {VILLA_CONTACT.ownerName}:
                    </label>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="p-3 rounded-lg bg-[#f6f3ed] border border-[#c0c8c4] text-xs text-[#1c1c18] focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingReplyId(null)}
                        className="px-3 py-1 rounded bg-[#ebe8e2] text-xs font-semibold text-[#1c1c18]"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveReply(rev.id)}
                        className="px-4 py-1 rounded bg-[#002720] text-white text-xs font-semibold"
                        type="button"
                      >
                        Save &amp; Publish Reply
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {/* Review Integrity & Moderation Policy Explainer */}
      <section className="w-full bg-[#f6f3ed] py-20 px-4 md:px-12 lg:px-16" id="moderationPolicySection">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs uppercase font-bold text-[#725b38] tracking-widest">
              Transparent Trust Standards
            </span>
            <h2 className="font-serif text-3xl text-[#002720]">
              Our Policy on Review Authenticity &amp; Deletions
            </h2>
            <p className="text-sm text-[#414846] leading-relaxed">
              Dreams Premium Pool Villa holds a strict non-censorship code for genuine guest feedback. We do not remove negative feedback from confirmed visitors. However, to protect our estate against extortion and competitors, our Owner Desk maintains cryptographic deletion protocols for fraudulent entries.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs font-bold uppercase text-[#002720]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#725b38]">verified</span> ISO 9001 PMS Synced
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#725b38]">lock</span> Immutable Audit Log
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#002720] text-2xl">rule</span>
              <h3 className="font-serif text-base font-bold text-[#002720]">When Reviews Can Be Deleted</h3>
              <p className="text-xs text-[#414846] leading-relaxed">
                A review is only eligible for removal if it fails cross-reference with our official gate register, contains profane/extortive language, or is verified as an automated competitor attack.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-2xl">history_edu</span>
              <h3 className="font-serif text-base font-bold text-[#002720]">Permanent Audit Trail</h3>
              <p className="text-xs text-[#414846] leading-relaxed">
                Every moderation action taken by {VILLA_CONTACT.ownerName} (Owner) is logged with timestamp, reasoning, and IP signature to uphold Superhost compliance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#002720] text-2xl">mark_chat_read</span>
              <h3 className="font-serif text-base font-bold text-[#002720]">Mandatory Owner Reply</h3>
              <p className="text-xs text-[#414846] leading-relaxed">
                Constructive criticism regarding pool amenities, weather, or menu preferences receives a publicly published host response within 24 hours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ebe8e2] flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#725b38] text-2xl">verified_user</span>
              <h3 className="font-serif text-base font-bold text-[#002720]">Booking Reference Lock</h3>
              <p className="text-xs text-[#414846] leading-relaxed">
                Only guests with an active confirmation PIN (provided on check-in receipt) can publish a public score under the 'Direct Verified' badge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-24 right-8 z-50 bg-[#002720] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#bfecdf]/30 animate-bounce">
          <span className="material-symbols-outlined text-[#fedeb2]">check_circle</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Modals */}
      <ReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleAddNewReview}
      />
      <DeleteReviewModal
        isOpen={Boolean(deleteTarget)}
        review={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};
