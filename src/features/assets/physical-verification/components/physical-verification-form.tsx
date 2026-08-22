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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Verification */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Verification</h3>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
            <span className="text-destructive"> *</span>
          </label>

          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Enter verification title"
          />

          {errors.title?.message && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="scope" className="text-sm font-medium">
            Scope
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="scope"
            {...register('scope')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="ORGANIZATION">Entire Organization</option>
            <option value="ORGANIZATION_UNIT">Organization Unit</option>
            <option value="LOCATION">Location</option>
            <option value="ORGANIZATION_UNIT_LOCATION">
              Organization Unit & Location
            </option>
            <option value="SELECTED_ASSETS">Selected Assets</option>
          </select>

          {errors.scope?.message && (
            <p className="text-sm text-destructive">{errors.scope.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="organizationUnitId" className="text-sm font-medium">
            Organization Unit
          </label>

          <select
            id="organizationUnitId"
            {...register('organizationUnitId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Organization Unit</option>

            {organizationUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.code} - {unit.name}
              </option>
            ))}
          </select>

          {errors.organizationUnitId?.message && (
            <p className="text-sm text-destructive">
              {errors.organizationUnitId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="locationId" className="text-sm font-medium">
            Location
          </label>

          <select
            id="locationId"
            {...register('locationId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Location</option>

            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.code} - {location.name}
              </option>
            ))}
          </select>

          {errors.locationId?.message && (
            <p className="text-sm text-destructive">
              {errors.locationId.message}
            </p>
          )}
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Schedule</h3>

        <div className="space-y-2">
          <label htmlFor="scheduledAt" className="text-sm font-medium">
            Scheduled Date
          </label>

          <input
            id="scheduledAt"
            type="datetime-local"
            {...register('scheduledAt')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {errors.scheduledAt?.message && (
            <p className="text-sm text-destructive">
              {errors.scheduledAt.message}
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
        {isSubmitting ? 'Creating...' : 'Create Physical Verification'}
      </Button>
    </form>
  );
}
