import { cn } from '../../lib/utils';

export function SectionHeading({
  title,
  subtitle,
  center,
  className,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-10', center && 'text-center', className)}>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {subtitle && <p className={cn('mt-3 text-muted-foreground', center && 'mx-auto max-w-2xl')}>{subtitle}</p>}
    </div>
  );
}
