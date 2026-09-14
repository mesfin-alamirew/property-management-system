'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  maintenanceSchema,
  type MaintenanceFormData,
} from '../schemas/maintenance.schema';

import {
  createMaintenanceAction,
  updateMaintenanceAction,
} from '../actions/maintenance.actions';

import type { MaintenanceWithRelations } from '../types/maintenance.types';

import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

const maintenanceTypes = [
  'PREVENTIVE',
  'CORRECTIVE',
  'EMERGENCY',
  'PREDICTIVE',
  'INSPECTION',
] as const;

type MaintenanceFormProps = {
  maintenance?: MaintenanceWithRelations | null;

  assets: {
    id: string;
    assetCode: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function MaintenanceForm({
  maintenance,
  assets,
  onSuccess,
}: MaintenanceFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof maintenanceSchema>,
    unknown,
    z.output<typeof maintenanceSchema>
  >({
    resolver: zodResolver(maintenanceSchema),

    defaultValues: {
      assetId: maintenance?.assetId ?? '',
      type: maintenance?.type ?? '',
      title: maintenance?.title ?? '',
      description: maintenance?.description ?? '',
      scheduledAt: maintenance?.scheduledAt
        ? maintenance.scheduledAt.toISOString().slice(0, 16)
        : '',
      notes: maintenance?.notes ?? '',
    },
  });

  async function onSubmit(data: MaintenanceFormData) {
    const result = maintenance
      ? await updateMaintenanceAction(maintenance.id, data)
      : await createMaintenanceAction(data);

    if (result.success) {
      toast.success(
        maintenance
          ? 'Maintenance updated successfully'
          : 'Maintenance created successfully',
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

  const maintenanceTypeOptions = maintenanceTypes.map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Maintenance Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Provide the asset and basic information for this maintenance
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

        <SelectField
          label="Maintenance Type"
          required
          options={maintenanceTypeOptions}
          placeholder="Select maintenance type"
          error={errors.type?.message}
          {...register('type')}
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
          <h3 className="text-sm font-semibold text-foreground">Schedule</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Specify the planned date and time for the maintenance activity.
          </p>
        </div>

        <TextField
          label="Scheduled At"
          type="datetime-local"
          error={errors.scheduledAt?.message}
          {...register('scheduledAt')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Details</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Describe the maintenance work and provide any additional notes.
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
            ? maintenance
              ? 'Updating...'
              : 'Submitting...'
            : maintenance
              ? 'Update'
              : 'Submit Request'}
        </Button>
      </div>
    </form>
  );
}
