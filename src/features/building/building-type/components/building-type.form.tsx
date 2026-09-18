'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingType } from '@/generated/prisma/client';

import {
  buildingTypeSchema,
  type BuildingTypeFormData,
} from '../schemas/building-type.schema';

import {
  createBuildingTypeAction,
  updateBuildingTypeAction,
} from '../actions/building-type.actions';

import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

type BuildingTypeFormProps = {
  buildingType?: BuildingType | null;
  onSuccess?: () => void;
};

export function BuildingTypeForm({
  buildingType,
  onSuccess,
}: BuildingTypeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof buildingTypeSchema>,
    unknown,
    z.output<typeof buildingTypeSchema>
  >({
    resolver: zodResolver(buildingTypeSchema),

    defaultValues: {
      code: buildingType?.code ?? '',
      name: buildingType?.name ?? '',
      description: buildingType?.description ?? '',
    },
  });

  async function onSubmit(data: BuildingTypeFormData) {
    const result = buildingType
      ? await updateBuildingTypeAction(buildingType.id, data)
      : await createBuildingTypeAction(data);

    if (result.success) {
      toast.success(
        buildingType
          ? 'Building Type updated successfully'
          : 'Building Type created successfully',
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
            Building Type Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the identifying and descriptive information for this building
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
            ? buildingType
              ? 'Updating...'
              : 'Saving...'
            : buildingType
              ? 'Update Building Type'
              : 'Save Building Type'}
        </Button>
      </div>
    </form>
  );
}
