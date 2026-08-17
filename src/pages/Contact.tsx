import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Facebook, Instagram, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/site/SectionHeading';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSent(true);
  };

  const channels = [
    { icon: MessageCircle, label: t('contact.channels.line'), value: '@lgsubscribe' },
    { icon: Facebook, label: t('contact.channels.fb'), value: 'facebook.com/lgsubscribe' },
    { icon: Instagram, label: t('contact.channels.ig'), value: '@lgsubscribe' },
    { icon: Mail, label: t('contact.channels.email'), value: 'contact@lgsubscribe.example' },
    { icon: Phone, label: t('common.cta.callCenter'), value: '02-XXX-XXXX' },
    { icon: MapPin, label: t('contact.office.title'), value: t('contact.office.address') },
  ];

  return (
    <div className="container-page py-12">
      <SectionHeading center title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* ฟอร์ม */}
        <form onSubmit={submit} className="rounded-3xl border border-border bg-white p-8 shadow-premium">
          <h2 className="text-xl font-bold">{t('contact.formTitle')}</h2>
          {sent ? (
            <div className="mt-8 rounded-2xl bg-secondary/10 p-6 text-secondary">
              <CheckCircle2 className="h-8 w-8" />
              <p className="mt-2 font-semibold">{t('contact.formSuccess')}</p>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4">
                <div>
                  <label className="text-sm font-semibold">{t('contact.formSubject')}</label>
                  <Select className="mt-2">
                    {(['general', 'sales', 'service', 'b2b'] as const).map((k) => (
                      <option key={k} value={k}>{t(`contact.subjects.${k}`)}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold">{t('contact.formName')}</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold">{t('contact.formPhone')}</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold">{t('contact.formMessage')}</label>
                  <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="mt-2" />
                </div>
              </div>
              <Button type="submit" className="mt-6">{t('common.cta.submit')}</Button>
              <p className="mt-3 text-xs text-muted-foreground">{t('common.labels.frontendOnly')}</p>
            </>
          )}
        </form>

        {/* ช่องทางติดต่อ */}
        <div>
          <h2 className="text-xl font-bold">{t('contact.channels.title')}</h2>
          <div className="mt-6 space-y-3">
            {channels.map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-premium">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="text-sm text-muted-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
