import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import { removeSystemAdministratorAssignment } from '../repositories/system-administrator.repository';

export async function removeSystemAdministrator(
  userId: string,
  targetUserId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_ADMINISTRATOR:DELETE',
  });

  const result = await removeSystemAdministratorAssignment(
    targetUserId,
    userId,
  );

  if (result.status === 'NOT_FOUND') {
    throw new AppError(
      'User is not an active System Administrator',
      'SYSTEM_ADMINISTRATOR_NOT_FOUND',
    );
  }

  if (result.status === 'LAST_ADMIN') {
    throw new AppError(
      'The last active System Administrator cannot be removed',
      'LAST_SYSTEM_ADMINISTRATOR',
    );
  }

  return result.assignment;
}
