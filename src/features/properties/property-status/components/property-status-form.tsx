'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyStatus } from '@/generated/prisma/client';

import {
  propertyStatusSchema,
  type PropertyStatusFormData,
} from '../schemas/property-status.schema';

import {
  createPropertyStatusAction,
  updatePropertyStatusAction,
} from '../actions/property-status.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

type PropertyStatusFormProps = {
  propertyStatus?: PropertyStatus | null;
  onSuccess?: () => void;
};

export function PropertyStatusForm({
  propertyStatus,
  onSuccess,
}: PropertyStatusFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof propertyStatusSchema>,
    unknown,
    z.output<typeof propertyStatusSchema>
  >({
    resolver: zodResolver(propertyStatusSchema),

    defaultValues: {
      code: propertyStatus?.code ?? '',
      name: propertyStatus?.name ?? '',
      description: propertyStatus?.description ?? '',
    },
  });

  async function onSubmit(data: PropertyStatusFormData) {
    const result = propertyStatus
      ? await updatePropertyStatusAction(propertyStatus.id, data)
      : await createPropertyStatusAction(data);

    if (result.success) {
      toast.success(
        propertyStatus
          ? 'Property Status updated successfully'
          : 'Property Status created successfully',
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Property Status Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Provide the identifying information used to classify the status of
            properties.
          </p>
        </div>

        <div className="space-y-4">
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

          <TextAreaField
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </section>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? propertyStatus
              ? 'Updating...'
              : 'Saving...'
            : propertyStatus
              ? 'Update Property Status'
              : 'Save Property Status'}
        </Button>
      </div>
    </form>
  );
}
