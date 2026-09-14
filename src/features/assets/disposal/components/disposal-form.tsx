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
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Disposal Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Define the planned disposal date and method.
          </p>
        </div>

        <TextField
          label="Disposal Date"
          type="date"
          required
          error={errors.disposalDate?.message}
          {...register('disposalDate')}
        />

        <TextField
          label="Disposal Method"
          required
          error={errors.method?.message}
          {...register('method')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Disposal Details
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Provide the reason and any additional notes supporting the disposal.
          </p>
        </div>

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

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Disposal'}
        </Button>
      </div>
    </form>
  );
}
