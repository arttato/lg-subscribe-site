import { useTranslation } from 'react-i18next';
import { MousePointerClick, CalendarCheck, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const ICONS = [MousePointerClick, CalendarCheck, ShieldCheck];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="section bg-muted/60">
      <div className="container-page">
        <SectionHeading center title={t('home.how.title')} subtitle={t('home.how.subtitle')} />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => {
            const Icon = ICONS[i - 1];
            return (
              <div key={i} className="relative rounded-3xl border border-border bg-white p-7 shadow-premium">
                <span className="absolute -top-4 left-7 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white">
                  {i}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{t(`home.how.step${i}.title`)}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t(`home.how.step${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
