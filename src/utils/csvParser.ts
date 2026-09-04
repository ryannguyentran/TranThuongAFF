import { Product, DealBadge, CategoryItem } from '../types';

/**
 * Normalizes string by removing accents and trimming
 */
function normalizeHeader(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Parses raw CSV content with quote and delimiter awareness
 */
export function parseCSVRows(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Converts Google Sheets URL to export CSV URL
 */
export function convertToExportCSVUrl(url: string): string {
  const trimmed = url.trim();
  
  // If already a direct CSV or pub?output=csv, return as is
  if (trimmed.includes('output=csv') || trimmed.endsWith('.csv')) {
    return trimmed;
  }

  // Handle docs.google.com/spreadsheets/d/<sheetId>/...
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    // Check if there's a gid specified
    const gidMatch = trimmed.match(/[?&#]gid=([0-9]+)/);
    const gidParam = gidMatch && gidMatch[1] ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
  }

  return trimmed;
}

/**
 * Converts parsed CSV rows into Product objects
 */
export function parseProductsCSV(csvText: string): Product[] {
  const rows = parseCSVRows(csvText);
  if (rows.length < 2) {
    return [];
  }

  const headerRow = rows[0].map(normalizeHeader);

  // Identify column indices
  let colId = -1;
  let colName = -1;
  let colNote = -1;
  let colCat = -1;
  let colLink = -1;
  let colImg = -1;
  let colPrice = -1;
  let colOrigPrice = -1;
  let colBadge = -1;

  headerRow.forEach((col, idx) => {
    if (col === 'stt' || col === 'id') colId = idx;
    else if (col.includes('tensanpham') || col === 'ten' || col === 'name' || col === 'title') colName = idx;
    else if (col.includes('ghichu') || col === 'note' || col === 'mota' || col === 'description') colNote = idx;
    else if (col.includes('cataloge') || col.includes('catalog') || col.includes('danhmuc') || col.includes('category') || col.includes('nhomdeal')) colCat = idx;
    else if (col.includes('linkshopee') || col.includes('link') || col.includes('url') || col.includes('affiliate')) colLink = idx;
    else if (col.includes('hinhanh') || col.includes('anh') || col.includes('image')) colImg = idx;
    else if (col.includes('giaban') || col.includes('giauudai') || col === 'gia' || col === 'saleprice' || col === 'price') colPrice = idx;
    else if (col.includes('giagoc') || col === 'originalprice') colOrigPrice = idx;
    else if (col.includes('nhandeal') || col === 'nhan' || col === 'badge') colBadge = idx;
  });

  // Fallback to position index if headers don't strictly match
  if (colName === -1 && rows[0].length >= 2) colName = 1;
  if (colNote === -1 && rows[0].length >= 3) colNote = 2;
  if (colCat === -1 && rows[0].length >= 4) colCat = 3;
  if (colLink === -1 && rows[0].length >= 5) colLink = 4;
  if (colImg === -1 && rows[0].length >= 6) colImg = 5;

  const products: Product[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0 || !row.some((cell) => cell.trim().length > 0)) continue;

    const rawName = colName !== -1 ? row[colName] : '';
    if (!rawName || rawName.trim().length === 0) continue;

    const stt = colId !== -1 && row[colId] ? row[colId].trim() : `${i}`;
    const rawNote = colNote !== -1 ? (row[colNote] || '').trim() : '';
    const rawCat = colCat !== -1 && row[colCat] ? row[colCat].trim() : 'Minio Green';
    const rawLink = colLink !== -1 && row[colLink] ? row[colLink].trim() : 'https://shopee.vn';
    const rawImg = colImg !== -1 && row[colImg] ? row[colImg].trim() : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop';
    
    // Parse prices if provided
    let salePrice = 0;
    if (colPrice !== -1 && row[colPrice]) {
      const numStr = row[colPrice].replace(/[^0-9]/g, '');
      if (numStr) salePrice = parseInt(numStr, 10);
    }

    let origPrice = 0;
    if (colOrigPrice !== -1 && row[colOrigPrice]) {
      const numStr = row[colOrigPrice].replace(/[^0-9]/g, '');
      if (numStr) origPrice = parseInt(numStr, 10);
    }
    if (origPrice === 0 && salePrice > 0) {
      origPrice = Math.round(salePrice * 1.3);
    }

    // Badge
    let badge: DealBadge = 'Deal hot';
    if (colBadge !== -1 && row[colBadge]) {
      const bStr = row[colBadge].toLowerCase();
      if (bStr.includes('bán chạy') || bStr.includes('ban chay')) badge = 'Bán chạy';
      else if (bStr.includes('giảm sâu') || bStr.includes('giam sau')) badge = 'Giảm sâu';
    } else {
      const badges: DealBadge[] = ['Deal hot', 'Bán chạy', 'Giảm sâu'];
      badge = badges[i % badges.length];
    }

    products.push({
      id: `prod-${stt}`,
      name: rawName,
      category: rawCat,
      image: rawImg,
      originalPrice: origPrice,
      salePrice: salePrice,
      badge: badge,
      isMall: true,
      rating: 4.9,
      soldCount: '1.2k+ đã bán',
      affiliateUrl: rawLink,
      note: rawNote,
      description: rawNote,
      voucherTag: 'Link Shopee Chính Hãng',
    });
  }

  return products;
}

/**
 * Dynamically extract unique categories from products list
 */
export function extractCategories(products: Product[]): CategoryItem[] {
  const map = new Map<string, number>();

  products.forEach((p) => {
    const cat = p.category.trim() || 'Khác';
    map.set(cat, (map.get(cat) || 0) + 1);
  });

  const categoryItems: CategoryItem[] = [
    {
      id: 'all',
      name: 'Tất cả deal',
      icon: 'Flame',
      description: 'Tất cả sản phẩm & ưu đãi',
      count: products.length,
    },
  ];

  const icons = ['Car', 'Sparkles', 'Layers', 'Radio', 'Video', 'ShieldCheck', 'Zap', 'Flame'];
  let iconIdx = 0;

  map.forEach((count, catName) => {
    categoryItems.push({
      id: catName,
      name: catName,
      icon: icons[iconIdx % icons.length],
      description: `Tổng hợp sản phẩm ${catName}`,
      count: count,
    });
    iconIdx++;
  });

  return categoryItems;
}
