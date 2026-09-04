import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ADMIN_PASSWORD = 'OZNaeBhlRmU17d';

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError(null);
      setPassword('');
      onSuccess();
    } else {
      setError('Mật khẩu không chính xác. Vui lòng kiểm tra lại!');
    }
  };

  const handleClose = () => {
    setError(null);
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Xác Thực Quản Trị Viên
              </h3>
              <p className="text-xs text-neutral-500">
                Khu vực cập nhật sản phẩm & đồng bộ dữ liệu
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-200/80 leading-relaxed flex items-start gap-2.5">
            <KeyRound className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <span>
              Tính năng này được bảo vệ chỉ dành cho chủ sở hữu. Vui lòng nhập mật khẩu quản trị để tiếp tục.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700">
              Mật Khẩu Quản Trị:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                autoFocus
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full pl-3.5 pr-10 py-2.5 bg-neutral-50 border border-neutral-300 focus:border-[#EE4D2D] focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EE4D2D]/20 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#EE4D2D] hover:bg-[#d83f20] text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Mở Trình Quản Trị</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
