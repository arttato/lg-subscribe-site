import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base path คำนวณอัตโนมัติ: repo ชื่อ xxx.github.io → "/" , repo ชื่ออื่น → "/REPO/"
// (ตั้งค่า BASE_PATH ใน CI workflow — ในเครื่อง dev ใช้ "/")
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE_PATH || '/',
});
