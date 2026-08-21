'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  assetMovementSchema,
  type AssetMovementFormData,
} from '../schemas/asset-movement.schema';

import { createAssetMovementAction } from '../actions/asset-movement.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetMovementFormProps = {
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];

  locations: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AssetMovementForm({
  assets,
  locations,
  onSuccess,
}: AssetMovementFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetMovementSchema>,
    unknown,
    z.output<typeof assetMovementSchema>
  >({
    resolver: zodResolver(assetMovementSchema),

    defaultValues: {
      assetId: '',
      toLocationId: '',
      reason: '',
      notes: '',
    },
  });

  async function onSubmit(data: AssetMovementFormData) {
    const result = await createAssetMovementAction(data);

    if (result.success) {
      toast.success('Asset moved successfully');

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Movement */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Movement</h3>

        <div className="space-y-2">
          <label htmlFor="assetId" className="text-sm font-medium">
            Asset
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="assetId"
            {...register('assetId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Asset</option>

            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.assetCode}
                {asset.assetTag ? ` - ${asset.assetTag}` : ''} - {asset.name}
              </option>
            ))}
          </select>

          {errors.assetId?.message && (
            <p className="text-sm text-destructive">{errors.assetId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="toLocationId" className="text-sm font-medium">
            Destination Location
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="toLocationId"
            {...register('toLocationId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Destination Location</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.code} - {location.name}
              </option>
            ))}
          </select>

          {errors.toLocationId?.message && (
            <p className="text-sm text-destructive">
              {errors.toLocationId.message}
            </p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Details</h3>

        <TextAreaField
          label="Reason"
          required
          error={errors.reason?.message}
          {...register('reason')}
        />

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Moving...' : 'Move Asset'}
      </Button>
    </form>
  );
}
