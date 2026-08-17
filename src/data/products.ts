// ชั้นข้อมูลสินค้า — อ่านจาก products.json (ข้อมูลจริงจากใบราคา PDF ผ่านสคริปต์ extract)
import raw from './products.json';

export interface RawPolicy {
  policy: string;
  term: number | null;
  price: number;
  promoCode?: string;
}

export interface RawProduct {
  code: string;
  slug: string;
  category: string;
  name: string;
  source?: string;
  page?: number;
  price: number; // ราคาเริ่มต้น (บาท/เดือน)
  policies?: RawPolicy[];
  description?: string;
}

export type ContractMode = 'visit' | 'self' | 'noservice';

export interface Product {
  code: string;
  slug: string;
  category: string;
  name: string;
  /** ราคาเริ่มต้นเช่ารายเดือน (บาท/เดือน) */
  rentPrice: number;
  /** ราคาขายขาด (บาท) — จาก policy 2Y_*; undefined = ไม่มีข้อมูลขายขาด */
  buyPrice?: number;
  /** ปีสัญญาเช่าที่มี (เช่น [5, 6, 7]) */
  contractYears: number[];
  /** รูปแบบบริการที่มี */
  modes: ContractMode[];
  /** มีแผนเช่ารายเดือนหรือไม่ */
  isRentable: boolean;
  /** มีราคาขายขาดหรือไม่ */
  isBuyable: boolean;
  description?: string;
  /** path รูปการ์ด (public/img/products/{slug}.jpg) */
  image: string;
}

const RAW: { products: RawProduct[] } = raw as { products: RawProduct[] };

function derive(p: RawProduct): Product {
  const policies = p.policies || [];
  const buy = policies
    .filter((x) => /^2Y_/.test(x.policy) && typeof x.price === 'number')
    .map((x) => x.price);
  const years = [
    ...new Set(
      policies
        .map((x) => x.policy.match(/^(\d)Y/)?.[1])
        .filter((y): y is string => Boolean(y))
        .map(Number),
    ),
  ].sort((a, b) => a - b);
  const modes: ContractMode[] = [];
  for (const x of policies) {
    if (/Visit/i.test(x.policy) && !modes.includes('visit')) modes.push('visit');
    else if (/Self/i.test(x.policy) && !modes.includes('self')) modes.push('self');
    else if (!modes.includes('noservice')) modes.push('noservice');
  }
  return {
    code: p.code,
    slug: p.slug,
    category: p.category,
    name: p.name,
    rentPrice: p.price,
    buyPrice: buy.length ? Math.min(...buy) : undefined,
    contractYears: years,
    modes,
    isRentable: years.length > 0,
    isBuyable: buy.length > 0,
    description: p.description,
    image: `/img/products/${p.slug}.jpg`,
  };
}

export const products: Product[] = RAW.products.map(derive);
export const productCount = products.length;

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productByCode(code: string): Product | undefined {
  const base = code.split('.')[0];
  return products.find((p) => p.code.split('.')[0] === base);
}

/** หมวดหมู่ทั้งหมด (เรียงตามลำดับในข้อมูล) */
export const allCategories: string[] = [
  ...new Set(products.map((p) => p.category)),
];

/** สินค้าแนะนำสำหรับหน้าแรก (เลือกข้ามหมวด) */
const FEATURED_SLUGS = [
  'wd516',
  'as25gcb-y0-abae',
  'f2520rntb-aebpeth',
  'gc-x257cmhw-aeplmt',
  'oled65c6psa-atm',
  'a9t-core-dcgpeth',
  'zt4q24gpla1-ewghath',
  's3mfc-albpeth',
];
export function featuredProducts(): Product[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const list: Product[] = [];
  for (const s of FEATURED_SLUGS) {
    const p = bySlug.get(s);
    if (p) list.push(p);
  }
  return list;
}
