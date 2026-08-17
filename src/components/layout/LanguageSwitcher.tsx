import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const lng = i18n.language?.startsWith('en') ? 'en' : 'th';

  const set = (code: 'th' | 'en') => {
    void i18n.changeLanguage(code);
  };

  return (
    <div className={cn('inline-flex items-center rounded-full border border-border bg-white p-0.5 text-xs font-semibold', className)}>
      <button
        onClick={() => set('th')}
        className={cn(
          'cursor-pointer rounded-full px-2.5 py-1 transition-colors',
          lng === 'th' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        ไทย
      </button>
      <button
        onClick={() => set('en')}
        className={cn(
          'cursor-pointer rounded-full px-2.5 py-1 transition-colors',
          lng === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        EN
      </button>
    </div>
  );
}
