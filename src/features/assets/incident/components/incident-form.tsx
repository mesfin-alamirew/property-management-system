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
  console.log('INCIDENT FORM ERRORS:', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Incident Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Incident Information</h3>

        {/* Asset */}
        <div className="space-y-2">
          <label htmlFor="assetId" className="text-sm font-medium">
            Asset
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="assetId"
            {...register('assetId')}
            className={`w-full rounded-md border px-3 py-2 text-sm ${
              errors.assetId
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                : 'border-input bg-background'
            }`}
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

        {/* Incident Type */}
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Incident Type
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="type"
            {...register('type')}
            className={`w-full rounded-md border px-3 py-2 text-sm ${
              errors.assetId
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                : 'border-input bg-background'
            }`}
          >
            <option value="">Select Incident Type</option>

            {incidentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errors.type?.message && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>

        {/* Severity */}
        <div className="space-y-2">
          <label htmlFor="severity" className="text-sm font-medium">
            Severity
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="severity"
            {...register('severity')}
            className={`w-full rounded-md border px-3 py-2 text-sm ${
              errors.assetId
                ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                : 'border-input bg-background'
            }`}
          >
            <option value="">Select Severity</option>

            {incidentSeverities.map((severity) => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>

          {errors.severity?.message && (
            <p className="text-sm text-destructive">
              {errors.severity.message}
            </p>
          )}
        </div>

        <TextField
          label="Title"
          required
          error={errors.title?.message}
          {...register('title')}
        />
      </div>

      {/* Incident Date */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Incident Date</h3>

        <TextField
          label="Incident Date"
          type="datetime-local"
          required
          error={errors.incidentDate?.message}
          {...register('incidentDate')}
        />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Details</h3>

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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? incident
            ? 'Updating...'
            : 'Submitting...'
          : incident
            ? 'Update'
            : 'Report Incident'}
      </Button>
    </form>
  );
}
