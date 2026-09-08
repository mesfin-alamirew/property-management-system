'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { addPermissionToRoleAction } from '../actions/role.actions';

import type { RolePermissionItem } from '../types/role.types';

import { Button } from '@/components/ui/button';

type RolePermissionFormProps = {
  roleId: string;

  availablePermissions: RolePermissionItem[];

  assignedPermissionIds: string[];

  disabled?: boolean;
};

export function RolePermissionForm({
  roleId,
  availablePermissions,
  assignedPermissionIds,
  disabled = false,
}: RolePermissionFormProps) {
  const router = useRouter();

  const [permissionId, setPermissionId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const unassignedPermissions = availablePermissions.filter(
    (permission) => !assignedPermissionIds.includes(permission.id),
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!permissionId) {
      toast.error('Select a permission');

      return;
    }

    try {
      setIsSubmitting(true);

      const result = await addPermissionToRoleAction(roleId, permissionId);

      if (result.success) {
        toast.success('Permission assigned successfully');

        setPermissionId('');

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="permissionId"
          className="mb-2 block text-sm font-medium"
        >
          Permission
        </label>

        <select
          id="permissionId"
          value={permissionId}
          onChange={(event) => setPermissionId(event.target.value)}
          disabled={
            disabled || isSubmitting || unassignedPermissions.length === 0
          }
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select permission</option>

          {unassignedPermissions.map((permission) => (
            <option key={permission.id} value={permission.id}>
              {permission.code} —{' '}
              {permission.description ??
                `${permission.resource} ${permission.action}`}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        disabled={disabled || isSubmitting || !permissionId}
      >
        {isSubmitting ? 'Assigning...' : 'Assign Permission'}
      </Button>
    </form>
  );
}
