import { AppError } from '@/lib/errors';

import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findRoleById,
  findRolePermission,
  createRolePermissionRecord,
  deleteRolePermissionRecord,
} from '../repositories/role.repository';

import { prisma } from '@/lib/prisma';

export async function addPermissionToRole(
  userId: string,
  roleId: string,
  permissionId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE_PERMISSION:CREATE',
  });

  const role = await findRoleById(roleId);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (!role.isActive) {
    throw new AppError('Role is inactive', 'ROLE_INACTIVE');
  }

  if (role.code === 'SYSTEM_ADMIN') {
    throw new AppError(
      'Permissions for the SYSTEM_ADMIN role cannot be modified',
      'SYSTEM_ROLE_PROTECTED',
    );
  }

  const permission = await prisma.permission.findUnique({
    where: {
      id: permissionId,
    },
  });

  if (!permission) {
    throw new AppError('Permission not found', 'PERMISSION_NOT_FOUND');
  }

  if (!permission.isActive) {
    throw new AppError('Permission is inactive', 'PERMISSION_INACTIVE');
  }

  const existingRolePermission = await findRolePermission(roleId, permissionId);

  if (existingRolePermission) {
    throw new AppError(
      'Permission is already assigned to this role',
      'DUPLICATE_ROLE_PERMISSION',
    );
  }

  return createRolePermissionRecord(roleId, permissionId);
}

export async function removePermissionFromRole(
  userId: string,
  roleId: string,
  permissionId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE_PERMISSION:DELETE',
  });

  const role = await findRoleById(roleId);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (role.code === 'SYSTEM_ADMIN') {
    throw new AppError(
      'Permissions for the SYSTEM_ADMIN role cannot be modified',
      'SYSTEM_ROLE_PROTECTED',
    );
  }

  const rolePermission = await findRolePermission(roleId, permissionId);

  if (!rolePermission) {
    throw new AppError(
      'Permission is not assigned to this role',
      'ROLE_PERMISSION_NOT_FOUND',
    );
  }

  return deleteRolePermissionRecord(roleId, permissionId);
}
