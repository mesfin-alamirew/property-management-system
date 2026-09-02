'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  disposalItemSchema,
  type DisposalItemFormData,
} from '../schemas/disposal-item.schema';

import {
  createDisposalItemAction,
  updateDisposalItemAction,
} from '../actions/disposal-item.actions';

import type { DisposalItemWithRelations } from '../types/disposal-item.types';

import { Button } from '@/components/ui/button';

type DisposalItemFormProps = {
  disposalItem?: DisposalItemWithRelations | null;

  disposalId: string;

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function DisposalItemForm({
  disposalItem,
  disposalId,
  assets,
  onSuccess,
}: DisposalItemFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DisposalItemFormData>({
    resolver: zodResolver(disposalItemSchema),

    defaultValues: {
      disposalId: disposalItem?.disposalId ?? disposalId,
      assetId: disposalItem?.assetId ?? '',
    },
  });

  async function onSubmit(data: DisposalItemFormData) {
    const result = disposalItem
      ? await updateDisposalItemAction(disposalItem.id, data)
      : await createDisposalItemAction(data);

    if (result.success) {
      toast.success(
        disposalItem
          ? 'Disposal item updated successfully'
          : 'Disposal item created successfully',
      );

      reset({
        disposalId,
        assetId: '',
      });

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Disposal Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Disposal Information</h3>

        <input type="hidden" {...register('disposalId')} />

        <p className="text-sm text-muted-foreground">
          Disposal:{' '}
          {disposalItem?.disposal.referenceNumber ?? 'Current disposal'}
        </p>
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? disposalItem
            ? 'Updating...'
            : 'Saving...'
          : disposalItem
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
