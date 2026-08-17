// ชั้นข้อมูลสเปค — อ่านจาก lg-specs.json (ข้อมูลจริงจากเว็บ LG Thailand)
import raw from './lg-specs.json';

export interface SpecRow {
  name: string;
  value: string;
}

export interface SpecGroup {
  title: string;
  specs: SpecRow[];
}

export interface ProductSpecs {
  code: string;
  slug: string;
  url?: string;
  lgName?: string;
  /** คุณลักษณะที่สำคัญ (bullet จากหน้า LG) */
  features: string[];
  /** สเปคทั้งหมดแยกกลุ่ม */
  groups: SpecGroup[];
  hasSpecs: boolean;
}

interface LgEntry {
  code: string;
  slug: string;
  url?: string;
  lgName?: string;
  features?: string[];
  groups?: { title: string; specs: { name: string; value: string }[] }[];
}

const bySlug = new Map<string, ProductSpecs>();
const byCode = new Map<string, ProductSpecs>();

for (const e of (raw as { products: LgEntry[] }).products) {
  const features = Array.isArray(e.features) ? e.features.filter(Boolean) : [];
  const groups = (e.groups ?? [])
    .filter((g) => g && g.title && Array.isArray(g.specs))
    .map((g) => ({ title: g.title, specs: g.specs.map((s) => ({ name: s.name, value: s.value })) }));
  const entry: ProductSpecs = {
    code: e.code,
    slug: e.slug,
    url: e.url,
    lgName: e.lgName,
    features,
    groups,
    hasSpecs: features.length + groups.length > 0,
  };
  bySlug.set(e.slug, entry);
  byCode.set(e.code, entry);
  byCode.set(e.code.split('.')[0], entry);
}

/** หาสเปคตาม slug ของสินค้า (จับคู่กับ products.json) */
export function specsBySlug(slug: string): ProductSpecs | undefined {
  return bySlug.get(slug) ?? byCode.get(slug);
}

/** หาสเปคตามรหัสสินค้า */
export function specsByCode(code: string): ProductSpecs | undefined {
  const base = code.split('.')[0];
  return byCode.get(base) ?? byCode.get(code);
}
