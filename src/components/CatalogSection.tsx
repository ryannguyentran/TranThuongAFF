import React, { useState, useMemo } from 'react';
import { Search, Sparkles, X, AlertCircle, Layers, Tag, ChevronRight } from 'lucide-react';
import { Product, CategoryItem, SubCategoryItem } from '../types';
import { CATEGORIES } from '../data/affiliateData';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  categories?: CategoryItem[];
  selectedCategory: string;
  selectedSubCategory: string;
  onSelectCategory: (catId: string) => void;
  onSelectSubCategory: (subCatId: string, mainCatId?: string) => void;
}

type SortOption = 'default' | 'name-asc' | 'name-desc';

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  categories = CATEGORIES,
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Compute available subcategories based on the current main category selection
  const availableSubCategories = useMemo<SubCategoryItem[]>(() => {
    if (selectedCategory === 'all') {
      // Collect unique subcategories across all products
      const subMap = new Map<string, number>();
      products.forEach((p) => {
        if (p.subCategory) {
          subMap.set(p.subCategory, (subMap.get(p.subCategory) || 0) + 1);
        }
      });
      const list: SubCategoryItem[] = [];
      subMap.forEach((count, name) => {
        list.push({ id: name, name, count });
      });
      return list;
    }

    const currentCat = categories.find((c) => c.id === selectedCategory);
    return currentCat?.subCategories || [];
  }, [products, categories, selectedCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Main Category filter
        if (selectedCategory !== 'all') {
          const matchMain = p.mainCategory === selectedCategory || p.category === selectedCategory || p.category?.startsWith(selectedCategory);
          if (!matchMain) return false;
        }

        // Subcategory filter
        if (selectedSubCategory !== 'all') {
          if (p.subCategory !== selectedSubCategory) {
            return false;
          }
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchNote = p.note?.toLowerCase().includes(q);
          const matchMain = p.mainCategory?.toLowerCase().includes(q);
          const matchSub = p.subCategory?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchNote && !matchMain && !matchSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'name-asc') {
          return a.name.localeCompare(b.name, 'vi');
        }
        if (sortOption === 'name-desc') {
          return b.name.localeCompare(a.name, 'vi');
        }
        return 0;
      });
  }, [products, selectedCategory, selectedSubCategory, searchQuery, sortOption]);

  const resetAllFilters = () => {
    onSelectCategory('all');
    onSelectSubCategory('all');
    setSearchQuery('');
  };

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
            Danh Sách Sản Phẩm & Phụ Kiện
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Tất cả sản phẩm đều có link mở trực tiếp trên ứng dụng hoặc trang Shopee.
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
                placeholder="Tìm tên sản phẩm, dòng xe, ghi chú (khay nhựa, thảm sàn, hộc đồ...)"
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
                <option value="default">Thứ tự mặc định</option>
                <option value="name-asc">Tên sản phẩm (A → Z)</option>
                <option value="name-desc">Tên sản phẩm (Z → A)</option>
              </select>
            </div>
          </div>

          {/* Level 1: Cataloge Chính (Main Categories) */}
          <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-neutral-500 font-bold whitespace-nowrap pl-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#EE4D2D]" />
              <span>Cataloge Chính:</span>
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onSelectSubCategory('all', cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#EE4D2D] text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Level 2: Cataloge Phụ (Subcategories) - displayed if available */}
          {availableSubCategories.length > 0 && (
            <div className="pt-2 border-t border-dashed border-neutral-200 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs bg-neutral-50/70 p-2 rounded-xl">
              <span className="text-neutral-500 font-bold whitespace-nowrap pl-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-neutral-500" />
                <span>Cataloge Phụ:</span>
              </span>
              
              {/* All subcategories button */}
              <button
                type="button"
                onClick={() => onSelectSubCategory('all')}
                className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubCategory === 'all'
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200/80 border border-neutral-200/80'
                }`}
              >
                Tất cả nhóm con
              </button>

              {availableSubCategories.map((sub) => {
                const isSubActive = selectedSubCategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onSelectSubCategory(sub.id)}
                    className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                      isSubActive
                        ? 'bg-[#EE4D2D] text-white shadow-xs'
                        : 'bg-white text-neutral-700 hover:border-[#EE4D2D] hover:text-[#EE4D2D] border border-neutral-200'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSubActive ? 'bg-white/25 text-white' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {sub.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-600 mb-6 px-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span>
              Đang hiển thị <strong className="text-[#EE4D2D] font-extrabold">{filteredProducts.length}</strong> sản phẩm
            </span>
            {selectedCategory !== 'all' && (
              <>
                <span className="text-neutral-400">•</span>
                <span>
                  Chính: <strong className="text-neutral-900">{categories.find(c => c.id === selectedCategory)?.name || selectedCategory}</strong>
                </span>
              </>
            )}
            {selectedSubCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span>
                  Phụ: <strong className="text-[#EE4D2D]">{selectedSubCategory}</strong>
                </span>
              </>
            )}
            {searchQuery && (
              <>
                <span className="text-neutral-400">•</span>
                <span>
                  Từ khóa: "<strong className="text-neutral-900">{searchQuery}</strong>"
                </span>
              </>
            )}
          </div>

          {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchQuery) && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#EE4D2D] hover:underline font-bold cursor-pointer whitespace-nowrap ml-2"
            >
              Xóa bộ lọc (Xem tất cả)
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectCategory={(catId) => {
                  onSelectCategory(catId);
                  onSelectSubCategory('all', catId);
                }}
                onSelectSubCategory={(subCatId, mainCatId) => {
                  if (mainCatId) onSelectCategory(mainCatId);
                  onSelectSubCategory(subCatId, mainCatId);
                }}
              />
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
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn xem danh mục khác.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 rounded-xl bg-[#EE4D2D] text-white font-bold text-sm shadow-xs hover:bg-[#d83f20] transition-colors cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
