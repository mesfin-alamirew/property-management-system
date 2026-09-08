'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { removePermissionFromRoleAction } from '../actions/role.actions';

import type { RoleDetails, RolePermissionItem } from '../types/role.types';

import { RolePermissionForm } from './role-permission-form';
import { RolePermissionTable } from './role-permission-table';
import Link from 'next/link';
type RolePermissionsWorkspaceProps = {
  role: RoleDetails;

  permissions: RolePermissionItem[];

  availablePermissions: RolePermissionItem[];
};

export function RolePermissionsWorkspace({
  role,
  permissions,
  availablePermissions,
}: RolePermissionsWorkspaceProps) {
  const router = useRouter();

  const [permissionToRemove, setPermissionToRemove] =
    useState<RolePermissionItem | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [removingPermissionId, setRemovingPermissionId] = useState<
    string | null
  >(null);

  const isSystemAdmin = role.code === 'SYSTEM_ADMIN';

  function handleRemove(permission: RolePermissionItem) {
    setPermissionToRemove(permission);
    setIsConfirmationOpen(true);
  }

  async function confirmRemove() {
    if (!permissionToRemove || isSystemAdmin) {
      return;
    }

    try {
      setRemovingPermissionId(permissionToRemove.id);

      const result = await removePermissionFromRoleAction(
        role.id,
        permissionToRemove.id,
      );

      if (result.success) {
        toast.success('Permission removed successfully');

        setIsConfirmationOpen(false);
        setPermissionToRemove(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setRemovingPermissionId(null);
    }
  }

  return (
    <MasterDataLayout
      title={`Permissions — ${role.name}`}
      description={`Manage permissions assigned to the ${role.name} role.`}
    >
      <div className="mb-4">
        <Link
          href="/administration/roles"
          className="text-sm font-medium hover:underline"
        >
          ← Back to Roles
        </Link>
      </div>
      <div className="space-y-6">
        <div className="rounded-md border p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">{role.name}</h2>

            <p className="text-sm text-muted-foreground">Code: {role.code}</p>

            {role.description && (
              <p className="text-sm text-muted-foreground">
                {role.description}
              </p>
            )}
          </div>
        </div>

        {!isSystemAdmin && (
          <RolePermissionForm
            roleId={role.id}
            availablePermissions={availablePermissions}
            assignedPermissionIds={permissions.map(
              (permission) => permission.id,
            )}
          />
        )}

        {isSystemAdmin && (
          <div className="rounded-md border p-4 text-sm">
            Permissions for the SYSTEM_ADMIN role cannot be modified through
            normal role management.
          </div>
        )}

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Assigned Permissions</h2>

          <RolePermissionTable
            permissions={permissions}
            onRemove={handleRemove}
            removingId={removingPermissionId}
            disabled={isSystemAdmin}
          />
        </div>
      </div>

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Remove Permission"
        description={
          permissionToRemove
            ? `Are you sure you want to remove "${permissionToRemove.code}" from "${role.name}"?`
            : ''
        }
        confirmLabel="Remove"
        loading={removingPermissionId !== null}
        onConfirm={confirmRemove}
      />
    </MasterDataLayout>
  );
}
