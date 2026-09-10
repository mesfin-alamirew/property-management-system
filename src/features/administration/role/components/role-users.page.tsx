import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import {
  getRoleById,
  getRoleUsers,
  getAssignableUsers,
} from '../queries/role.queries';

import { RoleUsersWorkspace } from './role-users.workspace';

type RoleUsersPageProps = {
  roleId: string;
};

export async function RoleUsersPage({ roleId }: RoleUsersPageProps) {
  const user = await requireCurrentUser();

  let role;
  let roleUsers;
  let assignableUsers;

  try {
    role = await getRoleById(user.id, roleId);

    [roleUsers, assignableUsers] = await Promise.all([
      getRoleUsers(user.id, roleId),
      getAssignableUsers(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <RoleUsersWorkspace
      role={role}
      roleUsers={roleUsers}
      assignableUsers={assignableUsers}
    />
  );
}
