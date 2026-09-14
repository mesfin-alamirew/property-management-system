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
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

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
      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Method Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Define the code, name, and description used to identify this
            acquisition method.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">Status</h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Inactive methods remain in the system but are no longer available
            for active acquisition use.
          </p>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-foreground">
          <input
            type="checkbox"
            {...register('isActive')}
            className="h-4 w-4 rounded border-border"
          />

          <span>Active</span>
        </label>

        {errors.isActive?.message && (
          <p className="mt-2 text-sm text-danger">{errors.isActive.message}</p>
        )}
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? acquisitionMethod
              ? 'Updating Acquisition Method...'
              : 'Saving Acquisition Method...'
            : acquisitionMethod
              ? 'Update Acquisition Method'
              : 'Save Acquisition Method'}
        </Button>
      </div>
    </form>
  );
}
