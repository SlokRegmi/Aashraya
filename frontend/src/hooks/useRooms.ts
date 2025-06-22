import { useEffect, useState } from 'react';

import { mockRooms } from '../data/mockData';
import type { Room, SearchFilters } from '../types';

export const useRooms = (filters?: SearchFilters) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredRooms = [...mockRooms];
      
      if (filters) {
        if (filters.minPrice) {
          filteredRooms = filteredRooms.filter(room => room.price >= filters.minPrice!);
        }
        if (filters.maxPrice) {
          filteredRooms = filteredRooms.filter(room => room.price <= filters.maxPrice!);
        }
        if (filters.roomType) {
          filteredRooms = filteredRooms.filter(room => room.type === filters.roomType);
        }
        if (filters.location) {
          filteredRooms = filteredRooms.filter(room => 
            room.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
            room.location.address.toLowerCase().includes(filters.location!.toLowerCase())
          );
        }
        if (filters.amenities && filters.amenities.length > 0) {
          filteredRooms = filteredRooms.filter(room =>
            filters.amenities!.every(amenity => room.amenities.includes(amenity))
          );
        }
        
        // Sort results
        switch (filters.sortBy) {
          case 'price-low':
            filteredRooms.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredRooms.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredRooms.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredRooms.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        }
      }
      
      setRooms(filteredRooms);
      setLoading(false);
    };

    fetchRooms();
  }, [filters]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (roomId: string) => {
    const newFavorites = favorites.includes(roomId)
      ? favorites.filter(id => id !== roomId)
      : [...favorites, roomId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return {
    rooms,
    loading,
    favorites,
    toggleFavorite,
  };
};