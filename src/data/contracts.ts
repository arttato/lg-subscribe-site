// ข้อมูลสัญญาและช่องทางชำระเงิน — อ้างอิงจากใบราคา PDF หน้า 2 (เงื่อนไขสัญญา)
import type { ContractMode } from './products';

export interface ModeDetail {
  id: ContractMode;
  /** ระยะเวลาสัญญา (ปี) ที่มีบริการแบบนี้ */
  years: number[];
  /** จำนวนรอบบิลเต็มสัญญา */
  billingCycles: number;
  /** ความถี่รอบบริการ */
  serviceInterval: string;
  serviceIntervalEn: string;
  /** สิ่งที่ได้ในสัญญา */
  includes: string[];
  includesEn: string[];
  /** ใช้กับสินค้ากลุ่มใด */
  appliesTo: string;
  appliesToEn: string;
}

export const MODE_DETAILS: ModeDetail[] = [
  {
    id: 'visit',
    years: [5, 6, 7],
    billingCycles: 72,
    serviceInterval: 'ทุกๆ 24 เดือน',
    serviceIntervalEn: 'Every 24 months',
    includes: [
      'ผู้เชี่ยวชาญจากศูนย์บริการแอลจี เข้าให้บริการถึงบ้าน',
      'บำรุงรักษา และเปลี่ยนอะไหล่ตามรอบบริการ',
      'รับประกันตลอดอายุสัญญา',
    ],
    includesEn: [
      'LG Service Center expert visits your home',
      'Maintenance and part replacement per service cycle',
      'Warranty for the whole contract term',
    ],
    appliesTo: 'เครื่องกรองน้ำ ฟอกอากาศ ซักผ้า ตู้เย็น แอร์ และอื่นๆ',
    appliesToEn: 'Water purifiers, air purifiers, washers, refrigerators, ACs, and more',
  },
  {
    id: 'self',
    years: [5, 6, 7],
    billingCycles: 60,
    serviceInterval: 'ทุกๆ 6 เดือน',
    serviceIntervalEn: 'Every 6 months',
    includes: [
      'ส่งอะไหล่ทางพัสดุถึงบ้านให้เปลี่ยนเอง',
      'จัดส่งตามรอบบริการ',
      'รับประกันตลอดอายุสัญญา',
    ],
    includesEn: [
      'Parts delivered to your home for self-install',
      'Delivery per service cycle',
      'Warranty for the whole contract term',
    ],
    appliesTo: 'สินค้าที่ดูแลด้วยตนเองได้ (เครื่องกรองน้ำ ฟอกอากาศ ฯลฯ)',
    appliesToEn: 'Products suitable for self-care (water purifiers, air purifiers, etc.)',
  },
  {
    id: 'noservice',
    years: [5],
    billingCycles: 60,
    serviceInterval: '—',
    serviceIntervalEn: '—',
    includes: [
      'ไม่มีบริการเข้าบ้าน และไม่จัดส่งอะไหล่',
      'ยังได้รับประกันตลอดอายุสัญญา',
      'โทรแจ้งศูนย์บริการแอลจีเพื่อนัดซ่อม',
    ],
    includesEn: [
      'No home service and no part delivery',
      'Warranty still covers the whole contract',
      'Call LG Service Center to schedule repair',
    ],
    appliesTo: 'โทรทัศน์ มอนิเตอร์ ไมโครเวฟ ซาวด์บาร์ xboom',
    appliesToEn: 'TVs, monitors, microwaves, sound bars, xboom',
  },
];

export interface PaymentMethod {
  id: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'obs',
    title: 'OBS Subscription (ตัดบิลรายเดือน)',
    titleEn: 'OBS Subscription (monthly billing)',
    desc: 'ชำระรายเดือนตามรอบบิล (รอบบิลที่ 1–12, 13–20, 21–60 — ราคาตามงวดที่ระบุในสัญญา)',
    descEn: 'Pay monthly per billing cycle (cycles 1–12, 13–20, 21–60 — price per the contract schedule)',
  },
  {
    id: 'advance',
    title: 'Advance Payment (ชำระล่วงหน้า)',
    titleEn: 'Advance Payment',
    desc: 'ชำระล่วงหน้า 6 หรือ 12 เดือน (แบบ ADV50% = จ่าย 50% งวดแรก)',
    descEn: 'Pay 6 or 12 months in advance (ADV50% = 50% first installment)',
  },
  {
    id: 'installment',
    title: 'ผ่อนชำระ (แบบขายขาด)',
    titleEn: 'Installments (outright purchase)',
    desc: 'ซื้อขาดแล้วผ่อนจ่าย 6 หรือ 12 งวด',
    descEn: 'Buy outright and pay in 6 or 12 installments',
  },
  {
    id: 'promo',
    title: 'โปรโมชัน',
    titleEn: 'Promotions',
    desc: 'เช่น จ่าย 149 บาท เดือนแรก · ลด 50% งวดถัดไป (DC50%) · ลด 15% ตลอดสัญญา (แคมเปญ 38 ปี)',
    descEn: 'e.g. 149 THB in month 1 · 50% off following cycles (DC50%) · 15% off the whole contract (38th anniversary)',
  },
];

export const NO_SERVICE_PRODUCTS = ['โทรทัศน์', 'มอนิเตอร์', 'ไมโครเวฟ', 'ซาวด์บาร์', 'xboom GRAB', 'xboom BOUNCE', 'xboom STAGE 301'];
