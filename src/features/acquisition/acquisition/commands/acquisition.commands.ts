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

export async function createAcquisition(data: AcquisitionFormData) {
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

    return createAcquisitionRecord(tx, acquisitionNumber, data);
  });
}

export async function updateAcquisition(id: string, data: AcquisitionFormData) {
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

  return updateAcquisitionRecord(id, data);
}
