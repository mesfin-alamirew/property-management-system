'use client';

import { z } from 'zod';
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
import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

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
  } = useForm<
    z.input<typeof propertyCategorySchema>,
    unknown,
    z.output<typeof propertyCategorySchema>
  >({
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

  const availableParentCategories = parentCategories.filter(
    (category) => category.id !== propertyCategory?.id,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Category Information */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Category Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Provide the identifying information used to classify properties.
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

      {/* Hierarchy */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Category Hierarchy
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Optionally assign this category to a parent category. Leave it
            unselected to create a root category.
          </p>
        </div>

        <SelectField
          label="Parent Category"
          options={availableParentCategories.map((category) => ({
            value: category.id,
            label: `${category.code} - ${category.name}`,
          }))}
          placeholder="None (Root Category)"
          error={errors.parentId?.message}
          {...register('parentId')}
        />
      </section>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? propertyCategory
              ? 'Updating...'
              : 'Saving...'
            : propertyCategory
              ? 'Update Property Category'
              : 'Save Property Category'}
        </Button>
      </div>
    </form>
  );
}
