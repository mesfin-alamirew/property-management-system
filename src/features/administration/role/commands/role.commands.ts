import { AppError } from '@/lib/errors';

import { requirePermission } from '@/lib/authorization/authorization.service';

import {
  findRoleById,
  findRoleByCode,
  createRoleRecord,
  updateRoleRecord,
  deactivateRoleRecord,
  activateRoleRecord,
} from '../repositories/role.repository';

import type { CreateRoleInput, UpdateRoleInput } from '../types/role.types';

export async function createRole(userId: string, data: CreateRoleInput) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE:CREATE',
  });

  const existingRole = await findRoleByCode(data.code);

  if (existingRole) {
    throw new AppError('Role code already exists', 'DUPLICATE_CODE');
  }

  return createRoleRecord(data);
}

export async function updateRole(
  userId: string,
  id: string,
  data: UpdateRoleInput,
) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE:UPDATE',
  });

  const role = await findRoleById(id);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (!role.isActive) {
    throw new AppError('Role is inactive', 'ROLE_INACTIVE');
  }

  return updateRoleRecord(id, data);
}
export async function activateRole(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE:ACTIVATE',
  });

  const role = await findRoleById(id);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (role.isActive) {
    throw new AppError('Role is already active', 'ROLE_ALREADY_ACTIVE');
  }

  if (role.code === 'SYSTEM_ADMIN') {
    throw new AppError(
      'The SYSTEM_ADMIN role cannot be modified through normal role management',
      'SYSTEM_ROLE_PROTECTED',
    );
  }

  return activateRoleRecord(id);
}
export async function deactivateRole(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ROLE:DEACTIVATE',
  });

  const role = await findRoleById(id);

  if (!role) {
    throw new AppError('Role not found', 'ROLE_NOT_FOUND');
  }

  if (!role.isActive) {
    throw new AppError('Role is already inactive', 'ROLE_ALREADY_INACTIVE');
  }

  if (role.code === 'SYSTEM_ADMIN') {
    throw new AppError(
      'The SYSTEM_ADMIN role cannot be deactivated',
      'SYSTEM_ROLE_PROTECTED',
    );
  }

  return deactivateRoleRecord(id);
}
