import { requireCurrentUser } from '@/lib/auth/require-current-user';

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

  const role = await getRoleById(user.id, roleId);

  const [rolePermissions, availablePermissions] = await Promise.all([
    getRolePermissions(user.id, roleId),
    getAvailablePermissions(user.id),
  ]);

  return (
    <RolePermissionsWorkspace
      role={role}
      permissions={rolePermissions.map((item) => item.permission)}
      availablePermissions={availablePermissions}
    />
  );
}
