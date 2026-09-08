'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { RoleListItem, RolePermissionItem } from '../types/role.types';

import { RolePermissionForm } from './role-permission-form';
import { RolePermissionTable } from './role-permission-table';

type RolePermissionDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  role: RoleListItem | null;

  permissions: RolePermissionItem[];

  availablePermissions: RolePermissionItem[];

  onRemove: (permission: RolePermissionItem) => void;

  removingId: string | null;
};

export function RolePermissionDialog({
  open,
  onOpenChange,
  role,
  permissions,
  availablePermissions,
  onRemove,
  removingId,
}: RolePermissionDialogProps) {
  if (!role) {
    return null;
  }

  const isSystemAdmin = role.code === 'SYSTEM_ADMIN';

  const assignedPermissionIds = permissions.map((permission) => permission.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Permissions — {role.name}</DialogTitle>

          <DialogDescription>
            View and manage the permissions assigned to this role.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isSystemAdmin && (
            <RolePermissionForm
              roleId={role.id}
              availablePermissions={availablePermissions}
              assignedPermissionIds={assignedPermissionIds}
            />
          )}

          {isSystemAdmin && (
            <div className="rounded-md border p-4 text-sm">
              Permissions for the SYSTEM_ADMIN role cannot be modified through
              normal role management.
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Assigned Permissions</h3>

            <RolePermissionTable
              permissions={permissions}
              onRemove={onRemove}
              removingId={removingId}
              disabled={isSystemAdmin}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
