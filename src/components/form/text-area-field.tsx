import * as React from 'react';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import { FormError } from './form-error';

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextAreaField({
  label,
  error,
  className,
  id,
  required,
  ...props
}: TextAreaFieldProps) {
  const generatedId = React.useId();

  const textAreaId = id ?? generatedId;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={textAreaId}>
        {label}

        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </Label>

      <Textarea
        id={textAreaId}
        required={required}
        className={cn(className)}
        {...props}
      />

      <FormError message={error} />
    </div>
  );
}
