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
  slogan:
    'Tất cả các sản phẩm mình đưa lên đây đều đã tự mua và sử dụng + trải nghiệm qua rồi mới đưa lên. Nên mọi người có thể an tâm về chất lượng nghen.',
  heroTitle: '',
  heroSubtitle: '',
  disclaimer:
    'Website chia sẻ các sản phẩm chất lượng, với giá ưu đãi. Chúng tôi tổng hợp các chương trình khuyến mãi từ Shopee Mall và không trực tiếp thu tiền hay phân phối sản phẩm.',
  privacyNotice: 'Không cần đăng nhập, không thu thập dữ liệu người dùng.',
  socials: {
    facebook: 'https://www.facebook.com/nguyentranthuong89/',
    telegram: 'https://telegram.org',
    zalo: 'https://zalo.me',
    tiktok: 'https://tiktok.com',
  },
};

/**
 * Lấy danh sách Cataloge Chính của sản phẩm (hỗ trợ nhiều Cataloge cách nhau bằng dấu phẩy)
 */
export const getProductMainCategories = (product: Product): string[] => {
  if (product.mainCategories && product.mainCategories.length > 0) {
    return product.mainCategories;
  }
  if (!product.mainCategory) return [];
  return product.mainCategory
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
};

/**
 * Lấy danh sách ảnh thực tế của sản phẩm (nếu có)
 */
export const getProductRealImages = (product: Product): string[] => {
  if (product.realImages && product.realImages.length > 0) {
    return product.realImages;
  }
  if (product.realImage) {
    return [product.realImage];
  }
  return [];
};

export interface VideoInfo {
  type: 'youtube' | 'mp4' | 'photos' | 'external';
  embedUrl?: string;
  directUrl: string;
  label: string;
  isShorts?: boolean;
}

/**
 * Phân tích link video (YouTube, MP4, Google Photos)
 */
export const getVideoInfo = (url?: string): VideoInfo | null => {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();

  // YouTube match (including watch, embed, youtu.be, shorts)
  const ytMatch = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    const isShorts = trimmed.includes('/shorts/');
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      directUrl: trimmed,
      label: isShorts ? 'YouTube Shorts' : 'YouTube',
      isShorts,
    };
  }

  // Direct MP4 or video files
  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(trimmed)) {
    return {
      type: 'mp4',
      directUrl: trimmed,
      label: 'Video MP4',
    };
  }

  // Google Photos
  if (trimmed.includes('photos.app.goo.gl') || trimmed.includes('photos.google.com')) {
    return {
      type: 'photos',
      directUrl: trimmed,
      label: 'Google Photos',
    };
  }

  return {
    type: 'external',
    directUrl: trimmed,
    label: 'Video',
  };
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'all',
    name: 'Tất cả sản phẩm',
    icon: 'Layers',
    description: 'Tất cả phụ kiện & sản phẩm chọn lọc',
    count: 25,
    subCategories: [
      { id: 'Minio Green - VF2', name: 'Minio Green - VF2', count: 7 },
      { id: 'Feliz', name: 'Feliz', count: 4 },
      { id: 'Nhà Cửa', name: 'Nhà Cửa', count: 5 },
      { id: 'Bếp', name: 'Bếp', count: 2 },
      { id: 'Phòng Ngủ', name: 'Phòng Ngủ', count: 1 },
      { id: 'Chăm Sóc Tóc', name: 'Chăm Sóc Tóc', count: 1 },
      { id: 'Màn Hình', name: 'Màn Hình', count: 1 },
    ],
  },
  {
    id: 'Xe Hơi - Ô tô',
    name: 'Xe Hơi - Ô tô',
    icon: 'Car',
    description: 'Phụ kiện & đồ chơi xe hơi ô tô chất lượng',
    count: 10,
    subCategories: [
      { id: 'Minio Green - VF2', name: 'Minio Green - VF2', count: 7 },
    ],
  },
  {
    id: 'Xe Máy',
    name: 'Xe Máy',
    icon: 'Bike',
    description: 'Phụ kiện, hộc chứa & thảm sàn cho xe máy',
    count: 5,
    subCategories: [
      { id: 'Feliz', name: 'Feliz', count: 4 },
    ],
  },
  {
    id: 'Điện Tử',
    name: 'Điện Tử',
    icon: 'Monitor',
    description: 'Màn hình di động, đồ công nghệ & thiết bị điện tử',
    count: 1,
    subCategories: [
      { id: 'Màn Hình', name: 'Màn Hình', count: 1 },
    ],
  },
  {
    id: 'Gia Dụng',
    name: 'Gia Dụng',
    icon: 'Home',
    description: 'Đồ gia dụng, nhà cửa, bếp & tiện ích đời sống',
    count: 9,
    subCategories: [
      { id: 'Nhà Cửa', name: 'Nhà Cửa', count: 5 },
      { id: 'Bếp', name: 'Bếp', count: 2 },
      { id: 'Phòng Ngủ', name: 'Phòng Ngủ', count: 1 },
    ],
  },
  {
    id: 'Sức Khỏe & Sắc Đẹp',
    name: 'Sức Khỏe & Sắc Đẹp',
    icon: 'Heart',
    description: 'Sản phẩm chăm sóc sức khỏe, tóc & cá nhân an toàn',
    count: 1,
    subCategories: [
      { id: 'Chăm Sóc Tóc', name: 'Chăm Sóc Tóc', count: 1 },
    ],
  },
  {
    id: 'Văn Phòng Phẩm',
    name: 'Văn Phòng Phẩm',
    icon: 'Briefcase',
    description: 'Băng keo, dụng cụ & văn phòng phẩm tiện ích',
    count: 1,
    subCategories: [],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Khay nhựa chữ nhật trong suốt',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/khaynhua.jpg',
    videoUrl: 'https://youtube.com/shorts/LswpkMS5LGg?feature=share',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/AKaJleFrop',
    voucherTag: '',
    description: 'Khay nhựa cao cấp chịu lực, đặt vừa dưới ghế lái và phụ của xe.',
    note: 'Chọn mã 04 -Dùng đặt vừa dưới ghế lái và phụ của xe',
  },
  {
    id: 'prod-2',
    name: 'Essager - Bộ chuyển đổi Bluetooth FM 5.3 có đầu vào TF',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/fmtranmission.jpg',
    realImage: '/images/essager_thucte.jpg',
    realImages: ['/images/essager_thucte.jpg'],
    videoUrl: 'https://youtube.com/shorts/tJh8sMMaKtg?feature=share',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/9V1CmCdqLU',
    voucherTag: '',
    description: 'Bộ tẩu sạc kiêm truyền phát âm thanh Bluetooth qua sóng FM 5.3.',
    note: 'Tác dụng chuyển tần số FM thành BT , Mình có Post Clip Hướng Dẫn cho Anh Em ko biết cách sử dụng nghen.',
  },
  {
    id: 'prod-3',
    name: 'Thảm Sàn HUVI + Rối - Link Mall sẽ đắt hơn',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/thamhuvivf2.jpg',
    realImage: '/images/thamhuvi_thucte1.jpg',
    realImages: ['/images/thamhuvi_thucte1.jpg', '/images/thamhuvi_thucte2.jpg'],
    videoUrl: 'https://youtube.com/shorts/ZM4rWd0KAik?feature=share',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: true,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/9zxTNHyuwU',
    affiliateMallUrl: 'https://s.shopee.vn/60RLdtddHp',
    voucherTag: '',
    description: 'Thảm sàn đúc khuôn chuẩn form xe, kèm rối giữ bụi bẩn cao cấp. Có cả link giá rẻ và link Mall chính hãng.',
    note: 'Thảm này viền bậc cửa chỉ 1/2 bậc , ghế sau thì lên cỡ 10cm, dày dặn hơn FUMO.',
  },
  {
    id: 'prod-4',
    name: 'Cam Hành trình Gương Galaxy S4K + Lùi',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/cams4k.jpg',
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
  {
    id: 'prod-5',
    name: 'Bình giữ nhiệt LATINVIA316 800ml',
    category: 'Gia Dụng',
    mainCategory: 'Gia Dụng',
    subCategory: '',
    image: '/images/lygiunhiettatinvia.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/5LBdr4o6Iz',
    voucherTag: '',
    description: 'Bình này giá rẻ và giữ nhiệt rất Ok, mình đã test rồi.',
    note: 'Bình này giá rẻ và giữ nhiệt rất Ok, mình đã test rồi',
  },
  {
    id: 'prod-6',
    name: 'Thảm Sàn Xe Feliz 2 - 2025 - 2026',
    category: 'Xe Máy › Feliz',
    mainCategory: 'Xe Máy',
    subCategory: 'Feliz',
    image: '/images/thamfeliz.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/5foUFntDSP',
    voucherTag: '',
    description: 'Thảm sàn cao cấp thiết kế vừa vặn cho xe điện VinFast Feliz.',
    note: '',
  },
  {
    id: 'prod-7',
    name: 'Hộc đồ đôi Feliz Không Khoan',
    category: 'Xe Máy › Feliz',
    mainCategory: 'Xe Máy',
    subCategory: 'Feliz',
    image: '/images/hocdodoifeliz.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/4AzgTDNgvw',
    voucherTag: '',
    description: 'Hộc chứa đồ đôi tiện dụng gắn xe Feliz không cần khoan đục.',
    note: '',
  },
  {
    id: 'prod-8',
    name: 'Túi lưới đựng đồ 2 lớp co giãn',
    category: 'Xe Máy › Feliz',
    mainCategory: 'Xe Máy',
    subCategory: 'Feliz',
    image: '/images/tuidungdocogian.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/2VrSUGNlsi',
    voucherTag: '',
    description: 'Túi lưới đựng đồ 2 lớp tiện lợi, đàn hồi tốt.',
    note: 'Feliz chọn L 25x40cm',
  },
  {
    id: 'prod-9',
    name: 'Móc treo kèm Khoá mũ Bảo hiểm',
    category: 'Xe Máy › Feliz',
    mainCategory: 'Xe Máy',
    subCategory: 'Feliz',
    image: '/images/khoambh.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/5AsDfDKNlU',
    voucherTag: '',
    description: 'Móc treo đa năng kèm ổ khóa an toàn chống trộm mũ bảo hiểm.',
    note: '',
  },
  {
    id: 'prod-10',
    name: 'Thanh Chắn Gió Cửa Ra Vào',
    category: 'Gia Dụng › Nhà Cửa',
    mainCategory: 'Gia Dụng',
    subCategory: 'Nhà Cửa',
    image: '/images/chancua.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/904wXAKjOY',
    voucherTag: '',
    description: 'Thanh xốp chắn khe cửa ra vào chặn bụi, ngăn gió lùa và côn trùng.',
    note: 'Cái này dùng khá ok',
  },
  {
    id: 'prod-11',
    name: 'Dao Bếp KATANA Cao Cấp',
    category: 'Gia Dụng › Bếp',
    mainCategory: 'Gia Dụng',
    subCategory: 'Bếp',
    image: '/images/daobepkatana.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/4qFNZcL31n',
    voucherTag: '',
    description: 'Dao bếp thép cao cấp bén ngọt, cầm chắc tay và chống gỉ sét tối ưu.',
    note: '',
  },
  {
    id: 'prod-12',
    name: 'Thảm trải sàn IKEA',
    category: 'Gia Dụng › Nhà Cửa',
    mainCategory: 'Gia Dụng',
    subCategory: 'Nhà Cửa',
    image: '/images/thamsanikea.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/3LQZmvOf3K',
    voucherTag: '',
    description: 'Thảm trải sàn phong cách IKEA êm ái, chống trượt siêu bền.',
    note: 'Size 60x40 rất xịn xò nha',
  },
  {
    id: 'prod-13',
    name: 'Giá để Dao Kéo AKICHI',
    category: 'Gia Dụng › Bếp',
    mainCategory: 'Gia Dụng',
    subCategory: 'Bếp',
    image: '/images/kedaokeo.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/50Ynm8EgGm',
    voucherTag: '',
    description: 'Kệ cắm dao kéo nhà bếp thông minh gọn gàng, thoát nước vệ sinh tiện lợi.',
    note: '',
  },
  {
    id: 'prod-14',
    name: 'Thùng Nhựa Đựng Đồ Gấp Gọn',
    category: 'Gia Dụng › Nhà Cửa',
    mainCategory: 'Gia Dụng',
    subCategory: 'Nhà Cửa',
    image: '/images/thunggapgon.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/20vCCsOaWK',
    voucherTag: '',
    description: 'Hộp chứa đồ đa năng gấp gọn thông minh, nhựa PP bền bỉ chịu lực.',
    note: 'Size 34x49x23.5cm',
  },
  {
    id: 'prod-15',
    name: 'Gối Gòn Bi Thắng Lợi',
    category: 'Gia Dụng › Phòng Ngủ',
    mainCategory: 'Gia Dụng',
    subCategory: 'Phòng Ngủ',
    image: '/images/goigonbi.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/AKaK8EQZA4',
    voucherTag: '',
    description: 'Ruột gối nằm gòn bi êm ái đàn hồi cao, nâng đỡ đầu cổ êm giấc nồng.',
    note: 'Mua thử vì thấy rẻ mà ok phết :D',
  },
  {
    id: 'prod-16',
    name: 'Rèm Sáo Nhôm Làm Theo Yêu Cầu',
    category: 'Gia Dụng › Nhà Cửa',
    mainCategory: 'Gia Dụng',
    subCategory: 'Nhà Cửa',
    image: '/images/remsao.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/LmyDuX2xM',
    voucherTag: '',
    description: 'Rèm lá nhôm cản sáng, chống nắng che cửa sổ làm theo kích thước yêu cầu.',
    note: 'Shop này làm khá ưng ý, giá thành ok',
  },
  {
    id: 'prod-17',
    name: 'Dầu gội Bồ Kết Thorakao 750ml/400ml',
    category: 'Sức Khỏe & Sắc Đẹp › Chăm Sóc Tóc',
    mainCategory: 'Sức Khỏe & Sắc Đẹp',
    subCategory: 'Chăm Sóc Tóc',
    image: '/images/boket.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/2LY2bnoUyO',
    voucherTag: '',
    description: 'Dầu gội bồ kết truyền thống Thorakao sạch gàu, mượt tóc và giảm rụng hiệu quả.',
    note: 'Hồi trước mình bị gàu nhiều, từ ngày dùng cái này giảm hẳn chắc 99%',
  },
  {
    id: 'prod-18',
    name: 'Tủ Gỗ Trang Trí H234 - MDF Chống trầy',
    category: 'Gia Dụng › Nhà Cửa',
    mainCategory: 'Gia Dụng',
    subCategory: 'Nhà Cửa',
    image: '/images/tugotrangtri.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Bán chạy',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/9zxTljx8CW',
    voucherTag: '',
    description: 'Tủ kệ gỗ lắp ghép nhiều ngăn MDF chống ẩm phủ Melamine chống trầy bền đẹp.',
    note: '1 ngăn là 30x40x24cm , tủ bên này mình mua 2 lần dùng bền và ok lắm',
  },
  {
    id: 'prod-20',
    name: 'Keo 3M 4229P dạng Tờ A4',
    category: 'Văn Phòng Phẩm',
    mainCategory: 'Văn Phòng Phẩm',
    subCategory: '',
    image: '/images/keo3ma4.jpg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/7AdJ2Vvv0O',
    voucherTag: '',
    description: 'Keo 3M 4229P dạng tờ khổ A4 chính hãng độ dính cực cao, dán chắc chắn đa năng tiện lợi.',
    note: 'Shop này mua keo dán chắc chắn, dự là 3M real nhé',
  },
  {
    id: 'prod-22',
    name: 'Thảm Sàn FUMO - Link Shopee Mall',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/thamfuho.jpg',
    realImage: '/images/thamfuho_thucte.jpg',
    realImages: ['/images/thamfuho_thucte.jpg'],
    videoUrl: 'https://youtube.com/shorts/Iz_5qngY9ug?feature=share',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: true,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/40gJPxNtu2',
    affiliateMallUrl: 'https://s.shopee.vn/80CSBXdNsO',
    voucherTag: '',
    description: 'Thảm tràn full bậc cửa, hàng sau cao lên bằng ghế, chất liệu không mùi cho Minio Green - VF2.',
    note: 'Bác trên Group review là ko hôi như Huvi luôn, ưu điểm là tràn full bậc cửa, và hàng sau cao lên bằng ghế luôn.',
  },
  {
    id: 'prod-23',
    name: 'Màn Di Động BOE 13.3inch FHD Cảm ứng - viền mỏng - 500 nit sáng đẹp',
    category: 'Điện Tử, Xe Hơi - Ô tô › Màn Hình',
    mainCategory: 'Điện Tử , Xe Hơi - Ô Tô',
    mainCategories: ['Điện Tử', 'Xe Hơi - Ô tô'],
    subCategory: 'Màn Hình',
    image: '/images/manhinhdidong.jpg',
    realImage: '/images/manhinh_thucte.jpg',
    realImages: ['/images/manhinh_thucte.jpg'],
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/W6RKjQIZ2',
    voucherTag: '',
    description: 'Màn di động BOE 13.3 inch FHD cảm ứng cao cấp, viền mỏng, độ sáng 500 nit, tích hợp kickstand tiện dụng cho xe hơi và công việc.',
    note: 'Màn ok, có kickstand sẵn . Nếu dùng trên Minio như em thì cần có thêm 1 điện thoại có Samsung Dex nhé. Còn không thì ko ứng dụng được gì đâu :D',
  },
  {
    id: 'prod-24',
    name: 'Trang trí phanh tay VF2 - Minio Green',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/phanhtay_vf2.jpg',
    realImage: '/images/phanhtay_thucte.jpg',
    realImages: ['/images/phanhtay_thucte.jpg'],
    videoUrl: 'https://youtube.com/shorts/DKQeVCCDn3k?feature=share',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/112mYZ04nc',
    voucherTag: '',
    description: 'Ốp trang trí phanh tay xe VinFast VF2 - Minio Green sắc nét, hoàn thiện đẹp và lắp đặt dễ dàng.',
    note: 'áp mã có 55k mà đẹp :D',
  },
  {
    id: 'prod-25',
    name: 'Giá đỡ hít từ tính ĐT, Máy tính bảng, màn DI động cho VF2 - Minio Green',
    category: 'Xe Hơi - Ô tô › Minio Green - VF2',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: 'Minio Green - VF2',
    image: '/images/giadotutinh.jpg',
    realImage: '/images/giado_thucte.jpg',
    realImages: ['/images/giado_thucte.jpg'],
    videoUrl: 'https://youtube.com/shorts/wUfPga2z-Lk',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/60RSWP1jPw',
    voucherTag: '',
    description: 'Giá đỡ hít nam châm từ tính siêu chắc chắn cho điện thoại, máy tính bảng và màn di động trên VF2 - Minio Green.',
    note: 'Mình đã mua và rất chắc chắn. shop cho 2 miếng dán bằng sắt vuông và 2 miếng tròn để tiện sử dụng nhiều nhu cầu.',
  },
  {
    id: 'prod-26',
    name: 'Bộ ốc vít vá lốp khẩn cấp, Không cần tháo lốp, sửa chữa nhanh chóng',
    category: 'Xe Hơi - Ô tô, Xe Máy',
    mainCategory: 'Xe Hơi - Ô tô',
    mainCategories: ['Xe Hơi - Ô tô', 'Xe Máy'],
    subCategory: '',
    image: '/images/bovitalop.jpg',
    videoUrl: 'https://youtu.be/mKva8DlLdWg',
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/5q85WKr7Ku',
    voucherTag: '',
    description: 'Bộ vít vá lốp xe khẩn cấp không cần tháo bánh, thao tác vặn vít nhanh chóng, tự vá kín khít tiện lợi mang theo xe.',
    note: 'Trước mình chỉ mua vít, từng dùng cho xe máy, chạy hơn 1 năm chỗ vặn vít ko bị rò luôn. Ảnh shop đăng cũng như ảnh thực tế nên m quay clip Unbox thôi.',
  },
  {
    id: 'prod-27',
    name: 'Giá đỡ điện thoại Ô tô hút chân không từ tính xoay 360 [Hàng Cao Cấp]',
    category: 'Xe Hơi - Ô tô',
    mainCategory: 'Xe Hơi - Ô tô',
    subCategory: '',
    image: '/images/giado_hutchankhong.jpg',
    realImage: '/images/giado_hutchankhong_thucte.jpg',
    realImages: ['/images/giado_hutchankhong_thucte.jpg'],
    originalPrice: 0,
    salePrice: 0,
    badge: 'Deal hot',
    isMall: false,
    rating: 5.0,
    soldCount: '',
    affiliateUrl: 'https://s.shopee.vn/7pt9uZgulY',
    voucherTag: '',
    description: 'Giá đỡ điện thoại ô tô công nghệ hút chân không nam châm từ tính siêu chắc, lực hút dã man xoay 360 độ.',
    note: 'M thấy giá rẻ quá mua thử, ai ngờ ngon thật, treo cái bình nước gần 2kg lên mà không rơi :D Hít chắc dã man. Phụ kiện shop cho kèm thì như Video nhé , có 1 vòng Ring dán lên điện thoại , 1 miếng đệm để dán ở những hơi ko kín khí. 2 miếng lau chùi.',
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
