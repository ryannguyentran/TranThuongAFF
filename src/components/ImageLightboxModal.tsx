import React, { useState, useEffect } from 'react';
import {
  X,
  Camera,
  Image as ImageIcon,
  Play,
  ShoppingCart,
  ExternalLink,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Video,
  Copy,
  Check,
} from 'lucide-react';
import { Product } from '../types';
import { getProductRealImages, getVideoInfo } from '../data/affiliateData';

interface ImageLightboxModalProps {
  product: Product | null;
  initialTab?: 'catalog' | 'real' | 'video';
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  product,
  initialTab = 'real',
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'real' | 'video'>('real');
  const [activeRealIndex, setActiveRealIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const realImages = product ? getProductRealImages(product) : [];
  const hasRealImages = realImages.length > 0;
  const hasVideo = Boolean(product?.videoUrl);
  const videoInfo = product?.videoUrl ? getVideoInfo(product.videoUrl) : null;

  useEffect(() => {
    if (product) {
      setActiveRealIndex(0);
      setIsLoaded(false);
      setCopiedLink(false);

      if (initialTab === 'video' && product.videoUrl) {
        setActiveTab('video');
      } else if (initialTab === 'real' && hasRealImages) {
        setActiveTab('real');
      } else if (hasRealImages) {
        setActiveTab('real');
      } else if (product.videoUrl) {
        setActiveTab('video');
      } else {
        setActiveTab('catalog');
      }
    }
  }, [product, initialTab, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (activeTab === 'real' && realImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveRealIndex((prev) => (prev > 0 ? prev - 1 : realImages.length - 1));
          setIsLoaded(false);
        } else if (e.key === 'ArrowRight') {
          setActiveRealIndex((prev) => (prev < realImages.length - 1 ? prev + 1 : 0));
          setIsLoaded(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, activeTab, realImages.length]);

  if (!isOpen || !product) return null;

  // Resolve current image URL
  const currentImageUrl = (() => {
    if (activeTab === 'real' && hasRealImages) {
      return realImages[activeRealIndex] || realImages[0];
    }
    return product.image;
  })();

  const resolveUrl = (imgSrc: string) => {
    if (!imgSrc) return '';
    if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) {
      return imgSrc;
    }
    const cleanPath = imgSrc.startsWith('/') ? imgSrc.slice(1) : imgSrc;
    const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || '/';
    return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
  };

  const currentDisplayUrl = resolveUrl(currentImageUrl);

  const handleCopyVideoUrl = () => {
    if (!product.videoUrl) return;
    navigator.clipboard.writeText(product.videoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-100 bg-neutral-50/80">
          <div className="flex items-center gap-2.5 overflow-hidden pr-2">
            <span className="p-1.5 rounded-lg bg-[#EE4D2D]/10 text-[#EE4D2D] shrink-0">
              {activeTab === 'video' ? (
                <Video className="w-4 h-4 text-purple-600" />
              ) : activeTab === 'real' ? (
                <Camera className="w-4 h-4 text-emerald-600" />
              ) : (
                <ImageIcon className="w-4 h-4 text-[#EE4D2D]" />
              )}
            </span>
            <div className="truncate">
              <h3 className="font-bold text-neutral-900 text-sm sm:text-base truncate">
                {product.name}
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium truncate">
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

        {/* Tab Navigation Switcher (Ảnh mẫu / Ảnh thực tế / Video thực tế) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2 bg-neutral-100/80 border-b border-neutral-200/80">
          {/* Real Images Tab */}
          {hasRealImages && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('real');
                setIsLoaded(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'real'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ảnh thực tế</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeTab === 'real' ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                {realImages.length}
              </span>
            </button>
          )}

          {/* Video Tab */}
          {hasVideo && (
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white/80 text-purple-700 hover:bg-white hover:text-purple-900'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Video thực tế</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500 text-white font-extrabold animate-pulse">
                HD
              </span>
            </button>
          )}

          {/* Catalog Image Tab */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('catalog');
              setIsLoaded(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-neutral-800 text-white shadow-xs'
                : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Ảnh mẫu sản phẩm</span>
          </button>
        </div>

        {/* Media Content Display Area */}
        <div className="relative flex-1 min-h-[280px] max-h-[58vh] bg-neutral-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
          {/* TAB 1 & TAB 2: Images (Real or Catalog) */}
          {activeTab !== 'video' && (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                  <div className="w-8 h-8 border-3 border-[#EE4D2D] border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <img
                key={`${currentDisplayUrl}-${activeRealIndex}`}
                src={currentDisplayUrl}
                alt={`${product.name} - ${activeTab === 'real' ? `Ảnh thực tế ${activeRealIndex + 1}` : 'Ảnh sản phẩm'}`}
                onLoad={() => setIsLoaded(true)}
                className={`max-w-full max-h-[52vh] object-contain rounded-xl transition-opacity duration-300 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Tag for Real Image */}
              {activeTab === 'real' && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ảnh thực tế {realImages.length > 1 ? `(${activeRealIndex + 1}/${realImages.length})` : ''}</span>
                  </span>
                </div>
              )}

              {/* Prev / Next navigation for multiple real images */}
              {activeTab === 'real' && realImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRealIndex((prev) => (prev > 0 ? prev - 1 : realImages.length - 1));
                      setIsLoaded(false);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs transition-colors cursor-pointer shadow-lg z-10"
                    title="Ảnh trước (Mũi tên trái)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRealIndex((prev) => (prev < realImages.length - 1 ? prev + 1 : 0));
                      setIsLoaded(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-xs transition-colors cursor-pointer shadow-lg z-10"
                    title="Ảnh kế tiếp (Mũi tên phải)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </>
          )}

          {/* TAB 3: Video Player / Video Card */}
          {activeTab === 'video' && product.videoUrl && (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
              {/* CASE A: YouTube Video (Direct Iframe Embed) */}
              {videoInfo?.type === 'youtube' && videoInfo.embedUrl ? (
                <div className="w-full aspect-video max-h-[52vh] max-w-2xl rounded-xl overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src={videoInfo.embedUrl}
                    title={`${product.name} - Video thực tế`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : videoInfo?.type === 'mp4' ? (
                /* CASE B: MP4 Direct File */
                <video
                  src={videoInfo.directUrl}
                  controls
                  autoPlay
                  className="max-w-full max-h-[52vh] rounded-xl shadow-2xl"
                >
                  Trình duyệt không hỗ trợ phát video.
                </video>
              ) : (
                /* CASE C: Google Photos / External Video (Optimal Card with Quick Play action) */
                <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-neutral-900/90 border border-neutral-800 text-white shadow-2xl flex flex-col items-center backdrop-blur-md overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#EE4D2D]/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Pulsing Play Icon */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Play className="w-9 h-9 text-white fill-white translate-x-0.5" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500" />
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
                    Video Thực Tế • Google Photos
                  </span>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    Xem clip trải nghiệm & lắp đặt thực tế
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mb-5">
                    Video được quay thực tế trên xe với độ phân giải cao (Full HD/4K). Nhấp nút bên dưới để mở xem mượt mà trên ứng dụng Google Photos hoặc trình duyệt của bạn.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full justify-center">
                    <a
                      href={product.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Mở Video Full HD Ngay</span>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyVideoUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
                      title="Sao chép link video"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Đã chép link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Chép link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail Selector Bar (for multiple real images) */}
        {activeTab === 'real' && realImages.length > 1 && (
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-900 border-t border-neutral-800">
            {realImages.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => {
                  setActiveRealIndex(idx);
                  setIsLoaded(false);
                }}
                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeRealIndex === idx
                    ? 'border-emerald-500 scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={resolveUrl(img)}
                  alt={`Góc chụp ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 px-1 text-[9px] font-bold bg-black/80 text-white rounded-tl">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        )}

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
