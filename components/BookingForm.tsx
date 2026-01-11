import React, { useState } from 'react';
import { Button } from './Button';
import { Calendar, Users, Mail, User } from 'lucide-react';
import { BookingFormData } from '../types';

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert('Thank you! Our concierge will contact you shortly to confirm your booking.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Plan Your Escape</h2>
          <p className="text-slate-400">Ready to experience the Malnad magic? Send us a request and we'll handle the rest.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-slate-700 shadow-2xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-12 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-12 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input 
                  type="date" 
                  name="checkIn"
                  required
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-12 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <input 
                  type="date" 
                  name="checkOut"
                  required
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-12 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
               <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Guests</label>
               <div className="relative">
                <Users className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                <select 
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-12 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Special Requests</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Dietary restrictions, airport pickup, etc."
              />
            </div>

            <div className="col-span-1 md:col-span-2 mt-4">
              <Button type="submit" className="w-full text-lg py-4">Request Booking</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};