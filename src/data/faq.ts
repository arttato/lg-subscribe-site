// FAQ จริงจากเว็บ LG Thailand — รวมจาก lg-specs.json (40 รุ่น, 242 คำถาม)
import raw from './lg-specs.json';
import { productByCode } from './products';

export interface FaqItem {
  q: string;
  a: string;
  /** หมวดสินค้าของรุ่นที่คำถามนี้มาจาก */
  category: string;
  /** รหัสรุ่น */
  code: string;
}

interface LgSpecEntry {
  code: string;
  faq?: { q: string; a: string }[];
}

const ALL: FaqItem[] = [];
const seen = new Set<string>();

for (const entry of (raw as { products: LgSpecEntry[] }).products) {
  for (const f of entry.faq ?? []) {
    const key = f.q.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const prod = productByCode(entry.code);
    ALL.push({
      q: f.q,
      a: f.a,
      category: prod?.category ?? 'อื่นๆ',
      code: entry.code,
    });
  }
}

/** ค้นหา FAQ (รองรับการพิมพ์คำค้น) */
export function searchFaq(query: string, limit = 30): FaqItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL.slice(0, limit);
  return ALL.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)).slice(0, limit);
}

export const faqCount = ALL.length;
