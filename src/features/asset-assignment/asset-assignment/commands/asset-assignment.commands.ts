import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

import {
  findAssetById,
  findEmployeeById,
  findCurrentAssetAssignment,
  findAssetAssignmentById,
  createAssetAssignmentRecord,
  returnAssetAssignmentRecord,
} from '../repositories/asset-assignment.repository';

import type {
  CreateAssetAssignmentFormData,
  ReturnAssetAssignmentFormData,
} from '../schemas/asset-assignment.schema';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';

import { recordAuditEvent } from '@/lib/audit/audit.service';
export async function createAssetAssignment(
  userId: string,
  data: CreateAssetAssignmentFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_ASSIGNMENT:CREATE',
  });

  const asset = await findAssetById(data.assetId);

  if (!asset) {
    throw new AppError('Asset not found', 'ASSET_NOT_FOUND');
  }

  const employee = await findEmployeeById(data.employeeId);

  if (!employee) {
    throw new AppError('Employee not found', 'EMPLOYEE_NOT_FOUND');
  }

  if (!employee.isActive) {
    throw new AppError('Employee is inactive', 'EMPLOYEE_INACTIVE');
  }

  const currentAssignment = await findCurrentAssetAssignment(data.assetId);

  if (currentAssignment) {
    throw new AppError('Asset is already assigned', 'ASSET_ALREADY_ASSIGNED');
  }

  return prisma.$transaction(async (tx) => {
    const assignment = await createAssetAssignmentRecord(tx, userId, data);

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ASSET_ASSIGNED,
      entityType: AUDIT_ENTITY_TYPES.ASSET_ASSIGNMENT,
      entityId: assignment.id,
      description: `Asset ${assignment.asset.assetCode} assigned to employee ${assignment.employee.employeeNumber}`,
      newValue: {
        assetId: assignment.assetId,
        employeeId: assignment.employeeId,
        assignedAt: assignment.assignedAt.toISOString(),
        assignedByUserId: assignment.assignedByUserId,
        notes: assignment.notes,
      },
    });

    return assignment;
  });
}

export async function returnAssetAssignment(
  userId: string,
  id: string,
  data: ReturnAssetAssignmentFormData,
) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_ASSIGNMENT:RETURN',
  });

  const assignment = await findAssetAssignmentById(id);

  if (!assignment) {
    throw new AppError(
      'Asset Assignment not found',
      'ASSET_ASSIGNMENT_NOT_FOUND',
    );
  }

  if (assignment.returnedAt) {
    throw new AppError(
      'Asset Assignment has already been returned',
      'ASSET_ASSIGNMENT_ALREADY_RETURNED',
    );
  }

  return prisma.$transaction(async (tx) => {
    const returnedAssignment = await returnAssetAssignmentRecord(
      tx,
      id,
      userId,
      data,
    );

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ASSET_RETURNED,
      entityType: AUDIT_ENTITY_TYPES.ASSET_ASSIGNMENT,
      entityId: returnedAssignment.id,
      description: `Asset ${returnedAssignment.asset.assetCode} returned by employee ${returnedAssignment.employee.employeeNumber}`,
      oldValue: {
        assetId: assignment.assetId,
        employeeId: assignment.employeeId,
        assignedAt: assignment.assignedAt.toISOString(),
        assignedByUserId: assignment.assignedByUserId,
        returnedAt: null,
        returnedByUserId: null,
        notes: assignment.notes,
      },
      newValue: {
        assetId: returnedAssignment.assetId,
        employeeId: returnedAssignment.employeeId,
        assignedAt: returnedAssignment.assignedAt.toISOString(),
        assignedByUserId: returnedAssignment.assignedByUserId,
        returnedAt: returnedAssignment.returnedAt?.toISOString() ?? null,
        returnedByUserId: returnedAssignment.returnedByUserId,
        notes: returnedAssignment.notes,
      },
    });

    return returnedAssignment;
  });
}
