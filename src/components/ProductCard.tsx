import React, { useState } from 'react';
import { ExternalLink, Flame, Star, TrendingUp, ShieldCheck, Tag, ShoppingCart } from 'lucide-react';
import { Product, DealBadge } from '../types';
import { formatVND, calculateDiscountPercent } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountPercent = calculateDiscountPercent(product.originalPrice, product.salePrice);

  // Badge configuration
  const renderBadge = (badge: DealBadge) => {
    switch (badge) {
      case 'Deal hot':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 to-[#EE4D2D] text-white shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-current" />
            Deal hot
          </span>
        );
      case 'Bán chạy':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            Bán chạy
          </span>
        );
      case 'Giảm sâu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
            <Tag className="w-3.5 h-3.5" />
            Giảm sâu
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-neutral-100">
        {/* Placeholder skeleton before load */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        )}

        <img
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
              : product.image
          }
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {renderBadge(product.badge)}

          {product.isMall && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-extrabold bg-[#D0011B] text-white uppercase tracking-wider shadow-xs">
              Shopee Mall
            </span>
          )}
        </div>

        {/* Discount Percentage Pill */}
        {discountPercent > 0 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-black shadow-md tracking-tight">
            -{discountPercent}%
          </div>
        )}

        {/* Optional Voucher Tag on image bottom */}
        {product.voucherTag && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
            {product.voucherTag}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2 font-medium">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
          </div>
          <span className="text-neutral-500">{product.soldCount}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.75rem] mb-2.5 group-hover:text-[#EE4D2D] transition-colors">
          {product.name}
        </h3>

        {/* Description brief if available */}
        {product.description && (
          <p className="text-xs text-neutral-500 line-clamp-1 mb-3">
            {product.description}
          </p>
        )}

        {/* Pricing block */}
        <div className="mt-auto pt-2 border-t border-neutral-100 mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            {/* Sale price in Shopee Orange */}
            <span className="text-xl sm:text-2xl font-black text-[#EE4D2D] tracking-tight">
              {formatVND(product.salePrice)}
            </span>
            {/* Strikethrough original price */}
            {product.originalPrice > product.salePrice && (
              <span className="text-xs sm:text-sm text-neutral-400 line-through">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Giá cam kết qua link Shopee chính hãng
          </p>
        </div>

        {/* Prominent CTA Button */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          id={`buy-btn-${product.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm sm:text-base font-bold text-white bg-[#EE4D2D] hover:bg-[#d73a1c] active:bg-[#c03014] shadow-md shadow-[#EE4D2D]/20 hover:shadow-lg hover:shadow-[#EE4D2D]/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:ring-offset-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Mua Ngay</span>
          <ExternalLink className="w-4 h-4 opacity-90" />
        </a>

      </div>
    </article>
  );
};
