import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldAlert,
  KeyRound,
  UserMinus,
  PlusCircle,
  CheckCircle,
  Tag,
  Eye,
  EyeOff,
  Search,
  Download,
  Upload,
  RotateCcw,
  TrendingUp,
  Award,
  Star,
  DollarSign,
  MousePointerClick,
  Edit2,
  Trash2,
  LogOut
} from 'lucide-react';
import { Category, Seller } from '../types';
import { DEFAULT_CATEGORIES, DEFAULT_SELLERS } from '../data';

interface AdminModalsProps {
  categories: Category[];
  sellers: Seller[];
  onSetSellers: React.Dispatch<React.SetStateAction<Seller[]>>;
  onSetCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  onDeleteSeller: (sellerId: string) => void;
  isLoginOpen: boolean;
  onCloseLogin: () => void;
  isAdminPanelOpen: boolean;
  onCloseAdminPanel: () => void;
  isAdmin: boolean;
  onLoginSuccess: () => void;
  onSaveSeller: (seller: Omit<Seller, 'id'> & { id?: string }) => void;
  onAddCategory: (id: string, label: string) => void;
  onDeleteCategory: (id: string) => void;
  editingSeller: Seller | null;
  onCancelEdit: () => void;
  onLogout?: () => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onEditSeller: (seller: Seller | null) => void;
}

export default function AdminModals({
  categories,
  sellers,
  onSetSellers,
  onSetCategories,
  onDeleteSeller,
  isLoginOpen,
  onCloseLogin,
  isAdminPanelOpen,
  onCloseAdminPanel,
  isAdmin,
  onLoginSuccess,
  onSaveSeller,
  onAddCategory,
  onDeleteCategory,
  editingSeller,
  onCancelEdit,
  onLogout,
  onShowToast,
  onEditSeller
}: AdminModalsProps) {
  
  // Login Form States
  const [operatorId, setOperatorId] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Tab State inside Dashboard - 'manage-experts' | 'add-expert' | 'categories' | 'analytics'
  const [activeTab, setActiveTab] = useState<'manage-experts' | 'add-expert' | 'categories' | 'analytics'>('manage-experts');

  // Search input inside Experts list
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for Register/Edit Expert
  const [sName, setSName] = useState('');
  const [sLevel, setSLevel] = useState('level-2');
  const [sCat, setSCat] = useState('');
  const [sImg, setSImg] = useState('');
  const [sTitle, setSTitle] = useState('');
  const [sDesc, setSDesc] = useState('');
  const [sSkills, setSSkills] = useState('');
  const [sRating, setSRating] = useState('5.0');
  const [sReviews, setSReviews] = useState(50);
  const [sDelivery, setSDelivery] = useState('3 Days Delivery');
  const [sResponse, setSResponse] = useState('1 Hour Response');
  const [sPrice, setSPrice] = useState(30);
  const [sLink, setSLink] = useState('');

  // Form states for Categories configure
  const [catKey, setCatKey] = useState('');
  const [catLabel, setCatLabel] = useState('');

  // Handle Editing Load
  useEffect(() => {
    if (editingSeller) {
      setSName(editingSeller.name);
      setSLevel(editingSeller.level);
      setSCat(editingSeller.cat);
      setSImg(editingSeller.img);
      setSTitle(editingSeller.title);
      setSDesc(editingSeller.desc);
      setSSkills(editingSeller.skills.join(', '));
      setSRating(editingSeller.rating);
      setSReviews(editingSeller.reviews);
      setSDelivery(editingSeller.delivery);
      setSResponse(editingSeller.response);
      setSPrice(editingSeller.price);
      setSLink(editingSeller.link);
      setActiveTab('add-expert'); // Automatically focus add-expert tab with fields filled on editing
    } else {
      resetSellerForm();
    }
  }, [editingSeller]);

  // Handle dynamic select fallback when Categories list shifts
  useEffect(() => {
    if (categories.length > 1 && !sCat) {
      const firstValid = categories.find(c => c.id !== 'all');
      if (firstValid) setSCat(firstValid.id);
    }
  }, [categories, sCat]);

  const resetSellerForm = () => {
    setSName('');
    setSLevel('level-2');
    const firstValid = categories.find(c => c.id !== 'all');
    setSCat(firstValid ? firstValid.id : 'web');
    setSImg('');
    setSTitle('');
    setSDesc('');
    setSSkills('');
    setSRating('5.0');
    setSReviews(50);
    setSDelivery('3 Days Delivery');
    setSResponse('1 Hour Response');
    setSPrice(30);
    setSLink('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (operatorId === 'admin' && passphrase === 'sahs2026') {
      setLoginError('');
      onLoginSuccess();
      setOperatorId('');
      setPassphrase('');
      onCloseLogin();
    } else {
      setLoginError('Security Authentication Token Rejected.');
    }
  };

  const handleSellerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = sSkills.split(',').map(s => s.trim()).filter(s => s !== '');
    
    onSaveSeller({
      id: editingSeller?.id || undefined,
      name: sName,
      level: sLevel,
      cat: sCat,
      img: sImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      title: sTitle,
      desc: sDesc,
      skills: skillsArray,
      rating: sRating,
      reviews: Number(sReviews),
      delivery: sDelivery,
      response: sResponse,
      price: Number(sPrice),
      link: sLink,
      clicks: editingSeller?.clicks || 0,
      orders: `${sReviews}+ Orders Done`
    });

    resetSellerForm();
    onCancelEdit();
    setActiveTab('manage-experts'); // return back to standard list after save
  };

  const handleCatFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedKey = catKey.toLowerCase().replace(/\s+/g, '');
    if (!cleanedKey || !catLabel) return;
    
    if (categories.some(c => c.id === cleanedKey)) {
      onShowToast('Duplicate structural key code detected.', 'error');
      return;
    }

    onAddCategory(cleanedKey, catLabel);
    setCatKey('');
    setCatLabel('');
  };

  // Database Level Interventions
  const handleExportData = () => {
    const dataStr = JSON.stringify({ sellers, categories }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skillhub_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Database backup package downloaded.', 'success');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.sellers && Array.isArray(imported.sellers)) {
          onSetSellers(imported.sellers);
        }
        if (imported.categories && Array.isArray(imported.categories)) {
          onSetCategories(imported.categories);
        }
        onShowToast('Database imported and updated successfully!', 'success');
      } catch (err) {
        onShowToast('Malformed backup file format. Import rejected.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    onSetSellers(DEFAULT_SELLERS);
    onSetCategories(DEFAULT_CATEGORIES);
    localStorage.removeItem('sh_sellers');
    localStorage.removeItem('sh_categories');
    onShowToast('Local database reverted back to baseline defaults.', 'success');
  };

  // Compute analytics parameter states inside panel in real-time
  const filteredSellers = sellers.filter(s => {
    const matchSearch = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(matchSearch) ||
      s.title.toLowerCase().includes(matchSearch) ||
      s.skills.some(sk => sk.toLowerCase().includes(matchSearch)) ||
      s.cat.toLowerCase().includes(matchSearch)
    );
  });

  const totalClicksScore = sellers.reduce((sum, s) => sum + (s.clicks || 0), 0);
  const topClickLeader = sellers.length > 0
    ? [...sellers].sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0]
    : null;
  const avgRatingScore = sellers.length > 0
    ? (sellers.reduce((sum, s) => sum + parseFloat(s.rating || '0'), 0) / sellers.length).toFixed(1)
    : '5.0';
  const avgPriceMarket = sellers.length > 0
    ? Math.round(sellers.reduce((sum, s) => sum + s.price, 0) / sellers.length)
    : 0;

  const maxClickIndividual = Math.max(...sellers.map(s => s.clicks || 0), 1);

  if (!isLoginOpen && !isAdminPanelOpen) return null;

  return (
    <>
      {/* 1. AUTH LOGIN DIALOG MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-none">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500" />
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                <KeyRound className="w-4 h-4" /> Operator ID Session Gate
              </div>
              <button
                onClick={onCloseLogin}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleLoginSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                  Operator Username
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-mono"
                />
              </div>

              <div className="relative">
                <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                  Passphrase Security Authentication Key
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="e.g. sahs2026"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all pr-12 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute bottom-3 right-4 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {loginError && (
                <div className="text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl font-mono">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 mt-2 flex items-center justify-center gap-1 cursor-pointer"
              >
                Validate Session Terminal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. CENTRAL SYSTEM CORE MANAGEMENT DASHBOARD */}
      {isAdminPanelOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-5xl xl:max-w-6xl bg-slate-900 border border-slate-850 rounded-3xl overflow-hidden shadow-2xl relative max-h-[96vh] sm:max-h-[92vh] flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-amber-600" />
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-md">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">
                    Central Management Core
                  </h3>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">
                    Administrative Control Terminal
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (onLogout) {
                      onLogout();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-450 hover:text-rose-350 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 rounded-xl transition-all cursor-pointer shadow-sm"
                  title="Terminate operating licensing session completely"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-450" />
                  Log Out Session
                </button>
                <button
                  onClick={() => {
                    onCloseAdminPanel();
                    resetSellerForm();
                    onCancelEdit();
                  }}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-950/50 hover:bg-slate-800 transition-all cursor-pointer border border-slate-850"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Core Statistics counter cards - Top dashboard bar */}
            <div className="px-6 py-4 bg-slate-950/30 border-b border-slate-850 grid grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Total Experts</span>
                <span className="text-base font-black text-emerald-400">{sellers.length}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Avg Rating</span>
                <span className="text-base font-black text-amber-400 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {avgRatingScore}
                </span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Avg Price</span>
                <span className="text-base font-black text-rose-400">${avgPriceMarket}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-center">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Total Clicks</span>
                <span className="text-base font-black text-blue-450">{totalClicksScore}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-center col-span-2 lg:col-span-1">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider block">Click Leader</span>
                <span className="text-xs font-black text-white truncate max-w-full block" title={topClickLeader?.name || 'N/A'}>
                  {topClickLeader ? topClickLeader.name : 'None'}
                </span>
              </div>
            </div>

            {/* Backups & Actions Row */}
            <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-850 flex flex-wrap gap-2.5 items-center justify-between">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">
                System Commands
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950/65 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Export database rows as backup json document"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  Export JSON
                </button>
                <label
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950/65 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Restore or import custom setup dataset"
                >
                  <Upload className="w-3.5 h-3.5 text-blue-400" />
                  Import JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleResetData}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/5 border border-rose-500/20 hover:border-rose-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Purge custom logs and reset default directories list"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>
              </div>
            </div>

             {/* Controls Tabs for Administrative sub-views selection */}
            <div className="flex border-b border-slate-800 bg-slate-905/60 px-6 overflow-x-auto gap-2 scrollbar-none">
              <button
                onClick={() => {
                  onCancelEdit();
                  setActiveTab('manage-experts');
                }}
                className={`py-4 px-5 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'manage-experts'
                    ? 'border-amber-500 text-amber-400 bg-slate-900/40'
                    : 'border-transparent text-slate-450 hover:text-slate-205'
                }`}
              >
                📝 Manage Experts ({sellers.length})
              </button>
              <button
                onClick={() => {
                  // Keep or start a clean add interaction
                  if (editingSeller) onCancelEdit();
                  setActiveTab('add-expert');
                }}
                className={`py-4 px-5 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'add-expert'
                    ? 'border-amber-500 text-amber-400 bg-slate-900/40'
                    : 'border-transparent text-slate-450 hover:text-slate-205'
                }`}
              >
                {editingSeller ? '✏️ Edit Expert Profile' : '➕ Add Global Expert'}
              </button>
              <button
                onClick={() => {
                  onCancelEdit();
                  setActiveTab('categories');
                }}
                className={`py-4 px-5 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'categories'
                    ? 'border-amber-500 text-amber-400 bg-slate-900/40'
                    : 'border-transparent text-slate-450 hover:text-slate-205'
                }`}
              >
                📁 Categories config ({categories.length})
              </button>
              <button
                onClick={() => {
                  onCancelEdit();
                  setActiveTab('analytics');
                }}
                className={`py-4 px-5 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'analytics'
                    ? 'border-amber-500 text-amber-400 bg-slate-900/40'
                    : 'border-transparent text-slate-450 hover:text-slate-205'
                }`}
              >
                📊 Click Performance Analytics
              </button>
            </div>

            {/* Modal Body Scroll Area */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-950/10">

              {/* TABS VIEW 1: MANAGE EXPERTS TABLE */}
              {activeTab === 'manage-experts' && (
                <div className="flex flex-col gap-4">
                  {/* Search and Table filter headers */}
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search experts catalog by full name, title skills or cat..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  {filteredSellers.length === 0 ? (
                    <div className="py-14 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20 text-slate-500 font-semibold text-xs">
                      No registered experts match search criteria.
                    </div>
                  ) : (
                    <div className="overflow-x-auto bg-slate-950 border border-slate-850 rounded-2xl">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-900/70 border-b border-slate-850 text-[10px] font-black uppercase tracking-wider text-slate-400">
                            <th className="p-4">Profile</th>
                            <th className="p-4">Sector Category</th>
                            <th className="p-4 text-center">Clicks Tracker</th>
                            <th className="p-4">Rating KPI</th>
                            <th className="p-4">Price Matrix</th>
                            <th className="p-4 text-right">Interventions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 font-medium">
                          {filteredSellers.map(s => {
                            const catLabel = categories.find(c => c.id === s.cat)?.label || s.cat;
                            const isTop = s.level === 'level-top';

                            return (
                              <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={s.img}
                                      alt={s.name}
                                      className="w-9 h-9 rounded-lg object-cover border border-slate-800"
                                    />
                                    <div className="flex flex-col">
                                      <span className="font-bold text-slate-200">{s.name}</span>
                                      <span
                                        className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider w-fit mt-0.5 ${
                                          isTop
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            : 'bg-cyan-500/10 text-cyan-405 border border-cyan-500/25'
                                        }`}
                                      >
                                        {isTop ? 'Top Rated' : 'Level 2'}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-slate-400">
                                  <span className="font-bold">{catLabel}</span>
                                </td>
                                <td className="p-4 text-center font-bold">
                                  <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg text-xs font-black">
                                    <MousePointerClick className="w-3 h-3" /> {s.clicks || 0}
                                  </div>
                                </td>
                                <td className="p-4 text-slate-300">
                                  <div className="flex items-center gap-1 font-semibold">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    <span>{s.rating} <span className="text-slate-500">({s.reviews})</span></span>
                                  </div>
                                </td>
                                <td className="p-4 text-rose-400 font-bold">
                                  ${s.price}
                                </td>
                                <td className="p-4 text-right">
                                  <div className="flex justify-end gap-1.5">
                                    <button
                                      onClick={() => {
                                        onEditSeller(s);
                                      }}
                                      className="p-1.5 text-cyan-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all cursor-pointer"
                                      title="Edit licensed settings configuration profile"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => onDeleteSeller(s.id)}
                                      className="p-1.5 text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/10 hover:border-rose-500/25 rounded-lg transition-all cursor-pointer"
                                      title="Delete seller profile configuration from catalog index"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TABS VIEW 2: REGISTER/EDIT EXPERT FORM */}
              {activeTab === 'add-expert' && (
                <form onSubmit={handleSellerFormSubmit} className="flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-2">
                    <h4 className="text-white text-xs font-black uppercase tracking-wider">
                      {editingSeller ? '✏️ Edit Licensed Professional' : '➕ Register Service Professional'}
                    </h4>
                    {editingSeller && (
                      <span className="text-[10px] text-amber-400 font-extrabold uppercase bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">
                        Active Editing session Loaded
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Freelancer Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={sName}
                        onChange={(e) => setSName(e.target.value)}
                        placeholder="e.g. Arif Hasan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Performance Tier Status
                      </label>
                      <select
                        value={sLevel}
                        onChange={(e) => setSLevel(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-amber-500 transition-all focus:text-slate-100 font-semibold"
                      >
                        <option value="level-2">Level 2 Seller Badge</option>
                        <option value="level-top">Top Rated Elite Badging</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Visual Segment Category ID
                      </label>
                      <select
                        required
                        value={sCat}
                        onChange={(e) => setSCat(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-amber-500 transition-all focus:text-slate-100 font-semibold"
                      >
                        {categories
                          .filter(c => c.id !== 'all')
                          .map(c => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Pro Avatar Image Asset URL
                      </label>
                      <input
                        type="url"
                        required
                        value={sImg}
                        onChange={(e) => setSImg(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-all font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Fiverr Gig Sales Statement (Title)
                    </label>
                    <input
                      type="text"
                      required
                      value={sTitle}
                      onChange={(e) => setSTitle(e.target.value)}
                      placeholder="I will design a modern, responsive website for your business"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Brief Professional Biography Statement
                    </label>
                    <textarea
                      required
                      value={sDesc}
                      onChange={(e) => setSDesc(e.target.value)}
                      placeholder="Describe core specialized services and years of performance SLA metrics..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-all h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                      Skills & Technologies (Comma Separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={sSkills}
                      onChange={(e) => setSSkills(e.target.value)}
                      placeholder="React, Figma, NextJS, Tailwind"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Weighted Rating (e.g. 4.9)
                      </label>
                      <input
                        type="text"
                        required
                        value={sRating}
                        onChange={(e) => setSRating(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-amber-500 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Total Verified Reviews Score
                      </label>
                      <input
                        type="number"
                        required
                        value={sReviews}
                        onChange={(e) => setSReviews(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Delivery Timeline Milestone SLA
                      </label>
                      <input
                        type="text"
                        required
                        value={sDelivery}
                        onChange={(e) => setSDelivery(e.target.value)}
                        placeholder="3 Days Delivery"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Chat Response Latency SLA
                      </label>
                      <input
                        type="text"
                        required
                        value={sResponse}
                        onChange={(e) => setSResponse(e.target.value)}
                        placeholder="1 Hour Response"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Pricing Starting Target Value ($)
                      </label>
                      <input
                        type="number"
                        required
                        value={sPrice}
                        onChange={(e) => setSPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-all font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.5">
                        Affiliate Fiverr gig destination URL
                      </label>
                      <input
                        type="url"
                        required
                        value={sLink}
                        onChange={(e) => setSLink(e.target.value)}
                        placeholder="https://fiverr.com/..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition-all text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    {editingSeller ? (
                      <button
                        type="button"
                        onClick={() => {
                          onCancelEdit();
                          resetSellerForm();
                          setActiveTab('manage-experts');
                        }}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold py-3.5 rounded-xl transition-all cursor-pointer text-xs"
                      >
                        Cancel Editing
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          resetSellerForm();
                          setActiveTab('manage-experts');
                        }}
                        className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer text-xs"
                      >
                        Back to List
                      </button>
                    )}
                    <button
                      type="submit"
                      className="flex-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Commit Expert Matrix Data
                    </button>
                  </div>
                </form>
              )}

              {/* TABS VIEW 3: CONFIGURE CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="flex flex-col gap-6">
                  <form onSubmit={handleCatFormSubmit} className="bg-slate-900/40 p-5 border border-slate-800 rounded-2xl flex flex-col gap-4 animate-none">
                    <h4 className="text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <PlusCircle className="w-4 h-4 text-amber-500" /> Assemble Category Segment Node
                    </h4>
                    
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.2">
                        ID Key Code (Lowercase, no spaces, e.g. uiux)
                      </label>
                      <input
                        type="text"
                        required
                        value={catKey}
                        onChange={(e) => setCatKey(e.target.value)}
                        placeholder="e.g. uiux"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-705 focus:outline-none focus:border-amber-500 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 tracking-wider mb-1.2">
                        Screen view Interface Label
                      </label>
                      <input
                        type="text"
                        required
                        value={catLabel}
                        onChange={(e) => setCatLabel(e.target.value)}
                        placeholder="e.g. UI/UX Custom Expert Solutions"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-705 focus:outline-none focus:border-amber-500 transition-all font-semibold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer shadow"
                    >
                      <Tag className="w-4 h-4" /> Deploy Dynamic Segment Block
                    </button>
                  </form>

                  <div>
                    <h4 className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">
                      Active Navigation Segment Nodes
                    </h4>
                    <div className="max-h-[240px] overflow-y-auto bg-slate-950 border border-slate-850 rounded-2xl divide-y divide-slate-900/40 p-2">
                      {categories.map(c => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between px-4 py-3.5 text-xs sm:text-sm"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-100">{c.label}</span>
                            <span className="text-[9px] font-mono text-slate-500">Key Code Index: {c.id}</span>
                          </div>
                          {c.id !== 'all' ? (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Sever label tracking node "${c.label}" from runtime navigational layers?`)) {
                                  onDeleteCategory(c.id);
                                }
                              }}
                              className="text-[10px] font-bold text-rose-450 hover:text-rose-300 bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/10 hover:border-rose-500/20 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <UserMinus className="w-3.5 h-3.5" /> Remove Node
                            </button>
                          ) : (
                            <span className="text-[9px] text-slate-600 font-extrabold uppercase tracking-wide bg-slate-900/60 border border-slate-850 px-2.5 py-1 rounded-lg">
                              Default Base Directory
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TABS VIEW 4: PERFORMANCE ANALYTICS SUMMARY */}
              {activeTab === 'analytics' && (
                <div className="flex flex-col gap-6">
                  {/* Analytic cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl text-center">
                      <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Cumulative Clicks</span>
                      <span className="text-3xl font-black text-white mt-1 block">{totalClicksScore} clicks</span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl text-center">
                      <div className="inline-flex p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-550 mb-2">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Most Clicked Leader</span>
                      <span className="text-xl font-black text-amber-400 mt-2 block truncate">
                        {topClickLeader ? topClickLeader.name : 'N/A'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        {topClickLeader ? `${topClickLeader.clicks || 0} redirection clicks` : '0 clicks logged'}
                      </span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl text-center">
                      <div className="inline-flex p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2">
                        <MousePointerClick className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Catalog Ratio</span>
                      <span className="text-3xl font-black text-white mt-1 block">
                        {(totalClicksScore / Math.max(sellers.length, 1)).toFixed(1)} <span className="text-xs text-slate-500 font-medium">clicks/advocate</span>
                      </span>
                    </div>
                  </div>

                  {/* Leaderboard Lists */}
                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-3xl animate-none">
                    <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500" /> Click Leaderboard Registry
                    </h4>
                    
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-2">
                      {[...sellers]
                        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
                        .map((s, idx) => {
                          const clicksCount = s.clicks || 0;
                          return (
                            <div
                              key={s.id}
                              className="bg-slate-950/40 border border-slate-900 px-4 py-3 rounded-xl flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-650 text-xs w-4">#{idx + 1}</span>
                                <img
                                  src={s.img}
                                  alt={s.name}
                                  className="w-7 h-7 rounded-md object-cover border border-slate-800"
                                />
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-200">{s.name}</span>
                                  <span className="text-[9px] text-slate-550 font-bold tracking-tight">{s.title}</span>
                                </div>
                              </div>
                              <span className="font-mono font-black text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                                {clicksCount} redirection clicks
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Visual Click Ratio performance bar chart graphs */}
                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-3xl">
                    <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">
                      Click Performance Relative Ratio Metric
                    </h4>
                    
                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                      {[...sellers]
                        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
                        .map(s => {
                          const clickNum = s.clicks || 0;
                          const ratioPct = Math.min(100, Math.round((clickNum / maxClickIndividual) * 100));
                          
                          return (
                            <div key={s.id} className="text-xs">
                              <div className="flex justify-between items-center mb-1 font-bold">
                                <span className="text-slate-200">{s.name}</span>
                                <span className="text-emerald-400 font-mono">{clickNum} clicks ({ratioPct}%)</span>
                              </div>
                              <div className="h-4 bg-slate-950 rounded-xl overflow-hidden border border-slate-900">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                                  style={{ width: `${ratioPct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
