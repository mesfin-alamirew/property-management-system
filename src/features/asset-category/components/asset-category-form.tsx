'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  assetCategorySchema,
  type AssetCategoryFormData,
} from '../schemas/asset-category.schema';

import {
  createAssetCategoryAction,
  updateAssetCategoryAction,
} from '../actions/asset-category.actions';

import type { AssetCategoryWithRelations } from '../types/asset-category.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetCategoryFormProps = {
  assetCategory?: AssetCategoryWithRelations | null;

  parentCategories: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AssetCategoryForm({
  assetCategory,
  parentCategories,
  onSuccess,
}: AssetCategoryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetCategorySchema>,
    unknown,
    z.output<typeof assetCategorySchema>
  >({
    resolver: zodResolver(assetCategorySchema),

    defaultValues: {
      code: assetCategory?.code ?? '',
      name: assetCategory?.name ?? '',
      description: assetCategory?.description ?? '',
      parentId: assetCategory?.parentId ?? '',
    },
  });

  async function onSubmit(data: AssetCategoryFormData) {
    const result = assetCategory
      ? await updateAssetCategoryAction(assetCategory.id, data)
      : await createAssetCategoryAction(data);

    if (result.success) {
      toast.success(
        assetCategory
          ? 'Asset category updated successfully'
          : 'Asset category created successfully',
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
          label="Asset Category Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Asset Category Name"
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

      {/* Hierarchy */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Hierarchy</h3>

        <div className="space-y-2">
          <label htmlFor="parentId" className="text-sm font-medium">
            Parent Category
          </label>

          <select
            id="parentId"
            {...register('parentId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">None — Root Category</option>

            {parentCategories
              .filter((category) => category.id !== assetCategory?.id)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.code} - {category.name}
                </option>
              ))}
          </select>

          {errors.parentId?.message && (
            <p className="text-sm text-destructive">
              {errors.parentId.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? assetCategory
            ? 'Updating...'
            : 'Saving...'
          : assetCategory
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
