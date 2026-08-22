'use client';

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

type UnregisteredAssetObservationFormProps = {
  verificationId: string;
  onSuccess?: () => void;
};

export function UnregisteredAssetObservationForm({
  verificationId,
  onSuccess,
}: UnregisteredAssetObservationFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUnregisteredAssetObservationFormData>({
    resolver: zodResolver(createUnregisteredAssetObservationSchema),

    defaultValues: {
      observedName: '',
      observedAt: new Date().toISOString(),
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

      reset({
        observedName: '',
        observedAt: new Date().toISOString(),
        observedAssetTag: '',
        observedSerialNumber: '',
        observedLocationId: '',
        observedConditionId: '',
        notes: '',
      });

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Asset Information */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">
            Unregistered Asset Information
          </h3>

          <p className="text-sm text-muted-foreground">
            Record an asset that was physically found but is not included in the
            registered asset list.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Asset Name"
            error={errors.observedName?.message}
            {...register('observedName')}
          />

          <TextField
            label="Observed At"
            type="datetime-local"
            error={errors.observedAt?.message}
            {...register('observedAt')}
          />

          <TextField
            label="Asset Tag"
            error={errors.observedAssetTag?.message}
            {...register('observedAssetTag')}
          />

          <TextField
            label="Serial Number"
            error={errors.observedSerialNumber?.message}
            {...register('observedSerialNumber')}
          />

          <TextField
            label="Location ID"
            error={errors.observedLocationId?.message}
            {...register('observedLocationId')}
          />

          <TextField
            label="Condition ID"
            error={errors.observedConditionId?.message}
            {...register('observedConditionId')}
          />
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Observation Notes</h3>

          <p className="text-sm text-muted-foreground">
            Add any additional information about the observed asset.
          </p>
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={() => {
            reset();
            onSuccess?.();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Record Observation'}
        </Button>
      </div>
    </form>
  );
}
