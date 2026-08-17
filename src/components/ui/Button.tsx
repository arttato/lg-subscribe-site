import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-dark shadow-sm',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-dark shadow-sm',
  outline: 'border border-border bg-white text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 cursor-pointer',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    />
  );
}

/** สำหรับใช้กับ <Link>/<a> ให้ได้สไตล์ปุ่มเดียวกัน */
export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra?: string): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer',
    VARIANTS[variant],
    SIZES[size],
    extra,
  );
}
