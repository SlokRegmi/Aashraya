import type { Review, Room } from "../types";


export const mockRooms: Room[] = [
  {
    id: '1',
    title: 'Cozy Downtown Studio',
    description: 'Beautiful studio apartment in the heart of downtown. Perfect for professionals with easy access to public transport and amenities.',
    price: 1200,
    type: 'single',
    location: {
      address: '123 Main St, Downtown',
      city: 'New York',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Laundry', 'Kitchen'],
    images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'
    ],
    landlordId: 'landlord1',
    landlord: {
      name: 'John Smith',
      phone: '+1-555-0123',
      email: 'john@example.com'
    },
    availability: true,
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Shared Room in Modern Apartment',
    description: 'Spacious shared room in a modern 3-bedroom apartment. Great for students and young professionals. Includes all utilities.',
    price: 800,
    type: 'shared',
    location: {
      address: '456 Oak Ave, Midtown',
      city: 'New York',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    amenities: ['Wi-Fi', 'AC', 'Gym', 'Pool', 'Study Room'],
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg',
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg'
    ],
    landlordId: 'landlord2',
    landlord: {
      name: 'Sarah Johnson',
      phone: '+1-555-0456',
      email: 'sarah@example.com'
    },
    availability: true,
    rating: 4.5,
    reviewCount: 18,
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    title: 'Luxury 2-Bedroom Apartment',
    description: 'Premium apartment with stunning city views. Fully furnished with high-end amenities and concierge service.',
    price: 2500,
    type: 'apartment',
    location: {
      address: '789 Park Plaza, Upper East',
      city: 'New York',
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    amenities: ['Wi-Fi', 'AC', 'Parking', 'Gym', 'Pool', 'Concierge', 'Balcony'],
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg'
    ],
    landlordId: 'landlord3',
    landlord: {
      name: 'Michael Chen',
      phone: '+1-555-0789',
      email: 'michael@example.com'
    },
    availability: true,
    rating: 4.9,
    reviewCount: 32,
    createdAt: '2024-01-05T09:15:00Z'
  },
  {
    id: '4',
    title: 'Budget-Friendly Single Room',
    description: 'Affordable single room perfect for students. Close to university campus with basic amenities included.',
    price: 600,
    type: 'single',
    location: {
      address: '321 College St, University District',
      city: 'New York',
      coordinates: { lat: 40.8176, lng: -73.9782 }
    },
    amenities: ['Wi-Fi', 'Laundry', 'Study Area'],
    images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    landlordId: 'landlord4',
    landlord: {
      name: 'Emma Davis',
      phone: '+1-555-0321',
      email: 'emma@example.com'
    },
    availability: true,
    rating: 4.2,
    reviewCount: 15,
    createdAt: '2024-01-12T16:45:00Z'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    roomId: '1',
    tenantId: 'tenant1',
    rating: 5,
    comment: 'Amazing place! The location is perfect and the landlord is very responsive. Highly recommend!',
    createdAt: '2024-01-20T10:30:00Z',
    tenantName: 'Alice Wilson',
    tenantAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  },
  {
    id: '2',
    roomId: '1',
    tenantId: 'tenant2',
    rating: 4,
    comment: 'Great studio with all the amenities. Only downside is it can get a bit noisy during weekends.',
    createdAt: '2024-01-18T14:15:00Z',
    tenantName: 'Bob Thompson'
  },
  {
    id: '3',
    roomId: '2',
    tenantId: 'tenant3',
    rating: 5,
    comment: 'Perfect for sharing! Clean, modern, and great roommates. The gym and pool are excellent.',
    createdAt: '2024-01-16T09:22:00Z',
    tenantName: 'Carol Brown'
  }
];