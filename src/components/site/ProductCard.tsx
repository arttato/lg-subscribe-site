import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../data/products';
import { Badge } from '../ui/Badge';
import { fmtPrice } from '../../lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-lg"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/50 p-4">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/img/placeholder.svg';
          }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isRentable && <Badge tone="primary">{t('common.labels.rentable')}</Badge>}
          {product.isBuyable && <Badge tone="secondary">{t('common.labels.sale')}</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium text-muted-foreground">{product.category}</p>
        <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-bold leading-snug">{product.name}</h3>
        <p className="text-xs text-muted-foreground">
          {t('common.labels.model')}: {product.code.split('.')[0]}
        </p>
        <div className="mt-auto pt-3">
          <p className="text-sm text-muted-foreground">
            {t('common.labels.starting')}{' '}
            <span className="text-lg font-extrabold text-primary">{fmtPrice(product.rentPrice)}</span>{' '}
            {t('common.labels.perMonth')}
          </p>
          {product.isBuyable && product.buyPrice != null && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t('common.labels.sale')}: {fmtPrice(product.buyPrice)} {t('common.labels.perMonth')}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
