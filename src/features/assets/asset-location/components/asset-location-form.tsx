'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  assetLocationSchema,
  type AssetLocationFormData,
} from '../schemas/asset-location.schema';

import {
  createAssetLocationAction,
  updateAssetLocationAction,
} from '../actions/asset-location.actions';

import type { AssetLocationWithRelations } from '../types/asset-location.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetLocationFormProps = {
  assetLocation?: AssetLocationWithRelations | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AssetLocationForm({
  assetLocation,
  organizationUnits,
  onSuccess,
}: AssetLocationFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetLocationSchema>,
    unknown,
    z.output<typeof assetLocationSchema>
  >({
    resolver: zodResolver(assetLocationSchema),

    defaultValues: {
      code: assetLocation?.code ?? '',
      name: assetLocation?.name ?? '',
      organizationUnitId: assetLocation?.organizationUnitId ?? '',
      description: assetLocation?.description ?? '',
    },
  });

  async function onSubmit(data: AssetLocationFormData) {
    const result = assetLocation
      ? await updateAssetLocationAction(assetLocation.id, data)
      : await createAssetLocationAction(data);

    if (result.success) {
      toast.success(
        assetLocation
          ? 'Asset location updated successfully'
          : 'Asset location created successfully',
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
          label="Asset Location Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Asset Location Name"
          required
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="space-y-2">
          <label htmlFor="organizationUnitId" className="text-sm font-medium">
            Organization Unit <span className="text-red-500">*</span>
          </label>

          <select
            id="organizationUnitId"
            {...register('organizationUnitId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select organization unit</option>

            {organizationUnits.map((organizationUnit) => (
              <option key={organizationUnit.id} value={organizationUnit.id}>
                {organizationUnit.code} - {organizationUnit.name}
              </option>
            ))}
          </select>

          {errors.organizationUnitId?.message && (
            <p className="text-sm text-red-500">
              {errors.organizationUnitId.message}
            </p>
          )}
        </div>

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? assetLocation
            ? 'Updating...'
            : 'Saving...'
          : assetLocation
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
