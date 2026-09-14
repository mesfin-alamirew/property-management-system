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
import { SelectField } from '@/components/form/select-field';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Physical Identification
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Record the identifying information observed for the unregistered
            asset.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <TextField
                label="Observed Asset Name"
                required
                error={errors.observedName?.message}
                {...register('observedName')}
              />
            </div>

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
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Observation Details
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Record where the asset was observed, its condition, and any
            additional notes.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="space-y-5">
            <div>
              <SelectField
                label="Observed Location"
                options={[
                  {
                    value: '',
                    label: 'Select location',
                  },
                  ...assetLocations.map((location) => ({
                    value: location.id,
                    label: `${location.code} - ${location.name}`,
                  })),
                ]}
                error={errors.observedLocationId?.message}
                {...register('observedLocationId')}
              />
            </div>

            <div>
              <SelectField
                label="Observed Condition"
                options={[
                  {
                    value: '',
                    label: 'Select condition',
                  },
                  ...assetConditions.map((condition) => ({
                    value: condition.id,
                    label: `${condition.code} - ${condition.name}`,
                  })),
                ]}
                error={errors.observedConditionId?.message}
                {...register('observedConditionId')}
              />
            </div>

            <TextAreaField
              label="Notes"
              error={errors.notes?.message}
              {...register('notes')}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-border pt-5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Record Observation'}
        </Button>
      </div>
    </form>
  );
}
