export type DealBadge = 'Deal hot' | 'Bán chạy' | 'Giảm sâu';

export interface Product {
  id: string;
  name: string;
  category: string;
  mainCategory: string;
  mainCategories?: string[];
  subCategory?: string;
  image: string;
  originalPrice?: number;
  salePrice?: number;
  badge?: DealBadge;
  isMall?: boolean;
  rating?: number;
  soldCount?: string;
  affiliateUrl: string;
  voucherTag?: string;
  description?: string;
  note?: string;
}

export interface SubCategoryItem {
  id: string;
  name: string;
  count: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  count?: number;
  subCategories?: SubCategoryItem[];
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  slogan?: string;
  heroTitle: string;
  heroSubtitle: string;
  disclaimer: string;
  privacyNotice: string;
  socials: {
    facebook?: string;
    telegram?: string;
    zalo?: string;
    tiktok?: string;
  };
}
