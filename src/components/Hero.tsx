import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, TrendingUp, Zap, HeartHandshake } from 'lucide-react';
import { SITE_CONFIG } from '../data/affiliateData';
import { YouTubeVoucherBanner } from './YouTubeVoucherBanner';

interface HeroProps {
  totalDealsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ totalDealsCount }) => {
  return (
    <section className="relative overflow-hidden py-6 sm:py-8 border-b border-neutral-200/70 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-100/30">
      <h1 className="sr-only">TranThuong – Săn Deal Shopee Chính Hãng</h1>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge: Link Sản Phẩm Chính Hãng */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold shadow-xs mb-3.5 hover:bg-emerald-100/80 transition-colors">
          <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600 shrink-0" />
          <span>Link Sản Phẩm Shopee Chọn Lọc</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* 2 Cột bên cạnh nhau: Chia sẻ từ chủ trang & Khung giờ mã YouTube */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 max-w-5xl mx-auto mb-5 text-left items-stretch">
          {/* Cột 1: Slogan / Chia sẻ từ chủ trang */}
          <div className="bg-white border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-neutral-800 leading-relaxed">
                "{SITE_CONFIG.slogan}"
              </p>
            </div>
          </div>

          {/* Cột 2: Banner giờ có lại mã YouTube (gọn gàng, kèm logo YouTube) */}
          <YouTubeVoucherBanner />
        </div>

        {/* Quick Trust Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Sản phẩm chọn lọc</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Đúng mã & phụ kiện</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Cập nhật liên tục</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-700">
            <Sparkles className="w-3.5 h-3.5 text-[#EE4D2D] shrink-0" />
            <span>{totalDealsCount} Sản phẩm</span>
          </div>
        </div>
      </div>
    </section>
  );
};
