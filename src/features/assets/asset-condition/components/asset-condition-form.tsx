'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  assetConditionSchema,
  type AssetConditionFormData,
} from '../schemas/asset-condition.schema';

import {
  createAssetConditionAction,
  updateAssetConditionAction,
} from '../actions/asset-condition.actions';

import { AssetConditionWithRelations } from '../types/asset-condition.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetConditionFormProps = {
  assetCondition?: AssetConditionWithRelations | null;

  onSuccess?: () => void;
};

export function AssetConditionForm({
  assetCondition,
  onSuccess,
}: AssetConditionFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof assetConditionSchema>,
    unknown,
    z.output<typeof assetConditionSchema>
  >({
    resolver: zodResolver(assetConditionSchema),

    defaultValues: {
      code: assetCondition?.code ?? '',
      name: assetCondition?.name ?? '',
      description: assetCondition?.description ?? '',
    },
  });

  async function onSubmit(data: AssetConditionFormData) {
    const result = assetCondition
      ? await updateAssetConditionAction(assetCondition.id, data)
      : await createAssetConditionAction(data);

    if (result.success) {
      toast.success(
        assetCondition
          ? 'Asset condition updated successfully'
          : 'Asset condition created successfully',
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
          label="Asset Condition Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Asset Condition Name"
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
          ? assetCondition
            ? 'Updating...'
            : 'Saving...'
          : assetCondition
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
