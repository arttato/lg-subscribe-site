# LG Subscribe — เว็บไซต์ธุรกิจ (React + i18n)

เว็บไซต์ธุรกิจ "LG Subscribe" (เช่า/ขายเครื่องใช้ไฟฟ้า LG รายเดือน สไตล์ coway.co.th) — เฟส 1: หน้าสาธารณะทั้งหมด ภาษาไทย (หลัก) + อังกฤษ

**เว็บจริง (GitHub Pages):** https://arttato.github.io/lg-subscribe-site/

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
npm run build      # build → dist/ (base path ตาม env BASE_PATH, ค่าเริ่มต้น "/")
npm run preview    # ทดสอบเวอร์ชัน build
npm run i18n:check # ตรวจว่า th/en มีคีย์ตรงกัน
```

**base path (สำคัญสำหรับ deploy):** ตั้ง `BASE_PATH` ตอน build เพื่อให้ asset ชี้ถูกตำแหน่ง —
- เว็บที่ root (custom domain / repo ชื่อ `xxx.github.io`) → `BASE_PATH=/`
- เว็บใต้โฟลเดอร์ย่อย (เช่น `/lg-subscribe-site/`) → `BASE_PATH=/lg-subscribe-site/`
- **บน GitHub Actions ไม่ต้องตั้งเอง** — workflow คำนวณให้อัตโนมัติ (ดูหัวข้อ custom domain ด้านล่าง)

## ตั้ง custom domain (เช่น www.example.com)

เว็บ deploy ด้วย GitHub Pages + Actions — พอตั้ง custom domain แล้วเว็บจะอยู่ที่ **root** (`/`) แทน `/lg-subscribe-site/` ขั้นตอนทั้งหมด:

### 1. ซื้อโดเมน
ซื้อจากผู้ให้บริการใดก็ได้ (Namecheap / GoDaddy / Cloudflare / .com หรือ .co.th ผ่านผู้ให้บริการไทย ฯลฯ)

### 2. สร้างไฟล์ `CNAME` ใน repo root
เนื้อหาของไฟล์ = **ชื่อโดเมนที่ต้องการ** ตัวเดียว (ไม่มีอย่างอื่น ไม่มีช่องว่างท้าย):

```
www.example.com
```

- คัดลอกจากไฟล์ template ที่เตรียมไว้: `cp CNAME.example CNAME` แล้วแก้โดเมน
- ⚠️ ถ้ายังไม่มีโดเมนจริง **อย่า**สร้างไฟล์ CNAME (จะทำให้ build ใช้ base path `/` ผิดตำแหน่ง)

### 3. ตั้งค่า DNS ที่ผู้ให้บริการโดเมน
| กรณี | ประเภท | ชื่อ | ค่า |
|---|---|---|---|
| ใช้ **www** (แนะนำ) | `CNAME` | `www` | `arttato.github.io.` |
| ใช้ **โดเมนหลัก** (example.com) | `A` × 4 | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |

- รอ DNS propagate (ปกติ 5 นาที – 24 ชั่วโมง) — ตรวจที่ https://dnschecker.org ว่าค่าแสดงถูกต้อง

### 4. ผูกโดเมนกับ GitHub Pages
1. GitHub → repo `lg-subscribe-site` → **Settings → Pages**
2. ช่อง **Custom domain** → กรอกโดเมน (เช่น `www.example.com`) → **Save**
3. GitHub ตรวจ DNS อัตโนมัติ — ขึ้น "DNS check successful" จึงผ่าน
4. ติ๊ก **Enforce HTTPS** — GitHub ออก certificate อัตโนมัติ (อาจใช้เวลา หลายชั่วโมงถึง 1 วัน ระหว่างนั้นเว็บยังเปิดผ่าน `https://arttato.github.io/lg-subscribe-site/` ได้)

### 5. Push ไฟล์ CNAME ขึ้น GitHub
```bash
git add CNAME && git commit -m "feat: ตั้ง custom domain" && git push
```
Workflow `Deploy to GitHub Pages` ตรวจจับไฟล์ `CNAME` อัตโนมัติ:
- build ด้วย `BASE_PATH=/` (asset ชี้ root ถูกต้อง)
- ฝัง `CNAME` ลง `dist/CNAME` (GitHub Pages ต้องเจอในเนื้อหาที่ deploy ถึงจะผูกโดเมนได้)

### 6. ตรวจสอบ
- เปิด `https://www.example.com/` → ควรเจอหน้าแรก
- ลอง deep link เช่น `https://www.example.com/products` → ต้องไม่ 404 (SPA fallback)
- URL เก่า `arttato.github.io/lg-subscribe-site` จะ **redirect ไปโดเมนใหม่ให้อัตโนมัติ**

### ยกเลิก custom domain
ลบไฟล์ `CNAME` ใน repo (push ขึ้น) + ไป Settings → Pages → กด **Remove** ที่ช่อง Custom domain — เว็บกลับไปอยู่ที่ `arttato.github.io/lg-subscribe-site/` เหมือนเดิม

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

## สถานะ (เฟส 1–2 เสร็จแล้ว)

- ✅ i18n th/en (234 คีย์, check ผ่าน) + LanguageSwitcher + `<html lang>` อัปเดต
- ✅ Design system: LG Red #A50034 + Noto Sans Thai + gradient/shadow tokens
- ✅ ข้อมูลจริง 90 สินค้า + รูปจริง 92 รูป (หน้า /products กรอง/ค้นหา/เรียงได้ครบ)
- ✅ Layout/Header (dropdown สินค้า + mobile sheet)/Footer/CallCenterBar
- ✅ หน้า Home (Hero + หมวด + สินค้าแนะนำ + 3 ขั้นตอน + แคมเปญ + รีวิว)
- ✅ ทุก route ใช้งานได้ + หน้า /products/:slug แสดงราคาเช่า/ขายขาดจริง
- ✅ หน้า Plans (ตารางสัญญา + ช่องทางชำระเงิน) / Services (ฟอร์มนัดติดตั้ง) / Help (FAQ จริง 118 ข้อ)
- ✅ ProductDetail สเปคจริง (คุณลักษณะที่สำคัญ + ตารางสเปคกลุ่ม จาก lg-specs.json)
- ✅ Deploy อัตโนมัติ GitHub Pages (repo: `arttato/lg-subscribe-site`)

**ถัดไป (เฟสหน้า):** ลดขนาด bundle (lazy-load หน้า + แยก lg-specs) · ป้ายโปรโมชันจาก banners.json · เนื้อหา Business/About/Contact ให้สมบูรณ์ · custom domain จริง

## หมายเหตุ

- เบอร์โทร/ที่อยู่/เวลาทำการ ยังเป็น **ตัวอย่าง** (ข้อมูลจริงไม่อยู่ใน PDF ต้นฉบับ) — ระบุไว้ชัดเจนใน UI
- ฟอร์มทั้งหมดเป็น frontend-only (ยังไม่เชื่อม backend)
- Deploy workflow อยู่ใน `.github/workflows/deploy.yml` — base path คำนวณอัตโนมัติจาก (1) มีไฟล์ CNAME → `/` (2) repo `*.github.io` → `/` (3) อื่นๆ → `/REPO/`
