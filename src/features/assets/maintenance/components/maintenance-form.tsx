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
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

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

  users: {
    id: string;
    username: string;
    displayName: string;
  }[];

  onSuccess?: () => void;
};

export function MaintenanceForm({
  maintenance,
  assets,
  users,
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
      assignedToUserId: maintenance?.assignedToUserId ?? '',
      notes: maintenance?.notes ?? '',
    },
  });

  async function onSubmit(data: MaintenanceFormData) {
    console.log('Maintenance form submitted:', data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Maintenance Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Maintenance Information</h3>

        {/* Asset */}
        <div className="space-y-2">
          <label htmlFor="assetId" className="text-sm font-medium">
            Asset
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="assetId"
            {...register('assetId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
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

        {/* Maintenance Type */}
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Maintenance Type
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="type"
            {...register('type')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Maintenance Type</option>

            {maintenanceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errors.type?.message && (
            <p className="text-sm text-destructive">{errors.type.message}</p>
          )}
        </div>

        <TextField
          label="Title"
          required
          error={errors.title?.message}
          {...register('title')}
        />
      </div>

      {/* Schedule */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Schedule</h3>

        <TextField
          label="Scheduled At"
          type="datetime-local"
          error={errors.scheduledAt?.message}
          {...register('scheduledAt')}
        />

        {/* Assigned User */}
        <div className="space-y-2">
          <label htmlFor="assignedToUserId" className="text-sm font-medium">
            Assigned To
          </label>

          <select
            id="assignedToUserId"
            {...register('assignedToUserId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Assigned User</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.displayName} ({user.username})
              </option>
            ))}
          </select>

          {errors.assignedToUserId?.message && (
            <p className="text-sm text-destructive">
              {errors.assignedToUserId.message}
            </p>
          )}
        </div>
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
          ? maintenance
            ? 'Updating...'
            : 'Submitting...'
          : maintenance
            ? 'Update'
            : 'Submit Request'}
      </Button>
    </form>
  );
}
