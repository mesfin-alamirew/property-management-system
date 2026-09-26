import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import {
  findOwnershipTypeById,
  findOwnershipTypeByCode,
  createOwnershipTypeRecord,
  updateOwnershipTypeRecord,
  deactivateOwnershipTypeRecord,
} from '../repositories/ownership-type.repository';

import type { OwnershipTypeFormData } from '../schemas/ownership-type.schema';

export async function createOwnershipType(
  userId: string,
  data: OwnershipTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:CREATE',
  });

  const existingOwnershipType = await findOwnershipTypeByCode(data.code);

  if (existingOwnershipType) {
    throw new AppError('Ownership Type code already exists', 'DUPLICATE_CODE');
  }

  return prisma.$transaction(async (tx) => {
    const ownershipType = await createOwnershipTypeRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.OWNERSHIP_TYPE_CREATED,
      entityType: AUDIT_ENTITY_TYPES.OWNERSHIP_TYPE,
      entityId: ownershipType.id,
      description: `Ownership Type ${ownershipType.code} created`,
      newValue: {
        code: ownershipType.code,
        name: ownershipType.name,
        description: ownershipType.description,
        isActive: ownershipType.isActive,
      },
    });

    return ownershipType;
  });
}

export async function updateOwnershipType(
  userId: string,
  id: string,
  data: OwnershipTypeFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:UPDATE',
  });

  const ownershipType = await findOwnershipTypeById(id);

  if (!ownershipType) {
    throw new AppError('Ownership Type not found', 'OWNERSHIP_TYPE_NOT_FOUND');
  }

  const existingOwnershipType = await findOwnershipTypeByCode(data.code, id);

  if (existingOwnershipType) {
    throw new AppError('Ownership Type code already exists', 'DUPLICATE_CODE');
  }

  return prisma.$transaction(async (tx) => {
    const updatedOwnershipType = await updateOwnershipTypeRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.OWNERSHIP_TYPE_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.OWNERSHIP_TYPE,
      entityId: updatedOwnershipType.id,
      description: `Ownership Type ${updatedOwnershipType.code} updated`,
      oldValue: {
        code: ownershipType.code,
        name: ownershipType.name,
        description: ownershipType.description,
        isActive: ownershipType.isActive,
      },
      newValue: {
        code: updatedOwnershipType.code,
        name: updatedOwnershipType.name,
        description: updatedOwnershipType.description,
        isActive: updatedOwnershipType.isActive,
      },
    });

    return updatedOwnershipType;
  });
}

export async function deactivateOwnershipType(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP_TYPE:DEACTIVATE',
  });

  const ownershipType = await findOwnershipTypeById(id);

  if (!ownershipType) {
    throw new AppError('Ownership Type not found', 'OWNERSHIP_TYPE_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const updatedOwnershipType = await deactivateOwnershipTypeRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.OWNERSHIP_TYPE_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.OWNERSHIP_TYPE,
      entityId: updatedOwnershipType.id,
      description: `Ownership Type ${updatedOwnershipType.code} deactivated`,
      oldValue: {
        code: ownershipType.code,
        name: ownershipType.name,
        description: ownershipType.description,
        isActive: ownershipType.isActive,
      },
      newValue: {
        code: updatedOwnershipType.code,
        name: updatedOwnershipType.name,
        description: updatedOwnershipType.description,
        isActive: updatedOwnershipType.isActive,
      },
    });

    return updatedOwnershipType;
  });
}
