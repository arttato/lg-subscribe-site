import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench, Package, ShieldCheck, Calculator, Check, CreditCard } from 'lucide-react';
import { CONTRACTS, rentBreakdown } from '../data/plans';
import { MODE_DETAILS, PAYMENT_METHODS } from '../data/contracts';
import { SectionHeading } from '../components/site/SectionHeading';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { fmtPrice } from '../lib/utils';
import { cn } from '../lib/utils';

const MODE_ICONS = { visit: Wrench, self: Package, noservice: ShieldCheck };

export default function Plans() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');
  const [price, setPrice] = useState('499');
  const [contractId, setContractId] = useState('7y');
  const startPrice = Math.max(0, Number(price.replace(/[^\d]/g, '')) || 0);
  const contract = CONTRACTS.find((c) => c.id === contractId) ?? CONTRACTS[2];
  const calc = rentBreakdown(startPrice, contract);

  return (
    <div className="container-page py-12">
      <SectionHeading center title={t('plans.title')} subtitle={t('plans.subtitle')} />

      {/* สัญญา */}
      <div className="grid gap-6 md:grid-cols-3">
        {CONTRACTS.map((c) => (
          <button
            key={c.id}
            onClick={() => setContractId(c.id)}
            className={cn(
              'cursor-pointer rounded-3xl border-2 bg-white p-7 text-left transition-all hover:-translate-y-1',
              contractId === c.id ? 'border-primary shadow-premium-lg' : 'border-border shadow-premium',
            )}
          >
            <p className="text-sm font-semibold text-muted-foreground">{t('common.labels.starting')}</p>
            <p className="mt-1 text-3xl font-extrabold">
              {c.years} <span className="text-lg font-semibold">{isEn ? 'years' : 'ปี'}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{c.months} {isEn ? 'billing cycles' : 'รอบบิล'}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.modes.map((m) => (
                <span key={m} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                  {(() => { const I = MODE_ICONS[m]; return <I className="h-3 w-3" />; })()}
                  {t(`common.contract.${m}`)}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* ตารางเปรียบเทียบสัญญา */}
      <div className="mt-14">
        <SectionHeading title={t('plans.table.title')} subtitle={t('plans.table.subtitle')} />
        <div className="overflow-x-auto rounded-3xl border border-border bg-white shadow-premium">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th className="px-5 py-4 font-bold">{t('plans.table.mode')}</th>
                <th className="px-5 py-4 font-bold">{t('plans.table.years')}</th>
                <th className="px-5 py-4 font-bold">{t('plans.table.interval')}</th>
                <th className="px-5 py-4 font-bold">{t('plans.table.includes')}</th>
                <th className="px-5 py-4 font-bold">{t('plans.table.appliesTo')}</th>
              </tr>
            </thead>
            <tbody>
              {MODE_DETAILS.map((m) => {
                const Icon = MODE_ICONS[m.id];
                return (
                  <tr key={m.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center gap-2 font-bold">
                        <Icon className="h-4 w-4 text-primary" />
                        {t(`common.contract.${m.id}`)}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span className="font-semibold">
                        {m.years.join(' / ')} {isEn ? 'years' : 'ปี'}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        ({m.billingCycles} {isEn ? 'cycles' : 'รอบบิล'})
                      </span>
                    </td>
                    <td className="px-5 py-5 text-muted-foreground">
                      {isEn ? m.serviceIntervalEn : m.serviceInterval}
                    </td>
                    <td className="px-5 py-5">
                      <ul className="space-y-1.5">
                        {(isEn ? m.includesEn : m.includes).map((inc) => (
                          <li key={inc} className="flex items-start gap-1.5">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-5 text-muted-foreground">
                      {isEn ? m.appliesToEn : m.appliesTo}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t('plans.table.noServiceNote')}</p>
      </div>

      {/* ช่องทางชำระเงิน */}
      <div className="mt-14">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{t('plans.payment.title')}</h2>
        </div>
        <p className="mt-2 text-muted-foreground">{t('plans.payment.subtitle')}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {PAYMENT_METHODS.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-white p-6 shadow-premium">
              <h3 className="font-bold">{isEn ? m.titleEn : m.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{isEn ? m.descEn : m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* เครื่องคิดเลข */}
      <div className="mt-14 rounded-3xl border border-border bg-white p-8 shadow-premium">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">{t('plans.calculator')}</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t('plans.calcNote')}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold">{t('common.labels.starting')} ({isEn ? 'THB/month' : 'บาท/เดือน'})</label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" className="mt-2" />
          </div>
          <div>
            <label className="text-sm font-semibold">{t('common.labels.all') === 'All' ? 'Contract' : 'สัญญา'}</label>
            <Input
              value={`${contract.years} ${isEn ? 'years' : 'ปี'} (${contract.months} ${isEn ? 'cycles' : 'รอบบิล'})`}
              disabled
              className="mt-2 bg-muted"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-accent p-5">
            <p className="text-xs font-semibold text-accent-foreground">{t('common.labels.starting')}</p>
            <p className="mt-1 text-2xl font-extrabold text-primary">
              {fmtPrice(startPrice)} <span className="text-sm">{t('common.labels.perMonth')}</span>
            </p>
          </div>
          <div className="rounded-2xl bg-muted p-5">
            <p className="text-xs font-semibold text-muted-foreground">Avg/month</p>
            <p className="mt-1 text-2xl font-extrabold">{fmtPrice(calc.monthlyAvg)}</p>
          </div>
          <div className="rounded-2xl bg-secondary/10 p-5">
            <p className="text-xs font-semibold text-secondary">{t('plans.totalContract')}</p>
            <p className="mt-1 text-2xl font-extrabold">{fmtPrice(calc.total)}</p>
          </div>
        </div>
        <Button className="mt-8">{t('common.cta.applyPlan')}</Button>
        <p className="mt-4 text-xs text-muted-foreground">{t('common.labels.frontendOnly')}</p>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">{t('plans.comingSoon')}</p>
    </div>
  );
}
