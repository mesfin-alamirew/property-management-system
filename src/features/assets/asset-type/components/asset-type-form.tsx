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
import { SelectField } from '@/components/form/select-field';

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

  const categoryOptions = assetCategories.map((category) => ({
    value: category.id,
    label: `${category.code} - ${category.name}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Identity</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Define the asset type name and description.
          </p>
        </div>

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

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Classification
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Assign this asset type to an asset category.
          </p>
        </div>

        <SelectField
          label="Asset Category"
          required
          options={categoryOptions}
          error={errors.categoryId?.message}
          {...register('categoryId')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? assetType
              ? 'Updating...'
              : 'Saving...'
            : assetType
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
