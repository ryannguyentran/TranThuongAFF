import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles, X, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/affiliateData';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

type SortOption = 'hot' | 'discount' | 'price-asc' | 'price-desc';

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('hot');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Badge filter
        if (selectedBadge !== 'all' && p.badge !== selectedBadge) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchBadge = p.badge.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchBadge) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'discount') {
          const discountA = (a.originalPrice - a.salePrice) / a.originalPrice;
          const discountB = (b.originalPrice - b.salePrice) / b.originalPrice;
          return discountB - discountA;
        }
        if (sortOption === 'price-asc') {
          return a.salePrice - b.salePrice;
        }
        if (sortOption === 'price-desc') {
          return a.salePrice - b.salePrice;
        }
        // default 'hot': Deal hot first, then Bán chạy, then Giảm sâu
        const badgeScore = (p: Product) => (p.badge === 'Deal hot' ? 3 : p.badge === 'Bán chạy' ? 2 : 1);
        return badgeScore(b) - badgeScore(a);
      });
  }, [products, selectedCategory, selectedBadge, searchQuery, sortOption]);

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-neutral-50/70 border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EE4D2D]/10 text-[#EE4D2D] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sản phẩm chọn lọc Shopee</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-2">
            Kho Deal Khuyến Mãi Hôm Nay
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Tất cả sản phẩm đều có link mở trực tiếp Shopee Mall chính hãng.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-xs mb-8 space-y-4">
          
          {/* Top row: Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm, tai nghe, nồi chiên, kem chống nắng..."
                className="w-full pl-10 pr-9 py-2.5 bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white border border-neutral-200 focus:border-[#EE4D2D] rounded-xl text-sm focus:outline-none transition-all placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-500 hidden sm:inline whitespace-nowrap">
                Sắp xếp:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:border-[#EE4D2D] transition-colors cursor-pointer"
              >
                <option value="hot">🔥 Nổi bật nhất</option>
                <option value="discount">🏷️ Giảm sâu nhất</option>
                <option value="price-asc">💵 Giá thấp → cao</option>
                <option value="price-desc">💎 Giá cao → thấp</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Category Pills & Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-neutral-400 font-medium whitespace-nowrap pl-1 hidden lg:inline">
              Danh mục:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#EE4D2D] text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Badge filter pills */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 text-xs">
            <span className="text-neutral-400 font-medium whitespace-nowrap pl-1">
              Bộ lọc nhãn:
            </span>
            <button
              onClick={() => setSelectedBadge('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBadge === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedBadge('Deal hot')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBadge === 'Deal hot'
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              🔥 Deal hot
            </button>
            <button
              onClick={() => setSelectedBadge('Bán chạy')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBadge === 'Bán chạy'
                  ? 'bg-amber-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              ⭐ Bán chạy
            </button>
            <button
              onClick={() => setSelectedBadge('Giảm sâu')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedBadge === 'Giảm sâu'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              🏷️ Giảm sâu
            </button>
          </div>

        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-600 mb-6 px-1">
          <div>
            Đang hiển thị{' '}
            <span className="font-bold text-[#EE4D2D]">{filteredProducts.length}</span> sản phẩm
            {selectedCategory !== 'all' && (
              <span> trong <strong className="text-neutral-900">{CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></span>
            )}
            {searchQuery && (
              <span> cho từ khóa "<strong className="text-neutral-900">{searchQuery}</strong>"</span>
            )}
          </div>

          {(selectedCategory !== 'all' || searchQuery || selectedBadge !== 'all') && (
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
                setSelectedBadge('all');
              }}
              className="text-xs text-[#EE4D2D] hover:underline font-bold cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-[#EE4D2D] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-neutral-900 mb-1">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-sm text-neutral-500 mb-5">
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc danh mục hiện tại.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
                setSelectedBadge('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#EE4D2D] text-white font-bold text-sm shadow-sm hover:bg-[#d83f20] transition-colors"
            >
              Xem tất cả deal hot
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
