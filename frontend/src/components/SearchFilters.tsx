import React, { useState } from 'react';

import type { SearchFilters as Filters } from '../types';

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const amenitiesList = ['Wi-Fi', 'AC', 'Parking', 'Laundry', 'Kitchen', 'Gym', 'Pool', 'Balcony', 'Study Area', 'Concierge'];

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: Filters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    setShowFilters(false);
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = localFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    setLocalFilters({ ...localFilters, amenities: newAmenities });
  };

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof Filters];
    return value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0);
  }).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by location..."
              value={localFilters.location || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={localFilters.minPrice || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={localFilters.maxPrice || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select
                  value={localFilters.roomType || ''}
                  onChange={(e) => setLocalFilters({ ...localFilters, roomType: e.target.value as 'single' | 'shared' | 'apartment' || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="single">Single Room</option>
                  <option value="shared">Shared Room</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={localFilters.sortBy || ''}
                  onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value as any || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(localFilters.amenities || []).includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleApplyFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;