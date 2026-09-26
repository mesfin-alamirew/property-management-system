import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import {
  findOwnershipByPropertyId,
  findOwnershipById,
  createOwnershipRecord,
  updateOwnershipRecord,
  deactivateOwnershipRecord,
} from '../repositories/ownership.repository';

import type { OwnershipFormData } from '../schemas/ownership.schema';

export async function createOwnership(userId: string, data: OwnershipFormData) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:CREATE',
  });

  const existingOwnership = await findOwnershipByPropertyId(data.propertyId);

  if (existingOwnership) {
    throw new AppError(
      'An active ownership record already exists for this property',
      'OWNERSHIP_ALREADY_EXISTS',
    );
  }

  return prisma.$transaction(async (tx) => {
    const ownership = await createOwnershipRecord(tx, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.OWNERSHIP_CREATED,
      entityType: AUDIT_ENTITY_TYPES.OWNERSHIP,
      entityId: ownership.id,
      description: `Ownership record for property ${ownership.propertyId} created`,
      newValue: {
        propertyId: ownership.propertyId,
        ownershipTypeId: ownership.ownershipTypeId,
        startDate: ownership.startDate.toISOString(),
        endDate: ownership.endDate?.toISOString() ?? null,
        acquisitionDate: ownership.acquisitionDate?.toISOString() ?? null,
        acquisitionPrice: ownership.acquisitionPrice?.toString() ?? null,
        acquisitionCurrency: ownership.acquisitionCurrency,
        deedNumber: ownership.deedNumber,
        legalReference: ownership.legalReference,
        registrationAuthority: ownership.registrationAuthority,
        notes: ownership.notes,
        isActive: ownership.isActive,
      },
    });

    return ownership;
  });
}

export async function updateOwnership(
  userId: string,
  id: string,
  data: OwnershipFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:UPDATE',
  });

  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  const existingOwnership = await findOwnershipByPropertyId(data.propertyId);

  if (existingOwnership && existingOwnership.id !== id) {
    throw new AppError(
      'An active ownership record already exists for this property',
      'OWNERSHIP_ALREADY_EXISTS',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedOwnership = await updateOwnershipRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.OWNERSHIP_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.OWNERSHIP,
      entityId: updatedOwnership.id,
      description: `Ownership record for property ${updatedOwnership.propertyId} updated`,
      oldValue: {
        propertyId: ownership.propertyId,
        ownershipTypeId: ownership.ownershipTypeId,
        startDate: ownership.startDate.toISOString(),
        endDate: ownership.endDate?.toISOString() ?? null,
        acquisitionDate: ownership.acquisitionDate?.toISOString() ?? null,
        acquisitionPrice: ownership.acquisitionPrice?.toString() ?? null,
        acquisitionCurrency: ownership.acquisitionCurrency,
        deedNumber: ownership.deedNumber,
        legalReference: ownership.legalReference,
        registrationAuthority: ownership.registrationAuthority,
        notes: ownership.notes,
        isActive: ownership.isActive,
      },
      newValue: {
        propertyId: updatedOwnership.propertyId,
        ownershipTypeId: updatedOwnership.ownershipTypeId,
        startDate: updatedOwnership.startDate.toISOString(),
        endDate: updatedOwnership.endDate?.toISOString() ?? null,
        acquisitionDate:
          updatedOwnership.acquisitionDate?.toISOString() ?? null,
        acquisitionPrice: updatedOwnership.acquisitionPrice?.toString() ?? null,
        acquisitionCurrency: updatedOwnership.acquisitionCurrency,
        deedNumber: updatedOwnership.deedNumber,
        legalReference: updatedOwnership.legalReference,
        registrationAuthority: updatedOwnership.registrationAuthority,
        notes: updatedOwnership.notes,
        isActive: updatedOwnership.isActive,
      },
    });

    return updatedOwnership;
  });
}

export async function deactivateOwnership(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'OWNERSHIP:DEACTIVATE',
  });

  const ownership = await findOwnershipById(id);

  if (!ownership) {
    throw new AppError('Ownership record not found', 'OWNERSHIP_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const updatedOwnership = await deactivateOwnershipRecord(tx, id);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.OWNERSHIP_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.OWNERSHIP,
      entityId: updatedOwnership.id,
      description: `Ownership record for property ${updatedOwnership.propertyId} deactivated`,
      oldValue: {
        propertyId: ownership.propertyId,
        ownershipTypeId: ownership.ownershipTypeId,
        startDate: ownership.startDate.toISOString(),
        endDate: ownership.endDate?.toISOString() ?? null,
        acquisitionDate: ownership.acquisitionDate?.toISOString() ?? null,
        acquisitionPrice: ownership.acquisitionPrice?.toString() ?? null,
        acquisitionCurrency: ownership.acquisitionCurrency,
        deedNumber: ownership.deedNumber,
        legalReference: ownership.legalReference,
        registrationAuthority: ownership.registrationAuthority,
        notes: ownership.notes,
        isActive: ownership.isActive,
      },
      newValue: {
        propertyId: updatedOwnership.propertyId,
        ownershipTypeId: updatedOwnership.ownershipTypeId,
        startDate: updatedOwnership.startDate.toISOString(),
        endDate: updatedOwnership.endDate?.toISOString() ?? null,
        acquisitionDate:
          updatedOwnership.acquisitionDate?.toISOString() ?? null,
        acquisitionPrice: updatedOwnership.acquisitionPrice?.toString() ?? null,
        acquisitionCurrency: updatedOwnership.acquisitionCurrency,
        deedNumber: updatedOwnership.deedNumber,
        legalReference: updatedOwnership.legalReference,
        registrationAuthority: updatedOwnership.registrationAuthority,
        notes: updatedOwnership.notes,
        isActive: updatedOwnership.isActive,
      },
    });

    return updatedOwnership;
  });
}
