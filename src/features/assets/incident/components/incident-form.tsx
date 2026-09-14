'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  incidentFormSchema,
  incidentSchema,
  type IncidentFormValues,
} from '../schemas/incident.schema';

import {
  createIncidentAction,
  updateIncidentAction,
} from '../actions/incident.actions';

import type { IncidentWithRelations } from '../types/incident.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { SelectField } from '@/components/form/select-field';

const incidentTypes = [
  'DAMAGE',
  'LOSS',
  'THEFT',
  'ACCIDENT',
  'MALFUNCTION',
  'SECURITY',
  'OTHER',
] as const;

const incidentSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;

type IncidentFormProps = {
  incident?: IncidentWithRelations | null;

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function IncidentForm({
  incident,
  assets,
  onSuccess,
}: IncidentFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentFormSchema),

    defaultValues: {
      assetId: incident?.assetId ?? '',
      type: incident?.type ?? '',
      severity: incident?.severity ?? '',
      title: incident?.title ?? '',
      description: incident?.description ?? '',
      incidentDate: incident?.incidentDate
        ? incident.incidentDate.toISOString().slice(0, 16)
        : '',
      notes: incident?.notes ?? '',
    },
  });

  async function onSubmit(data: IncidentFormValues) {
    const validatedData = incidentSchema.parse(data);

    const result = incident
      ? await updateIncidentAction(incident.id, validatedData)
      : await createIncidentAction(validatedData);

    if (result.success) {
      toast.success(
        incident
          ? 'Incident updated successfully'
          : 'Incident created successfully',
      );

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

  const incidentTypeOptions = incidentTypes.map((type) => ({
    value: type,
    label: type,
  }));

  const incidentSeverityOptions = incidentSeverities.map((severity) => ({
    value: severity,
    label: severity,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Incident Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Identify the affected asset and classify the incident.
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

        <SelectField
          label="Incident Type"
          required
          options={incidentTypeOptions}
          placeholder="Select incident type"
          error={errors.type?.message}
          {...register('type')}
        />

        <SelectField
          label="Severity"
          required
          options={incidentSeverityOptions}
          placeholder="Select severity"
          error={errors.severity?.message}
          {...register('severity')}
        />

        <TextField
          label="Title"
          required
          error={errors.title?.message}
          {...register('title')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Incident Date
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record when the incident occurred.
          </p>
        </div>

        <TextField
          label="Incident Date"
          type="datetime-local"
          required
          error={errors.incidentDate?.message}
          {...register('incidentDate')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Incident Details
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Provide additional information about the incident.
          </p>
        </div>

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? incident
              ? 'Updating...'
              : 'Submitting...'
            : incident
              ? 'Update'
              : 'Report Incident'}
        </Button>
      </div>
    </form>
  );
}
