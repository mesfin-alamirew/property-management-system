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
      <input type="hidden" {...register('incidentId')} />

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Resolution Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Document the cause of the incident and how it was resolved.
          </p>
        </div>

        <TextAreaField
          label="Root Cause"
          required
          error={errors.rootCause?.message}
          {...register('rootCause')}
        />

        <TextAreaField
          label="Resolution"
          required
          error={errors.resolution?.message}
          {...register('resolution')}
        />

        <TextAreaField
          label="Corrective Action"
          error={errors.correctiveAction?.message}
          {...register('correctiveAction')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Notes</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Add any additional information relevant to the incident resolution.
          </p>
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Resolving...' : 'Resolve Incident'}
        </Button>
      </div>
    </form>
  );
}
