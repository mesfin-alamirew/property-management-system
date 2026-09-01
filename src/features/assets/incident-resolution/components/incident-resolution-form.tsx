'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  incidentResolutionFormSchema,
  type IncidentResolutionFormValues,
} from '../schemas/incident-resolution.schema';

import { resolveIncidentAction } from '../actions/incident-resolution.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';

type IncidentResolutionFormProps = {
  incidentId: string;

  onSuccess?: () => void;
};

export function IncidentResolutionForm({
  incidentId,
  onSuccess,
}: IncidentResolutionFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IncidentResolutionFormValues>({
    resolver: zodResolver(incidentResolutionFormSchema),

    defaultValues: {
      incidentId,
      rootCause: '',
      resolution: '',
      correctiveAction: '',
      notes: '',
    },
  });

  async function onSubmit(data: IncidentResolutionFormValues) {
    const result = await resolveIncidentAction(incidentId, data);

    if (result.success) {
      toast.success('Incident resolved successfully');

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hidden workflow context */}
      <input type="hidden" {...register('incidentId')} />

      {/* Root Cause */}
      <TextAreaField
        label="Root Cause"
        required
        error={errors.rootCause?.message}
        {...register('rootCause')}
      />

      {/* Resolution */}
      <TextAreaField
        label="Resolution"
        required
        error={errors.resolution?.message}
        {...register('resolution')}
      />

      {/* Corrective Action */}
      <TextAreaField
        label="Corrective Action"
        error={errors.correctiveAction?.message}
        {...register('correctiveAction')}
      />

      {/* Notes */}
      <TextAreaField
        label="Notes"
        error={errors.notes?.message}
        {...register('notes')}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Resolving...' : 'Resolve Incident'}
        </Button>
      </div>
    </form>
  );
}
