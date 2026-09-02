import { prisma } from '@/lib/prisma';
import { AppError } from '@/lib/errors';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';

import {
  findUserById,
  findDisposalById,
  createDisposalRecord,
  requestDisposalRecord,
  approveDisposalRecord,
  cancelDisposalRecord,
} from '../repositories/disposal.repository';

import type { DisposalFormData } from '../schemas/disposal.schema';

import { generateNextDisposalReferenceNumber } from '../services/disposal-reference-number.service';

export async function createDisposal(userId: string, data: DisposalFormData) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextDisposalReferenceNumber(tx);

    const disposal = await createDisposalRecord(
      tx,
      referenceNumber,
      userId,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.DISPOSAL_CREATED,
      entityType: AUDIT_ENTITY_TYPES.DISPOSAL,
      entityId: disposal.id,
      description: `Disposal ${disposal.referenceNumber} created`,

      newValue: {
        referenceNumber: disposal.referenceNumber,
        disposalDate: disposal.disposalDate.toISOString(),
        method: disposal.method,
        reason: disposal.reason,
        status: disposal.status,
      },
    });

    return disposal;
  });
}

export async function requestDisposal(userId: string, disposalId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const disposal = await findDisposalById(disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  if (disposal.status !== 'DRAFT') {
    throw new AppError(
      'Only draft disposals can be requested',
      'INVALID_DISPOSAL_STATUS',
    );
  }
  if (disposal.items.length === 0) {
    throw new AppError(
      'A disposal must contain at least one asset before it can be requested',
      'DISPOSAL_ITEMS_REQUIRED',
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedDisposal = await requestDisposalRecord(tx, disposalId);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.DISPOSAL_REQUESTED,
      entityType: AUDIT_ENTITY_TYPES.DISPOSAL,
      entityId: disposal.id,
      description: `Disposal ${disposal.referenceNumber} requested`,

      oldValue: {
        status: disposal.status,
      },

      newValue: {
        status: updatedDisposal.status,
      },
    });

    return updatedDisposal;
  });
}

export async function approveDisposal(userId: string, disposalId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const disposal = await findDisposalById(disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  if (disposal.status !== 'REQUESTED') {
    throw new AppError(
      'Only requested disposals can be approved',
      'INVALID_DISPOSAL_STATUS',
    );
  }

  return prisma.$transaction(async (tx) => {
    const approvedDisposal = await approveDisposalRecord(
      tx,
      disposalId,
      userId,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.DISPOSAL_APPROVED,
      entityType: AUDIT_ENTITY_TYPES.DISPOSAL,
      entityId: disposal.id,
      description: `Disposal ${disposal.referenceNumber} approved`,

      oldValue: {
        status: disposal.status,
      },

      newValue: {
        status: approvedDisposal.status,
        approvedByUserId: approvedDisposal.approvedByUserId,
        approvedAt: approvedDisposal.approvedAt?.toISOString() ?? null,
      },
    });

    return approvedDisposal;
  });
}

export async function cancelDisposal(
  userId: string,
  disposalId: string,
  cancellationReason: string,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  const disposal = await findDisposalById(disposalId);

  if (!disposal) {
    throw new AppError('Disposal not found', 'DISPOSAL_NOT_FOUND');
  }

  if (disposal.status !== 'DRAFT' && disposal.status !== 'REQUESTED') {
    throw new AppError(
      'Only draft or requested disposals can be cancelled',
      'INVALID_DISPOSAL_STATUS',
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
    const cancelledDisposal = await cancelDisposalRecord(
      tx,
      disposalId,
      userId,
      reason,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.DISPOSAL_CANCELLED,
      entityType: AUDIT_ENTITY_TYPES.DISPOSAL,
      entityId: disposal.id,
      description: `Disposal ${disposal.referenceNumber} cancelled`,

      oldValue: {
        status: disposal.status,
      },

      newValue: {
        status: cancelledDisposal.status,
        cancelledByUserId: cancelledDisposal.cancelledByUserId,
        cancelledAt: cancelledDisposal.cancelledAt?.toISOString() ?? null,
        cancellationReason: cancelledDisposal.cancellationReason,
      },
    });

    return cancelledDisposal;
  });
}
