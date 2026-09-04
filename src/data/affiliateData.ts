import { CategoryItem, Product, SiteConfig } from '../types';

/**
 * =========================================================================
 * 📌 HƯỚNG DẪN DÀNH CHO BẠN (CÁCH THAY LINK AFFILIATE SHOPEE):
 * Để gắn link tiếp thị liên kết (affiliate) của bạn, chỉ cần sửa trường
 * `affiliateUrl` của từng sản phẩm trong mảng `PRODUCTS` bên dưới.
 *
 * Ví dụ:
 * affiliateUrl: 'https://shope.ee/abcXYZ123'
 * =========================================================================
 */

export const SITE_CONFIG: SiteConfig = {
  siteName: 'TranThuong',
  tagline: 'TranThuong – Săn deal Shopee chính hãng',
  heroTitle: '',
  heroSubtitle: '',
  disclaimer:
    'Website chia sẻ các sản phẩm chất lượng, với giá ưu đãi. Chúng tôi tổng hợp các chương trình khuyến mãi từ Shopee Mall và không trực tiếp thu tiền hay phân phối sản phẩm.',
  privacyNotice: 'Không cần đăng nhập, không thu thập dữ liệu người dùng.',
  socials: {
    facebook: 'https://facebook.com',
    telegram: 'https://telegram.org',
    zalo: 'https://zalo.me',
    tiktok: 'https://tiktok.com',
  },
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'all',
    name: 'Tất cả sản phẩm',
    icon: 'Flame',
    description: 'Tất cả phụ kiện & sản phẩm',
  },
  {
    id: 'Minio Green - VF2',
    name: 'Minio Green - VF2',
    icon: 'Car',
    description: 'Phụ kiện cho Minio Green - VF2',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Khay nhựa chữ nhật trong suốt',
    category: 'Minio Green - VF2',
    image: 'https://i.postimg.cc/Hn1zLt3b/khaynhua.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/AKaJleFrop',
    voucherTag: '',
    description: 'Khay nhựa cao cấp chịu lực, đặt gọn gàng tiện lợi.',
    note: 'Chọn mã 04 - Dùng đặt vừa dưới ghế lái và phụ của xe',
  },
  {
    id: 'prod-2',
    name: 'Essager - Bộ chuyển đổi Bluetooth FM 5.3 có đầu vào TF',
    category: 'Minio Green - VF2',
    image: 'https://i.postimg.cc/qRJMdfH2/fmtranmission.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/9V1CmCdqLU',
    voucherTag: '',
    description: 'Bộ tẩu sạc kiêm truyền phát âm thanh Bluetooth qua sóng FM 5.3.',
    note: 'Tác dụng chuyển tần số FM thành BT',
  },
  {
    id: 'prod-3',
    name: 'Thảm Sàn Huvi + Rối Giá rẻ',
    category: 'Minio Green - VF2',
    image: 'https://i.postimg.cc/4dfNTCRb/thamhuvivf2.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/9zxTNHyuwU',
    voucherTag: '',
    description: 'Thảm sàn đúc khuôn chuẩn form xe, kèm rối giữ bụi bẩn cao cấp.',
    note: '',
  },
  {
    id: 'prod-4',
    name: 'Cam Hành trình Gương Galaxy S4K + Lùi',
    category: 'Minio Green - VF2',
    image: 'https://i.postimg.cc/504NMcWj/cams4k.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/1qbleKJ6Oo',
    voucherTag: '',
    description: 'Camera hành trình dạng gương 4K siêu nét tích hợp camera lùi.',
    note: 'HCM - Shop này sẽ free lắp tại shop dù có mua ở Shopee mang qua',
  },
];

export const WHY_CHOOSE_US = [
  {
    id: 'real-deal',
    title: 'Chọn lọc deal thật',
    shortDesc: 'Đánh giá cao & uy tín',
    description:
      'Chỉ tổng hợp sản phẩm từ 4.8 sao trở lên, có hàng nghìn lượt bán thật và phản hồi tốt từ người mua thực tế.',
    icon: 'CheckCircle2',
    color: 'emerald',
  },
  {
    id: 'no-price-hike',
    title: 'Không tăng giá',
    shortDesc: 'Giá thật, giảm thật',
    description:
      'Theo dõi lịch sử giá sát sao, cam kết nói KHÔNG với chiêu trò nâng giá ảo rồi gắn mác giảm giá giả tạo.',
    icon: 'TrendingDown',
    color: 'amber',
  },
  {
    id: 'official-link',
    title: 'Link Sản Phẩm Chính Hãng',
    shortDesc: '100% Shopee Mall & Yêu Thích',
    description:
      'Tất cả đường dẫn đều trỏ thẳng về gian hàng chính hãng Shopee Mall hoặc Shop Yêu Thích đã xác minh bảo hành.',
    icon: 'ShieldCheck',
    color: 'blue',
  },
  {
    id: 'daily-updates',
    title: 'Cập nhật hằng ngày',
    shortDesc: 'Săn đón mã mới 24/7',
    description:
      'Đội ngũ liên tục rà soát khung giờ Flash Sale (0h - 9h - 12h - 21h) và cập nhật voucher độc quyền mới nhất mỗi ngày.',
    icon: 'Clock',
    color: 'rose',
  },
];
