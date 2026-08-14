'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { Property } from '@/generated/prisma/client';

import {
  propertySchema,
  type PropertyFormData,
} from '../schemas/property.schema';

import {
  createPropertyAction,
  updatePropertyAction,
} from '../actions/property.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type PropertyFormProps = {
  property?: Property | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyCategories: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyTenures: {
    id: string;
    code: string;
    name: string;
  }[];

  propertyStatuses: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function PropertyForm({
  property,
  organizationUnits,
  propertyTypes,
  propertyCategories,
  propertyTenures,
  propertyStatuses,
  onSuccess,
}: PropertyFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof propertySchema>,
    unknown,
    z.output<typeof propertySchema>
  >({
    resolver: zodResolver(propertySchema),

    defaultValues: {
      propertyCode: property?.propertyCode ?? '',
      name: property?.name ?? '',
      displayName: property?.displayName ?? '',
      description: property?.description ?? '',
      address: property?.address ?? '',
      city: property?.city ?? '',
      stateProvince: property?.stateProvince ?? '',
      postalCode: property?.postalCode ?? '',
      latitude:
        property?.latitude !== null && property?.latitude !== undefined
          ? property.latitude.toString()
          : '',
      longitude:
        property?.longitude !== null && property?.longitude !== undefined
          ? property.longitude.toString()
          : '',
      constructionDate: property?.constructionDate
        ? property.constructionDate.toISOString().split('T')[0]
        : '',
      grossAreaSqm:
        property?.grossAreaSqm !== null && property?.grossAreaSqm !== undefined
          ? property.grossAreaSqm.toString()
          : '',
      organizationUnitId: property?.organizationUnitId ?? '',
      propertyTypeId: property?.propertyTypeId ?? '',
      propertyCategoryId: property?.propertyCategoryId ?? '',
      propertyTenureId: property?.propertyTenureId ?? '',
      propertyStatusId: property?.propertyStatusId ?? '',
    },
  });

  async function onSubmit(data: PropertyFormData) {
    const result = property
      ? await updatePropertyAction(property.id, data)
      : await createPropertyAction(data);

    if (result.success) {
      toast.success(
        property
          ? 'Property updated successfully'
          : 'Property created successfully',
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <TextField
        label="Property Code"
        required
        error={errors.propertyCode?.message}
        {...register('propertyCode')}
      />

      <TextField
        label="Property Name"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <TextField
        label="Display Name"
        error={errors.displayName?.message}
        {...register('displayName')}
      />

      <TextAreaField
        label="Description"
        error={errors.description?.message}
        {...register('description')}
      />

      <TextAreaField
        label="Address"
        error={errors.address?.message}
        {...register('address')}
      />

      <TextField
        label="City"
        error={errors.city?.message}
        {...register('city')}
      />

      <TextField
        label="State / Province"
        error={errors.stateProvince?.message}
        {...register('stateProvince')}
      />

      <TextField
        label="Postal Code"
        error={errors.postalCode?.message}
        {...register('postalCode')}
      />

      <TextField
        label="Latitude"
        type="number"
        step="any"
        error={errors.latitude?.message}
        {...register('latitude')}
      />

      <TextField
        label="Longitude"
        type="number"
        step="any"
        error={errors.longitude?.message}
        {...register('longitude')}
      />

      <TextField
        label="Construction Date"
        type="date"
        error={errors.constructionDate?.message}
        {...register('constructionDate')}
      />

      <TextField
        label="Gross Area (sqm)"
        type="number"
        step="any"
        error={errors.grossAreaSqm?.message}
        {...register('grossAreaSqm')}
      />

      <div className="space-y-2">
        <label htmlFor="organizationUnitId" className="text-sm font-medium">
          Organization Unit <span className="text-destructive">*</span>
        </label>

        <select
          id="organizationUnitId"
          {...register('organizationUnitId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select Organization Unit</option>

          {organizationUnits.map((organizationUnit) => (
            <option key={organizationUnit.id} value={organizationUnit.id}>
              {organizationUnit.name}
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
        <label htmlFor="propertyTypeId" className="text-sm font-medium">
          Property Type <span className="text-destructive">*</span>
        </label>

        <select
          id="propertyTypeId"
          {...register('propertyTypeId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select Property Type</option>

          {propertyTypes.map((propertyType) => (
            <option key={propertyType.id} value={propertyType.id}>
              {propertyType.name}
            </option>
          ))}
        </select>

        {errors.propertyTypeId?.message && (
          <p className="text-sm text-destructive">
            {errors.propertyTypeId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyCategoryId" className="text-sm font-medium">
          Property Category
        </label>

        <select
          id="propertyCategoryId"
          {...register('propertyCategoryId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">None</option>

          {propertyCategories.map((propertyCategory) => (
            <option key={propertyCategory.id} value={propertyCategory.id}>
              {propertyCategory.name}
            </option>
          ))}
        </select>

        {errors.propertyCategoryId?.message && (
          <p className="text-sm text-destructive">
            {errors.propertyCategoryId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyTenureId" className="text-sm font-medium">
          Property Tenure
        </label>

        <select
          id="propertyTenureId"
          {...register('propertyTenureId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">None</option>

          {propertyTenures.map((propertyTenure) => (
            <option key={propertyTenure.id} value={propertyTenure.id}>
              {propertyTenure.name}
            </option>
          ))}
        </select>

        {errors.propertyTenureId?.message && (
          <p className="text-sm text-destructive">
            {errors.propertyTenureId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="propertyStatusId" className="text-sm font-medium">
          Property Status
        </label>

        <select
          id="propertyStatusId"
          {...register('propertyStatusId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">None</option>

          {propertyStatuses.map((propertyStatus) => (
            <option key={propertyStatus.id} value={propertyStatus.id}>
              {propertyStatus.name}
            </option>
          ))}
        </select>

        {errors.propertyStatusId?.message && (
          <p className="text-sm text-destructive">
            {errors.propertyStatusId.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? property
            ? 'Updating...'
            : 'Saving...'
          : property
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
