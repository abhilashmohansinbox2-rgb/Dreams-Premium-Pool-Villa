/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab, GalleryImage, VideoTour } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';
import { VideoModal } from './components/VideoModal.tsx';
import { OverviewPage } from './pages/OverviewPage.tsx';
import { FacilitiesPage } from './pages/FacilitiesPage.tsx';
import { LocalGuidePage } from './pages/LocalGuidePage.tsx';
import { BookingPage } from './pages/BookingPage.tsx';
import { ReviewsPage } from './pages/ReviewsPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { GALLERY_IMAGES } from './data/villaData.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');

  // Booking navigation state with optional date pass-through
  const [bookingDates, setBookingDates] = useState<{ start: string; end: string; guests: string } | undefined>(undefined);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Video Tour Modal state
  const [activeVideo, setActiveVideo] = useState<VideoTour | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenLightbox = (images: GalleryImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOpenVideo = (video: VideoTour) => {
    setActiveVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleNavigateToBooking = (dates?: { start: string; end: string; guests: string }) => {
    if (dates) setBookingDates(dates);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f3] text-[#1c1c18] font-sans antialiased selection:bg-[#bfecdf] selection:text-[#002720]">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReserveClick={() => handleNavigateToBooking()}
      />

      {/* Main Content Router Viewport */}
      <main className="w-full pt-20 flex-grow bg-[#fcf9f3]">
        {activeTab === 'overview' && (
          <OverviewPage
            onNavigateToBooking={handleNavigateToBooking}
            onOpenVideoTour={() => handleOpenVideo({
              id: 'drone-sunset',
              title: 'Drone Cinematics & Sunset Tour',
              subtitle: 'Aerial overview showing estate boundaries, tree cover & pool reflection',
              duration: '02:45',
              thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe8PT1AkDLcVhPEn2jogF445MpaLIR4eCaVX2eXgxDe3jy7hnHFOP6O7l7qol7gzVv4O5PiCvuhrcwT6CCGDAn0qeYxKoVpD42lecfdu5AOlLQiKEKv9AYncP1-hC62JzhPOWv9n3x6L-ufkjg_B5Tdryt5k1JwUSfy62KNaGo26zDtVgVPU46kMbH4pC3QhbMXISBsld4XQrWg2XNjAC0sGkzRwavYPYgEgGu2i4YCOZ5dhq6c0KKJRSV7d5SqWaxGL4',
              badge: 'Cinematic 4K HDR',
              category: 'Aerial & Grounds',
              description: 'Comprehensive 4K drone cinematography capturing the serene residential neighborhood of Malaparamba, the private gated perimeter, secluded infinity pool enclosure, and evening golden hour.',
            })}
          />
        )}

        {activeTab === 'facilities' && (
          <FacilitiesPage
            onOpenLightbox={handleOpenLightbox}
            onOpenVideo={handleOpenVideo}
          />
        )}

        {activeTab === 'guide' && (
          <LocalGuidePage
            onReserveClick={() => handleNavigateToBooking()}
          />
        )}

        {activeTab === 'booking' && (
          <BookingPage initialDates={bookingDates} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsPage />
        )}

        {activeTab === 'admin' && (
          <AdminPage
            onPreviewLive={() => {
              setActiveTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating WhatsApp Chat Button */}
      <WhatsAppFloatingButton />

      {/* Global Modals */}
      <LightboxModal
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      <VideoModal
        video={activeVideo}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}
