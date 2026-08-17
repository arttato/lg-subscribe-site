import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export function TestimonialSection() {
  const { t } = useTranslation();
  const items = t('home.testimonials.items', { returnObjects: true }) as {
    name: string;
    role: string;
    text: string;
  }[];

  return (
    <section className="section container-page">
      <SectionHeading center title={t('home.testimonials.title')} subtitle={t('home.testimonials.subtitle')} />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <figure key={it.name} className="rounded-3xl border border-border bg-white p-7 shadow-premium">
            <Quote className="h-7 w-7 text-primary/30" />
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">“{it.text}”</blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <p className="text-sm font-bold">{it.name}</p>
              <p className="text-xs text-muted-foreground">{it.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
