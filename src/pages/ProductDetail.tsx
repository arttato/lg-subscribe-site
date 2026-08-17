import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShieldCheck, Wrench, Package, Check, ChevronDown, ExternalLink } from 'lucide-react';
import { productBySlug } from '../data/products';
import { specsBySlug } from '../data/specs';
import { Badge } from '../components/ui/Badge';
import { buttonClass } from '../components/ui/Button';
import { fmtPrice } from '../lib/utils';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [tab, setTab] = useState<'rent' | 'buy'>('rent');

  const p = slug ? productBySlug(slug) : undefined;
  const specs = p ? specsBySlug(p.slug) ?? specsBySlug(p.code.split('.')[0]) : undefined;

  if (!p) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold">{t('productDetail.notFound')}</h1>
        <Link to="/products" className={buttonClass('primary', 'md', 'mt-6')}>
          {t('productDetail.backToProducts')}
        </Link>
      </div>
    );
  }

  const modes = [
    { id: 'visit', label: t('common.contract.visit'), desc: t('common.contract.visitDesc'), icon: Wrench },
    { id: 'self', label: t('common.contract.self'), desc: t('common.contract.selfDesc'), icon: Package },
    { id: 'noservice', label: t('common.contract.noservice'), desc: t('common.contract.noserviceDesc'), icon: ShieldCheck },
  ].filter((m) => p.modes.includes(m.id as never));

  return (
    <div className="container-page py-12">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> {t('productDetail.backToProducts')}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-3xl border border-border bg-muted/50 p-10">
          <img src={p.image} alt={p.name} className="max-h-96 max-w-full object-contain" />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">{p.category}</Badge>
            {p.isRentable && <Badge>{t('common.labels.rentable')}</Badge>}
            {p.isBuyable && <Badge tone="secondary">{t('common.labels.sale')}</Badge>}
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl">{p.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('common.labels.model')}: {p.code.split('.')[0]}
          </p>

          {/* สลับโหมดเช่า/ซื้อ */}
          <div className="mt-6 inline-flex rounded-full border border-border bg-muted p-1">
            <button
              onClick={() => setTab('rent')}
              className={cn('cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors', tab === 'rent' ? 'bg-primary text-white' : 'text-muted-foreground')}
            >
              {t('productDetail.rentTab')}
            </button>
            <button
              onClick={() => setTab('buy')}
              className={cn('cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors', tab === 'buy' ? 'bg-primary text-white' : 'text-muted-foreground')}
            >
              {t('productDetail.buyTab')}
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-premium">
            {tab === 'rent' ? (
              <>
                <p className="text-sm text-muted-foreground">{t('common.labels.starting')}</p>
                <p className="mt-1 text-4xl font-extrabold text-primary">
                  {fmtPrice(p.rentPrice)} <span className="text-base font-semibold">{t('common.labels.perMonth')}</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {p.contractYears.length > 0 ? `สัญญา ${p.contractYears.join(' / ')} ปี` : t('common.labels.placeholder')}
                </p>
                <Link to="/plans" className={buttonClass('primary', 'lg', 'mt-5')}>
                  {t('common.cta.rent')}
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">{t('common.labels.sale')}</p>
                {p.buyPrice != null ? (
                  <>
                    <p className="mt-1 text-4xl font-extrabold text-primary">
                      {fmtPrice(p.buyPrice)} <span className="text-base font-semibold">บาท</span>
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t('common.labels.frontendOnly')}</p>
                    <button className={buttonClass('primary', 'lg', 'mt-5')}>{t('common.cta.buy')}</button>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t('productDetail.notFound')} · {t('common.labels.placeholder')}
                  </p>
                )}
              </>
            )}
          </div>

          {/* รูปแบบบริการ */}
          <div className="mt-6">
            <h2 className="text-sm font-bold text-muted-foreground">{t('productDetail.plans')}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {modes.map((m) => (
                <div key={m.id} className="rounded-2xl border border-border bg-white p-4">
                  <m.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-bold">{m.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== สเปคจริงจากเว็บ LG ===== */}
      {specs && specs.hasSpecs && (
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* คุณลักษณะที่สำคัญ */}
          {specs.features.length > 0 && (
            <div>
              <h2 className="text-xl font-bold">{t('productDetail.features')}</h2>
              <ul className="mt-5 space-y-3">
                {specs.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* สเปคทั้งหมด */}
          {specs.groups.length > 0 && (
            <div>
              <h2 className="text-xl font-bold">{t('productDetail.specGroups')}</h2>
              <div className="mt-5 space-y-3">
                {specs.groups.map((g) => (
                  <details key={g.title} className="group overflow-hidden rounded-2xl border border-border bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold">
                      {g.title}
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-border">
                      <table className="w-full text-left text-sm">
                        <tbody>
                          {g.specs.map((s) => (
                            <tr key={s.name} className="border-b border-border last:border-0 align-top">
                              <td className="w-2/5 px-5 py-2.5 text-muted-foreground">{s.name}</td>
                              <td className="px-5 py-2.5 font-medium">{s.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* แหล่งข้อมูล */}
      {specs?.url && (
        <p className="mt-8 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {t('productDetail.sourceNote')}
          <a
            href={specs.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            {t('productDetail.viewOnLg')} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>
      )}

      {(!specs || !specs.hasSpecs) && (
        <p className="mt-10 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">{t('productDetail.comingSoon')}</p>
      )}
    </div>
  );
}
