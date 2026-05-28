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
          className="flex items-center gap-3 group text-left cursor-pointer transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            Skill<span className="text-emerald-400 font-extrabold italic">Hub</span>
          </span>
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
