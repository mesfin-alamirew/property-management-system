'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  buildingSchema,
  type BuildingFormData,
} from '../schemas/building.schema';

import {
  createBuildingAction,
  updateBuildingAction,
} from '../actions/building.actions';

import type { BuildingWithRelations } from '../types/building.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type BuildingFormProps = {
  building?: BuildingWithRelations | null;

  properties: {
    id: string;
    propertyCode: string;
    name: string;
  }[];

  buildingTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  buildingConditions: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function BuildingForm({
  building,
  properties,
  buildingTypes,
  buildingConditions,
  onSuccess,
}: BuildingFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof buildingSchema>,
    unknown,
    z.output<typeof buildingSchema>
  >({
    resolver: zodResolver(buildingSchema),

    defaultValues: {
      propertyId: building?.propertyId ?? '',
      buildingCode: building?.buildingCode ?? '',
      name: building?.name ?? '',
      description: building?.description ?? '',
      buildingTypeId: building?.buildingTypeId ?? '',
      buildingConditionId: building?.buildingConditionId ?? '',

      numberOfFloors:
        building?.numberOfFloors !== null &&
        building?.numberOfFloors !== undefined
          ? building.numberOfFloors.toString()
          : '',

      numberOfBasements:
        building?.numberOfBasements !== null &&
        building?.numberOfBasements !== undefined
          ? building.numberOfBasements.toString()
          : '',
      yearBuilt:
        building?.yearBuilt !== null && building?.yearBuilt !== undefined
          ? building.yearBuilt.toString()
          : '',
      yearRenovated:
        building?.yearRenovated !== null &&
        building?.yearRenovated !== undefined
          ? building.yearRenovated.toString()
          : '',

      floorAreaSqm:
        building?.floorAreaSqm !== null && building?.floorAreaSqm !== undefined
          ? building.floorAreaSqm
          : '',

      usableAreaSqm:
        building?.usableAreaSqm !== null &&
        building?.usableAreaSqm !== undefined
          ? building.usableAreaSqm
          : '',

      numberOfRooms:
        building?.numberOfRooms !== null &&
        building?.numberOfRooms !== undefined
          ? building.numberOfRooms.toString()
          : '',

      numberOfUnits:
        building?.numberOfUnits !== null &&
        building?.numberOfUnits !== undefined
          ? building.numberOfUnits.toString()
          : '',

      parkingCapacity:
        building?.parkingCapacity !== null &&
        building?.parkingCapacity !== undefined
          ? building.parkingCapacity.toString()
          : '',
      accessibilityFeatures: building?.accessibilityFeatures ?? '',
      notes: building?.notes ?? '',
    },
  });

  async function onSubmit(data: BuildingFormData) {
    const result = building
      ? await updateBuildingAction(building.id, data)
      : await createBuildingAction(data);

    if (result.success) {
      toast.success(
        building
          ? 'Building updated successfully'
          : 'Building created successfully',
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
      {/* Identity */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Identity</h3>

        <TextField
          label="Building Code"
          required
          error={errors.buildingCode?.message}
          {...register('buildingCode')}
        />

        <TextField
          label="Building Name"
          required
          error={errors.name?.message}
          {...register('name')}
        />

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

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
          <label htmlFor="buildingTypeId" className="text-sm font-medium">
            Building Type <span className="text-destructive">*</span>
          </label>

          <select
            id="buildingTypeId"
            {...register('buildingTypeId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Building Type</option>

            {buildingTypes.map((buildingType) => (
              <option key={buildingType.id} value={buildingType.id}>
                {buildingType.name}
              </option>
            ))}
          </select>

          {errors.buildingTypeId?.message && (
            <p className="text-sm text-destructive">
              {errors.buildingTypeId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="buildingConditionId" className="text-sm font-medium">
            Building Condition
          </label>

          <select
            id="buildingConditionId"
            {...register('buildingConditionId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">None</option>

            {buildingConditions.map((buildingCondition) => (
              <option key={buildingCondition.id} value={buildingCondition.id}>
                {buildingCondition.name}
              </option>
            ))}
          </select>

          {errors.buildingConditionId?.message && (
            <p className="text-sm text-destructive">
              {errors.buildingConditionId.message}
            </p>
          )}
        </div>
      </div>

      {/* Physical Characteristics */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Physical Characteristics</h3>

        <TextField
          label="Number of Floors"
          type="number"
          min="0"
          step="1"
          error={errors.numberOfFloors?.message}
          {...register('numberOfFloors')}
        />

        <TextField
          label="Number of Basements"
          type="number"
          min="0"
          step="1"
          error={errors.numberOfBasements?.message}
          {...register('numberOfBasements')}
        />

        <TextField
          label="Number of Rooms"
          type="number"
          min="0"
          step="1"
          error={errors.numberOfRooms?.message}
          {...register('numberOfRooms')}
        />

        <TextField
          label="Number of Units"
          type="number"
          min="0"
          step="1"
          error={errors.numberOfUnits?.message}
          {...register('numberOfUnits')}
        />

        <TextField
          label="Parking Capacity"
          type="number"
          min="0"
          step="1"
          error={errors.parkingCapacity?.message}
          {...register('parkingCapacity')}
        />
      </div>

      {/* Areas */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Areas</h3>

        <TextField
          label="Floor Area (sqm)"
          type="number"
          min="0"
          step="any"
          error={errors.floorAreaSqm?.message}
          {...register('floorAreaSqm')}
        />

        <TextField
          label="Usable Area (sqm)"
          type="number"
          min="0"
          step="any"
          error={errors.usableAreaSqm?.message}
          {...register('usableAreaSqm')}
        />
      </div>

      {/* Construction */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Construction</h3>
        <TextField
          label="Year Built"
          type="number"
          min="1800"
          max={new Date().getFullYear()}
          step="1"
          error={errors.yearBuilt?.message}
          {...register('yearBuilt')}
        />

        <TextField
          label="Year Renovated"
          type="number"
          min="1800"
          max={new Date().getFullYear()}
          step="1"
          error={errors.yearRenovated?.message}
          {...register('yearRenovated')}
        />
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Additional Information</h3>
        <TextAreaField
          label="Accessibility Features"
          error={errors.accessibilityFeatures?.message}
          {...register('accessibilityFeatures')}
        />
        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? building
            ? 'Updating...'
            : 'Saving...'
          : building
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
