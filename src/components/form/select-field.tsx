import * as React from 'react';

import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import type { LookupOption } from '@/types/lookup-option';

import { FormError } from './form-error';

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: LookupOption[];
  placeholder?: string;
  error?: string;
};

export function SelectField({
  label,
  options,
  placeholder = 'Select...',
  error,
  className,
  id,
  required,
  ...props
}: SelectFieldProps) {
  const generatedId = React.useId();

  const selectId = id ?? generatedId;

  return (
    <div className="space-y-1">
      <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
        {label}

        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <Select
        id={selectId}
        required={required}
        className={cn(className)}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <FormError message={error} />
    </div>
  );
}
