import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2, XCircle, Wrench, CalendarCheck, ShieldCheck, MapPin, Phone, CalendarPlus,
} from 'lucide-react';
import { SERVICE_AREAS } from '../data/service-areas';
import { SectionHeading } from '../components/site/SectionHeading';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const TIME_SLOTS = ['09:00–12:00', '12:00–15:00', '15:00–18:00'];
const PRODUCT_TYPES = ['เครื่องกรองน้ำ', 'เครื่องฟอกอากาศ', 'เครื่องปรับอากาศ', 'เครื่องซักผ้า/อบผ้า', 'ตู้เย็น', 'โทรทัศน์', 'อื่นๆ'];

export default function Services() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [result, setResult] = useState<null | boolean>(null);

  const [booked, setBooked] = useState(false);

  const districts = SERVICE_AREAS.find((p) => p.name === province)?.districts ?? [];

  const check = () => {
    const p = SERVICE_AREAS.find((x) => x.name === province);
    setResult(Boolean(p && p.districts.some((d) => d.name === district)));
  };

  const cards = [
    { icon: CalendarCheck, title: t('services.install.title'), desc: t('services.install.desc') },
    { icon: Wrench, title: t('services.care.title'), desc: t('services.care.desc') },
    { icon: ShieldCheck, title: t('services.warranty.title'), desc: t('services.warranty.desc') },
  ];

  const careRows = [1, 2, 3];

  return (
    <div className="container-page py-12">
      <SectionHeading center title={t('services.title')} subtitle={t('services.subtitle')} />

      {/* การ์ดบริการหลัก */}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-3xl border border-border bg-white p-7 shadow-premium">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <c.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* ฟอร์มนัดติดตั้ง */}
      <div className="mt-10 rounded-3xl border border-border bg-white p-8 shadow-premium">
        <div className="flex items-center gap-2">
          <CalendarPlus className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">{t('services.booking.title')}</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t('services.booking.desc')}</p>

        {booked ? (
          <div className="mt-8 rounded-2xl bg-secondary/10 p-6 text-secondary">
            <CheckCircle2 className="h-8 w-8" />
            <p className="mt-2 font-semibold">{t('services.booking.success')}</p>
          </div>
        ) : (
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setBooked(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">{t('services.booking.name')}</label>
                <Input required className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-semibold">{t('services.booking.phone')}</label>
                <Input required inputMode="tel" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-semibold">{t('services.booking.province')}</label>
                <Select required className="mt-2" defaultValue="">
                  <option value="" disabled>{isEn ? 'Province…' : 'จังหวัด…'}</option>
                  {SERVICE_AREAS.map((p) => (
                    <option key={p.name} value={p.name}>{isEn ? p.nameEn : p.name}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold">{t('services.booking.district')}</label>
                <Select required className="mt-2" defaultValue="">
                  <option value="" disabled>{isEn ? 'District…' : 'อำเภอ/เขต…'}</option>
                  {SERVICE_AREAS.flatMap((p) => p.districts).map((d) => (
                    <option key={d.name} value={d.name}>{isEn ? d.nameEn : d.name}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold">{t('services.booking.address')}</label>
              <Input required className="mt-2" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-semibold">{t('services.booking.date')}</label>
                <Input required type="date" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-semibold">{t('services.booking.time')}</label>
                <Select required className="mt-2" defaultValue="">
                  <option value="" disabled>{isEn ? 'Time…' : 'ช่วงเวลา…'}</option>
                  {TIME_SLOTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold">{t('services.booking.product')}</label>
                <Select required className="mt-2" defaultValue="">
                  <option value="" disabled>{isEn ? 'Product…' : 'ประเภทสินค้า…'}</option>
                  {PRODUCT_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold">{t('services.booking.note')}</label>
              <Textarea rows={2} className="mt-2" />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">{t('services.booking.submit')}</Button>
              <span className="text-xs text-muted-foreground">{t('common.labels.frontendOnly')}</span>
            </div>
          </form>
        )}
      </div>

      {/* กำหนดการดูแลรักษา */}
      <div className="mt-10 rounded-3xl border border-border bg-white p-8 shadow-premium">
        <h2 className="text-xl font-bold">{t('services.careSchedule.title')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t('services.careSchedule.desc')}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-3 pr-4 font-semibold">{t('common.labels.all') === 'All' ? 'Product' : 'สินค้า'}</th>
                <th className="py-3 pr-4 font-semibold">{t('services.careSchedule.visitTitle')}</th>
                <th className="py-3 font-semibold">{t('services.careSchedule.selfTitle')}</th>
              </tr>
            </thead>
            <tbody>
              {careRows.map((i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3.5 pr-4 font-semibold">{t(`services.careSchedule.row${i}`)}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{t(`services.careSchedule.visitRow${i}`)}</td>
                  <td className="py-3.5 text-muted-foreground">{t(`services.careSchedule.selfRow${i}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ตรวจพื้นที่ */}
      <div className="mt-10 rounded-3xl border border-border bg-white p-8 shadow-premium">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">{t('services.area.title')}</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{t('services.area.desc')}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Select value={province} onChange={(e) => { setProvince(e.target.value); setDistrict(''); setResult(null); }}>
            <option value="">{isEn ? 'Province…' : 'จังหวัด…'}</option>
            {SERVICE_AREAS.map((p) => (
              <option key={p.name} value={p.name}>{isEn ? p.nameEn : p.name}</option>
            ))}
          </Select>
          <Select value={district} onChange={(e) => { setDistrict(e.target.value); setResult(null); }} disabled={!province}>
            <option value="">{isEn ? 'District…' : 'อำเภอ/เขต…'}</option>
            {districts.map((d) => (
              <option key={d.name} value={d.name}>{isEn ? d.nameEn : d.name}</option>
            ))}
          </Select>
          <Button onClick={check} disabled={!province || !district}>
            {t('common.cta.checkArea')}
          </Button>
        </div>
        {result !== null && (
          <p className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${result ? 'bg-secondary/10 text-secondary' : 'bg-accent text-accent-foreground'}`}>
            {result ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {result ? t('services.areaResultYes') : t('services.areaResultNo')}
          </p>
        )}
      </div>

      {/* แจ้งซ่อม */}
      <div className="mt-10 rounded-3xl bg-foreground p-8 text-white shadow-premium">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-lg font-bold">{t('services.repair.title')}</h2>
              <p className="mt-0.5 text-sm text-white/70">{t('services.repair.desc')}</p>
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold">{t('services.repair.call')}</span>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground">{t('services.comingSoon')}</p>
    </div>
  );
}
