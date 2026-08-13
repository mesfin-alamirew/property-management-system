'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  ownershipSchema,
  type OwnershipFormData,
} from '../schemas/ownership.schema';

import {
  createOwnershipAction,
  updateOwnershipAction,
} from '../actions/ownership.actions';

import type { OwnershipWithRelations } from '../types/ownership.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type OwnershipFormProps = {
  ownership?: OwnershipWithRelations | null;

  properties: {
    id: string;
    propertyCode: string;
    name: string;
  }[];

  ownershipTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function OwnershipForm({
  ownership,
  properties,
  ownershipTypes,
  onSuccess,
}: OwnershipFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof ownershipSchema>,
    unknown,
    z.output<typeof ownershipSchema>
  >({
    resolver: zodResolver(ownershipSchema),

    defaultValues: {
      propertyId: ownership?.propertyId ?? '',
      ownershipTypeId: ownership?.ownershipTypeId ?? '',

      startDate: ownership?.startDate
        ? new Date(ownership.startDate).toISOString().split('T')[0]
        : '',

      endDate: ownership?.endDate
        ? new Date(ownership.endDate).toISOString().split('T')[0]
        : '',

      acquisitionDate: ownership?.acquisitionDate
        ? new Date(ownership.acquisitionDate).toISOString().split('T')[0]
        : '',

      acquisitionPrice:
        ownership?.acquisitionPrice !== null &&
        ownership?.acquisitionPrice !== undefined
          ? ownership.acquisitionPrice.toString()
          : '',

      acquisitionCurrency: ownership?.acquisitionCurrency ?? '',

      deedNumber: ownership?.deedNumber ?? '',

      legalReference: ownership?.legalReference ?? '',

      registrationAuthority: ownership?.registrationAuthority ?? '',

      notes: ownership?.notes ?? '',
    },
  });

  async function onSubmit(data: OwnershipFormData) {
    const result = ownership
      ? await updateOwnershipAction(ownership.id, data)
      : await createOwnershipAction(data);

    if (result.success) {
      toast.success(
        ownership
          ? 'Ownership updated successfully'
          : 'Ownership created successfully',
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
      {/* Relationships */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Relationships</h3>

        <div className="space-y-2">
          <label htmlFor="propertyId" className="text-sm font-medium">
            Property <span className="text-destructive">*</span>
          </label>

          <select
            id="propertyId"
            {...register('propertyId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Property</option>

            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.propertyCode} - {property.name}
              </option>
            ))}
          </select>

          {errors.propertyId?.message && (
            <p className="text-sm text-destructive">
              {errors.propertyId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="ownershipTypeId" className="text-sm font-medium">
            Ownership Type <span className="text-destructive">*</span>
          </label>

          <select
            id="ownershipTypeId"
            {...register('ownershipTypeId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Ownership Type</option>

            {ownershipTypes.map((ownershipType) => (
              <option key={ownershipType.id} value={ownershipType.id}>
                {ownershipType.code} - {ownershipType.name}
              </option>
            ))}
          </select>

          {errors.ownershipTypeId?.message && (
            <p className="text-sm text-destructive">
              {errors.ownershipTypeId.message}
            </p>
          )}
        </div>
      </div>

      {/* Ownership Period */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Ownership Period</h3>

        <TextField
          label="Start Date"
          type="date"
          required
          error={errors.startDate?.message}
          {...register('startDate')}
        />

        <TextField
          label="End Date"
          type="date"
          error={errors.endDate?.message}
          {...register('endDate')}
        />
      </div>

      {/* Acquisition */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Acquisition</h3>

        <TextField
          label="Acquisition Date"
          type="date"
          error={errors.acquisitionDate?.message}
          {...register('acquisitionDate')}
        />

        <TextField
          label="Acquisition Price"
          type="number"
          min="0"
          step="any"
          error={errors.acquisitionPrice?.message}
          {...register('acquisitionPrice')}
        />

        <TextField
          label="Currency"
          error={errors.acquisitionCurrency?.message}
          {...register('acquisitionCurrency')}
        />

        <TextField
          label="Deed Number"
          error={errors.deedNumber?.message}
          {...register('deedNumber')}
        />
      </div>

      {/* Legal Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Legal Information</h3>

        <TextField
          label="Legal Reference"
          error={errors.legalReference?.message}
          {...register('legalReference')}
        />

        <TextField
          label="Registration Authority"
          error={errors.registrationAuthority?.message}
          {...register('registrationAuthority')}
        />
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Additional Information</h3>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? ownership
            ? 'Updating...'
            : 'Saving...'
          : ownership
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
