import * as React from 'react';

import { cn } from '@/lib/utils';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
