'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  acquisitionSchema,
  type AcquisitionFormData,
} from '../schemas/acquisition.schema';

import {
  createAcquisitionAction,
  updateAcquisitionAction,
} from '../actions/acquisition.actions';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AcquisitionFormProps = {
  acquisition?: AcquisitionWithRelations | null;

  acquisitionMethods: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AcquisitionForm({
  acquisition,
  acquisitionMethods,
  onSuccess,
}: AcquisitionFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof acquisitionSchema>,
    unknown,
    z.output<typeof acquisitionSchema>
  >({
    resolver: zodResolver(acquisitionSchema),

    defaultValues: {
      acquisitionDate: acquisition
        ? acquisition.acquisitionDate.toISOString().split('T')[0]
        : '',
      acquisitionMethodId: acquisition?.acquisitionMethodId ?? '',
      supplierName: acquisition?.supplierName ?? '',
      referenceNumber: acquisition?.referenceNumber ?? '',
      description: acquisition?.description ?? '',
      fundingSource: acquisition?.fundingSource ?? '',
      totalAmount: acquisition?.totalAmount?.toString() ?? '',
      currency: acquisition?.currency ?? '',
      notes: acquisition?.notes ?? '',
    },
  });

  async function onSubmit(data: AcquisitionFormData) {
    const result = acquisition
      ? await updateAcquisitionAction(acquisition.id, data)
      : await createAcquisitionAction(data);

    if (result.success) {
      toast.success(
        acquisition
          ? `Acquisition ${result.data.acquisitionNumber} updated successfully`
          : `Acquisition ${result.data.acquisitionNumber} created successfully`,
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
      {/* Acquisition Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Acquisition Information</h3>

        <TextField
          label="Acquisition Date"
          type="date"
          required
          error={errors.acquisitionDate?.message}
          {...register('acquisitionDate')}
        />

        <div className="space-y-2">
          <label htmlFor="acquisitionMethodId" className="text-sm font-medium">
            Acquisition Method
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="acquisitionMethodId"
            {...register('acquisitionMethodId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Acquisition Method</option>

            {acquisitionMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.code} - {method.name}
              </option>
            ))}
          </select>

          {errors.acquisitionMethodId?.message && (
            <p className="text-sm text-destructive">
              {errors.acquisitionMethodId.message}
            </p>
          )}
        </div>
      </div>

      {/* Source Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Source Information</h3>

        <TextField
          label="Supplier Name"
          error={errors.supplierName?.message}
          {...register('supplierName')}
        />

        <TextField
          label="Reference Number"
          error={errors.referenceNumber?.message}
          {...register('referenceNumber')}
        />

        <TextField
          label="Funding Source"
          error={errors.fundingSource?.message}
          {...register('fundingSource')}
        />
      </div>

      {/* Financial Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Financial Information</h3>

        <TextField
          label="Total Amount"
          type="number"
          step="0.01"
          error={errors.totalAmount?.message}
          {...register('totalAmount')}
        />

        <TextField
          label="Currency"
          error={errors.currency?.message}
          {...register('currency')}
        />
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Description</h3>

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
          ? acquisition
            ? 'Updating...'
            : 'Saving...'
          : acquisition
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
