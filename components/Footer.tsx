
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-4 mb-8 group">
              {/* Modern Monogram Icon */}
              <div className="relative h-14 w-14 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-2.5 shadow-2xl shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                 <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                    <path d="M4 28L12 14L20 28M14 28L22 14L36 28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="28" cy="12" r="3.5" fill="#fbbf24" />
                 </svg>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-serif text-2xl font-bold text-white tracking-wide">
                  Malnad<span className="font-sans font-black text-emerald-500 uppercase tracking-widest ml-1 text-base">Homes</span>
                </span>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">AGENCY PORTFOLIO</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8 pr-4">
              {t('footer.tagline')} Malnad's premier platform for verified student and professional accommodations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.press')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.sustainability')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{t('footer.services')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.listingMgmt')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.workflowAuto')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.seo')}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t('footer.concierge')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <div className="p-2 rounded-lg bg-emerald-500/10 mr-3 shrink-0"><MapPin className="h-4 w-4 text-emerald-500" /></div>
                <span>12 Estate Road, Chikmagalur, Karnataka, India 577101</span>
              </li>
              <li className="flex items-center">
                <div className="p-2 rounded-lg bg-emerald-500/10 mr-3 shrink-0"><Phone className="h-4 w-4 text-emerald-500" /></div>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <div className="p-2 rounded-lg bg-emerald-500/10 mr-3 shrink-0"><Mail className="h-4 w-4 text-emerald-500" /></div>
                <span>hello@malnadhomes.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
          <p className="text-slate-500">© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
