'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  retirementFormSchema,
  type RetirementFormValues,
} from '../schemas/retirement.schema';

import { createRetirementAction } from '../actions/retirement.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type RetirementFormProps = {
  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  conditions: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function RetirementForm({
  assets,
  conditions,
  onSuccess,
}: RetirementFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RetirementFormValues>({
    resolver: zodResolver(retirementFormSchema),

    defaultValues: {
      assetId: '',
      retirementDate: '',
      reason: '',
      conditionId: '',
      notes: '',
    },
  });

  async function onSubmit(data: RetirementFormValues) {
    const result = await createRetirementAction(data);

    if (result.success) {
      toast.success('Retirement created successfully');

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Retirement Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Retirement Information</h3>

        {/* Asset */}
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

        {/* Retirement Date */}
        <TextField
          label="Retirement Date"
          type="date"
          required
          error={errors.retirementDate?.message}
          {...register('retirementDate')}
        />

        {/* Condition */}
        <div className="space-y-2">
          <label htmlFor="conditionId" className="text-sm font-medium">
            Condition
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="conditionId"
            {...register('conditionId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Condition</option>

            {conditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.code} - {condition.name}
              </option>
            ))}
          </select>

          {errors.conditionId?.message && (
            <p className="text-sm text-destructive">
              {errors.conditionId.message}
            </p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Retirement Details</h3>

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
        {isSubmitting ? 'Submitting...' : 'Submit Retirement'}
      </Button>
    </form>
  );
}
