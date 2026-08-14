'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import type { Region } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';

import { TextField } from '@/components/form/text-field';

import { SelectField } from '@/components/form/select-field';

import type { LookupOption } from '@/types/lookup-option';

import { regionSchema, type RegionFormData } from '../schemas/region.schema';

import {
  createRegionAction,
  updateRegionAction,
} from '../actions/region.actions';

type RegionFormProps = {
  region?: Region | null;
  countries: LookupOption[];
  onSuccess?: () => void;
};

export function RegionForm({ region, countries, onSuccess }: RegionFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegionFormData>({
    resolver: zodResolver(regionSchema),

    defaultValues: {
      countryId: region?.countryId ?? '',
      code: region?.code ?? '',
      name: region?.name ?? '',
    },
  });

  async function onSubmit(data: RegionFormData) {
    const result = region
      ? await updateRegionAction(region.id, data)
      : await createRegionAction(data);

    if (result.success) {
      toast.success(
        region ? 'Region updated successfully' : 'Region created successfully',
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
      <SelectField
        label="Country"
        required
        options={countries}
        error={errors.countryId?.message}
        {...register('countryId')}
      />

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
          ? region
            ? 'Updating...'
            : 'Saving...'
          : region
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
