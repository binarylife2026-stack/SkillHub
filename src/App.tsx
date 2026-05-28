/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { DEFAULT_CATEGORIES, DEFAULT_SELLERS } from './data';
import { Category, Seller } from './types';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Importing sub components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Sellers from './components/Sellers';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AdminModals from './components/AdminModals';
import CategoryPage from './components/CategoryPage';

export default function App() {
  // Toast notifications channel
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  // 1. Core State Channels
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const stored = localStorage.getItem('sh_categories');
      return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [sellers, setSellers] = useState<Seller[]>(() => {
    try {
      const stored = localStorage.getItem('sh_sellers');
      return stored ? JSON.parse(stored) : DEFAULT_SELLERS;
    } catch {
      return DEFAULT_SELLERS;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || 'all';
    } catch {
      return 'all';
    }
  });

  // Synchronize category state changes back to the browser's URL query string
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCategory = params.get('category') || 'all';
      if (urlCategory !== selectedCategory) {
        if (selectedCategory === 'all') {
          params.delete('category');
        } else {
          params.set('category', selectedCategory);
        }
        const search = params.toString();
        const newUrl = window.location.pathname + (search ? `?${search}` : '');
        window.history.pushState({ category: selectedCategory }, '', newUrl);
      }
    } catch (e) {
      console.error('Failed to change URL dynamic parameters:', e);
    }
  }, [selectedCategory]);

  // Synchronize browser forward and backward actions (popstate) back to React state Channel
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category') || 'all';
        setSelectedCategory(cat);
      } catch (e) {
        console.error('Error handling popstate category:', e);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    // Check session safety
    const stored = sessionStorage.getItem('sh_admin_session');
    return stored === 'true';
  });

  // 2. Dialog Modal visual triggers
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);

  // 3. Local Storage Sync Pipes
  useEffect(() => {
    localStorage.setItem('sh_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('sh_sellers', JSON.stringify(sellers));
  }, [sellers]);

  // Keyboard shortcut listener (Ctrl + Shift + A) to toggle login or dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        openAdminGateway();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin, isLoginOpen, isAdminPanelOpen]);

  const openAdminGateway = () => {
    if (isAdmin) {
      setIsAdminPanelOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  // 4. Controller Transaction Callbacks
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('sh_admin_session', 'true');
    // Open central management board instantly
    setIsAdminPanelOpen(true);
    triggerToast('Authorized session license granted.', 'success');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sh_admin_session');
    setIsAdminPanelOpen(false);
    triggerToast('Administrative session terminated successfully.', 'info');
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
  };

  const handleSaveSeller = (sellerData: Omit<Seller, 'id'> & { id?: string }) => {
    if (sellerData.id) {
      // Editing Mode
      setSellers(prev =>
        prev.map(item => (item.id === sellerData.id ? (sellerData as Seller) : item))
      );
      triggerToast('Expert profile updated successfully.', 'success');
    } else {
      // Creation Mode
      const newSeller: Seller = {
        ...sellerData,
        id: 's_' + Date.now()
      };
      setSellers(prev => [...prev, newSeller]);
      triggerToast('New expert catalog stored successfully.', 'success');
    }
    setEditingSeller(null);
    // Keep internal admin panel open! Don't close it arbitrarily on save!
  };

  const handleDeleteSeller = (sellerId: string) => {
    setSellers(prev => prev.filter(s => s.id !== sellerId));
    triggerToast('Expert profile purged successfully.', 'info');
  };

  const handleTrackClick = (sellerId: string) => {
    setSellers(prev =>
      prev.map(s => (s.id === sellerId ? { ...s, clicks: (s.clicks || 0) + 1 } : s))
    );
  };

  const handleInitiateEditSeller = (seller: Seller) => {
    setEditingSeller(seller);
    setIsAdminPanelOpen(true);
  };

  const handleAddCategory = (id: string, label: string) => {
    setCategories(prev => [...prev, { id, label }]);
    triggerToast('Dynamic category segment block compiled successfully.', 'success');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    
    // Fallback selected category to all if the current selected is purged
    if (selectedCategory === id) {
      setSelectedCategory('all');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-400">
      
      {/* 1. Nav Bar layout with dynamic reset-to-home support */}
      <Navbar
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogoClick={() => setSelectedCategory('all')}
      />

      {selectedCategory === 'all' ? (
        <>
          {/* 2. Hero Section layout */}
          <Hero />

          {/* 3. Realtime statistics summary counters */}
          <Stats sellersCount={sellers.length} />

          {/* 4. Active interactive Sellers Catalog grid */}
          <Sellers
            sellers={sellers}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            isAdmin={isAdmin}
            onEditSeller={handleInitiateEditSeller}
            onDeleteSeller={handleDeleteSeller}
            onTrackClick={handleTrackClick}
          />

          {/* 5. Fluid Procurement guidance flow chart */}
          <HowItWorks />

          {/* 6. Curated verification standard protocols */}
          <WhyUs />

          {/* 7. Conversion Consultation Board block */}
          <CTA />
        </>
      ) : (
        <CategoryPage
          categoryId={selectedCategory}
          category={categories.find(c => c.id === selectedCategory) || { id: selectedCategory, label: selectedCategory }}
          sellers={sellers}
          categories={categories}
          isAdmin={isAdmin}
          onEditSeller={handleInitiateEditSeller}
          onDeleteSeller={handleDeleteSeller}
          onBackToHome={() => setSelectedCategory('all')}
          onTrackClick={handleTrackClick}
        />
      )}

      {/* 8. Structural Anchor Footer layouts */}
      <Footer
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />

      {/* 9. Floating Administrator Console button (subtle, only shown when logged in) */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-40 block">
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer hover:shadow-amber-500/20 transition-all duration-200"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
            </span>
            Admin Console
          </button>
        </div>
      )}

      {/* 10. Admin Configuration & Authentication Popup Modal sheets */}
      <AdminModals
        categories={categories}
        sellers={sellers}
        onSetSellers={setSellers}
        onSetCategories={setCategories}
        onDeleteSeller={handleDeleteSeller}
        isLoginOpen={isLoginOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        isAdminPanelOpen={isAdminPanelOpen}
        onCloseAdminPanel={() => setIsAdminPanelOpen(false)}
        isAdmin={isAdmin}
        onLoginSuccess={handleLoginSuccess}
        onSaveSeller={handleSaveSeller}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        editingSeller={editingSeller}
        onCancelEdit={() => setEditingSeller(null)}
        onLogout={handleLogout}
        onShowToast={triggerToast}
        onEditSeller={setEditingSeller}
      />

      {/* 11. Custom Interactive Non-blocking Toast Alerts system */}
      {toast && (
        <div className="fixed top-24 right-6 z-[9999] max-w-sm bg-slate-900/95 backdrop-blur border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-bounce-short">
          <div className="mt-0.5">
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-500" />
            ) : (
              <Info className="w-5 h-5 text-blue-450" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-black text-slate-150 tracking-wide text-left">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
