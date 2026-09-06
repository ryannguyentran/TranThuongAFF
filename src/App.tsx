import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, getProductMainCategories } from './data/affiliateData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const products = PRODUCTS;
  const categories = CATEGORIES;

  // Calculate product counts per category and mainCategory
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
    };
    products.forEach((product) => {
      const mainCats = getProductMainCategories(product);
      mainCats.forEach((cat) => {
        // Map to exact category ID if found
        const matched = categories.find((c) => c.id.toLowerCase() === cat.toLowerCase());
        const targetId = matched ? matched.id : cat;
        counts[targetId] = (counts[targetId] || 0) + 1;
      });
      if (product.category) {
        counts[product.category] = (counts[product.category] || 0) + 1;
      }
    });
    return counts;
  }, [products, categories]);

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

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-[#EE4D2D] selection:text-white">
      {/* Top sticky navbar */}
      <Navbar />

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

        {/* 3. Catalog Section + Product Cards */}
        <CatalogSection
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={handleSelectCategory}
          onSelectSubCategory={handleSelectSubCategory}
        />
      </main>

      {/* Footer with Disclaimer & Socials */}
      <Footer />
    </div>
  );
}
