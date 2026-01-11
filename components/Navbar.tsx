
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogOut, Search, Bell, Settings, ChevronDown, ChevronRight, Map, Crosshair, Loader2, ShieldCheck, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onOpenMap?: () => void;
  onOpenDashboard?: () => void;
  onOpenAdminDashboard?: () => void;
  onSearch?: (query: string, location?: { lat: number; lng: number }) => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenMap, 
  onOpenDashboard, 
  onOpenAdminDashboard, 
  onSearch,
  onOpenProfile,
  onOpenSettings,
  onOpenAuthModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Dropdown states
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Scroll Spy & Background Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'places', 'services', 'about'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  const navLinks = [
    { name: t('nav.home'), href: '#home', id: 'home' },
    { name: t('nav.places'), href: '#places', id: 'places' },
    { name: t('nav.services'), href: '#services', id: 'services' },
    { name: t('nav.about'), href: '#about', id: 'about' }
  ];

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        if (onSearch) {
          setSearchQuery(''); // Clear text when using GPS for clarity
          onSearch('', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsSearchOpen(false);
          setIsMenuOpen(false);
        }
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error details:", error);
        
        let errorMessage = "Unable to retrieve your location.";
        // Handle specific error codes
        if (error.code === 1) { // PERMISSION_DENIED
           errorMessage = "Location permission denied. Please enable location access in your browser settings.";
        } else if (error.code === 2) { // POSITION_UNAVAILABLE
           errorMessage = "Location information is unavailable.";
        } else if (error.code === 3) { // TIMEOUT
           errorMessage = "The request to get your location timed out. Please try again.";
        }
        
        alert(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const notifications = [
    { id: 1, text: "New villa 'Cloud 9' added!", time: "2h ago", unread: true },
    { id: 2, text: "Your booking is confirmed.", time: "1d ago", unread: false },
    { id: 3, text: "Special offer: 20% off Coorg stays.", time: "2d ago", unread: false }
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 py-3 shadow-2xl' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
            >
              <div className="relative h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl p-2.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                 <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                    <path d="M3 10L12 2L21 10V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"/>
                    <path d="M12 2C12 2 16 5 16 9C16 10.5 15 11 15 11" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round"/>
                 </svg>
              </div>
              <span className={`font-serif text-2xl font-bold tracking-wide ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                Malnad<span className="text-emerald-500">Homes</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            {!isSearchOpen ? (
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(link.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(link.id);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === link.id
                        ? 'text-white bg-slate-800/50 shadow-inner'
                        : isScrolled 
                          ? 'text-slate-600 dark:text-slate-400 hover:text-emerald-500' 
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                
                <button
                  onClick={onOpenMap}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                      isScrolled 
                        ? 'text-slate-600 dark:text-slate-400 hover:text-emerald-500' 
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Map className="h-4 w-4" /> {t('nav.map')}
                </button>

                {navLinks.slice(2).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(link.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(link.id);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === link.id
                        ? 'text-white bg-slate-800/50 shadow-inner'
                        : isScrolled 
                          ? 'text-slate-600 dark:text-slate-400 hover:text-emerald-500' 
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ) : (
              // Expanded Search Bar
              <div className="hidden md:flex flex-1 max-w-lg mx-8 relative animate-in fade-in slide-in-from-top-2 duration-300">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <input 
                  ref={searchRef}
                  type="text"
                  placeholder={t('nav.searchPlaceholder')}
                  className="w-full bg-slate-800 border border-emerald-500/50 rounded-full py-2.5 pl-10 pr-36 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  onBlur={() => !searchQuery && !isLocating && setIsSearchOpen(false)}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                   <button 
                      onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                      onClick={handleNearMe}
                      disabled={isLocating}
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-full transition-all border border-emerald-500/20"
                   >
                      {isLocating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Crosshair className="h-3 w-3" />}
                      <span>{t('nav.nearMe')}</span>
                   </button>
                   <button 
                     onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                     onClick={() => setIsSearchOpen(false)}
                     className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-700/50 transition-colors"
                   >
                     <X className="h-4 w-4" />
                   </button>
                </div>
              </div>
            )}

            {/* Right Side Icons & Auth (Desktop Only) */}
            <div className="hidden md:flex items-center space-x-4">
              
              {!isSearchOpen && (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2 rounded-full transition-all ${
                    isScrolled ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`p-2 rounded-full transition-all relative ${
                    isScrolled ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse border border-slate-900"></span>
                </button>

                {isNotifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                      <span className="font-semibold text-white text-sm">Notifications</span>
                      <span className="text-xs text-emerald-400 cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      {notifications.map(notif => (
                        <div key={notif.id} className="p-4 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3">
                           <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notif.unread ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                           <div>
                             <p className="text-sm text-slate-200">{notif.text}</p>
                             <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={`h-6 w-px mx-2 ${isScrolled ? 'bg-slate-200 dark:bg-slate-800' : 'bg-white/20'}`}></div>

              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 pl-2 pr-4 py-1.5 bg-slate-800/50 hover:bg-slate-800 rounded-full border border-slate-700 hover:border-emerald-500/50 transition-all"
                  >
                    {user.avatar ? (
                         <img src={user.avatar} alt="Avatar" className="h-7 w-7 rounded-full object-cover border border-slate-600" />
                    ) : (
                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    
                    <span className="text-sm font-medium text-slate-200 max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95">
                      <div className="p-4 border-b border-slate-800 bg-slate-950/30">
                        <div className="flex items-center gap-2 mb-1">
                             <p className="text-white font-medium text-sm truncate flex-1">{user.name}</p>
                             {user.role === 'admin' && (
                                 <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded uppercase border border-indigo-500/30">Admin</span>
                             )}
                        </div>
                        <p className="text-slate-500 text-xs truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        {user.role === 'admin' ? (
                             <button 
                             onClick={() => {
                                 onOpenAdminDashboard && onOpenAdminDashboard();
                                 setIsUserMenuOpen(false);
                             }}
                             className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-indigo-400 hover:bg-slate-800 hover:text-indigo-300 rounded-lg transition-colors font-medium"
                             >
                             <ShieldCheck className="h-4 w-4" /> {t('nav.adminDashboard')}
                             </button>
                        ) : (
                            <button 
                            onClick={() => {
                                onOpenDashboard && onOpenDashboard();
                                setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 rounded-lg transition-colors font-medium"
                            >
                            <Home className="h-4 w-4" /> {t('nav.ownerDashboard')}
                            </button>
                        )}
                        <button 
                            onClick={() => {
                                setIsUserMenuOpen(false);
                                onOpenProfile && onOpenProfile();
                            }}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-colors"
                        >
                          <User className="h-4 w-4" /> {t('nav.profile')}
                        </button>
                        <button 
                            onClick={() => {
                                setIsUserMenuOpen(false);
                                onOpenSettings && onOpenSettings();
                            }}
                            className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-colors"
                        >
                          <Settings className="h-4 w-4" /> {t('nav.settings')}
                        </button>
                      </div>
                      <div className="p-1 border-t border-slate-800">
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> {t('nav.logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onOpenAuthModal && onOpenAuthModal()}
                    className="text-slate-300 hover:text-white font-medium text-sm transition-colors"
                  >
                    {t('nav.login')}
                  </button>
                  <button 
                    onClick={() => onOpenAuthModal && onOpenAuthModal()}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 hover:scale-105"
                  >
                    {t('nav.signup')}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Actions (Visible Only on Mobile) */}
            <div className="md:hidden flex items-center gap-4">
              {/* Search Toggle */}
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`transition-colors ${isScrolled ? 'text-slate-600 dark:text-slate-400' : 'text-slate-300'}`}>
                <Search className="h-5 w-5" />
              </button>

              {/* Mobile Quick Auth/Profile Button */}
              {isAuthenticated && user ? (
                  <button 
                    onClick={() => onOpenProfile && onOpenProfile()}
                    className="h-8 w-8 rounded-full border border-slate-700 overflow-hidden shadow-md"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                         {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>
              ) : (
                  <button 
                    onClick={() => onOpenAuthModal && onOpenAuthModal()}
                    className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                  >
                    {t('nav.login')}
                  </button>
              )}

              {/* Hamburger Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-1 rounded-md transition-colors focus:outline-none ${isScrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar Expansion */}
          {isSearchOpen && (
            <div className="md:hidden pb-4 pt-2 animate-in fade-in slide-in-from-top-1">
              <div className="relative">
                <input 
                  type="text"
                  placeholder={t('nav.searchPlaceholder')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-4 pr-12 text-white focus:ring-2 focus:ring-emerald-500 outline-none shadow-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  autoFocus
                />
                <button 
                   onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                   onClick={handleNearMe}
                   type="button"
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-500 hover:bg-slate-700 rounded-lg"
                >
                   {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crosshair className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 shadow-2xl animate-in slide-in-from-top-5 duration-200 z-[50]">
            <div className="flex flex-col space-y-2">
                 {/* Navigation Links */}
                 {navLinks.map(link => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        setIsMenuOpen(false); 
                        const el = document.getElementById(link.id); 
                        if(el) el.scrollIntoView({ behavior: 'smooth' }); 
                        setActiveSection(link.id); 
                      }} 
                      className="px-4 py-3 rounded-xl bg-slate-800 text-base font-medium text-slate-300 hover:bg-slate-700 transition-colors flex items-center justify-between"
                    >
                      {link.name}
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    </a>
                 ))}
                 
                 <div className="h-px bg-slate-800 my-2"></div>

                 {isAuthenticated && user ? (
                     <>
                        <button 
                          onClick={() => { setIsMenuOpen(false); onOpenProfile && onOpenProfile(); }} 
                          className="px-4 py-3 rounded-xl bg-slate-800 text-base font-medium text-slate-300 hover:bg-slate-700 text-left flex items-center gap-3 transition-colors"
                        >
                          <User className="h-5 w-5 text-emerald-500"/> {t('nav.profile')}
                        </button>
                        <button 
                          onClick={() => { setIsMenuOpen(false); onOpenSettings && onOpenSettings(); }} 
                          className="px-4 py-3 rounded-xl bg-slate-800 text-base font-medium text-slate-300 hover:bg-slate-700 text-left flex items-center gap-3 transition-colors"
                        >
                          <Settings className="h-5 w-5 text-slate-400"/> {t('nav.settings')}
                        </button>
                        
                        <div className="h-px bg-slate-800 my-2"></div>
                        
                        <button 
                          onClick={handleLogout} 
                          className="px-4 py-3 rounded-xl bg-slate-800 text-base font-medium text-red-400 hover:bg-red-500/10 text-left flex items-center gap-3 transition-colors"
                        >
                          <LogOut className="h-5 w-5"/> {t('nav.logout')}
                        </button>
                     </>
                 ) : (
                     <div className="p-2 space-y-3">
                        <button 
                          onClick={() => { setIsMenuOpen(false); onOpenAuthModal && onOpenAuthModal(); }}
                          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                        >
                          {t('nav.signup')} / {t('nav.login')}
                        </button>
                        <p className="text-center text-xs text-slate-500">
                          Log in to manage your bookings and favorites.
                        </p>
                     </div>
                 )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
