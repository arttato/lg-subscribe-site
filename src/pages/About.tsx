import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SectionHeading } from '../components/site/SectionHeading';
import { buttonClass } from '../components/ui/Button';

export default function About() {
  const { t } = useTranslation();
  const points = t('about.why.points', { returnObjects: true }) as string[];

  return (
    <div className="container-page py-12">
      <SectionHeading center title={t('about.title')} subtitle={t('about.subtitle')} />

      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-8 shadow-premium md:p-10">
        <h2 className="text-xl font-bold">{t('about.why.title')}</h2>
        <ul className="mt-6 space-y-4">
          {points.map((pt) => (
            <li key={pt} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-foreground/90">{pt}</span>
            </li>
          ))}
        </ul>
        <Link to="/products" className={buttonClass('primary', 'lg', 'mt-8')}>
          {t('common.cta.start')}
        </Link>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">{t('about.comingSoon')}</p>
    </div>
  );
}
