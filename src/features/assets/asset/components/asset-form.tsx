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
import { SelectField } from '@/components/form/select-field';
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

  const assetTypeOptions = assetTypes.map((assetType) => ({
    value: assetType.id,
    label: `${assetType.code} - ${assetType.name}`,
  }));

  const assetStatusOptions = assetStatuses.map((status) => ({
    value: status.id,
    label: `${status.code} - ${status.name}`,
  }));

  const assetConditionOptions = assetConditions.map((condition) => ({
    value: condition.id,
    label: `${condition.code} - ${condition.name}`,
  }));

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
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Identity</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Define the asset name, tag, and general description.
          </p>
        </div>

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

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Manufacturer Information
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Record manufacturer and identifying information when available.
          </p>
        </div>

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

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Classification
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Assign the asset type, status, and current condition.
          </p>
        </div>

        <SelectField
          label="Asset Type"
          options={assetTypeOptions}
          placeholder="Select asset type"
          error={errors.assetTypeId?.message}
          {...register('assetTypeId')}
        />

        <SelectField
          label="Asset Status"
          options={assetStatusOptions}
          placeholder="Select asset status"
          error={errors.statusId?.message}
          {...register('statusId')}
        />

        <SelectField
          label="Asset Condition"
          options={assetConditionOptions}
          placeholder="Select asset condition"
          error={errors.conditionId?.message}
          {...register('conditionId')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? asset
              ? 'Updating...'
              : 'Saving...'
            : asset
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
