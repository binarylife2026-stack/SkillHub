import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, MessageSquare, ExternalLink, Edit2, Trash2, Award, ShieldCheck, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, Seller } from '../types';

interface SellersProps {
  sellers: Seller[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  isAdmin: boolean;
  onEditSeller: (seller: Seller) => void;
  onDeleteSeller: (sellerId: string) => void;
  onTrackClick?: (sellerId: string) => void;
}

export default function Sellers({
  sellers,
  categories,
  selectedCategory,
  onSelectCategory,
  isAdmin,
  onEditSeller,
  onDeleteSeller,
  onTrackClick
}: SellersProps) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Whenever sellers dataset length shifts, return safely to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [sellers.length]);

  // Total pages calculation for 10 items/page limits
  const totalPages = Math.ceil(sellers.length / itemsPerPage);

  // Take the subset of sellers for the active page
  const paginatedSellers = sellers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll back to sellers view anchorage
      const el = document.getElementById('sellers');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-24 bg-slate-950" id="sellers">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" /> Hand-Picked Professionals
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Audited <span className="text-emerald-400">Expert Directory</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Selecting any custom technology sector below opens its dedicated, separate showcase page immediately. 
            All audited active records are cataloged together on this main page grid.
          </p>
        </div>

        {/* Dynamic Category Selector Bar (Clicking opens separate category page, 'all' keeps Home view) */}
        <div className="mb-14 max-w-5xl mx-auto">
          <span className="block text-[10px] text-center font-black uppercase text-slate-500 tracking-wider mb-4">
            Navigate to Separate Showcase Pages
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4.5 py-3 rounded-2xl text-xs sm:text-sm font-black tracking-tight transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-850 hover:bg-slate-900/90'
                  }`}
                >
                  {cat.label}
                  {cat.id !== 'all' && (
                    <span className="ml-1.5 text-[9px] font-mono text-slate-500 group-hover:text-slate-300">
                      ({sellers.filter(s => s.cat === cat.id).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedSellers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center text-slate-500 font-semibold border border-dashed border-slate-900 rounded-3xl"
              >
                No verified experts currently indexed.
              </motion.div>
            ) : (
              paginatedSellers.map((s) => {
                const isLevelTop = s.level === 'level-top';

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    key={s.id}
                    className="group relative flex flex-col bg-slate-900/30 border border-slate-850 hover:border-slate-750 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-emerald-500/5 hover:-translate-y-1"
                  >
                    {/* Top Hand-picked overlay tag */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider animate-none">
                      <ShieldCheck className="w-3 h-3" />
                      Fiverr Verified
                    </div>

                    {/* Inside Card Header */}
                    <div className="p-6 pb-4 flex-1">
                      {/* Brand Face & Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={s.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                            alt={s.name}
                            className="w-14 h-14 rounded-xl object-cover border-2 border-slate-855 shadow-sm"
                          />
                          {/* Online indicator green pulse */}
                          <div className="absolute -bottom-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                              {s.name}
                            </h3>
                            <span
                              className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isLevelTop
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25'
                              }`}
                            >
                              {isLevelTop ? 'Top Rated' : 'Level 2'}
                            </span>
                          </div>
                          {/* Category view label link indicator */}
                          <button
                            onClick={() => onSelectCategory(s.cat)}
                            className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-left mt-0.5 hover:text-emerald-400 transition-colors cursor-pointer"
                          >
                            {categories.find(c => c.id === s.cat)?.label || s.cat.replace('-', ' ')}
                          </button>
                        </div>
                      </div>

                      {/* Fiverr Gig title statement */}
                      <div className="font-bold text-slate-200 text-sm line-clamp-2 h-11 mb-2 leading-relaxed">
                        {s.title}
                      </div>

                      {/* Brief Description */}
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {s.desc}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {s.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-850 text-slate-400 text-[10px] font-bold tracking-tight"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Performance matrices */}
                      <div className="grid grid-cols-2 gap-3 border-t border-slate-850 pt-4 text-xs font-semibold text-slate-400">
                        <div className="flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>
                            <strong className="text-slate-100 font-bold">{s.rating || '5.0'}</strong> ({s.reviews || 0})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{s.delivery || '3 Days Delivery'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                          <span>{s.response || '1 Hour Response'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                          <span className="text-[11px] font-semibold text-slate-400 truncate">
                            {s.orders || `${s.reviews}+ Deals`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA & Fiverr link routings */}
                    <div className="bg-slate-900/40 px-6 py-4 border-t border-slate-850 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                          Starting at
                        </span>
                        <span className="text-xl font-black text-rose-400">
                          ${s.price || '40'}
                        </span>
                      </div>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onTrackClick?.(s.id)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow cursor-pointer"
                      >
                        Order Now
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Administrative override settings */}
                    {isAdmin && (
                      <div className="bg-rose-950/20 border-t border-rose-900/30 p-3 flex justify-end gap-2">
                        <button
                          onClick={() => onEditSeller(s)}
                          className="flex items-center gap-1 text-[10px] font-bold bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-750 text-slate-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3 text-cyan-400" />
                          Edit Profile
                        </button>
                        <button
                          onClick={() => onDeleteSeller(s.id)}
                          className="flex items-center gap-1 text-[10px] font-bold bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Pagination Controls bar for showing exactly 10 profiles per page */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 p-5 border border-slate-850 rounded-2xl max-w-5xl mx-auto">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Page <span className="text-slate-300 font-extrabold">{currentPage}</span> of <span className="text-slate-300 font-extrabold">{totalPages}</span>
              <span className="mx-2 font-normal text-slate-750">|</span> 
              Showing profiles <span className="text-emerald-450 font-extrabold">{Math.min(sellers.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(sellers.length, currentPage * itemsPerPage)}</span> of <span className="text-slate-300 font-extrabold">{sellers.length}</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                const pgActive = currentPage === pg;
                return (
                  <button
                    key={pg}
                    onClick={() => handlePageChange(pg)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      pgActive
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-550/10'
                        : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-705'
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
