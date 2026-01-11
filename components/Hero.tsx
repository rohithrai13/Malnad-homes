
import React from 'react';
import { Button } from './Button';
import { ArrowRight, Upload, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenDashboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDashboard }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://imgs.search.brave.com/Bh2SzTElkTMQYmbnUSWW6SGkPJngoOS5bIrg_P1rPPw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmNk/bi5uZXdzYnl0ZXNh/cHAuY29tL2ltYWdl/cy9sOTA4MjAyMzA3/MTEyMTEwMDAuanBl/Zw" 
          alt="Malnad Landscape" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md hover:border-emerald-500/50 transition-colors cursor-default">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-100 font-semibold text-xs sm:text-sm tracking-wide uppercase">
            {t('hero.badge')}
          </span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
          {t('hero.title1')} <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 block mt-2 md:mt-0 md:inline">
            {t('hero.title2')}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed px-4">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" onClick={() => document.getElementById('places')?.scrollIntoView({behavior: 'smooth'})} className="w-full sm:w-auto">
            {t('hero.ctaFind')}
          </Button>
          <Button variant="outline" size="lg" className="group w-full sm:w-auto" onClick={onOpenDashboard}>
            <Upload className="mr-2 h-5 w-5" />
            {t('hero.ctaList')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden md:block animate-bounce">
        <div className="w-px h-24 bg-gradient-to-b from-emerald-500 to-transparent mx-auto mb-4"></div>
        <span className="vertical-text text-slate-500 text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
      </div>
    </section>
  );
};
