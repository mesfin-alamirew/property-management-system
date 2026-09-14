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
import { SelectField } from '@/components/form/select-field';

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

  const assetOptions = assets.map((asset) => ({
    value: asset.id,
    label: `${asset.assetCode} - ${asset.name}`,
  }));

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
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Disposal Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Add an asset to the selected disposal record.
          </p>
        </div>

        <input type="hidden" {...register('disposalId')} />

        <p className="text-sm text-muted-foreground">
          Disposal:{' '}
          <span className="font-medium text-foreground">
            {disposalItem?.disposal.referenceNumber ?? 'Current disposal'}
          </span>
        </p>
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Asset Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the asset that will be included in this disposal.
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
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? disposalItem
              ? 'Updating...'
              : 'Saving...'
            : disposalItem
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
