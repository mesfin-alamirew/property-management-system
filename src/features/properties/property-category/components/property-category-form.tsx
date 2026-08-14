'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyCategory } from '@/generated/prisma/client';

import {
  propertyCategorySchema,
  type PropertyCategoryFormData,
} from '../schemas/property-category.schema';

import {
  createPropertyCategoryAction,
  updatePropertyCategoryAction,
} from '../actions/property-category.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type PropertyCategoryFormProps = {
  propertyCategory?: PropertyCategory | null;
  parentCategories: PropertyCategory[];
  onSuccess?: () => void;
};

export function PropertyCategoryForm({
  propertyCategory,
  parentCategories,
  onSuccess,
}: PropertyCategoryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertyCategorySchema),

    defaultValues: {
      code: propertyCategory?.code ?? '',
      name: propertyCategory?.name ?? '',
      description: propertyCategory?.description ?? '',
      parentId: propertyCategory?.parentId ?? '',
    },
  });

  async function onSubmit(data: PropertyCategoryFormData) {
    const result = propertyCategory
      ? await updatePropertyCategoryAction(propertyCategory.id, data)
      : await createPropertyCategoryAction(data);

    if (result.success) {
      toast.success(
        propertyCategory
          ? 'Property Category updated successfully'
          : 'Property Category created successfully',
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

      <div className="space-y-2">
        <label htmlFor="parentId" className="text-sm font-medium">
          Parent Category
        </label>

        <select
          id="parentId"
          {...register('parentId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">None (Root Category)</option>

          {parentCategories
            .filter((category) => category.id !== propertyCategory?.id)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        {errors.parentId?.message && (
          <p className="text-sm text-destructive">{errors.parentId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? propertyCategory
            ? 'Updating...'
            : 'Saving...'
          : propertyCategory
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
