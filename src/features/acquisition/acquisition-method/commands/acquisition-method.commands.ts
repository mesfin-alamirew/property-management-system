import { requirePermission } from '@/lib/authorization/authorization.service';
import { AppError } from '@/lib/errors';

import {
  createAcquisitionMethod as createAcquisitionMethodRepository,
  findAcquisitionMethodByCode,
  findAcquisitionMethodById,
  findAcquisitionMethodByName,
  updateAcquisitionMethod as updateAcquisitionMethodRepository,
} from '../repositories/acquisition-method.repository';

import type { AcquisitionMethodFormValues } from '../schemas/acquisition-method.schema';
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES } from '@/lib/audit/audit.types';
import { recordAuditEvent } from '@/lib/audit/audit.service';
import { prisma } from '@/lib/prisma';
type CreateAcquisitionMethodInput = AcquisitionMethodFormValues;

type UpdateAcquisitionMethodInput = AcquisitionMethodFormValues;

export async function createAcquisitionMethod(
  userId: string,
  input: CreateAcquisitionMethodInput,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_METHOD:CREATE',
  });

  const existingByCode = await findAcquisitionMethodByCode(input.code);

  if (existingByCode) {
    throw new AppError(
      `Acquisition method with code "${input.code}" already exists.`,
    );
  }

  const existingByName = await findAcquisitionMethodByName(input.name);

  if (existingByName) {
    throw new AppError(
      `Acquisition method with name "${input.name}" already exists.`,
    );
  }

  return prisma.$transaction(async (tx) => {
    const acquisitionMethod = await createAcquisitionMethodRepository(tx, {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    });

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ACQUISITION_METHOD_CREATED,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION_METHOD,
      entityId: acquisitionMethod.id,
      description: `Acquisition method ${acquisitionMethod.code} created`,
      newValue: {
        code: acquisitionMethod.code,
        name: acquisitionMethod.name,
        description: acquisitionMethod.description ?? null,
        isActive: acquisitionMethod.isActive,
      },
    });

    return acquisitionMethod;
  });
}

export async function updateAcquisitionMethod(
  userId: string,
  id: string,
  input: UpdateAcquisitionMethodInput,
) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_METHOD:UPDATE',
  });

  const existing = await findAcquisitionMethodById(id);

  if (!existing) {
    throw new AppError('Acquisition method not found.');
  }

  if (existing.isActive && !input.isActive) {
    await requirePermission({
      userId,
      permissionCode: 'ACQUISITION_METHOD:DEACTIVATE',
    });
  }

  if (!existing.isActive && input.isActive) {
    await requirePermission({
      userId,
      permissionCode: 'ACQUISITION_METHOD:ACTIVATE',
    });
  }

  const existingByCode = await findAcquisitionMethodByCode(input.code);

  if (existingByCode && existingByCode.id !== id) {
    throw new AppError(
      `Acquisition method with code "${input.code}" already exists.`,
    );
  }

  const existingByName = await findAcquisitionMethodByName(input.name);

  if (existingByName && existingByName.id !== id) {
    throw new AppError(
      `Acquisition method with name "${input.name}" already exists.`,
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedAcquisitionMethod = await updateAcquisitionMethodRepository(
      tx,
      id,
      {
        code: input.code,
        name: input.name,
        description: input.description,
        isActive: input.isActive,
      },
    );

    const action =
      existing.isActive && !input.isActive
        ? AUDIT_ACTIONS.ACQUISITION_METHOD_DEACTIVATED
        : !existing.isActive && input.isActive
          ? AUDIT_ACTIONS.ACQUISITION_METHOD_ACTIVATED
          : AUDIT_ACTIONS.ACQUISITION_METHOD_UPDATED;

    await recordAuditEvent(tx, {
      userId,
      action,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION_METHOD,
      entityId: updatedAcquisitionMethod.id,
      description: `Acquisition method ${updatedAcquisitionMethod.code} updated`,
      oldValue: {
        code: existing.code,
        name: existing.name,
        description: existing.description ?? null,
        isActive: existing.isActive,
      },
      newValue: {
        code: updatedAcquisitionMethod.code,
        name: updatedAcquisitionMethod.name,
        description: updatedAcquisitionMethod.description ?? null,
        isActive: updatedAcquisitionMethod.isActive,
      },
    });

    return updatedAcquisitionMethod;
  });
}
export async function deactivateAcquisitionMethod(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'ACQUISITION_METHOD:DEACTIVATE',
  });

  const existing = await findAcquisitionMethodById(id);

  if (!existing) {
    throw new AppError('Acquisition method not found.');
  }

  if (!existing.isActive) {
    throw new AppError('Acquisition method is already inactive.');
  }

  return prisma.$transaction(async (tx) => {
    const acquisitionMethod = await updateAcquisitionMethodRepository(tx, id, {
      code: existing.code,
      name: existing.name,
      description: existing.description ?? undefined,
      isActive: false,
    });

    await recordAuditEvent(tx, {
      userId,
      action: AUDIT_ACTIONS.ACQUISITION_METHOD_DEACTIVATED,
      entityType: AUDIT_ENTITY_TYPES.ACQUISITION_METHOD,
      entityId: acquisitionMethod.id,
      description: `Acquisition method ${acquisitionMethod.code} deactivated`,
      oldValue: {
        code: existing.code,
        name: existing.name,
        description: existing.description ?? null,
        isActive: existing.isActive,
      },
      newValue: {
        code: acquisitionMethod.code,
        name: acquisitionMethod.name,
        description: acquisitionMethod.description ?? null,
        isActive: acquisitionMethod.isActive,
      },
    });

    return acquisitionMethod;
  });
}
