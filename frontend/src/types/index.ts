export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'tenant' | 'landlord';
  createdAt: string;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'single' | 'shared' | 'apartment';
  location: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  amenities: string[];
  images: string[];
  landlordId: string;
  landlord: {
    name: string;
    avatar?: string;
    phone: string;
    email: string;
  };
  availability: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  roomId: string;
  tenantId: string;
  landlordId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  roomId: string;
  tenantId: string;
  rating: number;
  comment: string;
  createdAt: string;
  tenantName: string;
  tenantAvatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  roomId?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  roomType?: 'single' | 'shared' | 'apartment';
  amenities?: string[];
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest';
}