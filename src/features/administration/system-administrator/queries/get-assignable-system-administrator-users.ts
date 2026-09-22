import { requirePermission } from '@/lib/authorization/authorization.service';

import { findAssignableSystemAdministratorUsers } from '../repositories/system-administrator.repository';

export async function getAssignableSystemAdministratorUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_ADMINISTRATOR:READ',
  });

  return findAssignableSystemAdministratorUsers();
}
