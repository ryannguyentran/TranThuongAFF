import React from 'react';
import { CheckCircle2, TrendingDown, ShieldCheck, Clock, Check, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/affiliateData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-14 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cam kết minh bạch & an tâm</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
            Lý Do Nên Mua Qua Website Này
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium">
            Chúng tôi giúp bạn tiết kiệm thời gian lọc sản phẩm tốt giữa hàng triệu mặt hàng trên sàn.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          
          {/* 1. Chọn lọc deal thật */}
          <div className="bg-neutral-50/80 rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              Tiêu chuẩn chất lượng
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
              Chọn Lọc Deal Thật
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Chỉ giới thiệu sản phẩm có đánh giá từ 4.8★ trở lên, có hàng ngàn lượt mua thật và phản hồi tích cực từ người dùng thực tế.
            </p>
            <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Không đăng deal rác, hàng kém chất lượng</span>
            </div>
          </div>

          {/* 2. Không tăng giá */}
          <div className="bg-neutral-50/80 rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 shadow-xs">
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              Giá trị thật
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
              Không Tăng Giá
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Kiểm tra lịch sử giá niêm yết. Nói KHÔNG với việc cố tình thổi phồng giá gốc lên cao rồi gắn mác giảm giá 50-70% ảo.
            </p>
            <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-semibold text-amber-800">
              <Check className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Mua đúng giá trị thực của sản phẩm</span>
            </div>
          </div>

          {/* 3. Link Sản Phẩm Chính Hãng */}
          <div className="bg-neutral-50/80 rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              Nguồn gốc an tâm
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
              Link Sản Phẩm Chính Hãng
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              100% đường link dẫn trực tiếp tới gian hàng Shopee Mall hoặc Shop Yêu Thích uy tín, hưởng đầy đủ chính sách bảo hành và đổi trả.
            </p>
            <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-semibold text-blue-800">
              <Check className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Bảo vệ quyền lợi người mua tối đa</span>
            </div>
          </div>

          {/* 4. Cập nhật hằng ngày */}
          <div className="bg-neutral-50/80 rounded-2xl p-6 sm:p-7 border border-neutral-200/90 hover:border-rose-300 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-5 shadow-xs">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
              Liên tục 24/7
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">
              Cập Nhật Hằng Ngày
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Săn đón các khung giờ vàng Flash Sale (0H - 9H - 12H - 21H), cập nhật mã giảm giá độc quyền và điều chỉnh giá mới nhất mỗi ngày.
            </p>
            <div className="mt-5 pt-4 border-t border-neutral-200/60 flex items-center gap-2 text-xs font-semibold text-rose-800">
              <Check className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Không lo bỏ lỡ mã voucher số lượng có hạn</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
