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
    name: 'Tất cả deal',
    icon: 'Flame',
    description: 'Tất cả khuyến mãi hot nhất hôm nay',
  },
  {
    id: 'dien-tu',
    name: 'Điện tử & Phụ kiện',
    icon: 'Headphones',
    description: 'Tai nghe, loa, cáp sạc, phụ kiện số',
  },
  {
    id: 'gia-dung',
    name: 'Gia dụng thông minh',
    icon: 'Home',
    description: 'Nồi chiên, robot hút bụi, máy lọc',
  },
  {
    id: 'cong-nghe',
    name: 'Công nghệ & Bàn làm việc',
    icon: 'Laptop',
    description: 'Bàn phím cơ, chuột không dây, giá đỡ',
  },
  {
    id: 'doi-song',
    name: 'Đời sống & Sức khỏe',
    icon: 'Coffee',
    description: 'Bình giữ nhiệt, đèn bàn, phụ kiện cá nhân',
  },
  {
    id: 'thoi-trang',
    name: 'Thời trang & Làm đẹp',
    icon: 'Sparkles',
    description: 'Quần áo, kem dưỡng, chống nắng chính hãng',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'deal-01',
    name: 'Tai nghe Bluetooth True Wireless chống ồn chủ động ANC Bass sâu',
    category: 'dien-tu',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    originalPrice: 890000,
    salePrice: 429000,
    badge: 'Deal hot',
    isMall: true,
    rating: 4.9,
    soldCount: '4.8k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Giảm thêm 30k',
    description: 'Pin 32 tiếng kèm hộp sạc, chống nước IPX5, hỗ trợ mic lọc ồn đàm thoại cực nét.',
  },
  {
    id: 'deal-02',
    name: 'Nồi chiên không dầu điện tử thông minh 6.5L nướng nguyên con gà',
    category: 'gia-dung',
    image:
      'https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1990000,
    salePrice: 990000,
    badge: 'Giảm sâu',
    isMall: true,
    rating: 4.8,
    soldCount: '2.1k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Freeship Xtra',
    description: 'Mặt kính cường lực quan sát thức ăn, 8 chế độ nấu sẵn, lòng nồi phủ ceramic chống dính.',
  },
  {
    id: 'deal-03',
    name: 'Bàn phím cơ không dây Bluetooth 3 mode Hotswap Led RGB mượt mà',
    category: 'cong-nghe',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1250000,
    salePrice: 689000,
    badge: 'Bán chạy',
    isMall: true,
    rating: 4.9,
    soldCount: '6.3k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Voucher 50k',
    description: 'Keycap PBT chống mòn, lót sẵn foam tiêu âm êm ái, kết nối PC, Laptop, iPad dễ dàng.',
  },
  {
    id: 'deal-04',
    name: 'Chuột không dây công thái học Silent click pin sạc Type-C siêu bền',
    category: 'cong-nghe',
    image:
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop',
    originalPrice: 420000,
    salePrice: 189000,
    badge: 'Deal hot',
    isMall: true,
    rating: 4.9,
    soldCount: '12.4k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Shop Yêu Thích',
    description: 'Cầm vừa vặn tay không mỏi cổ tay, bấm hoàn toàn không phát ra tiếng động.',
  },
  {
    id: 'deal-05',
    name: 'Bình giữ nhiệt Inox 316 cao cấp 800ml giữ nóng lạnh 24h kèm ống hút',
    category: 'doi-song',
    image:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop',
    originalPrice: 350000,
    salePrice: 169000,
    badge: 'Bán chạy',
    isMall: true,
    rating: 4.9,
    soldCount: '8.9k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Mua 2 giảm 5%',
    description: 'Chất liệu inox y tế 316 kháng khuẩn, sơn tĩnh điện chống xước, quai xách tiện lợi.',
  },
  {
    id: 'deal-06',
    name: 'Máy lọc không khí phòng ngủ màng lọc HEPA H13 khử mùi diệt khuẩn',
    category: 'gia-dung',
    image:
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop',
    originalPrice: 1850000,
    salePrice: 890000,
    badge: 'Giảm sâu',
    isMall: true,
    rating: 4.8,
    soldCount: '1.4k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Freeship Xtra',
    description: 'Lọc 99.97% bụi mịn PM2.5, khói thuốc và lông thú cưng, vận hành êm ái 25dB.',
  },
  {
    id: 'deal-07',
    name: 'Kem chống nắng phổ rộng kiềm dầu nâng tông tự nhiên SPF 50+ PA++++',
    category: 'thoi-trang',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    originalPrice: 480000,
    salePrice: 249000,
    badge: 'Deal hot',
    isMall: true,
    rating: 4.9,
    soldCount: '15.1k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Shopee Mall',
    description: 'Kiềm dầu 8 tiếng, không nhờn rít, không vón cục, chống ánh sáng xanh màn hình.',
  },
  {
    id: 'deal-08',
    name: 'Robot hút bụi lau nhà tự động thông minh cảm biến chống rơi Laser LDS',
    category: 'gia-dung',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    originalPrice: 5200000,
    salePrice: 2890000,
    badge: 'Giảm sâu',
    isMall: true,
    rating: 4.9,
    soldCount: '980+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Giảm 200k',
    description: 'Lực hút 4000Pa cực mạnh, điều khiển qua app điện thoại, tự động quay về dock sạc.',
  },
  {
    id: 'deal-09',
    name: 'Áo khoác gió Unisex trượt nước 2 lớp cản gió chống nắng thể thao',
    category: 'thoi-trang',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    originalPrice: 380000,
    salePrice: 179000,
    badge: 'Bán chạy',
    isMall: false,
    rating: 4.8,
    soldCount: '7.5k+ đã bán',
    affiliateUrl: 'https://shopee.vn',
    voucherTag: 'Shop Yêu Thích',
    description: 'Vải dù tổ ong tráng nano chống thấm nước mưa nhỏ, khóa kéo YKK bền bỉ.',
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
