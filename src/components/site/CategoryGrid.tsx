import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Droplets, Wind, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { mainGroups, type MainGroup } from '../../data/categories';
import { SectionHeading } from './SectionHeading';

const ICONS: Record<MainGroup, typeof Droplets> = {
  water: Droplets,
  air: Wind,
  appliances: HomeIcon,
};

export function CategoryGrid() {
  const { t } = useTranslation();
  const groups = mainGroups();

  return (
    <section className="section container-page">
      <SectionHeading center title={t('home.categories.title')} subtitle={t('home.categories.subtitle')} />
      <div className="grid gap-6 md:grid-cols-3">
        {groups.map((g) => {
          const Icon = ICONS[g.id];
          return (
            <Link
              key={g.id}
              to={`/products?g=${g.id}`}
              className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-bold text-muted-foreground">{g.count} {t('common.labels.all') === 'ทั้งหมด' ? 'รายการ' : 'items'}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{t(`home.categories.${g.id}.title`)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(`home.categories.${g.id}.desc`)}</p>
              <div className="mt-5 flex gap-2">
                {g.sampleImages.map((img) => (
                  <img key={img} src={img} alt="" loading="lazy" className="h-16 w-16 rounded-xl border border-border bg-muted object-contain p-1.5" />
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {t('common.cta.viewAll')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
