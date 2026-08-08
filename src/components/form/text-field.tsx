import * as React from 'react';

import { Input } from '@/components/ui/input';

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
    <div className="space-y-1">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

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
