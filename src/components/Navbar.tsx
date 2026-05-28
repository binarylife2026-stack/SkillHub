import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ShieldAlert, LogOut } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  onLogout: () => void;
  onOpenLogin: () => void;
  onLogoClick?: () => void;
}

export default function Navbar({ isAdmin, onLogout, onOpenLogin, onLogoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shadow-lg shadow-slate-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onLogoClick) onLogoClick();
          }}
          className="flex items-center gap-3.5 group text-left cursor-pointer transition-transform duration-300"
          id="navbar-logo-btn"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg group-hover:border-emerald-500/40 transition-all duration-300 overflow-hidden">
            {/* Spinning/pulsing neon background aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-teal-400/20 to-emerald-400/10 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            
            {/* Glowing particle effect in BG */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl blur-md opacity-25 group-hover:opacity-50 transition-all duration-300" />
            
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/80 flex items-center justify-center text-emerald-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:text-emerald-300 transition-all">
              <Sparkles className="w-4 h-4 animate-pulse" fill="currentColor" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1 leading-none">
              <span className="text-white">Freelancer</span>
              <span className="text-emerald-400 italic font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.45)]">Hub</span>
            </span>
            <span className="text-[9px] font-mono font-black tracking-widest text-emerald-400 leading-none mt-1 uppercase">
              Affiliate Directory
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => {
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer"
          >
            Find Sellers
          </button>
          <button
            onClick={() => {
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors bg-transparent border-0 cursor-pointer"
          >
            Why Us
          </button>

          {isAdmin ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-350 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </button>
          ) : null}

          <button
            onClick={() => {
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="bg-emerald-500 hover:bg-emerald-400 font-bold text-sm text-slate-950 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 border-0 cursor-pointer"
          >
            Hire Now 🚀
          </button>
        </div>

        {/* Hamburger Menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-950 border-b border-slate-900 p-6 flex flex-col gap-4 shadow-xl md:hidden">
          <button
            onClick={() => {
              setMobileOpen(false);
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="text-left py-2 text-base font-semibold text-slate-300 hover:text-emerald-400 transition-colors border-b border-slate-900/50 bg-transparent border-0 cursor-pointer"
          >
            Find Sellers
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="text-left py-2 text-base font-semibold text-slate-300 hover:text-emerald-400 transition-colors border-b border-slate-900/50 bg-transparent border-0 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="text-left py-2 text-base font-semibold text-slate-300 hover:text-emerald-400 transition-colors border-b border-slate-900/50 bg-transparent border-0 cursor-pointer"
          >
            Why Us
          </button>

          {isAdmin && (
            <button
              onClick={() => {
                onLogout();
                setMobileOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 w-full text-sm font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Log Out Session
            </button>
          )}

          <button
            onClick={() => {
              setMobileOpen(false);
              if (onLogoClick) onLogoClick();
              setTimeout(() => {
                document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="bg-emerald-500 text-slate-950 text-center font-bold text-sm py-3 rounded-xl shadow-md shadow-emerald-500/20 border-0 cursor-pointer"
          >
            Hire Now 🚀
          </button>
        </div>
      )}
    </nav>
  );
}
