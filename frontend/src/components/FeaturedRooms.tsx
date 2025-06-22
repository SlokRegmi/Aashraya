import React from 'react';
import { useRooms } from '../hooks/useRooms';
import RoomCard from './RoomCard';

interface FeaturedRoomsProps {
  onViewDetails: (roomId: string) => void;
}

const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({ onViewDetails }) => {
  const { rooms, favorites, toggleFavorite } = useRooms();

  const featuredRooms = rooms.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Rooms
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium rooms in the best locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isFavorite={favorites.includes(room.id)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;