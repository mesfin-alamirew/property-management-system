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
import { SelectField } from '@/components/form/select-field';
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

  const organizationUnitOptions = organizationUnits.map((organizationUnit) => ({
    value: organizationUnit.id,
    label: `${organizationUnit.code} - ${organizationUnit.name}`,
  }));

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
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Identity</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Define the asset location and the organization unit responsible for
            it.
          </p>
        </div>

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

        <SelectField
          label="Organization Unit"
          required
          options={organizationUnitOptions}
          placeholder="Select organization unit"
          error={errors.organizationUnitId?.message}
          {...register('organizationUnitId')}
        />

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? assetLocation
              ? 'Updating...'
              : 'Saving...'
            : assetLocation
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
