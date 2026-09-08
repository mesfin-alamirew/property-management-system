import { requireCurrentUser } from '@/lib/auth/require-current-user';

import { getRoles } from '../queries/role.queries';

import { RoleWorkspace } from './role-workspace';

export async function RolePage() {
  const user = await requireCurrentUser();

  const roles = await getRoles(user.id);

  return <RoleWorkspace roles={roles} />;
}
