'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { BuildingCondition } from '@/generated/prisma/client';

import {
  buildingConditionSchema,
  type BuildingConditionFormData,
} from '../schemas/building-condition.schema';

import {
  createBuildingConditionAction,
  updateBuildingConditionAction,
} from '../actions/building-condition.actions';

import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

type BuildingConditionFormProps = {
  buildingCondition?: BuildingCondition | null;
  onSuccess?: () => void;
};

export function BuildingConditionForm({
  buildingCondition,
  onSuccess,
}: BuildingConditionFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof buildingConditionSchema>,
    unknown,
    z.output<typeof buildingConditionSchema>
  >({
    resolver: zodResolver(buildingConditionSchema),

    defaultValues: {
      code: buildingCondition?.code ?? '',
      name: buildingCondition?.name ?? '',
      description: buildingCondition?.description ?? '',
    },
  });

  async function onSubmit(data: BuildingConditionFormData) {
    const result = buildingCondition
      ? await updateBuildingConditionAction(buildingCondition.id, data)
      : await createBuildingConditionAction(data);

    if (result.success) {
      toast.success(
        buildingCondition
          ? 'Building Condition updated successfully'
          : 'Building Condition created successfully',
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
            Building Condition Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the identifying and descriptive information for this building
            condition.
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
            ? buildingCondition
              ? 'Updating...'
              : 'Saving...'
            : buildingCondition
              ? 'Update Building Condition'
              : 'Save Building Condition'}
        </Button>
      </div>
    </form>
  );
}
