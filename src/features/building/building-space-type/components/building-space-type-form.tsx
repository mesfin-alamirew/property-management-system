'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingSpaceType } from '@/generated/prisma/client';

import {
  buildingSpaceTypeSchema,
  type BuildingSpaceTypeFormData,
} from '../schemas/building-space-type.schema';

import {
  createBuildingSpaceTypeAction,
  updateBuildingSpaceTypeAction,
} from '../actions/building-space-type.actions';

import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

type BuildingSpaceTypeFormProps = {
  spaceType?: BuildingSpaceType | null;
  onSuccess?: () => void;
};

export function BuildingSpaceTypeForm({
  spaceType,
  onSuccess,
}: BuildingSpaceTypeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof buildingSpaceTypeSchema>,
    unknown,
    z.output<typeof buildingSpaceTypeSchema>
  >({
    resolver: zodResolver(buildingSpaceTypeSchema),

    defaultValues: {
      code: spaceType?.code ?? '',
      name: spaceType?.name ?? '',
      description: spaceType?.description ?? '',
    },
  });

  async function onSubmit(data: BuildingSpaceTypeFormData) {
    const result = spaceType
      ? await updateBuildingSpaceTypeAction(spaceType.id, data)
      : await createBuildingSpaceTypeAction(data);

    if (result.success) {
      toast.success(
        spaceType
          ? 'Building Space Type updated successfully'
          : 'Building Space Type created successfully',
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
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Space Type Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the identifying and descriptive information for this space
            type.
          </p>
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

        <TextAreaField
          label="Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? spaceType
              ? 'Updating...'
              : 'Saving...'
            : spaceType
              ? 'Update Space Type'
              : 'Save Space Type'}
        </Button>
      </div>
    </form>
  );
}
