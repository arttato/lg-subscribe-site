import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, Wind, Users, CheckCircle2, Building2 } from 'lucide-react';
import { SectionHeading } from '../components/site/SectionHeading';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function Business() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const solutions = [
    { icon: Droplets, title: t('business.water') },
    { icon: Wind, title: t('business.air') },
    { icon: Users, title: t('business.fleet') },
  ];

  return (
    <div className="container-page py-12">
      <SectionHeading center title={t('business.title')} subtitle={t('business.subtitle')} />

      <div className="grid gap-6 md:grid-cols-3">
        {solutions.map((s) => (
          <div key={s.title} className="rounded-3xl border border-border bg-white p-7 shadow-premium">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <s.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
          </div>
        ))}
      </div>

      {/* ฟอร์มขอใบเสนอราคา */}
      <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-border bg-white p-8 shadow-premium">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">{t('business.quote')}</h2>
        </div>
        {sent ? (
          <div className="mt-6 rounded-2xl bg-secondary/10 p-6 text-secondary">
            <CheckCircle2 className="h-8 w-8" />
            <p className="mt-2 font-semibold">{t('contact.formSuccess')}</p>
          </div>
        ) : (
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder={t('contact.formName')} required />
              <Input placeholder={t('contact.formPhone')} required />
            </div>
            <Select>
              <option>1–5 เครื่อง</option>
              <option>6–20 เครื่อง</option>
              <option>20+ เครื่อง</option>
            </Select>
            <Textarea rows={3} placeholder={t('contact.formMessage')} />
            <Button type="submit">{t('common.cta.quote')}</Button>
            <p className="text-xs text-muted-foreground">{t('common.labels.frontendOnly')}</p>
          </form>
        )}
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">{t('business.comingSoon')}</p>
    </div>
  );
}
