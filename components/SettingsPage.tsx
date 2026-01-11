
import React from 'react';
import { ArrowLeft, Globe, Moon, Sun, Trash2, Bell, Shield, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';
import { Language, AppTheme } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsPageProps {
  onBack: () => void;
  currentTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, currentTheme, onThemeChange }) => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = React.useState(true);

  const handleClearData = () => {
    if (confirm("Are you sure? This will delete all your local favorites and activity history.")) {
        localStorage.removeItem('malnad_users_db');
        localStorage.removeItem('malnad_dynamic_properties');
        alert("Local data cleared successfully.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 animate-in fade-in slide-in-from-bottom-4 text-slate-800 dark:text-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">{t('settings.title')}</h1>
        </div>

        <div className="space-y-6">
          
          {/* Appearance Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sun className="h-5 w-5 text-amber-500" /> {t('settings.appearance')}
            </h2>
            
            <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t('settings.theme')}</p>
                    <p className="text-sm text-slate-500">{t('settings.themeDesc')}</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-950 rounded-lg p-1">
                    <button 
                        onClick={() => onThemeChange('light')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${currentTheme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Light
                    </button>
                    <button 
                         onClick={() => onThemeChange('dark')}
                         className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${currentTheme === 'dark' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Dark
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between py-4">
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t('settings.language')}</p>
                    <p className="text-sm text-slate-500">{t('settings.languageDesc')}</p>
                </div>
                <div className="relative">
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg py-2 pl-3 pr-8 text-sm text-slate-900 dark:text-white outline-none appearance-none cursor-pointer"
                    >
                        <option value="en">English</option>
                        <option value="kn">Kannada (ಕನ್ನಡ)</option>
                        <option value="hi">Hindi (हिंदी)</option>
                    </select>
                    <Globe className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
             <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" /> {t('settings.preferences')}
            </h2>

            <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t('settings.notifications')}</p>
                    <p className="text-sm text-slate-500">{t('settings.notificationsDesc')}</p>
                </div>
                <button 
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${notifications ? 'translate-x-6' : ''}`}></span>
                </button>
            </div>

             <div className="flex items-center justify-between py-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t('settings.privacy')}</p>
                </div>
                <ChevronRight className="h-5 w-5" />
            </div>
          </div>

          {/* Data Zone */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
             <h2 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> {t('settings.danger')}
            </h2>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-slate-900 dark:text-white">{t('settings.clearData')}</p>
                    <p className="text-sm text-slate-500">{t('settings.clearDataDesc')}</p>
                </div>
                <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={handleClearData}>
                    {t('settings.btnReset')}
                </Button>
            </div>
           </div>

        </div>
      </div>
    </div>
  );
};
