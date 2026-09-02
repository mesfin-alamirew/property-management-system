'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  cancelRetirementSchema,
  type CancelRetirementData,
} from '../schemas/retirement.schema';

import { cancelRetirementAction } from '../actions/retirement.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';

type RetirementCancelFormProps = {
  retirementId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function RetirementCancelForm({
  retirementId,
  onSuccess,
  onCancel,
}: RetirementCancelFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CancelRetirementData>({
    resolver: zodResolver(cancelRetirementSchema),

    defaultValues: {
      retirementId,
      cancellationReason: '',
    },
  });

  async function onSubmit(data: CancelRetirementData) {
    const result = await cancelRetirementAction(data);

    if (result.success) {
      toast.success('Retirement cancelled successfully');

      reset({
        retirementId,
        cancellationReason: '',
      });

      router.refresh();
      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register('retirementId')} />

      <TextAreaField
        label="Cancellation Reason"
        required
        error={errors.cancellationReason?.message}
        {...register('cancellationReason')}
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Keep Retirement
        </Button>

        <Button type="submit" variant="danger" disabled={isSubmitting}>
          {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
        </Button>
      </div>
    </form>
  );
}
