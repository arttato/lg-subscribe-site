export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** ฟอร์แมตราคาแบบไทย เช่น 1234 → "1,234" */
export function fmtPrice(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '-';
  return n.toLocaleString('th-TH');
}
