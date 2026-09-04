import React from 'react';
import {
  Flame,
  Headphones,
  Home,
  Laptop,
  Coffee,
  Sparkles,
  Car,
  Bike,
  Radio,
  Layers,
  Video,
  ShieldCheck,
  Zap,
  Tag,
  Wrench,
  Package,
  Heart,
  LucideIcon,
  FolderTree,
} from 'lucide-react';
import { CATEGORIES } from '../data/affiliateData';
import { CategoryItem } from '../types';

interface CategorySectionProps {
  categories?: CategoryItem[];
  selectedCategory: string;
  selectedSubCategory?: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubCategory?: (subCatId: string, mainCatId?: string) => void;
  productCounts: Record<string, number>;
}

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Headphones,
  Home,
  Laptop,
  Coffee,
  Sparkles,
  Car,
  Bike,
  Radio,
  Layers,
  Video,
  ShieldCheck,
  Zap,
  Tag,
  Wrench,
  Package,
  Heart,
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories = CATEGORIES,
  selectedCategory,
  selectedSubCategory = 'all',
  onSelectCategory,
  onSelectSubCategory,
  productCounts,
}) => {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-white border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EE4D2D] mb-1.5">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Phân loại Cataloge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Khám Phá Theo Nhóm Sản Phẩm
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md">
            Chọn nhóm sản phẩm hoặc dòng xe bạn đang quan tâm để xem danh sách phụ kiện tương ứng.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Car || Flame;
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? productCounts['all'] || 0 
              : productCounts[cat.id] || 0;

            const hasSubs = cat.subCategories && cat.subCategories.length > 0;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (onSelectSubCategory) onSelectSubCategory('all', cat.id);
                  const catalogElem = document.getElementById('catalog');
                  if (catalogElem) {
                    catalogElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex flex-col text-center p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer group text-left ${
                  isSelected
                    ? 'bg-[#EE4D2D]/5 border-[#EE4D2D] shadow-sm ring-2 ring-[#EE4D2D]/20'
                    : 'bg-white hover:bg-neutral-50/80 border-neutral-200 hover:border-neutral-300 hover:shadow-xs'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-200 ${
                      isSelected
                        ? 'bg-[#EE4D2D] text-white shadow-md shadow-[#EE4D2D]/20'
                        : 'bg-neutral-100 text-neutral-700 group-hover:bg-[#EE4D2D]/10 group-hover:text-[#EE4D2D]'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 line-clamp-1 mb-1 group-hover:text-[#EE4D2D] transition-colors">
                    {cat.name}
                  </h3>
                  
                  <span className="text-xs font-semibold text-neutral-500 mb-2">
                    {count} sản phẩm
                  </span>
                </div>

                {/* Subcategories preview tags */}
                {hasSubs && cat.id !== 'all' && (
                  <div className="mt-auto pt-2.5 border-t border-neutral-100/90 flex flex-wrap justify-center gap-1.5">
                    {cat.subCategories!.map((sub) => {
                      const isSubActive = selectedCategory === cat.id && selectedSubCategory === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectSubCategory) {
                              onSelectSubCategory(sub.id, cat.id);
                            } else {
                              onSelectCategory(cat.id);
                            }
                            const catalogElem = document.getElementById('catalog');
                            if (catalogElem) {
                              catalogElem.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                            isSubActive
                              ? 'bg-[#EE4D2D] text-white'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-[#EE4D2D]/15 hover:text-[#EE4D2D]'
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
