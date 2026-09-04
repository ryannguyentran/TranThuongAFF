import React, { useState } from 'react';
import { X, Check, Copy, Code2, ExternalLink, Sparkles } from 'lucide-react';

interface AffiliateGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateGuideModal: React.FC<AffiliateGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleSnippet = `// Mở file: src/data/affiliateData.ts
export const PRODUCTS: Product[] = [
  {
    id: 'deal-01',
    name: 'Tai nghe Bluetooth True Wireless chống ồn chủ động ANC',
    ...
    // ⬇️ THAY LINK AFFILIATE CỦA BẠN TẠI ĐÂY:
    affiliateUrl: 'https://shope.ee/YOUR_AFFILIATE_LINK',
  },
  ...
];`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#EE4D2D]/10 text-[#EE4D2D] flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Cách Thay Link Affiliate Shopee
            </h3>
            <p className="text-xs text-neutral-500">
              Quản lý toàn bộ link sản phẩm tập trung trong 1 file duy nhất
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-sm text-neutral-700 mb-6">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-neutral-900 text-xs sm:text-sm">
              <span className="w-5 h-5 rounded-full bg-[#EE4D2D] text-white flex items-center justify-center text-xs font-bold shrink-0">
                1
              </span>
              <span>Mở file dữ liệu sản phẩm duy nhất:</span>
            </div>
            <code className="block px-3 py-2 bg-neutral-900 text-emerald-400 rounded-lg text-xs font-mono">
              src/data/affiliateData.ts
            </code>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-neutral-900 text-xs sm:text-sm">
              <span className="w-5 h-5 rounded-full bg-[#EE4D2D] text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </span>
              <span>Thay URL vào trường <code>affiliateUrl</code>:</span>
            </div>
            <div className="relative">
              <pre className="p-3 bg-neutral-900 text-neutral-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
                {sampleSnippet}
              </pre>
              <button
                onClick={copyCode}
                className="absolute top-2 right-2 p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Sparkles className="w-4 h-4 text-[#EE4D2D] shrink-0" />
            <span>Mỗi khi khách bấm nút "Mua Ngay", liên kết sẽ tự động mở trong tab mới với link affiliate Shopee của bạn!</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-neutral-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#EE4D2D] text-white text-sm font-bold shadow-sm hover:bg-[#d83f20] transition-colors cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>

      </div>
    </div>
  );
};
