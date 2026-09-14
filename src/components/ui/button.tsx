import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  asChild?: boolean;
};

export function Button({
  variant = 'primary',
  asChild = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',

    secondary:
      'border border-border bg-surface text-foreground hover:bg-surface-muted',

    danger: 'bg-danger text-white hover:bg-danger-hover',
  };

  return (
    <Component
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
