'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import type { WoredaWithZone } from '../types/woreda.types';

import { woredaSchema, type WoredaFormData } from '../schemas/woreda.schema';

import {
  createWoredaAction,
  updateWoredaAction,
} from '../actions/woreda.actions';

import type { LookupOption } from '@/types/lookup-option';

import { Button } from '@/components/ui/button';

import { TextField } from '@/components/form/text-field';

import { SelectField } from '@/components/form/select-field';

type WoredaFormProps = {
  woreda?: WoredaWithZone | null;

  zones: LookupOption[];

  onSuccess?: () => void;
};

export function WoredaForm({ woreda, zones, onSuccess }: WoredaFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WoredaFormData>({
    resolver: zodResolver(woredaSchema),

    defaultValues: {
      zoneId: woreda?.zoneId ?? '',
      code: woreda?.code ?? '',
      name: woreda?.name ?? '',
    },
  });

  async function onSubmit(data: WoredaFormData) {
    const result = woreda
      ? await updateWoredaAction(woreda.id, data)
      : await createWoredaAction(data);

    if (result.success) {
      toast.success(
        woreda ? 'Woreda updated successfully' : 'Woreda created successfully',
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
        label="Zone"
        required
        options={zones}
        error={errors.zoneId?.message}
        {...register('zoneId')}
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
          ? woreda
            ? 'Updating...'
            : 'Saving...'
          : woreda
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
