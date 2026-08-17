import { AppError } from '@/lib/errors';

import {
  createAcquisitionMethod as createAcquisitionMethodRepository,
  findAcquisitionMethodByCode,
  findAcquisitionMethodById,
  findAcquisitionMethodByName,
  updateAcquisitionMethod as updateAcquisitionMethodRepository,
} from '../repositories/acquisition-method.repository';

import type { AcquisitionMethodFormValues } from '../schemas/acquisition-method.schema';

type CreateAcquisitionMethodInput = AcquisitionMethodFormValues;

type UpdateAcquisitionMethodInput = AcquisitionMethodFormValues;

export async function createAcquisitionMethod(
  input: CreateAcquisitionMethodInput,
) {
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

  return createAcquisitionMethodRepository({
    code: input.code,
    name: input.name,
    description: input.description,
    isActive: input.isActive,
  });
}

export async function updateAcquisitionMethod(
  id: string,
  input: UpdateAcquisitionMethodInput,
) {
  const existing = await findAcquisitionMethodById(id);

  if (!existing) {
    throw new AppError('Acquisition method not found.');
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

  return updateAcquisitionMethodRepository(id, {
    code: input.code,
    name: input.name,
    description: input.description,
    isActive: input.isActive,
  });
}

export async function deactivateAcquisitionMethod(id: string) {
  const existing = await findAcquisitionMethodById(id);

  if (!existing) {
    throw new AppError('Acquisition method not found.');
  }

  if (!existing.isActive) {
    throw new AppError('Acquisition method is already inactive.');
  }

  return updateAcquisitionMethodRepository(id, {
    code: existing.code,
    name: existing.name,
    description: existing.description ?? undefined,
    isActive: false,
  });
}
