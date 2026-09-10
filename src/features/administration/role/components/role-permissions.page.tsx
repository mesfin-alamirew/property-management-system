import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import {
  getRoleById,
  getRolePermissions,
  getAvailablePermissions,
} from '../queries/role.queries';

import { RolePermissionsWorkspace } from './role-permissions.workspace';

type RolePermissionsPageProps = {
  roleId: string;
};

export async function RolePermissionsPage({
  roleId,
}: RolePermissionsPageProps) {
  const user = await requireCurrentUser();

  let role;
  let rolePermissions;
  let availablePermissions;

  try {
    role = await getRoleById(user.id, roleId);

    [rolePermissions, availablePermissions] = await Promise.all([
      getRolePermissions(user.id, roleId),
      getAvailablePermissions(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <RolePermissionsWorkspace
      role={role}
      permissions={rolePermissions.map((item) => item.permission)}
      availablePermissions={availablePermissions}
    />
  );
}
