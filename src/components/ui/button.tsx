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
    primary: 'bg-blue-600 text-white hover:bg-blue-700',

    secondary:
      'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100',

    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <Component
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
