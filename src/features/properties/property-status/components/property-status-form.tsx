'use client';

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
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

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
  } = useForm({
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
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? propertyStatus
            ? 'Updating...'
            : 'Saving...'
          : propertyStatus
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
