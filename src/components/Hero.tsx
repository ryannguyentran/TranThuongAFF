import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, TrendingUp, Zap } from 'lucide-react';

interface HeroProps {
  totalDealsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ totalDealsCount }) => {
  return (
    <section className="relative overflow-hidden py-5 sm:py-7 border-b border-neutral-200/70 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-100/30">
      <h1 className="sr-only">TranThuong – Săn Deal Shopee Chính Hãng</h1>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge: Link Sản Phẩm Chính Hãng */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold shadow-xs mb-4 hover:bg-emerald-100/80 transition-colors">
          <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600 shrink-0" />
          <span>Link Sản Phẩm Chính Hãng Shopee Mall</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Quick Trust Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Deal thật 100%</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Không tăng giá ảo</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Cập nhật liên tục</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-[#EE4D2D] shrink-0" />
            <span>{totalDealsCount}+ Sản phẩm hot</span>
          </div>
        </div>
      </div>
    </section>
  );
};
