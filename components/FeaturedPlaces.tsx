
import React, { useState } from 'react';
import { MapPin, Star, User, ArrowRight, Heart } from 'lucide-react';
import { Property } from '../types';
import { properties } from '../data/properties';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

interface FeaturedPlacesProps {
  onViewAllClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
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
      className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 group cursor-pointer animate-in fade-in zoom-in-95 relative"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={property.mainImage} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        
        {/* Rating Badge - Moved to Top Left */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 border border-slate-700">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{property.rating}</span>
        </div>

        {/* Favorite Button - Top Right */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 transition-all group/btn z-10"
        >
          <Heart className={`h-5 w-5 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        <div className="absolute bottom-4 left-4 flex gap-2">
           <span className="bg-emerald-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
              {property.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          {property.location}
        </div>
        <h3 className="text-xl font-serif font-bold text-white mb-2">{property.title}</h3>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-slate-400 text-sm">Rent per month</p>
            <p className="text-white font-bold text-lg">{property.price} <span className="text-xs font-normal text-slate-500">/ mo</span></p>
          </div>
          <button className="p-2 rounded-full bg-slate-800 group-hover:bg-emerald-600 text-emerald-400 group-hover:text-white transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeaturedPlaces: React.FC<FeaturedPlacesProps> = ({ onViewAllClick }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Only show first 6 on the home page
  const displayedPlaces = properties.slice(0, 6);

  return (
    <section id="places" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Recommended Stays</h2>
            <p className="text-slate-400 text-lg">Discover top-rated accommodations tailored for your budget and lifestyle. From shared student dorms to private employee suites.</p>
          </div>
          <button 
            onClick={onViewAllClick}
            className="hidden md:flex items-center text-emerald-400 hover:text-emerald-300 font-semibold transition-colors mt-6 md:mt-0"
          >
            View All Properties <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPlaces.map((place) => (
            <PropertyCard 
              key={place.id} 
              property={place} 
              onClick={() => setSelectedProperty(place)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <button 
             onClick={onViewAllClick}
             className="text-emerald-400 font-semibold flex items-center justify-center mx-auto"
           >
             View All Properties <ArrowRight className="ml-2 h-4 w-4" />
           </button>
        </div>
      </div>

      <PropertyDetailsModal 
        isOpen={!!selectedProperty} 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </section>
  );
};
