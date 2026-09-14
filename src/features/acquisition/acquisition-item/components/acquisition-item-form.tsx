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
import { SelectField } from '@/components/form/select-field';
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
      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Acquisition Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Select the acquisition that this asset belongs to.
          </p>
        </div>

        <SelectField
          label="Acquisition"
          required
          options={acquisitions.map((acquisition) => ({
            value: acquisition.id,
            label: acquisition.acquisitionNumber,
          }))}
          placeholder="Select acquisition"
          error={errors.acquisitionId?.message}
          {...register('acquisitionId')}
        />
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Asset Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Select the asset being recorded under this acquisition.
          </p>
        </div>

        <SelectField
          label="Asset"
          required
          options={assets.map((asset) => ({
            value: asset.id,
            label: `${asset.assetCode} - ${asset.name}`,
          }))}
          placeholder="Select asset"
          error={errors.assetId?.message}
          {...register('assetId')}
        />
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <div className="mb-5 space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Cost Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Record the applicable unit and total costs for this acquisition
            item.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? acquisitionItem
              ? 'Updating Acquisition Item...'
              : 'Saving Acquisition Item...'
            : acquisitionItem
              ? 'Update Acquisition Item'
              : 'Save Acquisition Item'}
        </Button>
      </div>
    </form>
  );
}
