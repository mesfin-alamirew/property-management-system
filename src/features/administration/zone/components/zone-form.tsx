'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import type { ZoneWithRegion } from '../types/zone.types';

import { zoneSchema, type ZoneFormData } from '../schemas/zone.schema';

import { createZoneAction, updateZoneAction } from '../actions/zone.actions';

import type { LookupOption } from '@/types/lookup-option';

import { Button } from '@/components/ui/button';

import { TextField } from '@/components/form/text-field';

import { SelectField } from '@/components/form/select-field';

type ZoneFormProps = {
  zone?: ZoneWithRegion | null;

  regions: LookupOption[];

  onSuccess?: () => void;
};

export function ZoneForm({ zone, regions, onSuccess }: ZoneFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ZoneFormData>({
    resolver: zodResolver(zoneSchema),

    defaultValues: {
      regionId: zone?.regionId ?? '',
      code: zone?.code ?? '',
      name: zone?.name ?? '',
    },
  });

  async function onSubmit(data: ZoneFormData) {
    const result = zone
      ? await updateZoneAction(zone.id, data)
      : await createZoneAction(data);

    if (result.success) {
      toast.success(
        zone ? 'Zone updated successfully' : 'Zone created successfully',
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
        label="Region"
        required
        options={regions}
        error={errors.regionId?.message}
        {...register('regionId')}
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
          ? zone
            ? 'Updating...'
            : 'Saving...'
          : zone
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
