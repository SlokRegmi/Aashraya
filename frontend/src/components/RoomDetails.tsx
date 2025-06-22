import {
  Calendar,
  Car,
  ChevronLeft, ChevronRight,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
  Users, Wifi,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { mockReviews } from '../data/mockData';
import type { Room } from '../types';

interface RoomDetailsProps {
  room: Room;
  onClose: () => void;
  onBook: (roomId: string) => void;
  onMessage: (landlordId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (roomId: string) => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({
  room,
  onClose,
  onBook,
  onMessage,
  isFavorite,
  onToggleFavorite
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const roomReviews = mockReviews.filter(review => review.roomId === room.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
        return <Wifi className="h-5 w-5" />;
      case 'parking':
        return <Car className="h-5 w-5" />;
      case 'shared':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const calculateStayDuration = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const totalPrice = calculateStayDuration() > 0 ? (room.price / 30) * calculateStayDuration() : room.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden m-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{room.title}</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleFavorite(room.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src={room.images[currentImageIndex]}
                  alt={`${room.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {room.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Room Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {room.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{room.rating}</span>
                      <span className="text-gray-500">({room.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">${room.price}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{room.location.address}, {room.location.city}</span>
                </div>

                <p className="text-gray-700 leading-relaxed">{room.description}</p>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2 text-gray-700">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Landlord Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Hosted by {room.landlord.name}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{room.landlord.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{room.landlord.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{room.landlord.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                {roomReviews.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h3>
                    <div className="space-y-4">
                      {roomReviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {review.tenantName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{review.tenantName}</div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Book this room</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {calculateStayDuration() > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Duration:</span>
                      <span className="font-medium">{calculateStayDuration()} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total:</span>
                      <span className="text-xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={() => onBook(room.id)}
                    disabled={!checkIn || !checkOut}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Book Now
                  </button>
                  
                  <button
                    onClick={() => onMessage(room.landlordId)}
                    className="w-full bg-white border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Message Host</span>
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                  You won't be charged yet. Final confirmation required.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;