'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  disposalSchema,
  type DisposalFormInput,
  type DisposalFormData,
} from '../schemas/disposal.schema';

import { createDisposalAction } from '../actions/disposal.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type DisposalFormProps = {
  onSuccess?: () => void;
};

export function DisposalForm({ onSuccess }: DisposalFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DisposalFormInput, unknown, DisposalFormData>({
    resolver: zodResolver(disposalSchema),

    defaultValues: {
      disposalDate: '',
      method: '',
      reason: '',
      notes: '',
    },
  });

  async function onSubmit(data: DisposalFormData) {
    const result = await createDisposalAction(data);

    if (result.success) {
      toast.success('Disposal created successfully');

      reset();

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

        {/* Disposal Date */}
        <TextField
          label="Disposal Date"
          type="date"
          required
          error={errors.disposalDate?.message}
          {...register('disposalDate')}
        />

        {/* Disposal Method */}
        <TextField
          label="Disposal Method"
          required
          error={errors.method?.message}
          {...register('method')}
        />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Disposal Details</h3>

        <TextAreaField
          label="Reason"
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
        {isSubmitting ? 'Submitting...' : 'Submit Disposal'}
      </Button>
    </form>
  );
}
