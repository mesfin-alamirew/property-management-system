import { requireCurrentUser } from '@/lib/auth/require-current-user';

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

  const role = await getRoleById(user.id, roleId);

  //const roleUsers = await getRoleUsers(user.id, roleId);

  const [roleUsers, assignableUsers] = await Promise.all([
    getRoleUsers(user.id, roleId),
    getAssignableUsers(user.id),
  ]);

  return (
    <RoleUsersWorkspace
      role={role}
      roleUsers={roleUsers}
      assignableUsers={assignableUsers}
    />
  );
}
