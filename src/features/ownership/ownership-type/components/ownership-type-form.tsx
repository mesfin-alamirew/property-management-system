'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  ownershipTypeSchema,
  type OwnershipTypeFormData,
} from '../schemas/ownership-type.schema';

import {
  createOwnershipTypeAction,
  updateOwnershipTypeAction,
} from '../actions/ownership-type.actions';

import type { OwnershipType } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type OwnershipTypeFormProps = {
  ownershipType?: OwnershipType | null;

  onSuccess?: () => void;
};

export function OwnershipTypeForm({
  ownershipType,
  onSuccess,
}: OwnershipTypeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof ownershipTypeSchema>,
    unknown,
    z.output<typeof ownershipTypeSchema>
  >({
    resolver: zodResolver(ownershipTypeSchema),

    defaultValues: {
      code: ownershipType?.code ?? '',
      name: ownershipType?.name ?? '',
      description: ownershipType?.description ?? '',
    },
  });

  async function onSubmit(data: OwnershipTypeFormData) {
    const result = ownershipType
      ? await updateOwnershipTypeAction(ownershipType.id, data)
      : await createOwnershipTypeAction(data);

    if (result.success) {
      toast.success(
        ownershipType
          ? 'Ownership Type updated successfully'
          : 'Ownership Type created successfully',
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? ownershipType
            ? 'Updating...'
            : 'Saving...'
          : ownershipType
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
