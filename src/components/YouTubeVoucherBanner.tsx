import React from 'react';

interface YouTubeVoucherBannerProps {
  className?: string;
}

export const YouTubeVoucherBanner: React.FC<YouTubeVoucherBannerProps> = ({ className = '' }) => {
  const timeSlots = ['0H', '9H', '12H', '18H'];

  return (
    <div
      id="youtube-voucher-banner"
      className={`relative w-full rounded-2xl border-2 border-amber-400 bg-[#FFF9EA] p-3 sm:p-3.5 shadow-xs flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header with YouTube Logo & Clock */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
          {/* YouTube Vector Icon */}
          <span className="shrink-0 flex items-center justify-center text-[#FF0000]" title="YouTube">
            <svg
              className="w-5 h-5 sm:w-5.5 sm:h-5.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </span>
          <span className="text-sm sm:text-base leading-none select-none">⏰</span>
          <h3 className="text-xs sm:text-sm font-bold text-[#8A4500] tracking-tight leading-snug">
            Mã Youtube thêm lượt lúc 0H · 9H · 12H · 18H mỗi ngày
          </h3>
        </div>

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs font-medium text-[#7C3E00]/90 mb-2 sm:mb-2.5 leading-snug pl-0.5">
          Hết lượt thì Sếp canh đúng khung giờ trên quay lại nhé!
        </p>
      </div>

      {/* 4 Small Time Slot Pills */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {timeSlots.map((slot) => (
          <div
            key={slot}
            className="flex items-center justify-center py-1 sm:py-1.5 px-1 bg-white rounded-lg sm:rounded-xl border border-amber-200/90 shadow-2xs text-[#B45309] font-black text-xs sm:text-sm tracking-wide select-none"
          >
            <span>{slot}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
