'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { roleSchema, type RoleFormData } from '../schemas/role.schema';

import { createRoleAction, updateRoleAction } from '../actions/role.actions';

import type { RoleListItem } from '../types/role.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type RoleFormProps = {
  role?: RoleListItem | null;
  onSuccess?: () => void;
};

export function RoleForm({ role, onSuccess }: RoleFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof roleSchema>, unknown, z.output<typeof roleSchema>>(
    {
      resolver: zodResolver(roleSchema),

      defaultValues: {
        code: role?.code ?? '',
        name: role?.name ?? '',
        description: role?.description ?? '',
      },
    },
  );

  async function onSubmit(data: RoleFormData) {
    const result = role
      ? await updateRoleAction(role.id, {
          name: data.name,
          description: data.description,
        })
      : await createRoleAction(data);

    if (result.success) {
      toast.success(
        role ? 'Role updated successfully' : 'Role created successfully',
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
          label="Role Code"
          required
          disabled={!!role}
          error={errors.code?.message}
          {...register('code')}
        />

        <TextField
          label="Role Name"
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
          ? role
            ? 'Updating...'
            : 'Saving...'
          : role
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
