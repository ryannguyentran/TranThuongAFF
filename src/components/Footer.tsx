import React from 'react';
import { ShoppingBag, ShieldCheck, Heart, ArrowUp, Send, Share2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/affiliateData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-16 sm:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-neutral-800">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EE4D2D] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Tran<span className="text-[#EE4D2D]">Thuong</span>
              </span>
            </div>
            
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Trang thông tin & catalog tổng hợp các ưu đãi, mã giảm giá tốt nhất từ các gian hàng chính hãng Shopee Mall Việt Nam.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Link Sản Phẩm Chính Hãng – Mua Sắm An Toàn</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="#catalog" className="hover:text-[#EE4D2D] transition-colors">
                  🔥 Deal Hot Hôm Nay
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#EE4D2D] transition-colors">
                  📁 Danh Mục Sản Phẩm
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Community */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Cộng Đồng Săn Deal
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tham gia các kênh chia sẻ mã giảm giá và flash sale Shopee mỗi ngày:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Facebook Group</span>
              </a>
              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3 h-3 text-[#2AABEE]" />
                <span>Telegram Deal</span>
              </a>
              <a
                href={SITE_CONFIG.socials.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Zalo OA</span>
              </a>
              <a
                href={SITE_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>TikTok Review</span>
              </a>
            </div>
          </div>

        </div>

        {/* Disclaimer & Privacy Box (Requested in prompt) */}
        <div className="py-6 border-b border-neutral-800 space-y-3">
          <div className="bg-neutral-800/60 rounded-xl p-4 border border-neutral-700/60 text-xs text-neutral-400 leading-relaxed space-y-1.5">
            <p className="font-semibold text-neutral-300">
              📌 Tuyên bố miễn trừ trách nhiệm (Disclaimer):
            </p>
            <p>
              "{SITE_CONFIG.disclaimer}"
            </p>
            <div className="pt-2 border-t border-neutral-700/40 text-emerald-400 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{SITE_CONFIG.privacyNotice}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} TranThuong. Link sản phẩm Shopee chính hãng.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-[#EE4D2D] transition-colors cursor-pointer"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
