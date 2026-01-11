import React, { useState } from 'react';
import { generateListingDescription } from '../services/geminiService';
import { Button } from './Button';
import { Sparkles, Copy, Check } from 'lucide-react';

export const OptimizationTool: React.FC = () => {
  const [propertyName, setPropertyName] = useState('');
  const [features, setFeatures] = useState('');
  const [vibe, setVibe] = useState('Professional & Quiet');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyName || !features) return;
    
    setLoading(true);
    const desc = await generateListingDescription(propertyName, features, vibe);
    setResult(desc);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="optimizer" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              AI For Landlords
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Attract the Right <br/>
              <span className="text-emerald-500">Tenants</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Struggling to fill your PG or rental flat? Use our AI to write descriptions that appeal specifically to reliable students and working professionals.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold border border-slate-700">1</div>
                <p className="text-slate-300">Enter property highlights (e.g., "Near College", "High Speed Wifi").</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold border border-slate-700">2</div>
                <p className="text-slate-300">Select target audience vibe (Student, Pro, Family).</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold border border-slate-700">3</div>
                <p className="text-slate-300">Get a professional listing description instantly.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
             {/* Abstract bg element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <form onSubmit={handleGenerate} className="relative z-10 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Property Name</label>
                <input 
                  type="text" 
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="e.g. Green Valley PG"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Key Features</label>
                <textarea 
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="e.g. 5 mins walk to bus stand, homemade food, 24/7 water, study table provided"
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience Vibe</label>
                <select 
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Professional & Quiet</option>
                  <option>Student Friendly & Budget</option>
                  <option>Family & Safe</option>
                  <option>Luxury & Serviced</option>
                </select>
              </div>

              <Button type="submit" className="w-full" isLoading={loading}>
                {loading ? 'Optimizing...' : 'Generate Description'}
              </Button>
            </form>

            {result && (
              <div className="mt-8 pt-8 border-t border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-wider">AI Suggestion</h4>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center text-slate-400 hover:text-white text-xs transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                  "{result}"
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};