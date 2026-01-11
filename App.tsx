
import React, { Suspense, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { FeaturedPlaces } from './components/FeaturedPlaces';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MapModal } from './components/MapModal';
import { AuthModal } from './components/AuthModal';
import { AllPropertiesPage } from './components/AllPropertiesPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { useAuth } from './contexts/AuthContext';
import { useUI } from './contexts/UIContext';
import { AppTheme } from './types';
import { CustomCursor } from './components/CustomCursor';

interface SearchState {
  query: string;
  location: { lat: number; lng: number } | null;
}

function App() {
  const { isAuthenticated } = useAuth();
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useUI();
  
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const [view, setView] = useState<'home' | 'all-listings' | 'profile' | 'settings'>('home');
  const [searchState, setSearchState] = useState<SearchState>({ query: '', location: null });
  const [theme, setTheme] = useState<AppTheme>('dark');

  // Handle Theme Change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
    } else {
        root.classList.remove('dark');
        root.classList.add('light');
    }
  }, [theme]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleSearch = (query: string, location?: { lat: number; lng: number }) => {
    setSearchState({ query, location: location || null });
    setView('all-listings');
  };

  const handleOpenDashboard = () => {
    if (isAuthenticated) {
      setIsDashboardOpen(true);
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200 transition-colors duration-300 cursor-none">
      <CustomCursor />
      <Navbar 
        onOpenMap={() => setIsMapOpen(true)}
        onOpenDashboard={handleOpenDashboard}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)} 
        onSearch={handleSearch}
        onOpenProfile={() => setView('profile')}
        onOpenSettings={() => setView('settings')}
        onOpenAuthModal={openAuthModal}
      />
      
      <main>
        {view === 'home' && (
          <>
            <Hero onOpenDashboard={handleOpenDashboard} />
            <FeaturedPlaces onViewAllClick={() => setView('all-listings')} />
            <Services />
            <AboutSection />
          </>
        )}

        {view === 'all-listings' && (
          <AllPropertiesPage 
            onBack={() => setView('home')} 
            initialSearchState={searchState}
          />
        )}

        {view === 'profile' && (
          <ProfilePage onBack={() => setView('home')} />
        )}

        {view === 'settings' && (
          <SettingsPage 
              onBack={() => setView('home')} 
              currentTheme={theme}
              onThemeChange={setTheme}
          />
        )}
      </main>

      <Footer />

      <OwnerDashboardModal 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
      />

      <AdminDashboardModal 
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

      <MapModal 
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </div>
  );
}

export default App;
