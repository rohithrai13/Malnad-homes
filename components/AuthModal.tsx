
import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, Camera, Upload, CheckCircle, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'verify' | 'forgotPassword' | 'resetSent';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login, loginWithGoogle, signup, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  // Fix: Defined fileInputRef using useRef
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    repeatPassword: '',
    photo: null as File | null
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode('login');
      setError('');
      setFormData({ name: '', email: '', password: '', repeatPassword: '', photo: null });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        onClose();
      } else if (mode === 'signup') {
        if (!formData.name) throw new Error("Name is required");
        await signup(formData.name, formData.email, formData.password, formData.photo);
        setMode('verify');
      } else if (mode === 'forgotPassword') {
        await resetPassword(formData.email);
        setMode('resetSent');
      }
    } catch (err: any) {
      if (err.message === "Email not verified") setMode('verify');
      else setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      if (err.message !== "Sign in cancelled") setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const switchToLogin = () => { setMode('login'); setError(''); };
  const switchToSignup = () => { setMode('signup'); setError(''); };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-white dark:bg-slate-900 md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 md:slide-in-from-bottom-0 duration-500">
        
        {/* Branding Sidebar (Desktop Only) */}
        <div className="hidden md:flex w-2/5 bg-slate-950 relative overflow-hidden flex-col justify-between p-12">
           <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Malnad View"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
           </div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <ShieldCheck className="h-6 w-6" />
                 </div>
                 <span className="font-serif text-xl font-bold text-white tracking-tight">Malnad Homes</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-white leading-tight mb-6">
                 Elevate your <br/>
                 <span className="text-emerald-400">Living standard.</span>
              </h2>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Verified Property Listings
                 </div>
                 <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Direct Owner Interaction
                 </div>
                 <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Zero Brokerage Policy
                 </div>
              </div>
           </div>

           <div className="relative z-10 pt-8 border-t border-white/10">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Trusted by</p>
              <p className="text-sm text-slate-300">500+ professionals and students in Puttur.</p>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white dark:bg-slate-900 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex justify-between items-center mb-8 md:hidden">
             <span className="font-serif font-bold text-slate-900 dark:text-white">Malnad Homes</span>
             <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500"><X className="h-5 w-5" /></button>
          </div>
          
          <button onClick={onClose} className="hidden md:flex absolute right-8 top-8 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <X className="h-6 w-6" />
          </button>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                {mode === 'login' ? 'Log in to manage your stays and favorites.' : 'Start your journey with Malnad\'s trusted agency.'}
              </p>
            </div>

            {/* Auth Social Toggle */}
            {(mode === 'login' || mode === 'signup') && (
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold py-3.5 px-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm group"
                >
                  <img src="https://storage.googleapis.com/your_ai_workflow_public_bucket/Google__G__logo.svg.png" alt="Google" className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Continue with Google</span>
                </button>
                <div className="relative flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                  <span>Or email</span>
                  <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div className="flex flex-col items-center mb-6">
                  {/* Fix: Added fileInputRef for triggering click */}
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-500 group-hover:bg-emerald-500/5">
                      {formData.photo ? (
                        <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="h-8 w-8 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      )}
                    </div>
                    {/* Fix: Assigned fileInputRef to input element */}
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 p-1.5 rounded-lg text-white shadow-lg border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
                      <Upload className="h-3 w-3" />
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">Profile Photo</span>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text" required placeholder="John Doe"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-sm font-bold"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="email" required placeholder="name@agency.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-sm font-bold"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {mode !== 'forgotPassword' && mode !== 'resetSent' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Password</label>
                    {mode === 'login' && (
                      <button type="button" onClick={() => setMode('forgotPassword')} className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-widest">Forgot?</button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="password" required placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-sm font-bold"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 dark:text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="password" required placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-sm font-bold"
                      value={formData.repeatPassword}
                      onChange={e => setFormData({...formData, repeatPassword: e.target.value})}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full py-4 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/20" isLoading={loading} size="lg">
                {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Get Reset Link'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={mode === 'login' ? switchToSignup : switchToLogin}
                  className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest ml-1 hover:underline"
                >
                  {mode === 'login' ? 'Join Now' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
          
          <div className="mt-auto pt-8 flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <Sparkles className="h-5 w-5 text-emerald-500" />
             <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure Agency Dashboard</div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-height: 600px) {
          .md\\:h-auto { height: 100vh !important; }
        }
      `}} />
    </div>
  );
};
