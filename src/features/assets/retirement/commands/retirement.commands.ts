import { prisma } from '@/lib/prisma';

import { AppError } from '@/lib/errors';

import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import { recordAuditEvent } from '@/lib/audit/audit.service';

import { findAssetById } from '@/features/assets/asset/repositories/asset.repository';

import { generateNextRetirementReferenceNumber } from '@/features/assets/retirement/services/retirement-reference-number.service';

import {
  findUserById,
  findRetirementById,
  findRetirementByAssetId,
  createRetirementRecord,
  requestRetirementRecord,
  approveRetirementRecord,
  cancelRetirementRecord,
} from '../repositories/retirement.repository';
import type { RetirementFormData } from '../types/retirement.types';

export async function createRetirement(
  userId: string,
  data: RetirementFormData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  if (asset.status.code !== 'ACTIVE') {
    throw new AppError('Only active assets can be retired', 'ASSET_NOT_ACTIVE');
  }

  const existingRetirement = await findRetirementByAssetId(data.assetId);

  if (existingRetirement) {
    throw new AppError(
      'A retirement record already exists for this asset',
      'RETIREMENT_ALREADY_EXISTS',
    );
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextRetirementReferenceNumber(tx);

    const retirement = await createRetirementRecord(
      tx,
      referenceNumber,
      userId,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.RETIREMENT_CREATED,
      entityType: AUDIT_ENTITY_TYPES.RETIREMENT,
      entityId: retirement.id,
      description: `Retirement ${retirement.referenceNumber} created`,

      newValue: {
        referenceNumber: retirement.referenceNumber,
        assetId: retirement.assetId,
        retirementDate: retirement.retirementDate.toISOString(),
        reason: retirement.reason,
        conditionId: retirement.conditionId,
        status: retirement.status,
      },
    });

    return retirement;
  });
}

export async function requestRetirement(userId: string, retirementId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const retirement = await findRetirementById(retirementId);

  if (!retirement) {
    throw new AppError('Retirement not found', 'RETIREMENT_NOT_FOUND');
  }

  if (retirement.status !== 'DRAFT') {
    throw new AppError(
      'Only draft retirements can be requested',
      'INVALID_RETIREMENT_STATUS',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedRetirement = await requestRetirementRecord(tx, retirementId);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.RETIREMENT_REQUESTED,
      entityType: AUDIT_ENTITY_TYPES.RETIREMENT,
      entityId: retirement.id,
      description: `Retirement ${retirement.referenceNumber} requested`,

      oldValue: {
        status: retirement.status,
      },

      newValue: {
        status: updatedRetirement.status,
      },
    });

    return updatedRetirement;
  });
}

export async function approveRetirement(userId: string, retirementId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const retirement = await findRetirementById(retirementId);

  if (!retirement) {
    throw new AppError('Retirement not found', 'RETIREMENT_NOT_FOUND');
  }

  if (retirement.status !== 'REQUESTED') {
    throw new AppError(
      'Only requested retirements can be approved',
      'INVALID_RETIREMENT_STATUS',
    );
  }

  return prisma.$transaction(async (tx) => {
    const approvedRetirement = await approveRetirementRecord(
      tx,
      retirementId,
      userId,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.RETIREMENT_APPROVED,
      entityType: AUDIT_ENTITY_TYPES.RETIREMENT,
      entityId: retirement.id,
      description: `Retirement ${retirement.referenceNumber} approved`,
      oldValue: {
        status: retirement.status,
      },
      newValue: {
        status: approvedRetirement.status,
        approvedByUserId: approvedRetirement.approvedByUserId,
        approvedAt: approvedRetirement.approvedAt?.toISOString() ?? null,
      },
    });

    return approvedRetirement;
  });
}
export async function cancelRetirement(
  userId: string,
  retirementId: string,
  cancellationReason: string,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const retirement = await findRetirementById(retirementId);

  if (!retirement) {
    throw new AppError('Retirement not found', 'RETIREMENT_NOT_FOUND');
  }

  if (retirement.status !== 'DRAFT' && retirement.status !== 'REQUESTED') {
    throw new AppError(
      'Only draft or requested retirements can be cancelled',
      'INVALID_RETIREMENT_STATUS',
    );
  }

  const reason = cancellationReason.trim();

  if (!reason) {
    throw new AppError(
      'Cancellation reason is required',
      'CANCELLATION_REASON_REQUIRED',
    );
  }

  return prisma.$transaction(async (tx) => {
    const cancelledRetirement = await cancelRetirementRecord(
      tx,
      retirementId,
      userId,
      reason,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.RETIREMENT_CANCELLED,
      entityType: AUDIT_ENTITY_TYPES.RETIREMENT,
      entityId: retirement.id,
      description: `Retirement ${retirement.referenceNumber} cancelled`,
      oldValue: {
        status: retirement.status,
      },
      newValue: {
        status: cancelledRetirement.status,
        cancelledByUserId: cancelledRetirement.cancelledByUserId,
        cancelledAt: cancelledRetirement.cancelledAt?.toISOString() ?? null,
        cancellationReason: cancelledRetirement.cancellationReason,
      },
    });

    return cancelledRetirement;
  });
}
