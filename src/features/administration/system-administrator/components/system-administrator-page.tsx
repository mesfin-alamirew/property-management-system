import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { authorize } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import { getSystemAdministrators } from '../queries/get-system-administrators';
import { getAssignableSystemAdministratorUsers } from '../queries/get-assignable-system-administrator-users';

import { SystemAdministratorWorkspace } from './system-administrator-workspace';

export async function SystemAdministratorPage() {
  const user = await requireCurrentUser();

  let administrators;
  let assignableUsers;

  try {
    administrators = await getSystemAdministrators(user.id);
    assignableUsers = await getAssignableSystemAdministratorUsers(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [createAuthorization, deleteAuthorization] = await Promise.all([
    authorize({
      userId: user.id,
      permissionCode: 'SYSTEM_ADMINISTRATOR:CREATE',
    }),
    authorize({
      userId: user.id,
      permissionCode: 'SYSTEM_ADMINISTRATOR:DELETE',
    }),
  ]);

  return (
    <SystemAdministratorWorkspace
      administrators={administrators}
      assignableUsers={assignableUsers}
      canCreate={createAuthorization.allowed}
      canDelete={deleteAuthorization.allowed}
    />
  );
}
