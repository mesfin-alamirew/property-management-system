'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  assetStatusSchema,
  type AssetStatusFormData,
} from '../schemas/asset-status.schema';

import {
  createAssetStatusAction,
  updateAssetStatusAction,
} from '../actions/asset-status.actions';

import type { AssetStatusWithRelations } from '../types/asset-status.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetStatusFormProps = {
  assetStatus?: AssetStatusWithRelations | null;

  onSuccess?: () => void;
};

export function AssetStatusForm({
  assetStatus,
  onSuccess,
}: AssetStatusFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetStatusSchema>,
    unknown,
    z.output<typeof assetStatusSchema>
  >({
    resolver: zodResolver(assetStatusSchema),

    defaultValues: {
      code: assetStatus?.code ?? '',
      name: assetStatus?.name ?? '',
      description: assetStatus?.description ?? '',
    },
  });

  async function onSubmit(data: AssetStatusFormData) {
    const result = assetStatus
      ? await updateAssetStatusAction(assetStatus.id, data)
      : await createAssetStatusAction(data);

    if (result.success) {
      toast.success(
        assetStatus
          ? 'Asset status updated successfully'
          : 'Asset status created successfully',
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
          label="Asset Status Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Asset Status Name"
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? assetStatus
            ? 'Updating...'
            : 'Saving...'
          : assetStatus
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
