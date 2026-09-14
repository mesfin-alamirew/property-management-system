'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  createPhysicalVerificationSchema,
  type CreatePhysicalVerificationFormData,
} from '../schemas/physical-verification.schema';

import { createPhysicalVerificationAction } from '../actions/physical-verification.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { SelectField } from '@/components/form/select-field';

type PhysicalVerificationFormProps = {
  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  locations: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function PhysicalVerificationForm({
  organizationUnits,
  locations,
  onSuccess,
}: PhysicalVerificationFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof createPhysicalVerificationSchema>,
    unknown,
    z.output<typeof createPhysicalVerificationSchema>
  >({
    resolver: zodResolver(createPhysicalVerificationSchema),

    defaultValues: {
      title: '',
      scope: 'ORGANIZATION',
      organizationUnitId: '',
      locationId: '',
      scheduledAt: '',
      notes: '',
    },
  });

  async function onSubmit(data: CreatePhysicalVerificationFormData) {
    const result = await createPhysicalVerificationAction(data);

    if (result.success) {
      toast.success('Physical verification created successfully');

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
            Verification Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Define what will be verified and the organizational or location
            scope of the verification.
          </p>
        </div>

        <div className="space-y-4">
          <TextField
            label="Title"
            required
            error={errors.title?.message}
            placeholder="Enter verification title"
            {...register('title')}
          />

          <SelectField
            label="Scope"
            required
            error={errors.scope?.message}
            options={[
              {
                value: 'ORGANIZATION',
                label: 'Entire Organization',
              },
              {
                value: 'ORGANIZATION_UNIT',
                label: 'Organization Unit',
              },
              {
                value: 'LOCATION',
                label: 'Location',
              },
              {
                value: 'ORGANIZATION_UNIT_LOCATION',
                label: 'Organization Unit & Location',
              },
              {
                value: 'SELECTED_ASSETS',
                label: 'Selected Assets',
              },
            ]}
            placeholder="Select Verification Scope"
            {...register('scope')}
          />

          <SelectField
            label="Organization Unit"
            error={errors.organizationUnitId?.message}
            options={organizationUnits.map((unit) => ({
              value: unit.id,
              label: `${unit.code} - ${unit.name}`,
            }))}
            placeholder="Select Organization Unit"
            {...register('organizationUnitId')}
          />

          <SelectField
            label="Location"
            error={errors.locationId?.message}
            options={locations.map((location) => ({
              value: location.id,
              label: `${location.code} - ${location.name}`,
            }))}
            placeholder="Select Location"
            {...register('locationId')}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Schedule & Notes
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Optionally schedule the verification and record any relevant
            instructions or notes.
          </p>
        </div>

        <div className="space-y-4">
          <TextField
            label="Scheduled Date"
            type="datetime-local"
            error={errors.scheduledAt?.message}
            {...register('scheduledAt')}
          />

          <TextAreaField
            label="Notes"
            error={errors.notes?.message}
            {...register('notes')}
          />
        </div>
      </section>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Physical Verification'}
        </Button>
      </div>
    </form>
  );
}
