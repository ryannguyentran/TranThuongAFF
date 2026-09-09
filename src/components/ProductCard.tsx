import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, ShoppingCart, Tag, Camera, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { Product } from '../types';
import { getProductMainCategories } from '../data/affiliateData';

interface ProductCardProps {
  product: Product;
  onSelectCategory?: (catId: string) => void;
  onSelectSubCategory?: (subCatId: string, mainCatId?: string) => void;
  onOpenLightbox?: (product: Product, tab?: 'catalog' | 'real') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectCategory,
  onSelectSubCategory,
  onOpenLightbox,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'real'>('catalog');

  const mainCategories = React.useMemo(() => {
    return getProductMainCategories(product);
  }, [product]);

  const currentDisplayImage = activeTab === 'real' && product.realImage ? product.realImage : product.image;

  const resolvedImageUrl = React.useMemo(() => {
    if (!currentDisplayImage) return '';
    if (currentDisplayImage.startsWith('http://') || currentDisplayImage.startsWith('https://')) {
      return currentDisplayImage;
    }
    const cleanPath = currentDisplayImage.startsWith('/') ? currentDisplayImage.slice(1) : currentDisplayImage;
    // Vite base url fallback for GitHub Pages or root deployment
    const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || '/';
    return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
  }, [currentDisplayImage]);

  const handleTabSwitch = (tab: 'catalog' | 'real', e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(tab);
    setImageLoaded(false);
    setImageError(false);
  };

  const handleImageClick = () => {
    if (onOpenLightbox) {
      onOpenLightbox(product, activeTab);
    }
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out"
    >
      {/* Top Image Container */}
      <div
        className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={handleImageClick}
        title="Nhấp để xem ảnh lớn & chi tiết"
      >
        {/* Placeholder skeleton before load */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        )}

        <img
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
              : resolvedImageUrl
          }
          alt={`${product.name} - ${activeTab === 'real' ? 'Ảnh thực tế' : 'Ảnh sản phẩm'}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
            imageLoaded || imageError ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Category Badges on Image (Main and Sub) */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1 z-10 max-w-[65%] pointer-events-auto">
          {mainCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory?.(cat);
              }}
              className="px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs hover:bg-[#EE4D2D] transition-colors cursor-pointer"
              title={`Lọc theo Cataloge: ${cat}`}
            >
              <Tag className="w-3 h-3 text-[#EE4D2D]" />
              <span>{cat}</span>
            </button>
          ))}

          {product.subCategory && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectSubCategory?.(product.subCategory!, mainCategories[0] || product.mainCategory);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#EE4D2D] text-white text-[11px] font-bold shadow-xs hover:bg-[#d73a1c] transition-colors cursor-pointer flex items-center gap-0.5"
              title="Lọc theo Cataloge Phụ"
            >
              <span>{product.subCategory}</span>
            </button>
          )}
        </div>

        {/* Top-Right Badges (Shopee Mall + Zoom + Real photo active badge) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1.5 pointer-events-auto">
          {product.isMall && (
            <span
              className="px-2.5 py-1 rounded-lg bg-[#D0011B] text-white text-[11px] font-black tracking-wide uppercase shadow-md flex items-center gap-1 whitespace-nowrap"
              title="Sản phẩm chính hãng Shopee Mall"
            >
              <span>Shopee Mall</span>
            </span>
          )}

          {/* Real Photo indicator when active */}
          {product.realImage && activeTab === 'real' && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-600/95 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1 shadow-sm whitespace-nowrap">
              <Camera className="w-3 h-3" />
              <span>Ảnh thực tế</span>
            </span>
          )}

          {/* Quick Zoom Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox?.(product, activeTab);
            }}
            className="p-1.5 rounded-lg bg-black/50 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-xs shadow-xs transition-colors cursor-pointer"
            title="Xem ảnh phóng to & so sánh"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Real image vs Catalog Image Tab Switcher at the bottom of the card image */}
        {product.realImage && (
          <div
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center p-1 rounded-full bg-neutral-950/75 backdrop-blur-md border border-white/20 shadow-lg text-[11px] font-semibold text-white pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => handleTabSwitch('catalog', e)}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-white text-neutral-950 shadow-xs font-bold'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Ảnh mẫu</span>
            </button>
            <button
              type="button"
              onClick={(e) => handleTabSwitch('real', e)}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                activeTab === 'real'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Camera className="w-3 h-3 text-emerald-300" />
              <span>Ảnh thực tế</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Product Title */}
        <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-[#EE4D2D] transition-colors">
          {product.isMall && (
            <span
              className="inline-block align-middle mr-1.5 px-2 py-0.5 rounded bg-[#D0011B] text-white font-black text-[10px] sm:text-[11px] tracking-wide uppercase leading-normal shadow-2xs whitespace-nowrap"
              title="Shopee Mall"
            >
              Shopee Mall
            </span>
          )}
          <span>{product.name}</span>
        </h3>

        {/* Real photo notice if product has realImage */}
        {product.realImage && (
          <div className="mb-2.5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenLightbox?.(product, 'real')}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              title="Xem ảnh chụp thực tế chi tiết"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>Có ảnh chụp thực tế</span>
              <span className="text-[10px] underline ml-0.5">Xem ngay</span>
            </button>
          </div>
        )}

        {/* Note / Ghi chú if available */}
        {product.note && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[12px] text-amber-900 leading-snug flex items-start gap-1.5">
            <span className="font-bold text-amber-700 shrink-0">💡 Lưu ý:</span>
            <span className="font-medium">{product.note}</span>
          </div>
        )}

        {/* Description brief if available (only if no note or different from note) */}
        {product.description && product.description !== product.note && !product.note && (
          <p className="text-xs text-neutral-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Prominent CTA Button and link notice */}
        <div className="mt-auto pt-3 border-t border-neutral-100 flex flex-col gap-2">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`buy-btn-${product.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#EE4D2D] hover:bg-[#d73a1c] active:bg-[#c03014] shadow-md shadow-[#EE4D2D]/20 hover:shadow-lg hover:shadow-[#EE4D2D]/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:ring-offset-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Xem Trên Shopee</span>
            <ExternalLink className="w-4 h-4 opacity-90" />
          </a>
          <p className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Mở trực tiếp link sản phẩm trên Shopee</span>
          </p>
        </div>
      </div>
    </article>
  );
};
