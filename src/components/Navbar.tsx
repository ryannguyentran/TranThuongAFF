import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, ExternalLink, Code2, Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../data/affiliateData';

interface NavbarProps {
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGuide }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EE4D2D] text-white flex items-center justify-center shadow-md shadow-[#EE4D2D]/20 group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900">
                    Tran<span className="text-[#EE4D2D]">Thuong</span>
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-500 font-medium hidden sm:block">
                  Săn deal Shopee chính hãng
                </p>
              </div>
            </a>

            {/* Official Badge in Header */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Link Sản Phẩm Chính Hãng</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <a
              href="#catalog"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-neutral-700 hover:text-[#EE4D2D] hover:bg-neutral-100/80 transition-colors"
            >
              Deal Hot Hôm Nay
            </a>
            <a
              href="#categories"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-neutral-700 hover:text-[#EE4D2D] hover:bg-neutral-100/80 transition-colors"
            >
              Danh Mục
            </a>

            {/* Quick Affiliate Edit Helper Modal Button */}
            <button
              onClick={onOpenGuide}
              type="button"
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
              title="Hướng dẫn thay link affiliate trong 1 file"
            >
              <Code2 className="w-3.5 h-3.5 text-[#EE4D2D]" />
              <span>Thay Link Affiliate</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenGuide}
              type="button"
              className="p-2 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-medium flex items-center gap-1"
            >
              <Code2 className="w-4 h-4 text-[#EE4D2D]" />
              <span className="text-[11px]">Đổi Link</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Link Sản Phẩm Chính Hãng Shopee Mall</span>
          </div>

          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            🔥 Deal Hot Hôm Nay
          </a>
          <a
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            📁 Danh Mục Sản Phẩm
          </a>
        </div>
      )}
    </header>
  );
};
