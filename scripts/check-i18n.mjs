// ตรวจความสอดคล้องของคีย์ i18n ระหว่าง th.json กับ en.json
// วิธีรัน: node scripts/check-i18n.mjs  (หรือ npm run i18n:check)
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../src/locales/', import.meta.url));

function flat(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flat(v, key, out);
    else out[key] = v;
  }
  return out;
}

const th = JSON.parse(await readFile(`${dir}th.json`, 'utf8'));
const en = JSON.parse(await readFile(`${dir}en.json`, 'utf8'));

const thKeys = new Set(Object.keys(flat(th)));
const enKeys = new Set(Object.keys(flat(en)));

const missingInEn = [...thKeys].filter((k) => !enKeys.has(k));
const missingInTh = [...enKeys].filter((k) => !thKeys.has(k));

let errors = 0;
if (missingInEn.length) {
  errors += missingInEn.length;
  console.error(`❌ มีคีย์ใน th.json แต่ไม่มีใน en.json (${missingInEn.length}):`);
  for (const k of missingInEn.slice(0, 20)) console.error(`   - ${k}`);
}
if (missingInTh.length) {
  errors += missingInTh.length;
  console.error(`❌ มีคีย์ใน en.json แต่ไม่มีใน th.json (${missingInTh.length}):`);
  for (const k of missingInTh.slice(0, 20)) console.error(`   - ${k}`);
}

if (!errors) {
  console.log(`✅ i18n OK — th.json และ en.json มีคีย์ตรงกัน (${thKeys.size} คีย์)`);
} else {
  console.error(`\nพบความไม่ตรง ${errors} รายการ — แก้ให้ครบก่อน build`);
  process.exit(1);
}
