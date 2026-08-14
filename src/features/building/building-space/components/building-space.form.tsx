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

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="buildingId" className="mb-2 block text-sm font-medium">
          Building
        </label>

        <select
          id="buildingId"
          {...register('buildingId')}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select building</option>

          {buildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.buildingCode} — {building.name}
            </option>
          ))}
        </select>

        {errors.buildingId?.message && (
          <p className="mt-1 text-sm text-destructive">
            {errors.buildingId.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="spaceTypeId" className="mb-2 block text-sm font-medium">
          Space Type
        </label>

        <select
          id="spaceTypeId"
          {...register('spaceTypeId')}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select space type</option>

          {spaceTypes.map((spaceType) => (
            <option key={spaceType.id} value={spaceType.id}>
              {spaceType.code} — {spaceType.name}
            </option>
          ))}
        </select>

        {errors.spaceTypeId?.message && (
          <p className="mt-1 text-sm text-destructive">
            {errors.spaceTypeId.message}
          </p>
        )}
      </div>

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

      <TextField
        label="Floor Number"
        type="number"
        error={errors.floorNumber?.message}
        {...register('floorNumber')}
      />

      <TextField
        label="Area (sqm)"
        type="number"
        step="0.01"
        error={errors.areaSqm?.message}
        {...register('areaSqm')}
      />

      <TextField
        label="Capacity"
        type="number"
        error={errors.capacity?.message}
        {...register('capacity')}
      />

      <TextAreaField
        label="Notes"
        error={errors.notes?.message}
        {...register('notes')}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? space
            ? 'Updating...'
            : 'Saving...'
          : space
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
