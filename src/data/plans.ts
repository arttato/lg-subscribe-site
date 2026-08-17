// แพ็กเกจสัญญาเช่า — โครงสร้างอิงจากสัญญาจริงในใบราคา (Visit/Self/No Service, 5/6/7 ปี)
import type { ContractMode } from './products';

export interface ContractOption {
  id: string;
  years: number;
  months: number;
  modes: ContractMode[];
}

export const CONTRACTS: ContractOption[] = [
  { id: '5y', years: 5, months: 60, modes: ['visit', 'self', 'noservice'] },
  { id: '6y', years: 6, months: 72, modes: ['visit', 'self'] },
  { id: '7y', years: 7, months: 84, modes: ['visit', 'self'] },
];

export const MODES: ContractMode[] = ['visit', 'self', 'noservice'];

/** ราคาเช่ารายเดือนที่น้อยที่สุดของสัญญา (ตัวอย่าง: จากตารางรอบบิล — เดือนแรกโปร/ส่วนลด 50%) */
export interface RentBreakdown {
  contract: ContractOption;
  /** ราคารายเดือนเฉลี่ยทั้งสัญญา */
  monthlyAvg: number;
  /** รวมทั้งสัญญา */
  total: number;
}

/**
 * คำนวณค่าเช่าแบบง่าย (placeholder จริง) จากราคาเริ่มต้นต่อเดือน:
 * เดือนแรก = 149 (โปรโมชัน) · เดือนถัดไป ลด 50% · หลังงวดโปร คืนราคาปกติ
 */
export function rentBreakdown(startPrice: number, contract: ContractOption): RentBreakdown {
  const promoFirst = 149;
  const promoMonths = 12;
  const monthly = (startPrice * 0.5 + Math.round((startPrice - startPrice * 0.5) / 10) * 10) || startPrice;
  // สมมติ: 12 เดือนแรกได้ส่วนลด 50% (DC50%), เดือนแรก 149
  const first = promoFirst;
  const discounted = Array.from({ length: promoMonths - 1 }, () => Math.round(monthly / 2));
  const normalCount = Math.max(0, contract.months - promoMonths);
  const total = first + discounted.reduce((a, b) => a + b, 0) + normalCount * monthly;
  return {
    contract,
    monthlyAvg: Math.round(total / contract.months),
    total,
  };
}
