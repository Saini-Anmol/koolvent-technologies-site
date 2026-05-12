import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'outline-dark';
type Size = 'md' | 'lg';

interface ButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';

const sizes: Record<Size, string> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  secondary: 'bg-slate-900 text-white hover:bg-slate-800',
  ghost: 'text-brand-700 hover:bg-brand-50',
  white: 'bg-white text-slate-900 shadow-sm hover:bg-slate-100',
  'outline-dark': 'border border-white/25 text-white hover:bg-white/10',
};

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonProps) {
  return (
    <a href={href} className={cn(base, sizes[size], variants[variant], className)}>
      {children}
    </a>
  );
}
