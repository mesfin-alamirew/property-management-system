'use client';

import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  maintenanceServiceSchema,
  type MaintenanceServiceFormData,
} from '../schemas/maintenance-service.schema';

import {
  createMaintenanceServiceAction,
  updateMaintenanceServiceAction,
} from '../actions/maintenance-service.actions';

import type { MaintenanceServiceRecord } from '../types/maintenance-service.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';

type MaintenanceServiceFormProps = {
  maintenanceService?: MaintenanceServiceRecord | null;

  maintenances: {
    id: string;
    referenceNumber: string;
    title: string;
  }[];

  onSuccess?: () => void;
};

export function MaintenanceServiceForm({
  maintenanceService,
  maintenances,
  onSuccess,
}: MaintenanceServiceFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof maintenanceServiceSchema>,
    unknown,
    z.output<typeof maintenanceServiceSchema>
  >({
    resolver: zodResolver(maintenanceServiceSchema),

    defaultValues: {
      maintenanceId: maintenanceService?.maintenanceId ?? '',
      serviceDate: maintenanceService?.serviceDate
        ? new Date(maintenanceService.serviceDate).toISOString().split('T')[0]
        : '',
      description: maintenanceService?.description ?? '',
      serviceProvider: maintenanceService?.serviceProvider ?? '',
      quantity: maintenanceService?.quantity?.toString() ?? '',
      unitCost: maintenanceService?.unitCost?.toString() ?? '',

      notes: maintenanceService?.notes ?? '',
    },
  });

  const quantity = useWatch({
    control,
    name: 'quantity',
  });

  const unitCost = useWatch({
    control,
    name: 'unitCost',
  });

  const calculatedTotal =
    quantity && unitCost
      ? (Number(quantity) * Number(unitCost)).toFixed(2)
      : '';

  async function onSubmit(data: MaintenanceServiceFormData) {
    const result = maintenanceService
      ? await updateMaintenanceServiceAction(maintenanceService.id, data)
      : await createMaintenanceServiceAction(data);

    if (result.success) {
      toast.success(
        maintenanceService
          ? 'Maintenance service updated successfully'
          : 'Maintenance service created successfully',
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

        <div className="space-y-2">
          <label htmlFor="maintenanceId" className="text-sm font-medium">
            Maintenance
            <span className="text-destructive"> *</span>
          </label>

          {maintenanceService ? (
            <>
              <select
                id="maintenanceId"
                value={maintenanceService.maintenanceId}
                disabled
                className="w-full rounded-md border px-3 py-2 text-sm disabled:bg-muted"
              >
                {maintenances
                  .filter(
                    (maintenance) =>
                      maintenance.id === maintenanceService.maintenanceId,
                  )
                  .map((maintenance) => (
                    <option key={maintenance.id} value={maintenance.id}>
                      {maintenance.referenceNumber} - {maintenance.title}
                    </option>
                  ))}
              </select>

              <input type="hidden" {...register('maintenanceId')} />
            </>
          ) : (
            <select
              id="maintenanceId"
              {...register('maintenanceId')}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Select Maintenance</option>

              {maintenances.map((maintenance) => (
                <option key={maintenance.id} value={maintenance.id}>
                  {maintenance.referenceNumber} - {maintenance.title}
                </option>
              ))}
            </select>
          )}

          {errors.maintenanceId?.message && (
            <p className="text-sm text-destructive">
              {errors.maintenanceId.message}
            </p>
          )}
        </div>

        <TextField
          label="Service Date"
          type="date"
          error={errors.serviceDate?.message}
          {...register('serviceDate')}
        />

        <TextField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      {/* Provider Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Provider Information</h3>

        <TextField
          label="Service Provider"
          error={errors.serviceProvider?.message}
          {...register('serviceProvider')}
        />
      </div>

      {/* Cost Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Cost Information</h3>

        <TextField
          label="Quantity"
          type="number"
          step="0.01"
          min="0"
          error={errors.quantity?.message}
          {...register('quantity')}
        />

        <TextField
          label="Unit Cost"
          type="number"
          step="0.01"
          min="0"
          error={errors.unitCost?.message}
          {...register('unitCost')}
        />

        <TextField
          label="Total Cost"
          type="number"
          step="0.01"
          value={calculatedTotal}
          readOnly
        />
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Additional Information</h3>

        <TextField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? maintenanceService
            ? 'Updating...'
            : 'Saving...'
          : maintenanceService
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
