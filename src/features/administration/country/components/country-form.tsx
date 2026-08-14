'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import type { Country } from '@/generated/prisma/client';

import { countrySchema, type CountryFormData } from '../schemas/country.schema';

import {
  createCountryAction,
  updateCountryAction,
} from '../actions/country.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';

type CountryFormProps = {
  country?: Country | null;

  onSuccess?: () => void;
};

export function CountryForm({ country, onSuccess }: CountryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),

    defaultValues: {
      code: country?.code ?? '',
      name: country?.name ?? '',
    },
  });

  async function onSubmit(data: CountryFormData) {
    const result = country
      ? await updateCountryAction(country.id, data)
      : await createCountryAction(data);

    if (result.success) {
      toast.success(
        country
          ? 'Country updated successfully'
          : 'Country created successfully',
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        label="Code"
        required
        error={errors.code?.message}
        {...register('code')}
      />

      <TextField
        label="Name"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? country
            ? 'Updating...'
            : 'Saving...'
          : country
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
