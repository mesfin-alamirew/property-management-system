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
import { SelectField } from '@/components/form/select-field';
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

  const assetOptions = assets.map((asset) => ({
    value: asset.id,
    label: `${asset.assetCode}${
      asset.assetTag ? ` - ${asset.assetTag}` : ''
    } - ${asset.name}`,
  }));

  const locationOptions = locations.map((location) => ({
    value: location.id,
    label: `${location.code} - ${location.name}`,
  }));

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
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Movement</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Select the asset and destination location for this movement.
          </p>
        </div>

        <SelectField
          label="Asset"
          required
          options={assetOptions}
          placeholder="Select asset"
          error={errors.assetId?.message}
          {...register('assetId')}
        />

        <SelectField
          label="Destination Location"
          required
          options={locationOptions}
          placeholder="Select destination location"
          error={errors.toLocationId?.message}
          {...register('toLocationId')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Details</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Provide the reason for the movement and any additional notes.
          </p>
        </div>

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

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Moving...' : 'Move Asset'}
        </Button>
      </div>
    </form>
  );
}
