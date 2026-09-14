'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingSpaceWithRelations } from '../types/building-space.types';

import {
  buildingSpaceSchema,
  type BuildingSpaceFormData,
} from '../schemas/building-space.schema';

import {
  createBuildingSpaceAction,
  updateBuildingSpaceAction,
} from '../actions/building-space.actions';

import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

type BuildingSpaceFormProps = {
  space?: BuildingSpaceWithRelations | null;

  buildings: {
    id: string;
    buildingCode: string;
    name: string;
  }[];

  spaceTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function BuildingSpaceForm({
  space,
  buildings,
  spaceTypes,
  onSuccess,
}: BuildingSpaceFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof buildingSpaceSchema>,
    unknown,
    z.output<typeof buildingSpaceSchema>
  >({
    resolver: zodResolver(buildingSpaceSchema),

    defaultValues: {
      buildingId: space?.buildingId ?? '',
      spaceTypeId: space?.spaceTypeId ?? '',
      code: space?.code ?? '',
      name: space?.name ?? '',
      floorNumber: space?.floorNumber?.toString() ?? '',
      areaSqm: space?.areaSqm?.toString() ?? '',
      capacity: space?.capacity?.toString() ?? '',
      notes: space?.notes ?? '',
    },
  });

  async function onSubmit(data: BuildingSpaceFormData) {
    const result = space
      ? await updateBuildingSpaceAction(space.id, data)
      : await createBuildingSpaceAction(data);

    if (result.success) {
      toast.success(
        space
          ? 'Building Space updated successfully'
          : 'Building Space created successfully',
      );

      reset();
      router.refresh();
      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  const buildingOptions = buildings.map((building) => ({
    value: building.id,
    label: `${building.buildingCode} - ${building.name}`,
  }));

  const spaceTypeOptions = spaceTypes.map((spaceType) => ({
    value: spaceType.id,
    label: `${spaceType.code} - ${spaceType.name}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Space Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Identify the building space and associate it with its building and
            space type.
          </p>
        </div>

        <SelectField
          label="Building"
          required
          options={buildingOptions}
          placeholder="Select building"
          error={errors.buildingId?.message}
          {...register('buildingId')}
        />

        <SelectField
          label="Space Type"
          required
          options={spaceTypeOptions}
          placeholder="Select space type"
          error={errors.spaceTypeId?.message}
          {...register('spaceTypeId')}
        />

        <TextField
          label="Code"
          required
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Name"
          required
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Physical Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Record the location, area, and capacity of the space.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Floor Number"
            type="number"
            step="1"
            error={errors.floorNumber?.message}
            {...register('floorNumber')}
          />

          <TextField
            label="Area (sqm)"
            type="number"
            min="0"
            step="0.01"
            error={errors.areaSqm?.message}
            {...register('areaSqm')}
          />

          <TextField
            label="Capacity"
            type="number"
            min="0"
            step="1"
            error={errors.capacity?.message}
            {...register('capacity')}
          />
        </div>
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Additional Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Add any additional notes about this building space.
          </p>
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? space
              ? 'Updating...'
              : 'Saving...'
            : space
              ? 'Update Building Space'
              : 'Save Building Space'}
        </Button>
      </div>
    </form>
  );
}
