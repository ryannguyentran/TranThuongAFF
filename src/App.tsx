import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from './data/affiliateData';
import { Product, CategoryItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SyncSheetModal } from './components/SyncSheetModal';
import { extractCategories } from './utils/csvParser';

const STORAGE_PRODUCTS_KEY = 'tranthuong_custom_products_v4';
const STORAGE_SHEET_KEY = 'tranthuong_sheet_url_v4';
const STORAGE_ADMIN_KEY = 'tranthuong_admin_auth_v1';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isSyncOpen, setIsSyncOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_ADMIN_KEY) === 'true';
  });
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_SHEET_KEY) || '';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing stored products:', e);
      }
    }
    return PRODUCTS;
  });

  // Hotkey listener for admin (Ctrl + Shift + A or Ctrl + Shift + U)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  // Calculate dynamic categories
  const categories: CategoryItem[] = useMemo(() => {
    if (products === PRODUCTS) {
      return CATEGORIES;
    }
    return extractCategories(products);
  }, [products]);

  // Calculate product counts per category and mainCategory
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
    };
    products.forEach((product) => {
      if (product.mainCategory) {
        counts[product.mainCategory] = (counts[product.mainCategory] || 0) + 1;
      }
      if (product.category) {
        counts[product.category] = (counts[product.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('all');
  };

  const handleSelectSubCategory = (subCatId: string, mainCatId?: string) => {
    setSelectedSubCategory(subCatId);
    if (mainCatId) {
      setSelectedCategory(mainCatId);
    }
  };

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(newProducts));
  };

  const handleSaveSheetUrl = (url: string) => {
    setSheetUrl(url);
    localStorage.setItem(STORAGE_SHEET_KEY, url);
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setIsSyncOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem(STORAGE_ADMIN_KEY, 'true');
    setIsAdminAuthOpen(false);
    setIsSyncOpen(true);
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_ADMIN_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-[#EE4D2D] selection:text-white">
      {/* Top sticky navbar */}
      <Navbar
        onOpenAdmin={handleOpenAdmin}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero totalDealsCount={products.length} />

        {/* 2. Danh mục sản phẩm (Category Cards) */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={handleSelectCategory}
          onSelectSubCategory={handleSelectSubCategory}
          productCounts={productCounts}
        />

        {/* 3. Catalog Section + Product Cards (Rất quan trọng) */}
        <CatalogSection
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={handleSelectCategory}
          onSelectSubCategory={handleSelectSubCategory}
        />
      </main>

      {/* 5. Footer with Disclaimer & Socials */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Admin Password Authentication Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Protected Admin Modal to Sync / Update products from Sheet or CSV */}
      <SyncSheetModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        onUpdateProducts={handleUpdateProducts}
        savedSheetUrl={sheetUrl}
        onSaveSheetUrl={handleSaveSheetUrl}
        onLogoutAdmin={handleLogoutAdmin}
      />
    </div>
  );
}
