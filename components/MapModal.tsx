import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Navigation, Star, ArrowRight, Building } from 'lucide-react';
import { properties } from '../data/properties';
import { Property } from '../types';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import L from 'leaflet';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetails, setShowDetails] = useState<Property | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Puttur Center
  const center = { lat: 12.7685, lng: 75.2023 };

  useEffect(() => {
    if (isOpen && mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize Map
      const map = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      // 1. Satellite Base Layer (Esri World Imagery)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      }).addTo(map);

      // 2. Labels Overlay (Esri World Boundaries and Places)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      }).addTo(map);

      // Add Zoom Controls to bottom-right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Custom Icon
      const createCustomIcon = (price: string) => L.divIcon({
        className: 'custom-pin',
        html: `
          <div class="relative group cursor-pointer">
             <div class="absolute -top-10 -left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
               ${price}
             </div>
             <div class="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-black/50 flex items-center justify-center text-white transform hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
             </div>
             <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-transparent mx-auto opacity-50"></div>
          </div>
        `,
        iconSize: [32, 48],
        iconAnchor: [16, 48]
      });

      // Add Markers
      properties.forEach(prop => {
        const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], {
          icon: createCustomIcon(prop.price)
        })
        .addTo(map)
        .on('click', () => {
          setSelectedProperty(prop);
          map.flyTo([prop.coordinates.lat, prop.coordinates.lng], 16, { duration: 1.5 });
        });
        
        markersRef.current.push(marker);
      });

      mapInstanceRef.current = map;
    }

    // Cleanup function
    return () => {
      // Map cleanup handled by parent unmounting usually, or explicit remove if needed
    };
  }, [isOpen]);

  // Handle Close
  const handleClose = () => {
     if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
     }
     setSelectedProperty(null);
     onClose();
  };

  const calculateDistance = (p: Property) => {
    const R = 6371;
    const dLat = (p.coordinates.lat - center.lat) * (Math.PI / 180);
    const dLon = (p.coordinates.lng - center.lng) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(center.lat * (Math.PI / 180)) * Math.cos(p.coordinates.lat * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const d = R * c; 
    return d.toFixed(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      ></div>
      
      <div className="relative w-full h-full md:rounded-3xl bg-slate-900 shadow-2xl overflow-hidden flex flex-col md:border border-slate-700 animate-in zoom-in-95 duration-300">
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 z-[400] p-4 md:p-6 flex justify-between items-start pointer-events-none">
          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" /> Puttur City
            </h2>
            <div className="flex items-center gap-2 text-slate-400 mt-1">
              <span className="text-xs uppercase font-bold tracking-wider">Satellite View</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="text-xs">{properties.length} Properties</span>
            </div>
          </div>

          <button 
            onClick={handleClose} 
            className="pointer-events-auto p-2 bg-slate-900/90 backdrop-blur-md text-white rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors border border-slate-700 shadow-xl"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Map Container */}
        <div className="relative flex-1 bg-[#0f172a] z-0">
           <div ref={mapContainerRef} className="w-full h-full outline-none" style={{ background: '#0f172a' }}></div>
           
           {!mapInstanceRef.current && (
             <div className="absolute inset-0 flex items-center justify-center text-slate-500">
               <span className="animate-pulse">Loading Map Data...</span>
             </div>
           )}
        </div>

        {/* Selected Property Overlay Card */}
        {selectedProperty && (
          <div className="absolute bottom-10 left-0 right-0 md:left-6 md:bottom-6 md:right-auto md:w-96 p-4 z-[400] animate-in slide-in-from-bottom-10 duration-300">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-48">
                <img src={selectedProperty.mainImage} alt={selectedProperty.title} className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedProperty(null); }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-2">
                   <span className="bg-emerald-600/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                      {selectedProperty.category}
                   </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white leading-tight mb-1">{selectedProperty.title}</h3>
                    <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-wider">
                      <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                      {selectedProperty.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-slate-800 px-2 py-1 rounded text-amber-400 text-xs font-bold">
                    <Star className="h-3 w-3 fill-amber-400 mr-1" />
                    {selectedProperty.rating}
                  </div>
                </div>

                <div className="flex items-center gap-4 py-3 border-y border-slate-800/50 my-3">
                   <div className="flex items-center gap-2 text-slate-300 text-xs">
                     <div className="p-1.5 bg-slate-800 rounded-md text-emerald-400"><Navigation className="h-3 w-3" /></div>
                     <span>{calculateDistance(selectedProperty)} km to Centre</span>
                   </div>
                   <div className="flex items-center gap-2 text-slate-300 text-xs">
                     <div className="p-1.5 bg-slate-800 rounded-md text-emerald-400"><Building className="h-3 w-3" /></div>
                     <span>{selectedProperty.allowedGuest === 'Any' ? 'Everyone' : selectedProperty.allowedGuest}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xl font-bold text-white">{selectedProperty.price}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Per Month</p>
                  </div>
                  <button 
                    onClick={() => setShowDetails(selectedProperty)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <PropertyDetailsModal 
        isOpen={!!showDetails} 
        property={showDetails} 
        onClose={() => setShowDetails(null)} 
      />
    </div>
  );
};