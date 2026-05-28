import { Sparkles, Mail, Globe, MessageSquare, Phone } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (catId: string) => void;
}

export default function Footer({ categories, onSelectCategory }: FooterProps) {
  
  const handleCatClick = (id: string) => {
    onSelectCategory(id);
    const sellersEl = document.getElementById('sellers');
    if (sellersEl) {
      sellersEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Links & Bio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300">
                <Sparkles className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Freelancer<span className="text-emerald-400 italic font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.45)]">Hub</span><span className="text-xs font-mono font-bold text-emerald-500">.com</span>
              </span>
            </a>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Aggregating and verifying elite professional freelancers from around the globe under premium, high-integrity talent pipelines.
            </p>
            
            {/* Social Indicators */}
            <div className="flex gap-2">
              <a href="mailto:info@freelancerhub.com" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">
              Quick Navigation
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs sm:text-sm font-semibold text-slate-500">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setTimeout(() => {
                      document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer text-left font-semibold text-xs sm:text-sm text-slate-500"
                >
                  Find Active Indexes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setTimeout(() => {
                      document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer text-left font-semibold text-xs sm:text-sm text-slate-500"
                >
                  Detailed Validation Flow
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setTimeout(() => {
                      document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer text-left font-semibold text-xs sm:text-sm text-slate-500"
                >
                  Risk Mitigation Metrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setTimeout(() => {
                      const ctaEl = document.getElementById('contact') || document.querySelector('section:last-of-type');
                      ctaEl?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer text-left font-semibold text-xs sm:text-sm text-slate-500"
                >
                  Request custom Architect
                </button>
              </li>
            </ul>
          </div>

          {/* Categories list links */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">
              Core Segments
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs sm:text-sm font-semibold text-slate-500">
              {categories.slice(1, 9).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCatClick(cat.id)}
                    className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-6">
              Operating Protocols
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs sm:text-sm font-semibold text-slate-500">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Framework</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Engagement</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">Anti-Scam Escrow Guide</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Affiliate transparent legal disclaimer label */}
        <div className="border-t border-slate-900 pt-8 pb-6">
          <p className="text-[11px] text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> This website operates strictly as an independent affiliate verification routing directory. We hold no official centralized brand ownership over Fiverr. Clicking specific catalog execution buttons securely passes parameters into Fiverr.com payment interfaces. We potentially track commissions upon valid contract conversions at zero incremental expense to buyers.
          </p>
        </div>

        {/* Brand Copyright */}
        <div className="border-t border-slate-900/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
          <p>&copy; 2026 Freelancer Hub. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Statement</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
