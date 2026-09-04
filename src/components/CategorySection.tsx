import React from 'react';
import {
  Flame,
  Headphones,
  Home,
  Laptop,
  Coffee,
  Sparkles,
  Car,
  Radio,
  Layers,
  Video,
  ShieldCheck,
  Zap,
  Tag,
  Wrench,
  Package,
  LucideIcon,
} from 'lucide-react';
import { CATEGORIES } from '../data/affiliateData';
import { CategoryItem } from '../types';

interface CategorySectionProps {
  categories?: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
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
  Radio,
  Layers,
  Video,
  ShieldCheck,
  Zap,
  Tag,
  Wrench,
  Package,
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories = CATEGORIES,
  selectedCategory,
  onSelectCategory,
  productCounts,
}) => {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-white border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EE4D2D] mb-1.5">
              <span>Danh mục sản phẩm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Khám Phá Theo Nhóm Sản Phẩm
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md">
            Chọn nhóm sản phẩm bạn đang quan tâm để xem danh sách phụ kiện và link Shopee tương ứng.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Car || Flame;
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? productCounts['all'] || 0 
              : productCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const catalogElem = document.getElementById('catalog');
                  if (catalogElem) {
                    catalogElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left group ${
                  isSelected
                    ? 'bg-[#EE4D2D]/5 border-[#EE4D2D] shadow-sm ring-2 ring-[#EE4D2D]/20'
                    : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-200 ${
                    isSelected
                      ? 'bg-[#EE4D2D] text-white shadow-md shadow-[#EE4D2D]/20'
                      : 'bg-neutral-100 text-neutral-700 group-hover:bg-[#EE4D2D]/10 group-hover:text-[#EE4D2D]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-sm text-neutral-900 line-clamp-1 mb-1 group-hover:text-[#EE4D2D] transition-colors">
                  {cat.name}
                </h3>
                
                <span className="text-[11px] font-medium text-neutral-500">
                  {count} sản phẩm
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
