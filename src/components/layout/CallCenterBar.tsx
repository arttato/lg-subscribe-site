import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, X } from 'lucide-react';

export function CallCenterBar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-64 rounded-2xl border border-border bg-white p-4 shadow-premium-lg animate-fade-up">
          <p className="text-sm font-bold">{t('common.cta.callCenter')}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t('help.callHours')} · {t('common.labels.placeholder')}
          </p>
          <a
            href="tel:02xxxxxxx"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" /> 02-XXX-XXXX
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="gradient-primary flex h-14 w-14 items-center justify-center rounded-full text-white shadow-premium-lg transition-transform hover:scale-105 cursor-pointer"
        aria-label={t('common.cta.callCenter')}
      >
        {open ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </button>
    </div>
  );
}
