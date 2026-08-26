import { AppError } from '@/lib/errors';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

import {
  createPhysicalVerificationRecord,
  createPhysicalVerificationItemRecord,
  updatePhysicalVerificationItemRecord,
  findPhysicalVerificationById,
  findPhysicalVerificationItemById,
} from '../repositories/physical-verification.repository';

import { determinePhysicalVerificationResult } from '../services/physical-verification-result.service';

import type {
  CreatePhysicalVerificationFormData,
  CreateUnregisteredAssetObservationFormData,
  VerifyPhysicalVerificationItemFormData,
} from '../schemas/physical-verification.schema';

import { generateNextPhysicalVerificationNumber } from '../services/physical-verification-number.service';
import { findAssetLocationById } from '@/features/assets/asset-location/repositories/asset-location.repository';

import { findAssetConditionById } from '@/features/assets/asset-condition/repositories/asset-condition.repository';
import { createUnregisteredAssetObservationRecord } from '../repositories/physical-verification.repository';

/**
 * Create a new Physical Verification.
 */
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
      select: {
        id: true,
        code: true,
        name: true,
        isActive: true,
        organizationUnitId: true,
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

    if (
      data.scope === 'ORGANIZATION_UNIT_LOCATION' &&
      location.organizationUnitId !== data.organizationUnitId
    ) {
      throw new AppError(
        'The selected Asset Location does not belong to the selected Organization Unit',
        'LOCATION_ORGANIZATION_UNIT_MISMATCH',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    const referenceNumber = await generateNextPhysicalVerificationNumber(tx);

    return createPhysicalVerificationRecord(tx, userId, referenceNumber, data);
  });
}

/**
 * Generate verification items from the assets
 * matching the verification scope.
 */
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

      location: {
        organizationUnitId: verification.organizationUnitId,
      },
    };
  }

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
      const employee = asset.assetAssignments[0]?.employee ?? null;

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

/**
 * Verify one physical verification item.
 */
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

  const result = determinePhysicalVerificationResult(
    {
      expectedAssetTag: item.expectedAssetTag,
      expectedSerialNumber: item.expectedSerialNumber,

      expectedEmployeeNumber: item.expectedEmployeeNumber,
      expectedEmployeeName: item.expectedEmployeeName,

      expectedLocationCode: item.expectedLocationCode,
      expectedLocationName: item.expectedLocationName,

      expectedConditionCode: item.expectedConditionCode,
      expectedConditionName: item.expectedConditionName,
    },
    data,
  );

  return prisma.$transaction(async (tx) => {
    return updatePhysicalVerificationItemRecord(tx, id, userId, data, result);
  });
}

/**
 * Create an observation for an asset physically found
 * but not included in the registered asset list.
 */
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

  if (verification.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Unregistered asset observations can only be recorded for an in-progress verification',
      'PHYSICAL_VERIFICATION_NOT_IN_PROGRESS',
    );
  }

  let location = null;

  if (data.observedLocationId) {
    location = await findAssetLocationById(data.observedLocationId);

    if (!location) {
      throw new AppError(
        'Selected asset location was not found',
        'ASSET_LOCATION_NOT_FOUND',
      );
    }

    if (!location.isActive) {
      throw new AppError(
        'Selected asset location is inactive',
        'ASSET_LOCATION_INACTIVE',
      );
    }
  }

  let condition = null;

  if (data.observedConditionId) {
    condition = await findAssetConditionById(data.observedConditionId);

    if (!condition) {
      throw new AppError(
        'Selected asset condition was not found',
        'ASSET_CONDITION_NOT_FOUND',
      );
    }

    if (!condition.isActive) {
      throw new AppError(
        'Selected asset condition is inactive',
        'ASSET_CONDITION_INACTIVE',
      );
    }
  }

  return prisma.$transaction(async (tx) => {
    return createUnregisteredAssetObservationRecord(tx, {
      verificationId,

      observedAssetTag: data.observedAssetTag,
      observedSerialNumber: data.observedSerialNumber,
      observedName: data.observedName,

      observedLocationId: location?.id ?? null,
      observedLocationCode: location?.code ?? null,
      observedLocationName: location?.name ?? null,

      observedConditionId: condition?.id ?? null,
      observedConditionCode: condition?.code ?? null,
      observedConditionName: condition?.name ?? null,

      notes: data.notes,

      observedByUserId: userId,
      observedAt: new Date(),
    });
  });
}

/**
 * Complete a Physical Verification.
 *
 * A verification can only be completed when:
 * - it is currently IN_PROGRESS
 * - it has at least one verification item
 * - every verification item has been verified
 *
 * Unregistered asset observations do not prevent completion.
 */
export async function completePhysicalVerification(verificationId: string) {
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

  if (verification.status !== 'IN_PROGRESS') {
    throw new AppError(
      'Only an in-progress Physical Verification can be completed',
      'PHYSICAL_VERIFICATION_NOT_IN_PROGRESS',
    );
  }

  if (verification.items.length === 0) {
    throw new AppError(
      'Physical Verification has no verification items',
      'PHYSICAL_VERIFICATION_NO_ITEMS',
    );
  }

  const unverifiedItems = verification.items.filter((item) => !item.verifiedAt);

  if (unverifiedItems.length > 0) {
    throw new AppError(
      `${unverifiedItems.length} verification item(s) have not been verified`,
      'PHYSICAL_VERIFICATION_ITEMS_REMAIN',
    );
  }

  return prisma.$transaction(async (tx) => {
    return tx.physicalVerification.update({
      where: {
        id: verificationId,
      },

      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });
  });
}
