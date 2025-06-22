import React, { useState } from 'react';
import { useRooms } from '../hooks/useRooms';
import { SearchFilters } from '../types';
import SearchFiltersComponent from './SearchFilters';
import RoomCard from './RoomCard';
import RoomDetails from './RoomDetails';
import { Loader } from 'lucide-react';

interface BrowseRoomsProps {
  onMessage: (landlordId: string) => void;
}

const BrowseRooms: React.FC<BrowseRoomsProps> = ({ onMessage }) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { rooms, loading, favorites, toggleFavorite } = useRooms(filters);

  const handleViewDetails = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleBook = (roomId: string) => {
    // In a real app, this would redirect to booking/payment flow
    alert('Booking functionality would be implemented here!');
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading rooms...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchFiltersComponent filters={filters} onFiltersChange={setFilters} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Available Rooms {filters.location && `in ${filters.location}`}
          </h1>
          <p className="text-gray-600">
            {rooms.length} room{rooms.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Room Grid */}
        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No rooms match your criteria. Try adjusting your filters.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isFavorite={favorites.includes(room.id)}
                onToggleFavorite={toggleFavorite}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Room Details Modal */}
      {selectedRoom && selectedRoomData && (
        <RoomDetails
          room={selectedRoomData}
          onClose={() => setSelectedRoom(null)}
          onBook={handleBook}
          onMessage={onMessage}
          isFavorite={favorites.includes(selectedRoom)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default BrowseRooms;