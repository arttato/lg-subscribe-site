# LG Subscribe — เว็บไซต์ธุรกิจ (React + i18n)

เว็บไซต์ธุรกิจ "LG Subscribe" (เช่า/ขายเครื่องใช้ไฟฟ้า LG รายเดือน สไตล์ coway.co.th) — เฟส 1: หน้าสาธารณะทั้งหมด ภาษาไทย (หลัก) + อังกฤษ

## เทคโนโลยี

- **Vite + React 19 + TypeScript** (strict)
- **Tailwind CSS v4** — design tokens ใน `src/index.css` (`@theme`)
- **i18next + react-i18next** — ภาษาไทยหลัก (`fallbackLng: 'th'`), ไฟล์คีย์ใน `src/locales/{th,en}.json`
- **react-router-dom v7** — route ทั้งหมดใน `src/router.tsx`
- **lucide-react** — ไอคอน (ไม่มี emoji)

## ข้อมูลสินค้า — ใช้ข้อมูลจริงจากโปรเจคเดิม

| ที่มา | ปลายทางในโปรเจคนี้ |
|---|---|
| `products.json` (90 สินค้า จาก PDF ใบราคา) | `src/data/products.json` (คัดลอกแล้ว) |
| `public/img/products/{slug}.jpg` (92 รูป) | `public/img/products/` (คัดลอกแล้ว) |

- `src/data/products.ts` — ชั้นข้อมูลแบบ typed: `rentPrice` (เช่ารายเดือน), `buyPrice` (ขายขาดจาก policy 2Y), `contractYears`, `modes` (Visit/Self/NoService)
- `src/data/categories.ts` — กลุ่มหมวดหลัก 3 กลุ่ม (น้ำ/อากาศ/เครื่องใช้ไฟฟ้า)
- `src/data/plans.ts` — สัญญา 5/6/7 ปี + ตัวคำนวณค่าเช่า
- `src/data/service-areas.ts` — พื้นที่ให้บริการ (ตัวอย่าง)

**อัปเดตข้อมูลเดือนหน้า:** รัน `npm run extract` ในโปรเจค Astro เดิม → คัดลอก `products.json` มาทับ `src/data/products.json` (+ รูปใน `public/img/products/`)

## วิธีรัน

```bash
npm install
npm run dev        # dev server (localhost:5173)
npm run build      # build → dist/
npm run preview    # ทดสอบเวอร์ชัน build
npm run i18n:check # ตรวจว่า th/en มีคีย์ตรงกัน
```

## โครงสร้าง

```
src/
├── i18n/index.ts          ← ตั้งค่า i18next (ตรวจจับภาษา, fallback th)
├── locales/{th,en}.json   ← ข้อความทั้งหมด (th = แหล่งคีย์หลัก)
├── router.tsx             ← route ทั้งหมด
├── data/                  ← ข้อมูล (สินค้าจริง + แพ็กเกจ + พื้นที่บริการ)
├── components/
│   ├── layout/            ← Layout, Header, Footer, LanguageSwitcher, CallCenterBar
│   ├── site/              ← Hero, ProductCard, CategoryGrid, HowItWorks, Testimonials
│   └── ui/                ← Button, Card, Badge, Input, Select, Textarea
└── pages/                 ← Home, Products, ProductDetail, Plans, Services,
                            Business, About, Help, Contact, Legal, NotFound
```

## สถานะ (เฟสพื้นฐาน เสร็จแล้ว)

- ✅ i18n th/en (190 คีย์, check ผ่าน) + LanguageSwitcher + `<html lang>` อัปเดต
- ✅ Design system: LG Red #A50034 + Noto Sans Thai + gradient/shadow tokens
- ✅ ข้อมูลจริง 90 สินค้า + รูปจริง 92 รูป (หน้า /products กรอง/ค้นหา/เรียงได้ครบ)
- ✅ Layout/Header (dropdown สินค้า + mobile sheet)/Footer/CallCenterBar
- ✅ หน้า Home (Hero + หมวด + สินค้าแนะนำ + 3 ขั้นตอน + แคมเปญ + รีวิว)
- ✅ ทุก route ใช้งานได้ + หน้า /products/:slug แสดงราคาเช่า/ขายขาดจริง

**ถัดไป (เฟสหน้า):** เนื้อหาหน้า Plans/Services/Business/About/Help/Contact ให้สมบูรณ์ · FAQ จริง · ฟอร์มนัดติดตั้ง · รูป hero/หมวดสินค้าจริง · deploy

## หมายเหตุ

- เบอร์โทร/ที่อยู่/เวลาทำการ ยังเป็น **ตัวอย่าง** (ข้อมูลจริงไม่อยู่ใน PDF ต้นฉบับ) — ระบุไว้ชัดเจนใน UI
- ฟอร์มทั้งหมดเป็น frontend-only (ยังไม่เชื่อม backend)
- ยังไม่ได้ init git — เมื่อพร้อม push ขึ้น GitHub ใช้ขั้นตอนเดียวกับ README ของ project-art-v2
