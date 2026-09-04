import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, ShoppingCart, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

        {/* Category Pill Tag on image */}
        {product.category && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs">
            <Tag className="w-3 h-3 text-[#EE4D2D]" />
            <span>{product.category}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Product Title */}
        <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem] mb-2.5 group-hover:text-[#EE4D2D] transition-colors">
          {product.name}
        </h3>

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
