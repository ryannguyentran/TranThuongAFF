import React, { useState, useEffect } from 'react';
import { X, Camera, Image as ImageIcon, ShoppingCart, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ImageLightboxModalProps {
  product: Product | null;
  initialTab?: 'catalog' | 'real';
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  product,
  initialTab = 'real',
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'real'>('real');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (product) {
      // If product has realImage and initialTab is 'real', default to 'real', otherwise 'catalog'
      if (product.realImage && initialTab === 'real') {
        setActiveTab('real');
      } else {
        setActiveTab('catalog');
      }
      setIsLoaded(false);
    }
  }, [product, initialTab, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentImage = activeTab === 'real' && product.realImage ? product.realImage : product.image;

  // Resolve url
  const resolvedUrl = (() => {
    if (!currentImage) return '';
    if (currentImage.startsWith('http://') || currentImage.startsWith('https://')) {
      return currentImage;
    }
    const cleanPath = currentImage.startsWith('/') ? currentImage.slice(1) : currentImage;
    const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || '/';
    return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-2 overflow-hidden pr-2">
            <span className="p-1.5 rounded-lg bg-[#EE4D2D]/10 text-[#EE4D2D]">
              <Camera className="w-4 h-4" />
            </span>
            <div className="truncate">
              <h3 className="font-bold text-neutral-900 text-sm sm:text-base truncate">
                {product.name}
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                {product.mainCategory} {product.subCategory ? `› ${product.subCategory}` : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer shrink-0"
            title="Đóng (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher if both images exist */}
        {product.realImage && (
          <div className="flex items-center justify-center gap-2 p-2 bg-neutral-100/80 border-b border-neutral-200/80">
            <button
              type="button"
              onClick={() => {
                setActiveTab('real');
                setIsLoaded(false);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'real'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Ảnh chụp thực tế</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 uppercase font-extrabold">
                Review thật
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('catalog');
                setIsLoaded(false);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Ảnh mẫu sản phẩm</span>
            </button>
          </div>
        )}

        {/* Modal Image Area */}
        <div className="relative flex-1 min-h-[260px] max-h-[58vh] bg-neutral-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
              <div className="w-8 h-8 border-3 border-[#EE4D2D] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <img
            src={resolvedUrl}
            alt={`${product.name} - ${activeTab === 'real' ? 'Ảnh thực tế' : 'Ảnh sản phẩm'}`}
            onLoad={() => setIsLoaded(true)}
            className={`max-w-full max-h-[54vh] object-contain rounded-xl transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Floating tag on top-left of image */}
          {activeTab === 'real' && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ảnh chụp thực tế đã kiểm chứng</span>
              </span>
            </div>
          )}
        </div>

        {/* Modal Note & Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Note */}
          <div className="flex-1">
            {product.note ? (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5">
                <span className="font-bold text-amber-700 shrink-0">💡 Lưu ý:</span>
                <span>{product.note}</span>
              </div>
            ) : product.description ? (
              <p className="text-xs text-neutral-600 line-clamp-2">{product.description}</p>
            ) : (
              <p className="text-xs text-neutral-500">Sản phẩm được chọn lọc chất lượng cao</p>
            )}
          </div>

          {/* Shopee CTA Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-bold text-white bg-[#EE4D2D] hover:bg-[#d73a1c] shadow-md shadow-[#EE4D2D]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Xem Trên Shopee</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
