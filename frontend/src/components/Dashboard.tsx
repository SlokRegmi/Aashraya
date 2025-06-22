import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Calendar, DollarSign, Users, 
  Heart, MessageCircle, Star, MapPin, Eye, Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRooms } from '../hooks/useRooms';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { rooms, favorites } = useRooms();
  const [activeTab, setActiveTab] = useState(user?.role === 'landlord' ? 'listings' : 'bookings');

  // Mock data for dashboard
  const mockBookings = [
    {
      id: '1',
      roomTitle: 'Cozy Downtown Studio',
      checkIn: '2024-02-01',
      checkOut: '2024-02-28',
      status: 'confirmed',
      totalPrice: 1200,
    },
    {
      id: '2',
      roomTitle: 'Shared Room in Modern Apartment',
      checkIn: '2024-03-01',
      checkOut: '2024-03-31',
      status: 'pending',
      totalPrice: 800,
    },
  ];

  const mockEarnings = {
    thisMonth: 3200,
    totalEarnings: 18500,
    totalBookings: 45,
    averageRating: 4.7,
  };

  const landlordTabs = [
    { id: 'listings', label: 'My Listings', icon: MapPin },
    { id: 'bookings', label: 'Booking Requests', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ];

  const tenantTabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'reviews', label: 'My Reviews', icon: Star },
  ];

  const tabs = user?.role === 'landlord' ? landlordTabs : tenantTabs;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderLandlordContent = () => {
    switch (activeTab) {
      case 'listings':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Listing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.slice(0, 3).map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{room.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{room.location.address}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-blue-600">${room.price}/month</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{room.rating}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button className="bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">This Month</span>
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">${mockEarnings.thisMonth}</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Earnings</span>
                  <DollarSign className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">${mockEarnings.totalEarnings}</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Bookings</span>
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{mockEarnings.totalBookings}</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Average Rating</span>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{mockEarnings.averageRating}</div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500">Content for {activeTab} coming soon...</div>
          </div>
        );
    }
  };

  const renderTenantContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
            
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{booking.roomTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Check-in:</span>
                      <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span>
                      <div>{new Date(booking.checkOut).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Total Price:</span>
                      <div className="text-lg font-bold text-blue-600">${booking.totalPrice}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                      View Details
                    </button>
                    {booking.status === 'confirmed' && (
                      <button className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        const favoriteRooms = rooms.filter(room => favorites.includes(room.id));
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
            
            {favoriteRooms.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500">No favorites yet. Start exploring rooms to add some!</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={room.images[0]}
                      alt={room.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{room.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{room.location.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">${room.price}/month</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{room.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500">Content for {activeTab} coming soon...</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'landlord' 
              ? 'Manage your listings and track your earnings' 
              : 'Track your bookings and manage your favorites'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {user?.role === 'landlord' ? renderLandlordContent() : renderTenantContent()}
      </div>
    </div>
  );
};

export default Dashboard;