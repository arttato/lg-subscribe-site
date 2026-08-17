import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base path คำนวณอัตโนมัติ: repo ชื่อ xxx.github.io → "/" , repo ชื่ออื่น → "/REPO/"
// (ตั้งค่า BASE_PATH ใน CI workflow — ในเครื่อง dev ใช้ "/")
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE_PATH || '/',
  build: {
    rollupOptions: {
      output: {
        // แยก lg-specs.json (~1.5MB) ออกจาก main chunk — โหลดเฉพาะเมื่อ
        // เปิดหน้า Help หรือ ProductDetail (ผ่าน data/faq.ts, data/specs.ts)
        manualChunks(id) {
          if (id.includes('lg-specs.json')) return 'lg-specs';
        },
      },
    },
  },
});
