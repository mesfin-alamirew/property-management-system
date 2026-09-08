import { AppError } from '@/lib/errors';
import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findRoles,
  findRoleById,
  findRolePermissions,
  findPermissions,
  findUserRoles,
  findRoleUsers,
  findActiveUsers,
} from '../repositories/role.repository';
import type { UserRoleItem } from '../types/role.types';
export async function getRoles(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE:READ',
  });

  return findRoles();
}

export async function getRoleById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE:READ',
  });

  const role = await findRoleById(id);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  return {
    ...role,
    permissionCount: role.rolePermissions.length,
    activeUserCount: role.userRoles.filter(
      (userRole) => userRole.removedAt === null,
    ).length,
  };
}

export async function getRolePermissions(userId: string, roleId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE_PERMISSION:READ',
  });

  const role = await findRoleById(roleId);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  return findRolePermissions(roleId);
}

export async function getAvailablePermissions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE_PERMISSION:READ',
  });

  return findPermissions();
}

export async function getUserRoles(userId: string, targetUserId: string) {
  await requirePermission({
    userId,
    permissionCode: 'USER_ROLE:READ',
  });

  return findUserRoles(targetUserId);
}
export async function getRoleUsers(
  userId: string,
  roleId: string,
): Promise<UserRoleItem[]> {
  await requirePermission({
    userId,
    permissionCode: 'USER_ROLE:READ',
  });

  const role = await findRoleById(roleId);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  const userRoles = await findRoleUsers(roleId);

  return userRoles.map((userRole) => ({
    id: userRole.id,
    userId: userRole.userId,
    username: userRole.user.username,
    displayName: userRole.user.displayName,
    roleId: userRole.roleId,
    roleCode: userRole.role.code,
    roleName: userRole.role.name,
    assignedAt: userRole.assignedAt,
    assignedByUserId: userRole.assignedByUserId,
    assignedByUsername: userRole.assignedByUser.username,
    removedAt: userRole.removedAt,
    removedByUserId: userRole.removedByUserId,
    removedByUsername: userRole.removedByUser?.username ?? null,
  }));
}
export async function getAssignableUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'USER_ROLE:CREATE',
  });

  return findActiveUsers();
}
