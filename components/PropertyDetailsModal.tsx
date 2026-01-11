
import React from 'react';
import { X, MapPin, Star, Users, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { Button } from './Button';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  const handleBookClick = () => {
    onClose();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 shrink-0">
          <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white truncate pr-4">{property.title}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[450px] p-2 md:p-4">
            <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group h-full">
              <img src={property.mainImage} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            {property.galleryImages.map((img, idx) => (
               <div key={idx} className={`relative rounded-xl overflow-hidden group h-full ${idx === 2 ? 'md:col-span-2 hidden md:block' : ''}`}>
                 <img src={img} alt={`Interior ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                    Premium Stay
                  </span>
                  <div className="flex items-center text-amber-500 dark:text-amber-400">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span className="font-bold text-slate-900 dark:text-white">{property.rating}</span>
                    <span className="text-slate-500 text-sm ml-1">(128 reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">{property.title}</h1>
                <div className="flex items-center text-slate-500 dark:text-slate-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.location}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400"><Users className="h-5 w-5" /></div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase">Guests</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{property.specs.guests}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400"><Bed className="h-5 w-5" /></div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase">Bedrooms</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{property.specs.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400"><Bath className="h-5 w-5" /></div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase">Bathrooms</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{property.specs.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400"><Square className="h-5 w-5" /></div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase">Area</p>
                    <p className="text-slate-900 dark:text-white font-semibold">{property.specs.size}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About this place</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sticky top-4 shadow-sm">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Price per night</p>
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-bold text-slate-900 dark:text-white">{property.price}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                   <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                     <span>Service fee</span>
                     <span>₹2,500</span>
                   </div>
                   <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                     <span>Cleaning fee</span>
                     <span>₹1,200</span>
                   </div>
                   <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                   <div className="flex justify-between text-slate-900 dark:text-white font-bold">
                     <span>Total before taxes</span>
                     <span>Request Quote</span>
                   </div>
                </div>

                <Button onClick={handleBookClick} className="w-full group">
                  Reserve Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-center text-xs text-slate-500 mt-4">
                  You won't be charged yet.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
