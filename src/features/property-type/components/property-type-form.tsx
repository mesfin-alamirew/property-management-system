'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import type { PropertyType } from '@/generated/prisma/client';

import {
  propertyTypeSchema,
  type PropertyTypeFormData,
} from '../schemas/property-type.schema';

import {
  createPropertyTypeAction,
  updatePropertyTypeAction,
} from '../actions/property-type.actions';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type PropertyTypeFormProps = {
  propertyType?: PropertyType | null;
  onSuccess?: () => void;
};

export function PropertyTypeForm({
  propertyType,
  onSuccess,
}: PropertyTypeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyTypeFormData>({
    resolver: zodResolver(propertyTypeSchema),

    defaultValues: {
      code: propertyType?.code ?? '',
      name: propertyType?.name ?? '',
      description: propertyType?.description ?? '',
    },
  });

  const router = useRouter();

  async function onSubmit(data: PropertyTypeFormData) {
    const result = propertyType
      ? await updatePropertyTypeAction(propertyType.id, data)
      : await createPropertyTypeAction(data);

    if (result.success) {
      toast.success(
        propertyType
          ? 'Property Type updated successfully'
          : 'Property Type created successfully',
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

      <TextAreaField
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? propertyType
            ? 'Updating...'
            : 'Saving...'
          : propertyType
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
