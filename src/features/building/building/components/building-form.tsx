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

import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

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

  const propertyOptions = properties.map((property) => ({
    value: property.id,
    label: `${property.propertyCode} - ${property.name}`,
  }));

  const buildingTypeOptions = buildingTypes.map((buildingType) => ({
    value: buildingType.id,
    label: `${buildingType.code} - ${buildingType.name}`,
  }));

  const buildingConditionOptions = buildingConditions.map(
    (buildingCondition) => ({
      value: buildingCondition.id,
      label: `${buildingCondition.code} - ${buildingCondition.name}`,
    }),
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Identity</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the building&apos;s identifying and descriptive information.
          </p>
        </div>

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

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Relationships
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Associate the building with its property and classification records.
          </p>
        </div>

        <SelectField
          label="Property"
          required
          options={propertyOptions}
          placeholder="Select property"
          error={errors.propertyId?.message}
          {...register('propertyId')}
        />

        <SelectField
          label="Building Type"
          required
          options={buildingTypeOptions}
          placeholder="Select building type"
          error={errors.buildingTypeId?.message}
          {...register('buildingTypeId')}
        />

        <SelectField
          label="Building Condition"
          options={buildingConditionOptions}
          placeholder="None"
          error={errors.buildingConditionId?.message}
          {...register('buildingConditionId')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Physical Characteristics
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record the building&apos;s capacity and structural characteristics.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Areas</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record the building&apos;s total and usable floor areas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Construction
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record construction and renovation information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Additional Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record accessibility information and any additional notes.
          </p>
        </div>

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

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? building
              ? 'Updating...'
              : 'Saving...'
            : building
              ? 'Update Building'
              : 'Save Building'}
        </Button>
      </div>
    </form>
  );
}
