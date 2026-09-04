import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  FileSpreadsheet,
  Link,
  ClipboardCheck,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  Lock,
  LogOut,
} from 'lucide-react';
import { Product } from '../types';
import { convertToExportCSVUrl, parseProductsCSV } from '../utils/csvParser';
import { PRODUCTS } from '../data/affiliateData';

interface SyncSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProducts: (newProducts: Product[]) => void;
  savedSheetUrl: string;
  onSaveSheetUrl: (url: string) => void;
  onLogoutAdmin?: () => void;
}

export const SyncSheetModal: React.FC<SyncSheetModalProps> = ({
  isOpen,
  onClose,
  onUpdateProducts,
  savedSheetUrl,
  onSaveSheetUrl,
  onLogoutAdmin,
}) => {
  const [sheetUrl, setSheetUrl] = useState(savedSheetUrl);
  const [pastedCSV, setPastedCSV] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'link' | 'paste'>('link');

  if (!isOpen) return null;

  const handleSyncFromLink = async () => {
    if (!sheetUrl.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng nhập link Google Sheet hoặc link file CSV!' });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: 'info', text: 'Đang tải dữ liệu từ liên kết...' });

    try {
      const exportUrl = convertToExportCSVUrl(sheetUrl);
      const response = await fetch(exportUrl, {
        headers: {
          Accept: 'text/csv,text/plain,*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Không thể tải file (Mã lỗi ${response.status}). Vui lòng kiểm tra quyền chia sẻ của link.`);
      }

      const csvText = await response.text();
      const parsedProducts = parseProductsCSV(csvText);

      if (parsedProducts.length === 0) {
        throw new Error('Không tìm thấy dòng sản phẩm nào hợp lệ trong file CSV.');
      }

      onSaveSheetUrl(sheetUrl.trim());
      onUpdateProducts(parsedProducts);
      setStatusMessage({
        type: 'success',
        text: `Đã đồng bộ thành công ${parsedProducts.length} sản phẩm & nhóm deal mới!`,
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: `Lỗi: ${err.message || 'Không thể đọc dữ liệu'}. Bạn có thể chọn tab "Dán trực tiếp CSV" nếu link bị chặn CORS.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPastedCSV = () => {
    if (!pastedCSV.trim()) {
      setStatusMessage({ type: 'error', text: 'Vui lòng dán nội dung bảng/CSV!' });
      return;
    }

    try {
      const parsedProducts = parseProductsCSV(pastedCSV);
      if (parsedProducts.length === 0) {
        throw new Error('Không phân tích được sản phẩm nào. Vui lòng kiểm tra định dạng dữ liệu.');
      }

      onUpdateProducts(parsedProducts);
      setStatusMessage({
        type: 'success',
        text: `Đã cập nhật thành công ${parsedProducts.length} sản phẩm & nhóm deal mới!`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Lỗi phân tích: ${err.message}`,
      });
    }
  };

  const handleResetDefault = () => {
    if (confirm('Bạn có chắc muốn khôi phục về danh sách sản phẩm mặc định ban đầu không?')) {
      onUpdateProducts(PRODUCTS);
      setStatusMessage({
        type: 'success',
        text: 'Đã khôi phục về danh sách 9 sản phẩm mặc định ban đầu!',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EE4D2D]/10 text-[#EE4D2D] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-900">
                  Cập Nhật Sản Phẩm & Cataloge
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Quản trị viên</span>
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Đồng bộ bảo mật từ Google Sheet hoặc dán trực tiếp bảng CSV
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onLogoutAdmin && (
              <button
                onClick={() => {
                  onLogoutAdmin();
                  onClose();
                }}
                className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:border-red-200 transition-colors cursor-pointer"
                title="Khóa lại và đăng xuất quyền quản trị"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Khóa / Đăng xuất</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-neutral-200 px-6 pt-3 gap-2 bg-neutral-50/50">
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'link'
                ? 'border-[#EE4D2D] text-[#EE4D2D]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Cập nhật qua Link Google Sheet / CSV</span>
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'paste'
                ? 'border-[#EE4D2D] text-[#EE4D2D]'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Dán trực tiếp CSV / Bảng</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl text-sm flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : statusMessage.type === 'error'
                  ? 'bg-red-50 text-red-900 border border-red-200'
                  : 'bg-blue-50 text-blue-900 border border-blue-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : statusMessage.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <RefreshCw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5 animate-spin" />
              )}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
          )}

          {activeTab === 'link' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Đường dẫn Google Sheet hoặc Link CSV công khai
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                    className="flex-1 px-3.5 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20 transition-all font-mono text-xs"
                  />
                  <button
                    onClick={handleSyncFromLink}
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-[#EE4D2D] hover:bg-[#d83f20] active:scale-98 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#EE4D2D]/20 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>{isLoading ? 'Đang tải...' : 'Đồng bộ ngay'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions guide */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-2">
                <p className="font-bold text-neutral-800 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-[#EE4D2D]" />
                  Hướng dẫn lấy Link tự động từ Google Sheets:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-600">
                  <li>
                    Trên Google Sheet của bạn, các cột lần lượt là: <br />
                    <code className="bg-neutral-200 px-1.5 py-0.5 rounded font-mono text-neutral-800 text-[11px]">
                      STT, Tên Sản Phẩm, Ghi chú, Cataloge Chính, Cataloge Phụ, Link Shopee, Hình ảnh sản phẩm
                    </code>
                  </li>
                  <li>
                    Vào menu <strong>Tệp (File)</strong> → <strong>Chia sẻ (Share)</strong> →{' '}
                    <strong>Xuất bản lên web (Publish to web)</strong>.
                  </li>
                  <li>
                    Chọn định dạng <strong>Giá trị phân tách bằng dấu phẩy (.csv)</strong> và bấm{' '}
                    <strong>Xuất bản (Publish)</strong>.
                  </li>
                  <li>Sao chép đường link xuất bản đó và dán vào ô bên trên rồi bấm <strong>Đồng bộ ngay</strong>.</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Dán nội dung bảng/CSV (kèm dòng tiêu đề cột)
                </label>
                <textarea
                  rows={8}
                  value={pastedCSV}
                  onChange={(e) => setPastedCSV(e.target.value)}
                  placeholder={`STT,Tên Sản Phẩm,Ghi chú,Cataloge Chính,Cataloge Phụ,Link Shopee,Hình ảnh sản phẩm\n1,Khay nhựa chữ nhật trong suốt,Chọn mã 04...,Xe Hơi - Ô tô,Minio Green - VF2,https://s.shopee.vn/AKaJleFrop,https://i.postimg.cc/...\n5,Bình giữ nhiệt LATINVIA316 800ml,Bình này giữ nhiệt ok...,Gia Dụng,,https://s.shopee.vn/...,https://i.postimg.cc/...\n6,Thảm Sàn Xe Feliz 2...,,Xe Máy,Feliz,https://s.shopee.vn/...,https://i.postimg.cc/...`}
                  className="w-full p-3 text-xs font-mono bg-white border border-neutral-300 rounded-xl focus:outline-none focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20 transition-all leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleApplyPastedCSV}
                  className="px-6 py-2.5 bg-[#EE4D2D] hover:bg-[#d83f20] active:scale-98 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#EE4D2D]/20 cursor-pointer flex items-center gap-2"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Áp dụng dữ liệu mới</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs">
          <button
            onClick={handleResetDefault}
            className="text-neutral-500 hover:text-red-600 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục 4 sản phẩm gốc ban đầu</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
