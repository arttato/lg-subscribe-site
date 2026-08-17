import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

export function Legal({ type }: { type: 'privacy' | 'terms' }) {
  const { t } = useTranslation();
  const title = type === 'privacy' ? t('legal.privacyTitle') : t('legal.termsTitle');

  return (
    <div className="container-page max-w-3xl py-12">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-extrabold">{title}</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {t('legal.updated')}: 17 ส.ค. 2569
      </p>
      <div className="mt-8 rounded-3xl border border-border bg-white p-8 shadow-premium">
        <p className="text-sm leading-relaxed text-muted-foreground">{t('legal.template')}</p>
        <p className="mt-6 text-sm leading-relaxed text-foreground/80">
          {type === 'privacy'
            ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. (ตัวอย่างข้อความ)'
            : 'ตัวอย่างข้อกำหนดการใช้บริการ — เนื้อหาจริงจะถูกจัดทำภายหลัง'}
        </p>
      </div>
    </div>
  );
}
