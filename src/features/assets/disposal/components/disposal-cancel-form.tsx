'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  cancelDisposalSchema,
  type CancelDisposalFormData,
} from '../schemas/disposal.schema';

import { cancelDisposalAction } from '../actions/disposal.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';

type DisposalCancelFormProps = {
  disposalId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function DisposalCancelForm({
  disposalId,
  onSuccess,
  onCancel,
}: DisposalCancelFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CancelDisposalFormData>({
    resolver: zodResolver(cancelDisposalSchema),

    defaultValues: {
      disposalId,
      cancellationReason: '',
    },
  });

  async function onSubmit(data: CancelDisposalFormData) {
    const result = await cancelDisposalAction(data);

    if (result.success) {
      toast.success('Disposal cancelled successfully');

      reset({
        disposalId,
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
      <input type="hidden" {...register('disposalId')} />

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
          Keep Disposal
        </Button>

        <Button type="submit" variant="danger" disabled={isSubmitting}>
          {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
        </Button>
      </div>
    </form>
  );
}
