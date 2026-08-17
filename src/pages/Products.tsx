import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import { groupOf, type MainGroup } from '../data/categories';
import { ProductCard } from '../components/site/ProductCard';
import { SectionHeading } from '../components/site/SectionHeading';
import { Input, Select } from '../components/ui/Input';
import { cn } from '../lib/utils';

type Group = MainGroup | 'all';

export default function Products() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('default');

  const group: Group = (params.get('g') as Group) || 'all';
  const setGroup = (g: Group) => {
    const next = new URLSearchParams(params);
    if (g === 'all') next.delete('g');
    else next.set('g', g);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    let l = products.filter((p) => (group === 'all' ? true : groupOf(p.category) === group));
    const query = q.trim().toLowerCase();
    if (query) {
      l = l.filter((p) => [p.name, p.code, p.category].join(' ').toLowerCase().includes(query));
    }
    if (sort === 'priceAsc') l = [...l].sort((a, b) => a.rentPrice - b.rentPrice);
    if (sort === 'priceDesc') l = [...l].sort((a, b) => b.rentPrice - a.rentPrice);
    return l;
  }, [group, q, sort]);

  const chips: { id: Group; label: string }[] = [
    { id: 'all', label: t('products.all') },
    { id: 'water', label: t('home.categories.water.title') },
    { id: 'air', label: t('home.categories.air.title') },
    { id: 'appliances', label: t('home.categories.appliances.title') },
  ];

  return (
    <div className="container-page py-12">
      <SectionHeading title={t('products.title')} subtitle={t('products.subtitle')} />

      {/* ตัวกรอง */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.id}
              onClick={() => setGroup(c.id)}
              className={cn(
                'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                group === c.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-white text-foreground/80 hover:border-primary/40 hover:text-primary',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('products.search')} className="w-56 pl-10" />
          </div>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="w-48">
            <option value="default">{t('products.sort.default')}</option>
            <option value="priceAsc">{t('products.sort.priceAsc')}</option>
            <option value="priceDesc">{t('products.sort.priceDesc')}</option>
          </Select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{t('products.showing', { count: list.length })}</p>

      {list.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">{t('products.empty')}</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
