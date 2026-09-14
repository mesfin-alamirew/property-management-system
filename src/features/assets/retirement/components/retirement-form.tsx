'use client';

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
import { SelectField } from '@/components/form/select-field';

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

  const assetOptions = assets.map((asset) => ({
    value: asset.id,
    label: `${asset.assetCode} - ${asset.name}`,
  }));

  const conditionOptions = conditions.map((condition) => ({
    value: condition.id,
    label: `${condition.code} - ${condition.name}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Retirement Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Provide the asset, retirement date, and condition for the retirement
            request.
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

        <TextField
          label="Retirement Date"
          type="date"
          required
          error={errors.retirementDate?.message}
          {...register('retirementDate')}
        />

        <SelectField
          label="Condition"
          required
          options={conditionOptions}
          placeholder="Select condition"
          error={errors.conditionId?.message}
          {...register('conditionId')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Retirement Details
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Document the reason for retirement and any additional information.
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
          {isSubmitting ? 'Submitting...' : 'Submit Retirement'}
        </Button>
      </div>
    </form>
  );
}
