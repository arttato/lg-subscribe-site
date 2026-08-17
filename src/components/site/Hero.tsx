import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Wind, Sparkles, Truck, BadgeCheck } from 'lucide-react';
import { buttonClass } from '../ui/Button';
import { featuredProducts } from '../../data/products';

export function Hero() {
  const { t } = useTranslation();
  const sample = featuredProducts().slice(0, 3);
  const stats = [
    { value: '90+', label: t('home.hero.stats.products'), icon: Sparkles },
    { value: '5–7 ปี', label: t('home.hero.stats.contract'), icon: BadgeCheck },
    { value: 'ฟรี', label: t('home.hero.stats.install'), icon: Truck },
    { value: '24/7', label: t('home.hero.stats.service'), icon: Wind },
  ];

  return (
    <section className="gradient-hero">
      <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('home.hero.badge')}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {t('home.hero.title1')}{' '}
            <span className="text-gradient">{t('home.hero.titleAccent')}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{t('home.hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className={buttonClass('primary', 'lg')}>
              {t('home.hero.ctaProducts')}
            </Link>
            <Link to="/plans" className={buttonClass('outline', 'lg')}>
              {t('home.hero.ctaPlans')}
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-white/70 p-3.5">
                <s.icon className="h-4 w-4 text-primary" />
                <dt className="mt-2 text-lg font-extrabold">{s.value}</dt>
                <dd className="text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* สินค้าจริงจากข้อมูล */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            {sample.map((p, i) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className={`rounded-3xl border border-border bg-white p-5 shadow-premium transition-transform hover:-translate-y-1 ${
                  i === 1 ? 'translate-y-6' : ''
                }`}
              >
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted/50 p-4">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <p className="mt-3 line-clamp-2 text-sm font-bold">{p.name}</p>
                <p className="mt-1 text-sm font-extrabold text-primary">
                  {t('common.labels.starting')} {p.rentPrice.toLocaleString('th-TH')}{' '}
                  {t('common.labels.perMonth')}
                </p>
              </Link>
            ))}
          </div>
          <div className="absolute -right-2 top-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-premium">
            <Droplets className="h-7 w-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
