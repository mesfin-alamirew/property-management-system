import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findMaintenanceById,
  findAssetById,
  findUserById,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  requestMaintenanceRecord,
  approveMaintenanceRecord,
  startMaintenanceRecord,
  completeMaintenanceRecord,
  assignMaintenanceRecord,
  createMaintenanceAssignmentAudit,
  createMaintenanceApprovalAudit,
  createMaintenanceStartAudit,
  createMaintenanceCompletionAudit,
} from '../repositories/maintenance.repository';

import type { MaintenanceFormData } from '../schemas/maintenance.schema';

import { generateNextMaintenanceReferenceNumber } from '../services/maintenance-reference-number.service';

import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import { recordAuditEvent } from '@/lib/audit/audit.service';

export async function createMaintenance(
  userId: string,
  data: MaintenanceFormData,
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

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextMaintenanceReferenceNumber(tx);

    const maintenance = await createMaintenanceRecord(
      tx,
      referenceNumber,
      userId,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.MAINTENANCE_CREATED,
      entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
      entityId: maintenance.id,
      description: `Maintenance ${maintenance.referenceNumber} created`,
      newValue: {
        referenceNumber: maintenance.referenceNumber,
        assetId: maintenance.assetId,
        type: maintenance.type,
        status: maintenance.status,
        title: maintenance.title,
        assignedToUserId: maintenance.assignedToUserId,
        scheduledAt: maintenance.scheduledAt
          ? maintenance.scheduledAt.toISOString()
          : null,
      },
    });

    return maintenance;
  });
}

export async function updateMaintenance(
  userId: string,
  id: string,
  data: MaintenanceFormData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }
  const maintenance = await findMaintenanceById(id);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'DRAFT') {
    throw new AppError(
      'Only draft maintenance records can be edited',
      'MAINTENANCE_NOT_EDITABLE',
    );
  }

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  return prisma.$transaction(async (tx) => {
    const updatedMaintenance = await updateMaintenanceRecord(tx, id, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.MAINTENANCE_UPDATED,
      entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
      entityId: maintenance.id,
      description: `Maintenance ${maintenance.referenceNumber} updated`,
      oldValue: {
        assetId: maintenance.assetId,
        type: maintenance.type,
        title: maintenance.title,
        description: maintenance.description,
        scheduledAt: maintenance.scheduledAt
          ? maintenance.scheduledAt.toISOString()
          : null,
        assignedToUserId: maintenance.assignedToUserId,
        notes: maintenance.notes,
      },
      newValue: {
        assetId: updatedMaintenance.assetId,
        type: updatedMaintenance.type,
        title: updatedMaintenance.title,
        description: updatedMaintenance.description,
        scheduledAt: updatedMaintenance.scheduledAt
          ? updatedMaintenance.scheduledAt.toISOString()
          : null,
        assignedToUserId: updatedMaintenance.assignedToUserId,
        notes: updatedMaintenance.notes,
      },
    });

    return updatedMaintenance;
  });
}

export async function requestMaintenance(
  userId: string,
  maintenanceId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'DRAFT') {
    throw new AppError(
      'Only draft maintenance records can be requested',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('Requesting user not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('Requesting user is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const updatedMaintenance = await requestMaintenanceRecord(
      tx,
      maintenanceId,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.MAINTENANCE_REQUESTED,
      entityType: AUDIT_ENTITY_TYPES.MAINTENANCE,
      entityId: maintenance.id,
      description: `Maintenance ${maintenance.referenceNumber} requested`,
      oldValue: {
        status: maintenance.status,
      },
      newValue: {
        status: updatedMaintenance.status,
        requestedAt: updatedMaintenance.requestedAt
          ? updatedMaintenance.requestedAt.toISOString()
          : null,
      },
    });

    return updatedMaintenance;
  });
}
export async function approveMaintenance(
  userId: string,
  maintenanceId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'ASSIGNED') {
    throw new AppError(
      'Only assigned maintenance records can be approved',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const approver = await findUserById(userId);

  if (!approver) {
    throw new AppError('Approver not found', 'APPROVER_NOT_FOUND');
  }

  if (!approver.isActive) {
    throw new AppError('Approver is inactive', 'APPROVER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const approvedAt = new Date();

    const approvedMaintenance = await approveMaintenanceRecord(
      tx,
      maintenanceId,
      userId,
      approvedAt,
    );

    await createMaintenanceApprovalAudit(
      tx,
      userId,
      maintenanceId,
      maintenance.referenceNumber,
      maintenance.approvedByUserId,
      maintenance.approvedAt,
      userId,
      approvedAt,
    );

    return approvedMaintenance;
  });
}
export async function startMaintenance(userId: string, maintenanceId: string) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'APPROVED') {
    throw new AppError(
      'Only approved maintenance records can be started',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const startedAt = new Date();

    const startedMaintenance = await startMaintenanceRecord(
      tx,
      maintenanceId,
      startedAt,
    );

    await createMaintenanceStartAudit(
      tx,
      userId,
      maintenanceId,
      maintenance.referenceNumber,
      maintenance.startedAt,
      startedAt,
    );

    return startedMaintenance;
  });
}
export async function completeMaintenance(
  userId: string,
  maintenanceId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Only in-progress maintenance records can be completed',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 'USER_NOT_FOUND');
  }

  if (!user.isActive) {
    throw new AppError('User is inactive', 'USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const completedAt = new Date();

    const completedMaintenance = await completeMaintenanceRecord(
      tx,
      maintenanceId,
      completedAt,
    );

    await createMaintenanceCompletionAudit(
      tx,
      userId,
      maintenanceId,
      maintenance.referenceNumber,
      maintenance.completedAt,
      completedAt,
    );

    return completedMaintenance;
  });
}
export async function assignMaintenance(
  focalPersonUserId: string,
  maintenanceId: string,
  assignedToUserId: string,
) {
  const maintenance = await findMaintenanceById(maintenanceId);

  if (!maintenance) {
    throw new AppError('Maintenance not found', 'MAINTENANCE_NOT_FOUND');
  }

  if (maintenance.status !== 'REQUESTED') {
    throw new AppError(
      'Only requested maintenance records can be assigned',
      'MAINTENANCE_INVALID_STATUS',
    );
  }

  const focalPerson = await findUserById(focalPersonUserId);

  if (!focalPerson) {
    throw new AppError('Focal person not found', 'USER_NOT_FOUND');
  }

  if (!focalPerson.isActive) {
    throw new AppError('Focal person is inactive', 'USER_INACTIVE');
  }

  const assignedUser = await findUserById(assignedToUserId);

  if (!assignedUser) {
    throw new AppError('Assigned user not found', 'ASSIGNED_USER_NOT_FOUND');
  }

  if (!assignedUser.isActive) {
    throw new AppError('Assigned user is inactive', 'ASSIGNED_USER_INACTIVE');
  }

  return prisma.$transaction(async (tx) => {
    const result = await assignMaintenanceRecord(
      tx,
      maintenanceId,
      assignedToUserId,
    );

    await createMaintenanceAssignmentAudit(
      tx,
      focalPersonUserId,
      maintenanceId,
      maintenance.referenceNumber,
      maintenance.assignedToUserId,
      assignedToUserId,
    );

    return result;
  });
}
