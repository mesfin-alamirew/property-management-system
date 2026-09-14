import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'min-h-30 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm',
        'text-foreground placeholder:text-muted-foreground',
        'transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
