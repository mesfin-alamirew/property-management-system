'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  acquisitionItemSchema,
  type AcquisitionItemFormData,
} from '../schemas/acquisition-item.schema';

import {
  createAcquisitionItemAction,
  updateAcquisitionItemAction,
} from '../actions/acquisition-item.actions';

import type { AcquisitionItemWithRelations } from '../types/acquisition-item.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';

type AcquisitionItemFormProps = {
  acquisitionItem?: AcquisitionItemWithRelations | null;

  acquisitions: {
    id: string;
    acquisitionNumber: string;
  }[];

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AcquisitionItemForm({
  acquisitionItem,
  acquisitions,
  assets,
  onSuccess,
}: AcquisitionItemFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof acquisitionItemSchema>,
    unknown,
    z.output<typeof acquisitionItemSchema>
  >({
    resolver: zodResolver(acquisitionItemSchema),

    defaultValues: {
      acquisitionId: acquisitionItem?.acquisitionId ?? '',
      assetId: acquisitionItem?.assetId ?? '',
      unitCost: acquisitionItem?.unitCost?.toString() ?? '',
      totalCost: acquisitionItem?.totalCost?.toString() ?? '',
    },
  });

  async function onSubmit(data: AcquisitionItemFormData) {
    const result = acquisitionItem
      ? await updateAcquisitionItemAction(acquisitionItem.id, data)
      : await createAcquisitionItemAction(data);

    if (result.success) {
      toast.success(
        acquisitionItem
          ? 'Acquisition item updated successfully'
          : 'Acquisition item created successfully',
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
      {/* Acquisition Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Acquisition Information</h3>

        <div className="space-y-2">
          <label htmlFor="acquisitionId" className="text-sm font-medium">
            Acquisition
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="acquisitionId"
            {...register('acquisitionId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Acquisition</option>

            {acquisitions.map((acquisition) => (
              <option key={acquisition.id} value={acquisition.id}>
                {acquisition.acquisitionNumber}
              </option>
            ))}
          </select>

          {errors.acquisitionId?.message && (
            <p className="text-sm text-destructive">
              {errors.acquisitionId.message}
            </p>
          )}
        </div>
      </div>

      {/* Asset Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Asset Information</h3>

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
                {asset.assetCode} - {asset.name}
              </option>
            ))}
          </select>

          {errors.assetId?.message && (
            <p className="text-sm text-destructive">{errors.assetId.message}</p>
          )}
        </div>
      </div>

      {/* Cost Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Cost Information</h3>

        <TextField
          label="Unit Cost"
          type="number"
          step="0.01"
          error={errors.unitCost?.message}
          {...register('unitCost')}
        />

        <TextField
          label="Total Cost"
          type="number"
          step="0.01"
          error={errors.totalCost?.message}
          {...register('totalCost')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? acquisitionItem
            ? 'Updating...'
            : 'Saving...'
          : acquisitionItem
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
