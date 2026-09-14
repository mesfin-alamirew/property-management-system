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
import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Relationships */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Relationships
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Select the property and ownership type associated with this record.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Property"
            required
            error={errors.propertyId?.message}
            options={properties.map((property) => ({
              value: property.id,
              label: `${property.propertyCode} - ${property.name}`,
            }))}
            placeholder="Select Property"
            {...register('propertyId')}
          />

          <SelectField
            label="Ownership Type"
            required
            error={errors.ownershipTypeId?.message}
            options={ownershipTypes.map((ownershipType) => ({
              value: ownershipType.id,
              label: `${ownershipType.code} - ${ownershipType.name}`,
            }))}
            placeholder="Select Ownership Type"
            {...register('ownershipTypeId')}
          />
        </div>
      </section>

      {/* Ownership Period */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Ownership Period
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Define when the ownership became effective and, if applicable, when
            it ended.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </section>

      {/* Acquisition */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">Acquisition</h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Record the acquisition date, price, currency, and deed information
            where applicable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </section>

      {/* Legal Information */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Legal Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Capture the legal reference and authority responsible for the
            ownership registration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </section>

      {/* Additional Information */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Additional Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Add any additional notes that may be useful for managing this
            ownership record.
          </p>
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </section>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? ownership
              ? 'Updating...'
              : 'Saving...'
            : ownership
              ? 'Update Ownership'
              : 'Save Ownership'}
        </Button>
      </div>
    </form>
  );
}
