import { cn } from '../../lib/utils';

type Tone = 'primary' | 'secondary' | 'neutral' | 'outline';

const TONES: Record<Tone, string> = {
  primary: 'bg-accent text-accent-foreground',
  secondary: 'bg-secondary/10 text-secondary',
  neutral: 'bg-muted text-muted-foreground',
  outline: 'border border-border text-muted-foreground',
};

export function Badge({
  tone = 'primary',
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold', TONES[tone], className)}
      {...rest}
    />
  );
}
