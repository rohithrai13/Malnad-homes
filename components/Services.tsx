
import React from 'react';
import { MapPin, Star, LineChart, Zap, Search, ShieldCheck } from 'lucide-react';
import { ServiceType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => (
  <div className={`p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20 group hover:-translate-y-2 ${delay}`}>
    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
      <div className="text-emerald-400 group-hover:text-emerald-300">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3 font-serif">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      type: ServiceType.PLACES,
      icon: <MapPin className="h-7 w-7" />,
      title: t('services.verified'),
      description: t('services.verifiedDesc'),
      delay: "delay-0"
    },
    {
      type: ServiceType.RATINGS,
      icon: <Star className="h-7 w-7" />,
      title: t('services.reviews'),
      description: t('services.reviewsDesc'),
      delay: "delay-100"
    },
    {
      type: ServiceType.SEO,
      icon: <Search className="h-7 w-7" />,
      title: t('services.visibility'),
      description: t('services.visibilityDesc'),
      delay: "delay-200"
    },
    {
      type: ServiceType.OPTIMIZATION,
      icon: <LineChart className="h-7 w-7" />,
      title: t('services.occupancy'),
      description: t('services.occupancyDesc'),
      delay: "delay-300"
    },
    {
      type: ServiceType.AUTOMATION,
      icon: <Zap className="h-7 w-7" />,
      title: t('services.automation'),
      description: t('services.automationDesc'),
      delay: "delay-400"
    },
    {
      type: ServiceType.AUTOMATION,
      icon: <ShieldCheck className="h-7 w-7" />,
      title: t('services.agreements'),
      description: t('services.agreementsDesc'),
      delay: "delay-500"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-4">{t('services.header')}</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t('services.title')}</h3>
          <p className="max-w-2xl mx-auto text-slate-400">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
