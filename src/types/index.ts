export type NavigationTab = 
  | 'overview' 
  | 'facilities' 
  | 'guide' 
  | 'booking' 
  | 'reviews' 
  | 'admin';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: 'all' | 'pool' | 'master-bedroom' | 'gardens' | 'living' | 'dining' | 'convenience';
  subtitle?: string;
  tag?: string;
}

export interface VideoTour {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  thumbnail: string;
  badge: string;
  category: string;
  description: string;
}

export interface LocalAttraction {
  id: string;
  name: string;
  category: 'dining' | 'coastal' | 'heritage' | 'nature';
  categories: string[];
  distance: string;
  duration: string;
  autoFare: string;
  location: string;
  timings: string;
  tag: string;
  tagBg: string;
  image: string;
  description: string;
  signaturesTitle: string;
  signatures: string;
  mapQuery: string;
  colSpan?: string;
}

export interface GuestReview {
  id: string;
  guestName: string;
  guestAvatar: string;
  channel: 'Direct' | 'Airbnb' | 'MakeMyTrip';
  channelBadge: string;
  dates: string;
  stayType: string;
  rating: number;
  bookingRef: string;
  headline: string;
  body: string;
  photos?: string[];
  hostReply?: {
    author: string;
    role: string;
    avatar: string;
    repliedAt: string;
    text: string;
  };
  isPinned?: boolean;
  isFlagged?: boolean;
}

export interface WalkthroughZone {
  id: 'pavilion' | 'cabana' | 'pooldeck' | 'gardens';
  zoneNumber: string;
  title: string;
  subtitle: string;
  areaLabel: string;
  image: string;
  alt: string;
  hotspots: {
    number: number;
    top: string;
    left: string;
    tooltip: string;
  }[];
}
