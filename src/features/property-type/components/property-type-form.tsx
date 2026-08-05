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
    formState: { errors },
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
      <div>
        <label>Code</label>

        <input {...register('code')} className="border p-2" />

        <p className="text-red-500">{errors.code?.message}</p>
      </div>

      <div>
        <label>Name</label>

        <input {...register('name')} className="border p-2" />

        <p className="text-red-500">{errors.name?.message}</p>
      </div>

      <div>
        <label>Description</label>

        <textarea {...register('description')} className="border p-2" />
      </div>

      <Button type="submit">{propertyType ? 'Update' : 'Save'}</Button>
    </form>
  );
}
