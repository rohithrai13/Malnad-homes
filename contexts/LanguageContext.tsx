
import React, { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Helper to access nested keys (e.g. 'nav.home')
  const t = (key: string): string => {
     const keys = key.split('.');
     let current: any = translations[language];
     for (const k of keys) {
       if (current[k] === undefined) {
         console.warn(`Missing translation for ${key} in ${language}`);
         return key; // Fallback
       }
       current = current[k];
     }
     return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
