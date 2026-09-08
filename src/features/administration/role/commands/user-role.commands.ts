import { AppError } from '@/lib/errors';

import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findRoleById,
  findActiveUserRole,
  findActiveSystemAdminRole,
  createUserRoleRecord,
  removeUserRoleRecord,
} from '../repositories/role.repository';

import { prisma } from '@/lib/prisma';

export async function assignRoleToUser(
  userId: string,
  targetUserId: string,
  roleId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'USER_ROLE:CREATE',
  });

  const targetUser = await prisma.user.findUnique({
    where: {
      id: targetUserId,
    },
  });

  if (!targetUser) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!targetUser.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }
  const role = await findRoleById(roleId);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (!role.isActive) {
    throw new AppError('Role is inactive', 'ROLE_INACTIVE');
  }

  if (role.code === 'SYSTEM_ADMIN') {
    throw new AppError(
      'The SYSTEM_ADMIN role cannot be assigned through normal role management',
      'SYSTEM_ROLE_PROTECTED',
    );
  }
  const existingSystemAdminRole = await findActiveSystemAdminRole(targetUserId);

  if (existingSystemAdminRole) {
    throw new AppError(
      'Users with the SYSTEM_ADMIN role cannot be assigned additional roles',
      'SYSTEM_ADMIN_USER_PROTECTED',
    );
  }

  const existingUserRole = await findActiveUserRole(targetUserId, roleId);

  if (existingUserRole) {
    throw new AppError(
      'Role is already assigned to this user',
      'DUPLICATE_USER_ROLE',
    );
  }

  return createUserRoleRecord(targetUserId, roleId, userId);
}

export async function removeRoleFromUser(
  userId: string,
  targetUserId: string,
  roleId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'USER_ROLE:DELETE',
  });

  const role = await findRoleById(roleId);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (role.code === 'SYSTEM_ADMIN') {
    throw new AppError(
      'The SYSTEM_ADMIN role cannot be removed through normal role management',
      'SYSTEM_ROLE_PROTECTED',
    );
  }

  const existingUserRole = await findActiveUserRole(targetUserId, roleId);

  if (!existingUserRole) {
    throw new AppError(
      'Active role assignment not found',
      'USER_ROLE_NOT_FOUND',
    );
  }

  return removeUserRoleRecord(existingUserRole.id, userId);
}
