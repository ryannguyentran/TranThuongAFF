import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from './data/affiliateData';
import { Product, CategoryItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { AffiliateGuideModal } from './components/AffiliateGuideModal';
import { SyncSheetModal } from './components/SyncSheetModal';
import { extractCategories } from './utils/csvParser';

const STORAGE_PRODUCTS_KEY = 'tranthuong_custom_products_v3';
const STORAGE_SHEET_KEY = 'tranthuong_sheet_url_v3';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isSyncOpen, setIsSyncOpen] = useState<boolean>(false);
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_SHEET_KEY) || '';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_PRODUCTS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if it contained the mistaken old VF3/VF4/VF5 categories
          const hasOldMistakenCats = parsed.some(
            (p: Product) => p.category?.includes('VF3') || p.category?.includes('VF4') || p.category?.includes('VF5')
          );
          if (!hasOldMistakenCats) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Error parsing stored products:', e);
      }
    }
    return PRODUCTS;
  });

  // Calculate dynamic categories
  const categories: CategoryItem[] = useMemo(() => {
    if (products === PRODUCTS) {
      return CATEGORIES;
    }
    return extractCategories(products);
  }, [products]);

  // Calculate product counts per category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
    };
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    setSelectedCategory('all');
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(newProducts));
  };

  const handleSaveSheetUrl = (url: string) => {
    setSheetUrl(url);
    localStorage.setItem(STORAGE_SHEET_KEY, url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-[#EE4D2D] selection:text-white">
      {/* Top sticky navbar */}
      <Navbar
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSync={() => setIsSyncOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero totalDealsCount={products.length} />

        {/* 2. Danh mục sản phẩm (Category Cards) */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          productCounts={productCounts}
        />

        {/* 3. Catalog Section + Product Cards (Rất quan trọng) */}
        <CatalogSection
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* 5. Footer with Disclaimer & Socials */}
      <Footer />

      {/* Helper Modal for site owner to easily swap affiliate links */}
      <AffiliateGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Modal to Auto-Sync / Update products from Sheet or CSV */}
      <SyncSheetModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        onUpdateProducts={handleUpdateProducts}
        savedSheetUrl={sheetUrl}
        onSaveSheetUrl={handleSaveSheetUrl}
      />
    </div>
  );
}
