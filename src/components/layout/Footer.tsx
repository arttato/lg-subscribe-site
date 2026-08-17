import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { Input } from '../ui/Input';
import { buttonClass } from '../ui/Button';

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setOk(true);
    setEmail('');
    setTimeout(() => setOk(false), 4000);
  };

  const cols: { title: string; links: { label: string; to?: string }[] }[] = [
    {
      title: t('footer.colProducts'),
      links: [
        { label: t('footer.linkWater'), to: '/products?g=water' },
        { label: t('footer.linkAir'), to: '/products?g=air' },
        { label: t('footer.linkAircon'), to: '/products?g=air' },
        { label: t('footer.linkLaundry'), to: '/products' },
        { label: t('footer.linkFridge'), to: '/products' },
        { label: t('footer.linkTv'), to: '/products' },
      ],
    },
    {
      title: t('footer.colService'),
      links: [
        { label: t('footer.linkInstall'), to: '/services' },
        { label: t('footer.linkCare'), to: '/services' },
        { label: t('footer.linkWarranty'), to: '/services' },
        { label: t('footer.linkArea'), to: '/services' },
      ],
    },
    {
      title: t('footer.colCompany'),
      links: [
        { label: t('footer.linkStory'), to: '/about' },
        { label: t('footer.linkWhy'), to: '/about' },
        { label: t('footer.linkCampaign'), to: '/' },
        { label: t('footer.linkBusiness'), to: '/business' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        {/* brand + newsletter */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl text-lg font-extrabold text-white">
              LG
            </span>
            <span className="text-base font-extrabold">LG Subscribe</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/70">{t('footer.about')}</p>

          <form onSubmit={submit} className="mt-6">
            <p className="text-sm font-semibold">{t('footer.newsletter')}</p>
            <div className="mt-2 flex max-w-sm gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
              />
              <button type="submit" className={buttonClass('primary', 'md', 'shrink-0')}>
                {t('common.cta.subscribe')}
              </button>
            </div>
            {ok && <p className="mt-2 text-xs text-emerald-300">{t('footer.newsletterOk')}</p>}
          </form>
        </div>

        {/* link columns */}
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to ?? '/'} className="text-sm text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* contact */}
        <div>
          <h4 className="text-sm font-bold text-white">{t('footer.colContact')}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 02-XXX-XXXX
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> {t('contact.channels.line')}
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="h-4 w-4" /> {t('contact.channels.fb')}
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4" /> {t('contact.channels.ig')}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> contact@lgsubscribe.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} LG Subscribe. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-white">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-white">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
