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

import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

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

  const maintenanceOptions = maintenances.map((maintenance) => ({
    value: maintenance.id,
    label: `${maintenance.referenceNumber} - ${maintenance.title}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Maintenance Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the maintenance record and provide the service details.
          </p>
        </div>

        {maintenanceService ? (
          <div className="space-y-2">
            <label
              htmlFor="maintenanceId"
              className="text-sm font-medium text-foreground"
            >
              Maintenance
            </label>

            <select
              id="maintenanceId"
              value={maintenanceService.maintenanceId}
              disabled
              className="w-full rounded-md border border-border bg-surface-muted px-3 py-2 text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-75"
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

            {errors.maintenanceId?.message && (
              <p className="text-sm text-danger">
                {errors.maintenanceId.message}
              </p>
            )}
          </div>
        ) : (
          <SelectField
            label="Maintenance"
            required
            options={maintenanceOptions}
            placeholder="Select maintenance"
            error={errors.maintenanceId?.message}
            {...register('maintenanceId')}
          />
        )}

        <TextField
          label="Service Date"
          type="date"
          error={errors.serviceDate?.message}
          {...register('serviceDate')}
        />

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Provider Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record the organization or person that provided the maintenance
            service.
          </p>
        </div>

        <TextField
          label="Service Provider"
          error={errors.serviceProvider?.message}
          {...register('serviceProvider')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Cost Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the quantity and unit cost. Total cost is calculated
            automatically.
          </p>
        </div>

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

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Additional Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Add any additional notes about the maintenance service.
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
          {isSubmitting
            ? maintenanceService
              ? 'Updating...'
              : 'Saving...'
            : maintenanceService
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
