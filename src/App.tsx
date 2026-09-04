import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/affiliateData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { AffiliateGuideModal } from './components/AffiliateGuideModal';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Calculate product counts per category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: PRODUCTS.length,
    };
    PRODUCTS.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-[#EE4D2D] selection:text-white">
      {/* Top sticky navbar */}
      <Navbar onOpenGuide={() => setIsGuideOpen(true)} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero totalDealsCount={PRODUCTS.length} />

        {/* 2. Danh mục sản phẩm (Category Cards) */}
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          productCounts={productCounts}
        />

        {/* 3. Catalog Section + Product Cards (Rất quan trọng) */}
        <CatalogSection
          products={PRODUCTS}
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
    </div>
  );
}
