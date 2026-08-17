// พื้นที่ให้บริการ — ข้อมูลตัวอย่าง (placeholder) ใส่ข้อมูลจริงภายหลัง
export interface District {
  name: string;
  nameEn: string;
}
export interface Province {
  name: string;
  nameEn: string;
  districts: District[];
}

export const SERVICE_AREAS: Province[] = [
  {
    name: 'กรุงเทพมหานคร',
    nameEn: 'Bangkok',
    districts: [
      { name: 'พระนคร', nameEn: 'Phra Nakhon' },
      { name: 'ปทุมวัน', nameEn: 'Pathum Wan' },
      { name: 'บางกะปิ', nameEn: 'Bang Kapi' },
      { name: 'ลาดกระบัง', nameEn: 'Lat Krabang' },
      { name: 'บางแค', nameEn: 'Bang Khae' },
    ],
  },
  {
    name: 'นนทบุรี',
    nameEn: 'Nonthaburi',
    districts: [
      { name: 'เมืองนนทบุรี', nameEn: 'Mueang Nonthaburi' },
      { name: 'ปากเกร็ด', nameEn: 'Pak Kret' },
      { name: 'บางบัวทอง', nameEn: 'Bang Bua Thong' },
    ],
  },
  {
    name: 'สมุทรปราการ',
    nameEn: 'Samut Prakan',
    districts: [
      { name: 'เมืองสมุทรปราการ', nameEn: 'Mueang Samut Prakan' },
      { name: 'บางพลี', nameEn: 'Bang Phli' },
      { name: 'พระประแดง', nameEn: 'Phra Pradaeng' },
    ],
  },
  {
    name: 'ชลบุรี',
    nameEn: 'Chonburi',
    districts: [
      { name: 'เมืองชลบุรี', nameEn: 'Mueang Chonburi' },
      { name: 'ศรีราชา', nameEn: 'Si Racha' },
      { name: 'บางละมุง', nameEn: 'Bang Lamung' },
    ],
  },
  {
    name: 'เชียงใหม่',
    nameEn: 'Chiang Mai',
    districts: [
      { name: 'เมืองเชียงใหม่', nameEn: 'Mueang Chiang Mai' },
      { name: 'แม่ริม', nameEn: 'Mae Rim' },
    ],
  },
];
