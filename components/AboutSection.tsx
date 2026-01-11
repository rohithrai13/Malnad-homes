import React from 'react';
import { Rocket, Target, Heart, Globe, Building2, TrendingUp, Users, BookOpen, Briefcase, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-4">Our Purpose</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">More Than Just a Room</h3>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
            Malnad Homes is dedicated to solving the housing struggle for the thousands of students and professionals in the region. We believe your accommodation should be a launchpad for your education and career.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                  <BookOpen className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">For Students</h4>
                <p className="text-slate-400">
                  We understand the need for a quiet study environment, affordable mess facilities, and safety. Our "Student Haven" certified listings ensure you are close to campus and surrounded by a supportive community.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">For Professionals</h4>
                <p className="text-slate-400">
                  Relocating for work? We curate flats and rooms that offer privacy, commute ease, and modern amenities like power backup and high-speed internet, so you can focus on your career.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Users className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Community Living</h4>
                <p className="text-slate-400">
                   We foster safe neighborhoods where students and employees can coexist comfortably, respecting each other's need for rest and productivity.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-2xl blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
              alt="Student Community" 
              className="relative rounded-2xl border border-slate-700 shadow-2xl w-full object-cover h-[500px]" 
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-slate-700/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4">
              <Rocket className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Our Commitment</h3>
            <p className="max-w-2xl mx-auto text-slate-400">
              We bridge the gap between property owners and seekers, ensuring zero brokerage, fair rent, transparent agreements, and a hassle-free living experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <Coffee className="h-8 w-8 text-emerald-400 mb-4" />
              <h4 className="font-bold text-white mb-2">Comfort First</h4>
              <p className="text-sm text-slate-400">All listings are verified for essential comforts: good ventilation, clean water, and furnishing.</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
              <h4 className="font-bold text-white mb-2">Budget Friendly</h4>
              <p className="text-sm text-slate-400">We prioritize properties that offer the best value for money, keeping student and entry-level budgets in mind.</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <Heart className="h-8 w-8 text-pink-400 mb-4" />
              <h4 className="font-bold text-white mb-2">Safety Assured</h4>
              <p className="text-sm text-slate-400">Verified owners and secure locations to ensure peace of mind for you and your family back home.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};