import { useTranslation } from 'react-i18next';
import { Hero } from '../components/site/Hero';
import { CategoryGrid } from '../components/site/CategoryGrid';
import { HowItWorks } from '../components/site/HowItWorks';
import { TestimonialSection } from '../components/site/TestimonialSection';
import { SectionHeading } from '../components/site/SectionHeading';
import { ProductCard } from '../components/site/ProductCard';
import { featuredProducts } from '../data/products';

export default function Home() {
  const { t } = useTranslation();
  const featured = featuredProducts();

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section className="section container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t('home.featured.title')} subtitle={t('home.featured.subtitle')} className="mb-0" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <HowItWorks />

      {/* แคมเปญ */}
      <section className="section container-page">
        <SectionHeading center title={t('home.campaigns.title')} />
        <div className="grid gap-6 md:grid-cols-2">
          {(['c1', 'c2'] as const).map((c) => (
            <div key={c} className="gradient-primary flex items-center gap-5 rounded-3xl p-7 text-white shadow-premium-lg">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-extrabold">
                LG
              </div>
              <div>
                <h3 className="text-lg font-extrabold">{t(`home.campaigns.${c}.title`)}</h3>
                <p className="mt-1 text-sm text-white/85">{t(`home.campaigns.${c}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TestimonialSection />
    </>
  );
}
