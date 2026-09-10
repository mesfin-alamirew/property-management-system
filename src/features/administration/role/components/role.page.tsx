import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getRoles } from '../queries/role.queries';

import { RoleWorkspace } from './role-workspace';

export async function RolePage() {
  const user = await requireCurrentUser();

  let roles;

  try {
    roles = await getRoles(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <RoleWorkspace roles={roles} />;
}
