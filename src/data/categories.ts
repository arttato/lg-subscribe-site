// กลุ่มหมวดหลัก 3 กลุ่ม (ใช้บนหน้าแรก) — map จากหมวดย่อยจริงใน products.json
import { products } from './products';

export type MainGroup = 'water' | 'air' | 'appliances';

const GROUP_CATEGORIES: Record<MainGroup, string[]> = {
  water: ['เครื่องกรองน้ำ'],
  air: [
    'เครื่องฟอกอากาศ',
    'เครื่องปรับอากาศ IXY',
    'เครื่องปรับอากาศ SIQ',
    'เครื่องปรับอากาศ SAQ',
    'เครื่องปรับอากาศ ART',
    'เครื่องปรับอากาศ SAC 1 Way Cassette',
    'เครื่องปรับอากาศ SAC 4Way Cassette',
    'เครื่องปรับอากาศ SAC Round Cassette',
    'เครื่องลดความชื้น',
  ],
  appliances: [
    'เครื่องซักผ้า ฝาหน้า',
    'เครื่องซักผ้า ฝาบน',
    'Wash Tower',
    'เครื่องอบผ้า',
    'ตู้ถนอมผ้า',
    'ตู้เย็น Side by Side',
    'ตู้เย็น Multi-Door',
    'ตู้เย็น 2 ประตู',
    'เครื่องล้างจาน',
    'ไมโครเวฟ',
    'เครื่องดูดฝุ่น',
    'โทรทัศน์ NanoCell',
    'โทรทัศน์ OLED',
    'โทรทัศน์ QNED',
    'โทรทัศน์ StanbyME',
    'มอนิเตอร์',
    'Sound bar',
    'Bluetooth Speaker',
  ],
};

export interface MainGroupInfo {
  id: MainGroup;
  count: number;
  /** ตัวอย่างรูปสินค้าจริงในกลุ่ม (slug) */
  sampleImages: string[];
}

export function groupOf(category: string): MainGroup {
  for (const g of Object.keys(GROUP_CATEGORIES) as MainGroup[]) {
    if (GROUP_CATEGORIES[g].includes(category)) return g;
  }
  return 'appliances';
}

export function mainGroups(): MainGroupInfo[] {
  return (['water', 'air', 'appliances'] as MainGroup[]).map((id) => {
    const inGroup = products.filter((p) => GROUP_CATEGORIES[id].includes(p.category));
    return {
      id,
      count: inGroup.length,
      sampleImages: inGroup.slice(0, 3).map((p) => p.image),
    };
  });
}

/** หมวดย่อยทั้งหมดของกลุ่ม (ใช้กรองในหน้าสินค้า) */
export function categoriesOf(group: MainGroup | 'all'): string[] {
  if (group === 'all') return GROUP_CATEGORIES.water.concat(GROUP_CATEGORIES.air, GROUP_CATEGORIES.appliances);
  return GROUP_CATEGORIES[group];
}
