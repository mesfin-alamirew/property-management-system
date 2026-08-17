'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  acquisitionMethodSchema,
  type AcquisitionMethodFormValues,
} from '../schemas/acquisition-method.schema';

import {
  createAcquisitionMethodAction,
  updateAcquisitionMethodAction,
} from '../actions/acquisition-method.actions';

import type { AcquisitionMethodListItem } from '../types/acquisition-method.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AcquisitionMethodFormProps = {
  acquisitionMethod?: AcquisitionMethodListItem | null;
  onSuccess?: () => void;
};

export function AcquisitionMethodForm({
  acquisitionMethod,
  onSuccess,
}: AcquisitionMethodFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof acquisitionMethodSchema>,
    unknown,
    z.output<typeof acquisitionMethodSchema>
  >({
    resolver: zodResolver(acquisitionMethodSchema),

    defaultValues: {
      code: acquisitionMethod?.code ?? '',
      name: acquisitionMethod?.name ?? '',
      description: acquisitionMethod?.description ?? '',
      isActive: acquisitionMethod?.isActive ?? true,
    },
  });

  async function onSubmit(data: AcquisitionMethodFormValues) {
    const result = acquisitionMethod
      ? await updateAcquisitionMethodAction(acquisitionMethod.id, data)
      : await createAcquisitionMethodAction(data);

    if (result.success) {
      toast.success(
        acquisitionMethod
          ? 'Acquisition method updated successfully'
          : 'Acquisition method created successfully',
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Identity */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Identity</h3>

        <TextField
          label="Acquisition Method Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Acquisition Method Name"
          required
          error={errors.name?.message}
          {...register('name')}
        />

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Status</h3>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            {...register('isActive')}
            className="h-4 w-4 rounded border"
          />
          Active
        </label>

        {errors.isActive?.message && (
          <p className="text-sm text-destructive">{errors.isActive.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? acquisitionMethod
            ? 'Updating...'
            : 'Saving...'
          : acquisitionMethod
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
