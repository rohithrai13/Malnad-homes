
import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Heart, Clock, Camera, Save, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';
import { properties } from '../data/properties';
import { Property, Booking } from '../types';
import { PropertyDetailsModal } from './PropertyDetailsModal';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  const { user, updateProfile } = useAuth();
  const { favorites: favoriteIds, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'activity'>('profile');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Edit Profile State
  const [name, setName] = useState(user?.name || '');
  const [photoUrl, setPhotoUrl] = useState(user?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Computed Favorites Data
  const savedProperties = properties.filter(p => favoriteIds.includes(p.id));

  // Mock Activity Data
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Simulate activity
    setBookings([
      {
        id: 'bk_1',
        propertyId: '1',
        propertyName: 'Balnad Heritage Co-Living',
        checkIn: '2023-10-10',
        checkOut: '2023-11-10',
        status: 'confirmed',
        totalPrice: '₹8,500'
      },
      {
        id: 'bk_2',
        propertyId: '3',
        propertyName: 'Nehrunagar Student Haven',
        checkIn: '2023-08-01',
        checkOut: '2023-08-05',
        status: 'cancelled',
        totalPrice: '₹1,200'
      }
    ]);
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
        await updateProfile({ name, avatar: photoUrl });
        setIsEditing(false);
    } catch (err) {
        alert("Failed to update profile");
    } finally {
        setSaveLoading(false);
    }
  };

  const handleRemoveFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 animate-in fade-in slide-in-from-bottom-4 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img 
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-xl"
                />
                <button 
                  onClick={() => { setActiveTab('profile'); setIsEditing(true); }}
                  className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-400 shadow-lg"
                >
                   <Camera className="h-3 w-3" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
              <p className="text-slate-500 text-sm">{user?.email}</p>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'profile' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'}`}
              >
                <User className="h-5 w-5" /> Profile Info
              </button>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'favorites' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'}`}
              >
                <Heart className="h-5 w-5" /> Favorites
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'activity' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'}`}
              >
                <Clock className="h-5 w-5" /> Booking History
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-3">
            
            {/* PROFILE EDIT TAB */}
            {activeTab === 'profile' && (
               <div className="space-y-6">
                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
                        {!isEditing && (
                            <button onClick={() => setIsEditing(true)} className="text-emerald-500 dark:text-emerald-400 text-sm font-semibold hover:underline">Edit</button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-1 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                <input 
                                    type="email" 
                                    value={user?.email} 
                                    disabled
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-500 dark:text-slate-400 opacity-50 cursor-not-allowed outline-none"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Profile Photo URL</label>
                                <input 
                                    type="text" 
                                    value={photoUrl} 
                                    onChange={e => setPhotoUrl(e.target.value)}
                                    disabled={!isEditing}
                                    placeholder="https://..."
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed focus:ring-1 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                        {isEditing && (
                            <div className="flex gap-4 justify-end">
                                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit" isLoading={saveLoading}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
                            </div>
                        )}
                    </form>
                 </div>
               </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === 'favorites' && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Saved Properties</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedProperties.map(prop => (
                            <div key={prop.id} onClick={() => setSelectedProperty(prop)} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 cursor-pointer group shadow-sm hover:shadow-md transition-all relative">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={prop.mainImage} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <button 
                                        onClick={(e) => handleRemoveFavorite(e, prop.id)}
                                        className="absolute top-2 right-2 p-1.5 bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-md rounded-full text-red-500 transition-colors z-10"
                                    >
                                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{prop.title}</h4>
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-3">
                                        <MapPin className="h-3 w-3 mr-1" /> {prop.location}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{prop.price}</span>
                                        <span className="text-xs text-slate-500">{prop.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {savedProperties.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>No favorites saved yet.</p>
                            <p className="text-sm mt-2">Click the heart icon on any property to save it here.</p>
                        </div>
                    )}
                </div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Booking History</h3>
                    <div className="space-y-4">
                        {bookings.map(booking => (
                            <div key={booking.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{booking.propertyName}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                    </p>
                                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-2 uppercase tracking-wide">Ref: {booking.id.toUpperCase()}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 ${
                                        booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' :
                                        booking.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500' :
                                        'bg-red-500/10 text-red-600 dark:text-red-500'
                                    }`}>
                                        {booking.status}
                                    </span>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">{booking.totalPrice}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
