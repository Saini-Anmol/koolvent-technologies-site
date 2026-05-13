import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant =
  | 'primary'
  | 'gradient'
  | 'secondary'
  | 'ghost'
  | 'white'
  | 'outline-dark';
type Size = 'md' | 'lg';

interface ButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/25',
  gradient:
    'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-sm shadow-brand-600/20 hover:from-brand-700 hover:to-brand-600 hover:shadow-md',
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
