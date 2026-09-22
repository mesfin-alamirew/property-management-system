import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  createSystemAdministratorAssignment,
  findActiveSystemAdministrator,
  findSystemAdminRole,
  findUserForSystemAdministratorAssignment,
} from '../repositories/system-administrator.repository';

export async function assignSystemAdministrator(
  userId: string,
  targetUserId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'SYSTEM_ADMINISTRATOR:CREATE',
  });

  const targetUser =
    await findUserForSystemAdministratorAssignment(targetUserId);

  if (!targetUser) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!targetUser.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const hasAzureAdIdentity = targetUser.identities.some(
    (identity) => identity.provider === 'AZURE_AD',
  );

  if (!hasAzureAdIdentity) {
    throw new AppError(
      'User does not have an Azure AD identity',
      'AZURE_AD_IDENTITY_REQUIRED',
    );
  }

  const role = await findSystemAdminRole();

  if (!role) {
    throw new AppError(
      'The SYSTEM_ADMIN role was not found',
      'SYSTEM_ROLE_NOT_FOUND',
    );
  }

  if (!role.isActive) {
    throw new AppError(
      'The SYSTEM_ADMIN role is inactive',
      'SYSTEM_ROLE_INACTIVE',
    );
  }

  const existingAssignment = await findActiveSystemAdministrator(targetUserId);

  if (existingAssignment) {
    throw new AppError(
      'User is already a System Administrator',
      'DUPLICATE_SYSTEM_ADMINISTRATOR',
    );
  }

  return createSystemAdministratorAssignment(targetUserId, role.id, userId);
}
