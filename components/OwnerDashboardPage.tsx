
import React, { useState, useRef, useEffect } from 'react';
import { Upload, List, ChevronRight, BarChart3, CheckCircle, Sparkles, Copy, Check, Home, Image as ImageIcon, Loader2, ArrowLeft, ArrowUpRight, TrendingUp, Users, Eye, Plus, LayoutGrid, Info, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './Button';
import { generateListingDescription } from '../services/geminiService';
import { Property, PropertyCategory } from '../types';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface OwnerDashboardPageProps {
  onBack: () => void;
}

const COMMON_AMENITIES = [
  'Wi-Fi', 'AC', 'Parking', 'Furnished', 'Attached Bathroom', 
  'Geyser', 'Power Backup', 'Laundry', 'CCTV', 'Meals Included',
  'Study Desk', 'Gym Access', 'Housekeeping', 'Filtered Water'
];

export const OwnerDashboardPage: React.FC<OwnerDashboardPageProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stats' | 'upload' | 'listings' | 'optimizer'>('stats');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Villa',
    price: '',
    location: '',
    description: '',
    imageUrl: '',
    amenities: [] as string[]
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [aiPropertyName, setAiPropertyName] = useState('');
  const [aiFeatures, setAiFeatures] = useState('');
  const [aiVibe, setAiVibe] = useState('Professional & Quiet');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCopied, setAiCopied] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `property_images/${user?.id}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData(prev => ({ ...prev, imageUrl: downloadURL }));
    } catch (error) {
      alert("Failed to upload image.");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Upload an image first.");
    setLoading(true);
    const newProperty: Property = {
        id: `prop_${Date.now()}`,
        title: formData.title,
        category: formData.type as PropertyCategory,
        location: formData.location,
        price: `₹${formData.price}`,
        priceValue: parseInt(formData.price) || 0,
        rating: 0,
        mainImage: formData.imageUrl,
        galleryImages: [formData.imageUrl],
        description: formData.description,
        amenities: formData.amenities,
        allowedGuest: 'Any',
        specs: { guests: 2, bedrooms: 1, bathrooms: 1, size: 'Unknown' },
        coordinates: { lat: 12.7685, lng: 75.2023 },
        status: 'pending' 
    };
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('malnad_dynamic_properties') || '[]');
      localStorage.setItem('malnad_dynamic_properties', JSON.stringify([...existing, newProperty]));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ title: '', type: 'Villa', price: '', location: '', description: '', imageUrl: '', amenities: [] });
        setImagePreview(null);
        setActiveTab('listings');
      }, 2000);
    }, 1500);
  };

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPropertyName || !aiFeatures) return;
    setAiLoading(true);
    const desc = await generateListingDescription(aiPropertyName, aiFeatures, aiVibe);
    setAiResult(desc);
    setAiLoading(false);
  };

  const copyAiToClipboard = () => {
    navigator.clipboard.writeText(aiResult);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  const myProperties = (JSON.parse(localStorage.getItem('malnad_dynamic_properties') || '[]') as Property[]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-32 pb-24 md:pb-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern SaaS Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 dark:border-slate-800 pb-10">
          <div className="flex items-center gap-5">
            <button 
              onClick={onBack}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-emerald-500 transition-all shadow-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                 <LayoutGrid className="h-4 w-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('owner.title')}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Owner Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button onClick={() => setActiveTab('upload')} size="md" className="rounded-2xl px-8 shadow-xl shadow-emerald-900/20">
                <Plus className="h-5 w-5 mr-2" /> List Property
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Dashboard Navigation (Desktop Sidebar / Mobile Bottom Bar) */}
          <aside className="lg:col-span-3">
            <nav className="hidden lg:flex flex-col space-y-2 sticky top-32">
               {[
                 { id: 'stats', label: t('owner.tabAnalytics'), icon: BarChart3 },
                 { id: 'upload', label: t('owner.tabUpload'), icon: Upload },
                 { id: 'listings', label: t('owner.tabListings'), icon: List },
                 { id: 'optimizer', label: t('owner.tabOptimizer'), icon: Sparkles }
               ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                     activeTab === tab.id 
                       ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/30 -translate-x-1' 
                       : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                   }`}
                 >
                   <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-emerald-500'}`} />
                   {tab.label}
                 </button>
               ))}
            </nav>

            {/* Mobile Bottom Navigation Chips */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-[60] flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-1.5 shadow-2xl overflow-x-auto scrollbar-hide gap-1">
               {[
                 { id: 'stats', label: 'Stats', icon: BarChart3 },
                 { id: 'upload', label: 'Upload', icon: Upload },
                 { id: 'listings', label: 'My Lists', icon: List },
                 { id: 'optimizer', label: 'AI Tool', icon: Sparkles }
               ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl transition-all whitespace-nowrap ${
                     activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500'
                   }`}
                 >
                   <tab.icon className="h-4 w-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                 </button>
               ))}
            </div>
          </aside>

          {/* Tab Content Panel */}
          <div className="lg:col-span-9">
            
            {activeTab === 'stats' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Eye className="h-20 w-20" />
                       </div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('owner.statsViews')}</p>
                       <div className="flex items-end justify-between">
                          <h4 className="text-4xl font-bold text-slate-900 dark:text-white">1,284</h4>
                          <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                             <TrendingUp className="h-3 w-3" /> +12%
                          </span>
                       </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Users className="h-20 w-20" />
                       </div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('owner.statsInquiries')}</p>
                       <div className="flex items-end justify-between">
                          <h4 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">42</h4>
                          <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                             <TrendingUp className="h-3 w-3" /> +5%
                          </span>
                       </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                          <TrendingUp className="h-20 w-20" />
                       </div>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">{t('owner.statsRevenue')}</p>
                       <div className="flex items-end justify-between">
                          <h4 className="text-4xl font-bold text-slate-900 dark:text-white">₹0</h4>
                          <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">New</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-h-[400px] text-center shadow-xl shadow-slate-950/5">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center mb-6 text-slate-200 dark:text-slate-800 shadow-inner">
                       <BarChart3 className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-3">Live Performance Data</h3>
                    <p className="max-w-md text-slate-500 leading-relaxed mb-8">Detailed graphs and revenue tracking will activate once your properties are approved and verified by our team.</p>
                    <div className="flex gap-4">
                       <button onClick={() => setActiveTab('upload')} className="text-xs font-black uppercase tracking-widest text-emerald-600 hover:underline">Launch First Listing</button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'upload' && (
               <div className="animate-in fade-in slide-in-from-right-4 space-y-8">
                  {success ? (
                    <div className="bg-emerald-600 rounded-[2.5rem] p-20 text-center shadow-2xl shadow-emerald-900/30 flex flex-col items-center justify-center animate-in zoom-in">
                       <div className="w-24 h-24 bg-white/20 text-white rounded-full flex items-center justify-center mb-8 border border-white/40 shadow-xl backdrop-blur-md">
                          <CheckCircle className="h-12 w-12" />
                       </div>
                       <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Submission Received</h2>
                       <p className="text-emerald-100 max-w-sm text-lg leading-relaxed">{t('owner.uploadSuccessDesc')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                          <div className="flex items-center gap-4 mb-10 border-b border-slate-100 dark:border-slate-800 pb-6">
                             <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center font-black">01</div>
                             <div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">{t('owner.basicInfo')}</h3>
                                <p className="text-sm text-slate-500">Core details of your property.</p>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.propTitle')}</label>
                                <input 
                                   type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-300"
                                   placeholder="e.g. Balnad Executive PG"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.propType')}</label>
                                <div className="relative">
                                   <select 
                                      value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500/50 outline-none appearance-none cursor-pointer"
                                   >
                                      <option value="Villa">Villa / Homestay</option>
                                      <option value="Apartment">Apartment / Flat</option>
                                      <option value="PG">PG (Paying Guest)</option>
                                      <option value="Hostel">Hostel / Dorm</option>
                                   </select>
                                   <ChevronRight className="absolute right-6 top-5 h-5 w-5 text-slate-400 rotate-90" />
                                </div>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.price')} (₹ / Mo)</label>
                                <input 
                                   type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-300"
                                   placeholder="8500"
                                />
                             </div>
                             <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.location')}</label>
                                <input 
                                   type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-300"
                                   placeholder="e.g. Darbe Cross, Puttur"
                                />
                             </div>
                          </div>
                       </div>

                       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                          <div className="flex items-center gap-4 mb-10 border-b border-slate-100 dark:border-slate-800 pb-6">
                             <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center font-black">02</div>
                             <div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">{t('owner.image')}</h3>
                                <p className="text-sm text-slate-500">Visuals for prospective tenants.</p>
                             </div>
                          </div>
                          
                          <div onClick={() => fileInputRef.current?.click()} className="relative w-full h-80 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden group bg-slate-50 dark:bg-slate-950/50">
                             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                             {imagePreview ? (
                                <>
                                  <img src={imagePreview} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <div className="flex flex-col items-center gap-3 text-white">
                                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-full"><Upload className="h-6 w-6" /></div>
                                        <span className="text-sm font-black uppercase tracking-widest">Replace Media</span>
                                     </div>
                                  </div>
                                  {uploadingImage && <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500 h-10 w-10" /></div>}
                                </>
                             ) : (
                                <div className="text-center group-hover:scale-110 transition-transform">
                                   <div className="p-6 bg-emerald-500/10 rounded-full mb-4 inline-block"><ImageIcon className="h-10 w-10 text-emerald-500" /></div>
                                   <p className="text-sm font-black uppercase tracking-widest text-slate-500">{t('owner.imageDesc')}</p>
                                </div>
                             )}
                          </div>
                       </div>

                       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                          <div className="flex items-center gap-4 mb-10 border-b border-slate-100 dark:border-slate-800 pb-6">
                             <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center font-black">03</div>
                             <div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Amenities & Story</h3>
                                <p className="text-sm text-slate-500">Highlight features and describe the experience.</p>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                             {COMMON_AMENITIES.map(amenity => (
                                <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)}
                                   className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                      formData.amenities.includes(amenity) 
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20' 
                                        : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-emerald-500/50'
                                   }`}
                                >
                                   {amenity}
                                </button>
                             ))}
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.description')}</label>
                             <textarea 
                                rows={6} required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none leading-relaxed"
                                placeholder="Write about safety, food quality, or proximity to landmarks..."
                             />
                          </div>
                       </div>

                       <div className="flex flex-col md:flex-row justify-end gap-4 pt-4">
                          <Button type="button" variant="outline" className="px-10 rounded-2xl text-slate-400" onClick={() => setFormData({title: '', type: 'Villa', price: '', location: '', description: '', imageUrl: '', amenities: []})}>
                             {t('owner.btnReset')}
                          </Button>
                          <Button type="submit" size="lg" className="px-12 rounded-2xl shadow-2xl shadow-emerald-900/30 font-black uppercase tracking-widest" isLoading={loading || uploadingImage} disabled={!formData.imageUrl}>
                             Submit for Agency Review
                          </Button>
                       </div>
                    </form>
                  )}
               </div>
            )}

            {activeTab === 'listings' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  {myProperties.length > 0 ? myProperties.map((prop, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 flex items-center justify-between shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default">
                       <div className="flex items-center gap-6 min-w-0">
                          <div className="relative shrink-0">
                             <img src={prop.mainImage} className="w-24 h-24 rounded-3xl object-cover shadow-lg" />
                             <div className={`absolute -top-2 -left-2 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest text-white shadow-lg ${prop.status === 'approved' ? 'bg-emerald-600' : 'bg-amber-500'}`}>
                                {prop.status}
                             </div>
                          </div>
                          <div className="min-w-0">
                             <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-white truncate">{prop.title}</h4>
                             <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                                {/* Fix: MapPin is now imported from lucide-react */}
                                <MapPin className="h-3.5 w-3.5 text-emerald-500" /> {prop.location}
                             </p>
                             <div className="flex items-center gap-3 mt-4">
                                <span className="text-emerald-600 dark:text-emerald-400 font-black text-lg">{prop.price}</span>
                                <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{prop.category}</span>
                             </div>
                          </div>
                       </div>
                       <button className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-slate-400 hover:text-emerald-500 transition-colors group-hover:bg-emerald-500/10">
                          <ArrowUpRight className="h-6 w-6" />
                       </button>
                    </div>
                  )) : (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-20 text-center shadow-sm">
                       <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center mb-6 mx-auto text-slate-200 shadow-inner">
                          <List className="h-10 w-10" />
                       </div>
                       <h4 className="text-2xl font-serif font-bold mb-3">{t('owner.noListings')}</h4>
                       <p className="text-slate-500 max-w-sm mx-auto mb-10">Your verified listings will appear here once approved by our agency team.</p>
                       <Button onClick={() => setActiveTab('upload')} className="rounded-2xl px-10">{t('owner.createFirst')}</Button>
                    </div>
                  )}
               </div>
            )}

            {activeTab === 'optimizer' && (
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-12 shadow-sm animate-in fade-in slide-in-from-right-4">
                  <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="max-w-xl">
                        <span className="bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block border border-amber-500/20">{t('owner.aiBadge')}</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{t('owner.aiTitle')}</h2>
                        <p className="text-slate-500 text-lg leading-relaxed">{t('owner.aiDesc')}</p>
                     </div>
                     <Sparkles className="h-16 w-16 text-amber-500/20 hidden md:block" />
                  </div>

                  <form onSubmit={handleAiGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.aiNameLabel')}</label>
                        <input type="text" value={aiPropertyName} onChange={e => setAiPropertyName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Royal Oaks Homestay" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.aiTenantLabel')}</label>
                        <div className="relative">
                           <select value={aiVibe} onChange={e => setAiVibe(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-6 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer">
                              <option>Professional & Quiet</option>
                              <option>Student Friendly & Budget</option>
                              <option>Family & Safe</option>
                           </select>
                           <ChevronRight className="absolute right-6 top-4.5 h-6 w-6 text-slate-400 rotate-90" />
                        </div>
                     </div>
                     <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t('owner.aiFeaturesLabel')}</label>
                        <textarea rows={4} value={aiFeatures} onChange={e => setAiFeatures(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-5 px-6 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none resize-none leading-relaxed" placeholder="e.g. Near St. Philomena College, 100Mbps Wifi, Pure Veg Mess available..." />
                     </div>
                     <Button type="submit" isLoading={aiLoading} className="md:col-span-2 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-900/20 bg-amber-600 hover:bg-amber-500 border-transparent">{t('owner.aiBtn')}</Button>
                  </form>

                  {aiResult && (
                    <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-5">
                       <div className="flex justify-between items-center mb-6">
                          <h4 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
                             <Check className="h-4 w-4" /> AI Result Ready
                          </h4>
                          <button onClick={copyAiToClipboard} className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors text-xs font-black uppercase tracking-widest">
                             {aiCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                             {aiCopied ? 'Copied' : 'Copy Text'}
                          </button>
                       </div>
                       <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 relative group">
                          <Info className="absolute top-6 right-6 h-5 w-5 text-slate-200 dark:text-slate-800" />
                          <p className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 italic">"{aiResult}"</p>
                       </div>
                    </div>
                  )}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
