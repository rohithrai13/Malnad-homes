
import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, XCircle, AlertCircle, Building, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';
import { Property } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadPendingProperties();
    }
  }, [isOpen]);

  const loadPendingProperties = () => {
    const allProps = JSON.parse(localStorage.getItem('malnad_dynamic_properties') || '[]');
    const pending = allProps.filter((p: Property) => p.status === 'pending');
    setPendingProperties(pending);
  };

  const handleUpdateStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    const allProps = JSON.parse(localStorage.getItem('malnad_dynamic_properties') || '[]');
    const updatedProps = allProps.map((p: Property) => {
        if (p.id === id) {
            return { ...p, status: newStatus };
        }
        return p;
    });
    localStorage.setItem('malnad_dynamic_properties', JSON.stringify(updatedProps));
    loadPendingProperties();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full md:max-w-5xl h-full md:h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 md:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-600/30">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Review Property Submissions</p>
                </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <X className="h-6 w-6" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white dark:bg-slate-900">
            {pendingProperties.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <ShieldCheck className="h-16 w-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No pending submissions</p>
                    <p className="text-sm">All caught up! New listings will appear here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                         <span>Pending Approvals ({pendingProperties.length})</span>
                    </div>
                    {pendingProperties.map((prop) => (
                        <div key={prop.id} className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm">
                            <div className="w-full md:w-64 h-48 md:h-auto relative bg-slate-200 dark:bg-slate-800">
                                <img src={prop.mainImage} alt={prop.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 left-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded uppercase">Pending</div>
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{prop.title}</h3>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{prop.price}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {prop.location}</span>
                                        <span className="flex items-center gap-1"><Building className="h-3 w-3" /> {prop.category}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">{prop.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {prop.amenities.slice(0, 4).map((amenity, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded text-xs text-slate-600 dark:text-slate-300">{amenity}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/50">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20"
                                        onClick={() => handleUpdateStatus(prop.id, 'rejected')}
                                    >
                                        <XCircle className="h-4 w-4 mr-2" /> Reject
                                    </Button>
                                    <Button 
                                        size="sm"
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white"
                                        onClick={() => handleUpdateStatus(prop.id, 'approved')}
                                    >
                                        <Check className="h-4 w-4 mr-2" /> Approve Listing
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
