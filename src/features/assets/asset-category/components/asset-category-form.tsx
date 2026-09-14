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
import { SelectField } from '@/components/form/select-field';
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

  const parentOptions = parentCategories
    .filter((category) => category.id !== assetCategory?.id)
    .map((category) => ({
      value: category.id,
      label: `${category.code} - ${category.name}`,
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Identity</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Define the asset category name and description.
          </p>
        </div>

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

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Hierarchy</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Optionally place this category under another category.
          </p>
        </div>

        <SelectField
          label="Parent Category"
          options={[
            {
              value: '',
              label: 'None — Root Category',
            },
            ...parentOptions,
          ]}
          error={errors.parentId?.message}
          {...register('parentId')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? assetCategory
              ? 'Updating...'
              : 'Saving...'
            : assetCategory
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
