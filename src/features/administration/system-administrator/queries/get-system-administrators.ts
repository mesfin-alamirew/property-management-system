import { requirePermission } from '@/lib/authorization/authorization.service';

import { findActiveSystemAdministrators } from '../repositories/system-administrator.repository';
import type { SystemAdministratorListItem } from '../types/system-administrator.types';

export async function getSystemAdministrators(
  userId: string,
): Promise<SystemAdministratorListItem[]> {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_ADMINISTRATOR:READ',
  });

  const administrators = await findActiveSystemAdministrators();

  return administrators.map((administrator) => ({
    id: administrator.id,
    userId: administrator.userId,
    username: administrator.user.username,
    displayName: administrator.user.displayName,
    assignedAt: administrator.assignedAt,
    assignedByUserId: administrator.assignedByUserId,
    assignedByUsername: administrator.assignedByUser.username,
  }));
}
