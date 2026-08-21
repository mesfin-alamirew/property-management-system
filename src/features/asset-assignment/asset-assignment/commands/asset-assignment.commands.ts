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

export async function createAssetAssignment(
  userId: string,
  data: CreateAssetAssignmentFormData,
) {
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
    return createAssetAssignmentRecord(tx, userId, data);
  });
}

export async function returnAssetAssignment(
  userId: string,
  id: string,
  data: ReturnAssetAssignmentFormData,
) {
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

  return returnAssetAssignmentRecord(id, userId, data);
}
