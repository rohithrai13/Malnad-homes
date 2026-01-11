
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Filter, MapPin, Search, Star, User, ChevronDown, Navigation, Heart } from 'lucide-react';
import { properties } from '../data/properties';
import { Property, GuestType } from '../types';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { Button } from './Button';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

interface AllPropertiesPageProps {
  onBack: () => void;
  initialSearchState?: {
    query: string;
    location: { lat: number; lng: number } | null;
  };
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const PropertyCard: React.FC<{ property: Property, onClick: () => void, distance?: number }> = ({ property, onClick, distance }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useUI();
  const favorite = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    toggleFavorite(property.id);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-emerald-900/10 relative"
    >
      <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img src={property.mainImage} alt={property.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        
        {/* Rating - Moved Top Left */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 border border-slate-700">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{property.rating}</span>
        </div>

        {/* Favorite Button - Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 transition-all z-10"
        >
          <Heart className={`h-4 w-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
          <span className="bg-emerald-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
              {property.category}
          </span>
          {typeof distance === 'number' && (
             <span className="bg-blue-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
               <Navigation className="h-2 w-2" /> {distance.toFixed(1)} km
             </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
          <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
          {property.location}
        </div>
        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white mb-3 line-clamp-1">{property.title}</h3>
        <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4">
          <div>
            <p className="text-slate-900 dark:text-white font-bold text-lg">{property.price}</p>
            <p className="text-slate-500 text-xs">per night</p>
          </div>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 text-sm font-semibold flex items-center">
              Details <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const AllPropertiesPage: React.FC<AllPropertiesPageProps> = ({ onBack, initialSearchState }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState(initialSearchState?.query || '');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedGender, setSelectedGender] = useState<GuestType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(initialSearchState?.location || null);

  // Sync state with props if they change (e.g. searching from Navbar while already on this page)
  useEffect(() => {
    if (initialSearchState) {
      setSearchTerm(initialSearchState.query);
      setUserLocation(initialSearchState.location);
    }
  }, [initialSearchState]);

  // Derived lists for dropdowns
  const areas = useMemo(() => ['All Areas', ...Array.from(new Set(properties.map(p => p.location)))], []);
  const categories = useMemo(() => ['All Types', ...Array.from(new Set(properties.map(p => p.category)))], []);

  const filteredProperties = useMemo(() => {
    let result = properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === 'All Areas' || p.location === selectedArea;
      const matchesPrice = p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1];
      const matchesCategory = selectedCategory === 'All Types' || p.category === selectedCategory;
      
      const matchesGender = selectedGender === 'All' || 
                            p.allowedGuest === 'Any' || 
                            p.allowedGuest === selectedGender;

      return matchesSearch && matchesArea && matchesPrice && matchesCategory && matchesGender;
    });

    if (userLocation) {
      // If location is active, add distance property and sort by it
      result = result.map(p => ({
        ...p,
        distance: calculateDistance(userLocation.lat, userLocation.lng, p.coordinates.lat, p.coordinates.lng)
      })).sort((a: any, b: any) => a.distance - b.distance);
    }

    return result;
  }, [searchTerm, selectedArea, priceRange, selectedGender, selectedCategory, userLocation]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 animate-in fade-in slide-in-from-bottom-4 text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </button>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
            {userLocation ? 'Properties Near You' : 'Find Your Perfect Stay'}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-72 flex-shrink-0 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-emerald-500 font-bold uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800 pb-4">
                <Filter className="h-4 w-4" /> Filters
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Area */}
              <div className="mb-6">
                <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Location</label>
                <div className="relative">
                   <select 
                     value={selectedArea}
                     onChange={(e) => setSelectedArea(e.target.value)}
                     className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                   >
                     {areas.map(area => <option key={area} value={area}>{area}</option>)}
                   </select>
                   <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Property Type</label>
                <div className="relative">
                   <select 
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                     className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                   >
                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                   </select>
                   <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Gender / Guest Type */}
              <div className="mb-6">
                <label className="text-xs text-slate-500 font-bold uppercase mb-2 block">Who's Staying?</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['All', 'Family', 'Male', 'Female'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedGender(type)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                        selectedGender === type 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                          : 'bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {type === 'All' ? 'Anyone' : type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                   <label className="text-xs text-slate-500 font-bold uppercase">Max Price</label>
                   <span className="text-xs text-slate-900 dark:text-white font-mono">₹{priceRange[1]}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹500</span>
                  <span>₹10k+</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 space-y-3">
                {userLocation && (
                  <button 
                    onClick={() => setUserLocation(null)}
                    className="w-full py-2 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation className="h-3 w-3" /> Clear GPS Filter
                  </button>
                )}
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedArea('All Areas');
                    setSelectedCategory('All Types');
                    setSelectedGender('All');
                    setPriceRange([0, 10000]);
                    setUserLocation(null);
                  }}
                  className="w-full py-2 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
               <p className="text-slate-500 dark:text-slate-400 text-sm">Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProperties.length}</span> properties</p>
               {userLocation && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Sorted by Distance</span>}
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property: any) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onClick={() => setSelectedProperty(property)}
                    distance={property.distance}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400 dark:text-slate-600" />
                 </div>
                 <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2">No matches found</h3>
                 <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <PropertyDetailsModal 
        isOpen={!!selectedProperty} 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </div>
  );
};
