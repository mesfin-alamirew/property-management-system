'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { assetSchema, type AssetFormData } from '../schemas/asset.schema';

import { createAssetAction, updateAssetAction } from '../actions/asset.actions';

import type { AssetWithRelations } from '../types/asset.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetFormProps = {
  asset?: AssetWithRelations | null;

  assetTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  assetStatuses: {
    id: string;
    code: string;
    name: string;
  }[];

  assetConditions: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AssetForm({
  asset,
  assetTypes,
  assetStatuses,
  assetConditions,
  onSuccess,
}: AssetFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetSchema>,
    unknown,
    z.output<typeof assetSchema>
  >({
    resolver: zodResolver(assetSchema),

    defaultValues: {
      assetTag: asset?.assetTag ?? '',
      name: asset?.name ?? '',
      description: asset?.description ?? '',
      manufacturer: asset?.manufacturer ?? '',
      model: asset?.model ?? '',
      serialNumber: asset?.serialNumber ?? '',
      assetTypeId: asset?.assetTypeId ?? '',
      statusId: asset?.statusId ?? '',
      conditionId: asset?.conditionId ?? '',
    },
  });

  async function onSubmit(data: AssetFormData) {
    const result = asset
      ? await updateAssetAction(asset.id, data)
      : await createAssetAction(data);

    if (result.success) {
      toast.success(
        asset
          ? `Asset ${result.data.assetCode} updated successfully`
          : `Asset ${result.data.assetCode} created successfully`,
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
          label="Asset Tag"
          error={errors.assetTag?.message}
          {...register('assetTag')}
        />

        <TextField
          label="Asset Name"
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

      {/* Manufacturer Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Manufacturer Information</h3>

        <TextField
          label="Manufacturer"
          error={errors.manufacturer?.message}
          {...register('manufacturer')}
        />

        <TextField
          label="Model"
          error={errors.model?.message}
          {...register('model')}
        />

        <TextField
          label="Serial Number"
          error={errors.serialNumber?.message}
          {...register('serialNumber')}
        />
      </div>

      {/* Classification */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Classification</h3>

        <div className="space-y-2">
          <label htmlFor="assetTypeId" className="text-sm font-medium">
            Asset Type
          </label>

          <select
            id="assetTypeId"
            {...register('assetTypeId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Asset Type</option>

            {assetTypes.map((assetType) => (
              <option key={assetType.id} value={assetType.id}>
                {assetType.code} - {assetType.name}
              </option>
            ))}
          </select>

          {errors.assetTypeId?.message && (
            <p className="text-sm text-destructive">
              {errors.assetTypeId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="statusId" className="text-sm font-medium">
            Asset Status
          </label>

          <select
            id="statusId"
            {...register('statusId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Asset Status</option>

            {assetStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.code} - {status.name}
              </option>
            ))}
          </select>

          {errors.statusId?.message && (
            <p className="text-sm text-destructive">
              {errors.statusId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="conditionId" className="text-sm font-medium">
            Asset Condition
          </label>

          <select
            id="conditionId"
            {...register('conditionId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Asset Condition</option>

            {assetConditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.code} - {condition.name}
              </option>
            ))}
          </select>

          {errors.conditionId?.message && (
            <p className="text-sm text-destructive">
              {errors.conditionId.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? asset
            ? 'Updating...'
            : 'Saving...'
          : asset
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
