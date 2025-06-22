import { Car, Heart, MapPin, Star, User, Users, Wifi } from 'lucide-react';
import React from 'react';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  isFavorite: boolean;
  onToggleFavorite: (roomId: string) => void;
  onViewDetails: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetails 
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'single':
        return <User className="h-4 w-4" />;
      case 'shared':
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
        return <Wifi className="h-3 w-3" />;
      case 'parking':
        return <Car className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
            {room.type}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(room.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {room.title}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium text-gray-700">{room.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{room.location.address}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-gray-600">
              {getTypeIcon(room.type)}
              <span className="text-sm capitalize">{room.type}</span>
            </div>
            <div className="text-gray-400">•</div>
            <span className="text-sm text-gray-600">{room.reviewCount} reviews</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${room.price}</div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(room.id)}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;