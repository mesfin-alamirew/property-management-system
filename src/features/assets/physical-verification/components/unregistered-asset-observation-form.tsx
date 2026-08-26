'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  createUnregisteredAssetObservationSchema,
  type CreateUnregisteredAssetObservationFormData,
} from '../schemas/physical-verification.schema';

import { createUnregisteredAssetObservationAction } from '../actions/physical-verification.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetLocationOption = {
  id: string;
  code: string;
  name: string;
};

type AssetConditionOption = {
  id: string;
  code: string;
  name: string;
};

type UnregisteredAssetObservationFormProps = {
  verificationId: string;

  assetLocations: AssetLocationOption[];

  assetConditions: AssetConditionOption[];

  onSuccess?: () => void;
};

export function UnregisteredAssetObservationForm({
  verificationId,
  assetLocations,
  assetConditions,
  onSuccess,
}: UnregisteredAssetObservationFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof createUnregisteredAssetObservationSchema>,
    unknown,
    z.output<typeof createUnregisteredAssetObservationSchema>
  >({
    resolver: zodResolver(createUnregisteredAssetObservationSchema),

    defaultValues: {
      observedName: '',
      observedAssetTag: '',
      observedSerialNumber: '',
      observedLocationId: '',
      observedConditionId: '',
      notes: '',
    },
  });

  async function onSubmit(data: CreateUnregisteredAssetObservationFormData) {
    const result = await createUnregisteredAssetObservationAction(
      verificationId,
      data,
    );

    if (result.success) {
      toast.success('Unregistered asset observation recorded successfully');

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ============================================================
          Physical Identification
      ============================================================ */}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Physical Identification</h3>

        <TextField
          label="Observed Asset Name"
          required
          error={errors.observedName?.message}
          {...register('observedName')}
        />

        <TextField
          label="Observed Asset Tag"
          error={errors.observedAssetTag?.message}
          {...register('observedAssetTag')}
        />

        <TextField
          label="Observed Serial Number"
          error={errors.observedSerialNumber?.message}
          {...register('observedSerialNumber')}
        />
      </div>

      {/* ============================================================
          Observation Details
      ============================================================ */}

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Observation Details</h3>

        <div className="space-y-2">
          <label htmlFor="observedLocationId" className="text-sm font-medium">
            Observed Location
          </label>

          <select
            id="observedLocationId"
            {...register('observedLocationId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select location</option>

            {assetLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.code} - {location.name}
              </option>
            ))}
          </select>

          {errors.observedLocationId?.message && (
            <p className="text-sm text-red-500">
              {errors.observedLocationId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="observedConditionId" className="text-sm font-medium">
            Observed Condition
          </label>

          <select
            id="observedConditionId"
            {...register('observedConditionId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select condition</option>

            {assetConditions.map((condition) => (
              <option key={condition.id} value={condition.id}>
                {condition.code} - {condition.name}
              </option>
            ))}
          </select>

          {errors.observedConditionId?.message && (
            <p className="text-sm text-red-500">
              {errors.observedConditionId.message}
            </p>
          )}
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Record Observation'}
      </Button>
    </form>
  );
}
