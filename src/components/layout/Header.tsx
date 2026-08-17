import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Phone, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { buttonClass } from '../ui/Button';
import { cn } from '../../lib/utils';

export function Header() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const nav = [
    { to: '/products', label: t('common.nav.products') },
    { to: '/plans', label: t('common.nav.plans') },
    { to: '/services', label: t('common.nav.services') },
    { to: '/business', label: t('common.nav.business') },
    { to: '/about', label: t('common.nav.about') },
    { to: '/help', label: t('common.nav.help') },
    { to: '/contact', label: t('common.nav.contact') },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-full px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary',
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      {/* top bar */}
      <div className="hidden border-b border-border bg-muted/60 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            {t('common.labels.placeholder')} · 02-XXX-XXXX · {t('common.labels.frontendOnly').split('—')[0]}
          </span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* main bar */}
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl text-lg font-extrabold text-white">
            LG
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight">LG Subscribe</span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">{t('common.tagline')}</span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" className={navLinkClass} end>
            {t('common.nav.home')}
          </NavLink>
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <NavLink to="/products" className={navLinkClass}>
              <span className="inline-flex items-center gap-0.5">
                {t('common.nav.products')}
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </NavLink>
            {productsOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-border bg-white p-2 shadow-premium-lg">
                {[
                  ['/products?g=water', t('home.categories.water.title')],
                  ['/products?g=air', t('home.categories.air.title')],
                  ['/products?g=appliances', t('home.categories.appliances.title')],
                ].map(([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
                    onClick={() => setProductsOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <div className="my-1 border-t border-border" />
                <Link to="/products" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted">
                  {t('common.cta.viewAll')}
                </Link>
              </div>
            )}
          </div>
          {nav.slice(1).map((n) => (
            <NavLink key={n.to} to={n.to} className={navLinkClass}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/plans" className={buttonClass('primary', 'md', 'hidden sm:inline-flex')}>
            {t('common.cta.rent')}
          </Link>
          <button
            className="cursor-pointer rounded-xl p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {mobileOpen && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            <Link to="/" className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>
              {t('common.nav.home')}
            </Link>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setMobileOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link to="/plans" className={buttonClass('primary', 'md', 'mt-2')} onClick={() => setMobileOpen(false)}>
              {t('common.cta.rent')}
            </Link>
            <div className="mt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
