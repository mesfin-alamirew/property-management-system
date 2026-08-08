'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyTenure } from '@/generated/prisma/client';

import {
  propertyTenureSchema,
  type PropertyTenureFormData,
} from '../schemas/property-tenure.schema';

import {
  createPropertyTenureAction,
  updatePropertyTenureAction,
} from '../actions/property-tenure.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type PropertyTenureFormProps = {
  propertyTenure?: PropertyTenure | null;
  onSuccess?: () => void;
};

export function PropertyTenureForm({
  propertyTenure,
  onSuccess,
}: PropertyTenureFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertyTenureSchema),

    defaultValues: {
      code: propertyTenure?.code ?? '',
      name: propertyTenure?.name ?? '',
      description: propertyTenure?.description ?? '',
    },
  });

  async function onSubmit(data: PropertyTenureFormData) {
    const result = propertyTenure
      ? await updatePropertyTenureAction(propertyTenure.id, data)
      : await createPropertyTenureAction(data);

    if (result.success) {
      toast.success(
        propertyTenure
          ? 'Property Tenure updated successfully'
          : 'Property Tenure created successfully',
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
          ? propertyTenure
            ? 'Updating...'
            : 'Saving...'
          : propertyTenure
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
