import { Product, DealBadge, CategoryItem, SubCategoryItem } from '../types';

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
  let colMainCat = -1;
  let colSubCat = -1;
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
    else if (col.includes('catalogechinh') || col.includes('danhmucchinh') || (col.includes('chinh') && (col.includes('cat') || col.includes('danhmuc')))) {
      colMainCat = idx;
    } else if (col.includes('catalogephu') || col.includes('danhmucphu') || (col.includes('phu') && (col.includes('cat') || col.includes('danhmuc')))) {
      colSubCat = idx;
    } else if (col.includes('cataloge') || col.includes('catalog') || col.includes('danhmuc') || col.includes('category') || col.includes('nhomdeal')) {
      if (colMainCat === -1) colCat = idx;
    } else if (col.includes('linkshopee') || col.includes('link') || col.includes('url') || col.includes('affiliate')) {
      colLink = idx;
    } else if (col.includes('hinhanh') || col.includes('anh') || col.includes('image')) {
      colImg = idx;
    } else if (col.includes('giaban') || col.includes('giauudai') || col === 'gia' || col === 'saleprice' || col === 'price') {
      colPrice = idx;
    } else if (col.includes('giagoc') || col === 'originalprice') {
      colOrigPrice = idx;
    } else if (col.includes('nhandeal') || col === 'nhan' || col === 'badge') {
      colBadge = idx;
    }
  });

  // Fallback to position index if headers don't strictly match standard format
  // Example standard format: STT(0), Tên(1), Ghi chú(2), CatChính(3), CatPhụ(4), Link(5), Ảnh(6)
  if (rows[0].length >= 7 && colMainCat === -1 && colSubCat === -1) {
    if (colName === -1) colName = 1;
    if (colNote === -1) colNote = 2;
    colMainCat = 3;
    colSubCat = 4;
    if (colLink === -1) colLink = 5;
    if (colImg === -1) colImg = 6;
  } else {
    if (colName === -1 && rows[0].length >= 2) colName = 1;
    if (colNote === -1 && rows[0].length >= 3) colNote = 2;
    if (colCat === -1 && colMainCat === -1 && rows[0].length >= 4) colCat = 3;
    if (colLink === -1 && rows[0].length >= 5) colLink = 4;
    if (colImg === -1 && rows[0].length >= 6) colImg = 5;
  }

  const products: Product[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0 || !row.some((cell) => cell.trim().length > 0)) continue;

    const rawName = colName !== -1 ? row[colName] : '';
    if (!rawName || rawName.trim().length === 0) continue;

    const stt = colId !== -1 && row[colId] ? row[colId].trim() : `${i}`;
    const rawNote = colNote !== -1 ? (row[colNote] || '').trim() : '';
    
    // Main and Sub category determination
    let mainCat = '';
    let subCat = '';

    if (colMainCat !== -1 && row[colMainCat]) {
      mainCat = row[colMainCat].trim();
    }
    if (colSubCat !== -1 && row[colSubCat]) {
      subCat = row[colSubCat].trim();
    }

    // If main category wasn't found from colMainCat, check colCat
    if (!mainCat && colCat !== -1 && row[colCat]) {
      const genericCat = row[colCat].trim();
      if (genericCat.includes(' › ')) {
        const parts = genericCat.split(' › ');
        mainCat = parts[0].trim();
        subCat = parts[1]?.trim() || '';
      } else if (genericCat.includes(' - ')) {
        const parts = genericCat.split(' - ');
        mainCat = parts[0].trim();
        subCat = parts.slice(1).join(' - ').trim();
      } else {
        mainCat = genericCat;
      }
    }

    if (!mainCat) {
      mainCat = 'Chưa phân loại';
    }

    const displayCategory = subCat ? `${mainCat} › ${subCat}` : mainCat;

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

    // Badge
    let badge: DealBadge = 'Deal hot';
    if (colBadge !== -1 && row[colBadge]) {
      const bStr = row[colBadge].toLowerCase();
      if (bStr.includes('bán chạy') || bStr.includes('ban chay')) badge = 'Bán chạy';
      else if (bStr.includes('giảm sâu') || bStr.includes('giam sau')) badge = 'Giảm sâu';
    } else {
      const badges: DealBadge[] = ['Deal hot', 'Bán chạy'];
      badge = badges[i % badges.length];
    }

    products.push({
      id: `prod-${stt}`,
      name: rawName,
      category: displayCategory,
      mainCategory: mainCat,
      subCategory: subCat,
      image: rawImg,
      originalPrice: origPrice,
      salePrice: salePrice,
      badge: badge,
      isMall: false,
      rating: 5.0,
      soldCount: '',
      affiliateUrl: rawLink,
      note: rawNote,
      description: rawNote,
      voucherTag: '',
    });
  }

  return products;
}

/**
 * Dynamically extract unique categories and subcategories from products list
 */
export function extractCategories(products: Product[]): CategoryItem[] {
  const mainMap = new Map<string, { count: number; subMap: Map<string, number> }>();
  const allSubMap = new Map<string, number>();

  products.forEach((p) => {
    const main = (p.mainCategory || 'Khác').trim();
    const sub = (p.subCategory || '').trim();

    if (!mainMap.has(main)) {
      mainMap.set(main, { count: 0, subMap: new Map<string, number>() });
    }
    const mainData = mainMap.get(main)!;
    mainData.count += 1;

    if (sub) {
      mainData.subMap.set(sub, (mainData.subMap.get(sub) || 0) + 1);
      allSubMap.set(sub, (allSubMap.get(sub) || 0) + 1);
    }
  });

  const allSubCategories: SubCategoryItem[] = [];
  allSubMap.forEach((count, name) => {
    allSubCategories.push({ id: name, name, count });
  });

  const categoryItems: CategoryItem[] = [
    {
      id: 'all',
      name: 'Tất cả sản phẩm',
      icon: 'Layers',
      description: 'Tất cả phụ kiện & sản phẩm chọn lọc',
      count: products.length,
      subCategories: allSubCategories,
    },
  ];

  mainMap.forEach((data, mainName) => {
    const subCategories: SubCategoryItem[] = [];
    data.subMap.forEach((count, subName) => {
      subCategories.push({ id: subName, name: subName, count });
    });

    let icon = 'Layers';
    const lower = mainName.toLowerCase();
    if (lower.includes('hơi') || lower.includes('ô tô') || lower.includes('oto') || lower.includes('car')) {
      icon = 'Car';
    } else if (lower.includes('máy') || lower.includes('xe') || lower.includes('bike') || lower.includes('motor')) {
      icon = 'Bike';
    } else if (lower.includes('dụng') || lower.includes('nhà') || lower.includes('home') || lower.includes('bếp')) {
      icon = 'Home';
    } else if (lower.includes('điện') || lower.includes('công nghệ') || lower.includes('tech')) {
      icon = 'Sparkles';
    }

    categoryItems.push({
      id: mainName,
      name: mainName,
      icon,
      description: `Phụ kiện & sản phẩm ${mainName}`,
      count: data.count,
      subCategories,
    });
  });

  return categoryItems;
}
