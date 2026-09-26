import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findAcquisitionMethodById,
  findActiveAcquisitionMethodById,
  findAcquisitionById,
  createAcquisitionRecord,
  updateAcquisitionRecord,
} from '../repositories/acquisition.repository';

import type { AcquisitionFormData } from '../schemas/acquisition.schema';

import { generateNextAcquisitionNumber } from '../services/acquisition-number.service';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';
export async function createAcquisition(
  userId: string,
  data: AcquisitionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION:CREATE',
  });

  const acquisitionMethod = await findActiveAcquisitionMethodById(
    data.acquisitionMethodId,
  );

  if (!acquisitionMethod) {
    const existingMethod = await findAcquisitionMethodById(
      data.acquisitionMethodId,
    );

    if (!existingMethod) {
      throw new AppError(
        'Acquisition Method not found',
        'ACQUISITION_METHOD_NOT_FOUND',
      );
    }

    throw new AppError(
      'Acquisition Method is inactive',
      'ACQUISITION_METHOD_INACTIVE',
    );
  }

  return prisma.$transaction(async (tx) => {
    const acquisitionNumber = await generateNextAcquisitionNumber(tx);

    const acquisition = await createAcquisitionRecord(
      tx,
      acquisitionNumber,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ACQUISITION_CREATED,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION,
      entityId: acquisition.id,
      description: `Acquisition ${acquisition.acquisitionNumber} created`,
      newValue: {
        acquisitionNumber: acquisition.acquisitionNumber,
        acquisitionDate: acquisition.acquisitionDate.toISOString(),
        acquisitionMethodId: acquisition.acquisitionMethodId,
        supplierName: acquisition.supplierName,
        referenceNumber: acquisition.referenceNumber,
        description: acquisition.description,
        fundingSource: acquisition.fundingSource,
        totalAmount: acquisition.totalAmount?.toString() ?? null,
        currency: acquisition.currency,
        notes: acquisition.notes,
      },
    });

    return acquisition;
  });
}

export async function updateAcquisition(
  userId: string,
  id: string,
  data: AcquisitionFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION:UPDATE',
  });

  const acquisition = await findAcquisitionById(id);

  if (!acquisition) {
    throw new AppError('Acquisition not found', 'ACQUISITION_NOT_FOUND');
  }

  const acquisitionMethod = await findActiveAcquisitionMethodById(
    data.acquisitionMethodId,
  );

  if (!acquisitionMethod) {
    const existingMethod = await findAcquisitionMethodById(
      data.acquisitionMethodId,
    );

    if (!existingMethod) {
      throw new AppError(
        'Acquisition Method not found',
        'ACQUISITION_METHOD_NOT_FOUND',
      );
    }

    throw new AppError(
      'Acquisition Method is inactive',
      'ACQUISITION_METHOD_INACTIVE',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedAcquisition = await updateAcquisitionRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ACQUISITION_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION,
      entityId: updatedAcquisition.id,
      description: `Acquisition ${updatedAcquisition.acquisitionNumber} updated`,
      oldValue: {
        acquisitionNumber: acquisition.acquisitionNumber,
        acquisitionDate: acquisition.acquisitionDate.toISOString(),
        acquisitionMethodId: acquisition.acquisitionMethodId,
        supplierName: acquisition.supplierName,
        referenceNumber: acquisition.referenceNumber,
        description: acquisition.description,
        fundingSource: acquisition.fundingSource,
        totalAmount: acquisition.totalAmount?.toString() ?? null,
        currency: acquisition.currency,
        notes: acquisition.notes,
      },
      newValue: {
        acquisitionNumber: updatedAcquisition.acquisitionNumber,
        acquisitionDate: updatedAcquisition.acquisitionDate.toISOString(),
        acquisitionMethodId: updatedAcquisition.acquisitionMethodId,
        supplierName: updatedAcquisition.supplierName,
        referenceNumber: updatedAcquisition.referenceNumber,
        description: updatedAcquisition.description,
        fundingSource: updatedAcquisition.fundingSource,
        totalAmount: updatedAcquisition.totalAmount?.toString() ?? null,
        currency: updatedAcquisition.currency,
        notes: updatedAcquisition.notes,
      },
    });

    return updatedAcquisition;
  });
}
