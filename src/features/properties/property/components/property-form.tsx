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

import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

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

  const organizationUnitOptions = organizationUnits.map((organizationUnit) => ({
    value: organizationUnit.id,
    label: `${organizationUnit.code} - ${organizationUnit.name}`,
  }));

  const propertyTypeOptions = propertyTypes.map((propertyType) => ({
    value: propertyType.id,
    label: `${propertyType.code} - ${propertyType.name}`,
  }));

  const propertyCategoryOptions = propertyCategories.map(
    (propertyCategory) => ({
      value: propertyCategory.id,
      label: `${propertyCategory.code} - ${propertyCategory.name}`,
    }),
  );

  const propertyTenureOptions = propertyTenures.map((propertyTenure) => ({
    value: propertyTenure.id,
    label: `${propertyTenure.code} - ${propertyTenure.name}`,
  }));

  const propertyStatusOptions = propertyStatuses.map((propertyStatus) => ({
    value: propertyStatus.id,
    label: `${propertyStatus.code} - ${propertyStatus.name}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Property Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the property&apos;s identifying and descriptive information.
          </p>
        </div>

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
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Location</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Provide the property address and geographic coordinates.
          </p>
        </div>

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

        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Physical Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record the property&apos;s construction date and gross area.
          </p>
        </div>

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
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Classification
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Assign the property to its organizational unit and applicable
            classification records.
          </p>
        </div>

        <SelectField
          label="Organization Unit"
          required
          options={organizationUnitOptions}
          placeholder="Select organization unit"
          error={errors.organizationUnitId?.message}
          {...register('organizationUnitId')}
        />

        <SelectField
          label="Property Type"
          required
          options={propertyTypeOptions}
          placeholder="Select property type"
          error={errors.propertyTypeId?.message}
          {...register('propertyTypeId')}
        />

        <SelectField
          label="Property Category"
          options={propertyCategoryOptions}
          placeholder="None"
          error={errors.propertyCategoryId?.message}
          {...register('propertyCategoryId')}
        />

        <SelectField
          label="Property Tenure"
          options={propertyTenureOptions}
          placeholder="None"
          error={errors.propertyTenureId?.message}
          {...register('propertyTenureId')}
        />

        <SelectField
          label="Property Status"
          options={propertyStatusOptions}
          placeholder="None"
          error={errors.propertyStatusId?.message}
          {...register('propertyStatusId')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? property
              ? 'Updating...'
              : 'Saving...'
            : property
              ? 'Update Property'
              : 'Save Property'}
        </Button>
      </div>
    </form>
  );
}
