import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Wrench, Search, ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { searchFaq, faqCount } from '../data/faq';
import { SectionHeading } from '../components/site/SectionHeading';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const FAQ_MODELS = 40;

export default function Help() {
  const { t } = useTranslation();
  const [q, setQ] = useState('');
  const [showAll, setShowAll] = useState(false);

  const faqs = useMemo(() => searchFaq(q, showAll ? 200 : 12), [q, showAll]);

  return (
    <div className="container-page py-12">
      <SectionHeading center title={t('help.title')} subtitle={t('help.subtitle')} />

      {/* ช่องทางด่วน */}
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white p-7 shadow-premium">
          <Wrench className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-bold">{t('help.repair')}</h3>
          <Button variant="outline" className="mt-4">{t('common.cta.repair')}</Button>
        </div>
        <div className="rounded-3xl border border-border bg-white p-7 shadow-premium">
          <Phone className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-bold">{t('help.callCenter')}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('help.callHours')}</p>
          <Button className="mt-4">{t('common.cta.callCenter')}</Button>
        </div>
      </div>

      {/* FAQ จริงจากเว็บ LG */}
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="flex items-center gap-2">
          <MessageCircleQuestion className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">{t('help.faqTitle')}</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t('help.faqSubtitle', { count: faqCount, models: FAQ_MODELS })}
        </p>

        <div className="relative mt-5">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('help.faqSearch')}
            className="h-12 pl-12 text-base"
          />
        </div>

        {faqs.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t('help.faqEmpty')}</p>
        ) : (
          <div className="mt-6 space-y-3">
            {faqs.map((f, idx) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-white shadow-premium">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-extrabold text-accent-foreground">
                      {idx + 1}
                    </span>
                    <span>{f.q}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground">{f.category} · {f.code.split('.')[0]}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        )}

        {!showAll && faqCount > faqs.length && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 w-full cursor-pointer rounded-2xl border border-border bg-white py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-muted"
          >
            {t('help.faqShowAll')} ({faqCount})
          </button>
        )}

        <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">{t('help.faqNote')}</p>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">{t('help.comingSoon')}</p>
    </div>
  );
}
