'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  assetTypeSchema,
  type AssetTypeFormData,
} from '../schemas/asset-type.schema';

import {
  createAssetTypeAction,
  updateAssetTypeAction,
} from '../actions/asset-type.actions';

import type { AssetTypeWithRelations } from '../types/asset-type.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetTypeFormProps = {
  assetType?: AssetTypeWithRelations | null;

  assetCategories: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AssetTypeForm({
  assetType,
  assetCategories,
  onSuccess,
}: AssetTypeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetTypeSchema>,
    unknown,
    z.output<typeof assetTypeSchema>
  >({
    resolver: zodResolver(assetTypeSchema),

    defaultValues: {
      code: assetType?.code ?? '',
      name: assetType?.name ?? '',
      description: assetType?.description ?? '',
      categoryId: assetType?.categoryId ?? '',
    },
  });

  async function onSubmit(data: AssetTypeFormData) {
    const result = assetType
      ? await updateAssetTypeAction(assetType.id, data)
      : await createAssetTypeAction(data);

    if (result.success) {
      toast.success(
        assetType
          ? 'Asset type updated successfully'
          : 'Asset type created successfully',
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
          label="Asset Type Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Asset Type Name"
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

      {/* Classification */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Classification</h3>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="text-sm font-medium">
            Asset Category <span className="text-destructive">*</span>
          </label>

          <select
            id="categoryId"
            {...register('categoryId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Asset Category</option>

            {assetCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.code} - {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId?.message && (
            <p className="text-sm text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? assetType
            ? 'Updating...'
            : 'Saving...'
          : assetType
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
