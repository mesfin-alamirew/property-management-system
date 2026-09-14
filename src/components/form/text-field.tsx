import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { FormError } from './form-error';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({
  label,
  error,
  className,
  id,
  required,
  ...props
}: TextFieldProps) {
  const generatedId = React.useId();

  const inputId = id ?? generatedId;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId}>
        {label}

        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </Label>

      <Input
        id={inputId}
        required={required}
        className={cn(className)}
        {...props}
      />

      <FormError message={error} />
    </div>
  );
}
