import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

import {
  createPhysicalVerificationRecord,
  createPhysicalVerificationItemRecord,
  updatePhysicalVerificationItemRecord,
  createUnregisteredAssetObservationRecord,
  findPhysicalVerificationById,
  findPhysicalVerificationItemById,
} from '../repositories/physical-verification.repository';

import type {
  CreatePhysicalVerificationFormData,
  CreateUnregisteredAssetObservationFormData,
  VerifyPhysicalVerificationItemFormData,
} from '../schemas/physical-verification.schema';
import { generateNextPhysicalVerificationNumber } from '../services/physical-verification-number.service';
export async function createPhysicalVerification(
  userId: string,
  data: CreatePhysicalVerificationFormData,
) {
  if (
    data.scope === 'ORGANIZATION_UNIT' ||
    data.scope === 'ORGANIZATION_UNIT_LOCATION'
  ) {
    if (!data.organizationUnitId) {
      throw new AppError(
        'Organization Unit is required for the selected scope',
        'ORGANIZATION_UNIT_REQUIRED',
      );
    }

    const organizationUnit = await prisma.organizationUnit.findUnique({
      where: {
        id: data.organizationUnitId,
      },
    });

    if (!organizationUnit) {
      throw new AppError(
        'Organization Unit not found',
        'ORGANIZATION_UNIT_NOT_FOUND',
      );
    }

    if (!organizationUnit.isActive) {
      throw new AppError(
        'Organization Unit is inactive',
        'ORGANIZATION_UNIT_INACTIVE',
      );
    }
  }

  if (
    data.scope === 'LOCATION' ||
    data.scope === 'ORGANIZATION_UNIT_LOCATION'
  ) {
    if (!data.locationId) {
      throw new AppError(
        'Asset Location is required for the selected scope',
        'ASSET_LOCATION_REQUIRED',
      );
    }

    const location = await prisma.assetLocation.findUnique({
      where: {
        id: data.locationId,
      },
    });

    if (!location) {
      throw new AppError(
        'Asset Location not found',
        'ASSET_LOCATION_NOT_FOUND',
      );
    }

    if (!location.isActive) {
      throw new AppError(
        'Asset Location is inactive',
        'ASSET_LOCATION_INACTIVE',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextPhysicalVerificationNumber(tx);

    return createPhysicalVerificationRecord(tx, userId, referenceNumber, data);
  });
}

export async function generatePhysicalVerificationItems(
  verificationId: string,
) {
  const verification = await findPhysicalVerificationById(verificationId);

  if (!verification) {
    throw new AppError(
      'Physical Verification not found',
      'PHYSICAL_VERIFICATION_NOT_FOUND',
    );
  }

  if (verification.status !== 'DRAFT') {
    throw new AppError(
      'Verification items can only be generated for a draft verification',
      'PHYSICAL_VERIFICATION_ITEMS_ALREADY_GENERATED',
    );
  }

  /*
   * Build the asset filter according to the verification scope.
   *
   * We deliberately build this separately instead of putting
   * conditional relation filters directly inside findMany().
   */
  let assetWhere: Prisma.AssetWhereInput = {};

  if (verification.scope === 'LOCATION') {
    if (!verification.locationId) {
      throw new AppError(
        'Verification location is required',
        'VERIFICATION_LOCATION_REQUIRED',
      );
    }

    assetWhere = {
      locationId: verification.locationId,
    };
  }

  if (verification.scope === 'ORGANIZATION_UNIT') {
    if (!verification.organizationUnitId) {
      throw new AppError(
        'Verification Organization Unit is required',
        'VERIFICATION_ORGANIZATION_UNIT_REQUIRED',
      );
    }

    assetWhere = {
      assetAssignments: {
        some: {
          returnedAt: null,

          employee: {
            organizationUnitId: verification.organizationUnitId,
          },
        },
      },
    };
  }

  if (verification.scope === 'ORGANIZATION_UNIT_LOCATION') {
    if (!verification.organizationUnitId || !verification.locationId) {
      throw new AppError(
        'Verification Organization Unit and Location are required',
        'VERIFICATION_SCOPE_DATA_REQUIRED',
      );
    }

    assetWhere = {
      locationId: verification.locationId,

      assetAssignments: {
        some: {
          returnedAt: null,

          employee: {
            organizationUnitId: verification.organizationUnitId,
          },
        },
      },
    };
  }

  /*
   * SELECTED_ASSETS is intentionally not handled here yet.
   *
   * The current PhysicalVerification model does not have a
   * selected-assets relation. We should add that relationship
   * before implementing this scope.
   */

  if (verification.scope === 'SELECTED_ASSETS') {
    throw new AppError(
      'Selected Assets scope is not implemented yet',
      'SELECTED_ASSETS_SCOPE_NOT_IMPLEMENTED',
    );
  }

  const assets = await prisma.asset.findMany({
    where: assetWhere,

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      serialNumber: true,
      name: true,

      location: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      condition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      assetAssignments: {
        where: {
          returnedAt: null,
        },

        orderBy: {
          assignedAt: 'desc',
        },

        take: 1,

        select: {
          employee: {
            select: {
              id: true,
              employeeNumber: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (assets.length === 0) {
    throw new AppError(
      'No assets were found for the selected verification scope',
      'NO_ASSETS_FOUND_FOR_VERIFICATION',
    );
  }

  return prisma.$transaction(async (tx) => {
    for (const asset of assets) {
      const currentAssignment = asset.assetAssignments[0];

      const employee = currentAssignment?.employee ?? null;

      const expectedEmployeeName = employee
        ? [employee.firstName, employee.middleName, employee.lastName]
            .filter(Boolean)
            .join(' ')
        : null;

      await createPhysicalVerificationItemRecord(tx, {
        verificationId,

        assetId: asset.id,

        expectedAssetCode: asset.assetCode,
        expectedAssetTag: asset.assetTag,
        expectedSerialNumber: asset.serialNumber,
        expectedAssetName: asset.name,

        expectedEmployeeId: employee?.id ?? null,
        expectedEmployeeNumber: employee?.employeeNumber ?? null,
        expectedEmployeeName,

        expectedLocationId: asset.location?.id ?? null,
        expectedLocationCode: asset.location?.code ?? null,
        expectedLocationName: asset.location?.name ?? null,

        expectedConditionId: asset.condition?.id ?? null,
        expectedConditionCode: asset.condition?.code ?? null,
        expectedConditionName: asset.condition?.name ?? null,
      });
    }

    await tx.physicalVerification.update({
      where: {
        id: verificationId,
      },

      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });

    return {
      verificationId,
      itemCount: assets.length,
    };
  });
}

export async function verifyPhysicalVerificationItem(
  userId: string,
  id: string,
  data: VerifyPhysicalVerificationItemFormData,
) {
  const item = await findPhysicalVerificationItemById(id);

  if (!item) {
    throw new AppError(
      'Physical Verification Item not found',
      'PHYSICAL_VERIFICATION_ITEM_NOT_FOUND',
    );
  }

  if (item.verification.status === 'COMPLETED') {
    throw new AppError(
      'Physical Verification has already been completed',
      'PHYSICAL_VERIFICATION_COMPLETED',
    );
  }

  if (item.verification.status === 'CANCELLED') {
    throw new AppError(
      'Physical Verification has been cancelled',
      'PHYSICAL_VERIFICATION_CANCELLED',
    );
  }

  return prisma.$transaction(async (tx) => {
    if (item.verification.status === 'DRAFT') {
      await tx.physicalVerification.update({
        where: {
          id: item.verification.id,
        },

        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
      });
    }

    return updatePhysicalVerificationItemRecord(tx, id, userId, data);
  });
}

export async function createUnregisteredAssetObservation(
  userId: string,
  verificationId: string,
  data: CreateUnregisteredAssetObservationFormData,
) {
  const verification = await findPhysicalVerificationById(verificationId);

  if (!verification) {
    throw new AppError(
      'Physical Verification not found',
      'PHYSICAL_VERIFICATION_NOT_FOUND',
    );
  }

  if (verification.status === 'COMPLETED') {
    throw new AppError(
      'Physical Verification has already been completed',
      'PHYSICAL_VERIFICATION_COMPLETED',
    );
  }

  if (verification.status === 'CANCELLED') {
    throw new AppError(
      'Physical Verification has been cancelled',
      'PHYSICAL_VERIFICATION_CANCELLED',
    );
  }

  if (data.observedLocationId && data.observedLocationId !== '') {
    const location = await prisma.assetLocation.findUnique({
      where: {
        id: data.observedLocationId,
      },
    });

    if (!location) {
      throw new AppError(
        'Observed Asset Location not found',
        'ASSET_LOCATION_NOT_FOUND',
      );
    }

    if (!location.isActive) {
      throw new AppError(
        'Observed Asset Location is inactive',
        'ASSET_LOCATION_INACTIVE',
      );
    }
  }

  if (data.observedConditionId && data.observedConditionId !== '') {
    const condition = await prisma.assetCondition.findUnique({
      where: {
        id: data.observedConditionId,
      },
    });

    if (!condition) {
      throw new AppError(
        'Observed Asset Condition not found',
        'ASSET_CONDITION_NOT_FOUND',
      );
    }

    if (!condition.isActive) {
      throw new AppError(
        'Observed Asset Condition is inactive',
        'ASSET_CONDITION_INACTIVE',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    if (verification.status === 'DRAFT') {
      await tx.physicalVerification.update({
        where: {
          id: verificationId,
        },

        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
      });
    }

    return createUnregisteredAssetObservationRecord(
      tx,
      userId,
      verificationId,
      data,
    );
  });
}
