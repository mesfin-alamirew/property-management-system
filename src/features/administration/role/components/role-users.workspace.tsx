'use client';

import { useState } from 'react';
import Link from 'next/link';

import type { RoleDetails, UserRoleItem } from '../types/role.types';

import { RoleUserForm } from './role-user.form';
import { RoleUsersTable } from './role-users.table';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { removeRoleFromUserAction } from '../actions/role.actions';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';
type RoleUsersWorkspaceProps = {
  role: RoleDetails;
  roleUsers: UserRoleItem[];
  assignableUsers: {
    id: string;
    username: string;
    displayName: string;
  }[];
};

export function RoleUsersWorkspace({
  role,
  roleUsers,
  assignableUsers,
}: RoleUsersWorkspaceProps) {
  const router = useRouter();

  const [userToRemove, setUserToRemove] = useState<UserRoleItem | null>(null);

  const [isRemovalConfirmationOpen, setIsRemovalConfirmationOpen] =
    useState(false);

  const [removingId, setRemovingId] = useState<string | null>(null);

  function handleRemove(userRole: UserRoleItem) {
    setUserToRemove(userRole);
    setIsRemovalConfirmationOpen(true);
  }
  async function confirmRemove() {
    if (!userToRemove) {
      return;
    }

    try {
      setRemovingId(userToRemove.id);

      const result = await removeRoleFromUserAction(
        userToRemove.userId,
        userToRemove.roleId,
      );

      if (result.success) {
        toast.success('User removed from role successfully');

        setIsRemovalConfirmationOpen(false);
        setUserToRemove(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setRemovingId(null);
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/administration/roles"
          className="text-sm font-medium hover:underline"
        >
          ← Back to Roles
        </Link>
      </div>

      <div>
        <h1 className="text-xl font-semibold">Role Users</h1>

        <p className="text-sm text-muted-foreground">
          Manage users assigned to this role.
        </p>
      </div>

      <div className="rounded-md border p-4">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Role Information</h2>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <span className="font-medium">Code:</span> {role.code}
            </div>

            <div>
              <span className="font-medium">Name:</span> {role.name}
            </div>

            <div>
              <span className="font-medium">Status:</span>{' '}
              {role.isActive ? 'Active' : 'Inactive'}
            </div>

            <div>
              <span className="font-medium">Assigned Users:</span>{' '}
              {role.activeUserCount}
            </div>
          </div>
        </div>
      </div>

      {role.code !== 'SYSTEM_ADMIN' && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Assign User</h2>

          <RoleUserForm
            roleId={role.id}
            users={assignableUsers}
            assignedUserIds={roleUsers.map((userRole) => userRole.userId)}
            disabled={!role.isActive}
          />
        </div>
      )}

      {role.code === 'SYSTEM_ADMIN' && (
        <div className="rounded-md border p-4 text-sm">
          Users cannot be assigned to or removed from the SYSTEM_ADMIN role
          through normal role management.
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Assigned Users</h2>

        {roleUsers.length === 0 ? (
          <div className="rounded-md border p-4 text-sm text-muted-foreground">
            No users are currently assigned to this role.
          </div>
        ) : (
          <RoleUsersTable
            users={roleUsers}
            onRemove={handleRemove}
            removingId={removingId}
            disabled={!role.isActive || role.code === 'SYSTEM_ADMIN'}
          />
        )}
      </div>
      <ConfirmationDialog
        open={isRemovalConfirmationOpen}
        onOpenChange={setIsRemovalConfirmationOpen}
        title="Remove User from Role"
        description={
          userToRemove
            ? `Are you sure you want to remove "${userToRemove.displayName}" from the "${role.name}" role?`
            : ''
        }
        confirmLabel="Remove"
        loading={removingId !== null}
        onConfirm={confirmRemove}
      />
    </div>
  );
}
