import { Prisma } from '@/generated/prisma/client';

import { prisma } from '@/lib/prisma';

import type {
  CreatePhysicalVerificationFormData,
  CreateUnregisteredAssetObservationFormData,
  VerifyPhysicalVerificationItemFormData,
} from '../schemas/physical-verification.schema';
import { PhysicalVerificationResult } from '@/generated/prisma/client';

type CreateUnregisteredAssetObservationRecordData = Omit<
  CreateUnregisteredAssetObservationFormData,
  'observedLocationId' | 'observedConditionId'
> & {
  verificationId: string;

  observedLocationId: string | null;
  observedLocationCode: string | null;
  observedLocationName: string | null;

  observedConditionId: string | null;
  observedConditionCode: string | null;
  observedConditionName: string | null;

  observedByUserId: string;
  observedAt: Date;
};
export async function findPhysicalVerifications() {
  return prisma.physicalVerification.findMany({
    orderBy: {
      createdAt: 'desc',
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      location: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      createdByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      _count: {
        select: {
          items: true,
          unregisteredObservations: true,
        },
      },
    },
  });
}

export async function findPhysicalVerificationById(id: string) {
  return prisma.physicalVerification.findUnique({
    where: {
      id,
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      location: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      createdByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      items: {
        orderBy: {
          expectedAssetName: 'asc',
        },

        include: {
          asset: {
            select: {
              id: true,
              assetCode: true,
              assetTag: true,
              name: true,
            },
          },

          verification: {
            select: {
              id: true,
              referenceNumber: true,
              title: true,
            },
          },

          verifiedByUser: {
            select: {
              id: true,
              username: true,
              displayName: true,
            },
          },
        },
      },

      unregisteredObservations: {
        orderBy: {
          observedAt: 'desc',
        },

        include: {
          verification: {
            select: {
              id: true,
              referenceNumber: true,
              title: true,
            },
          },

          observedByUser: {
            select: {
              id: true,
              username: true,
              displayName: true,
            },
          },

          registeredAsset: {
            select: {
              id: true,
              assetCode: true,
              assetTag: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function findPhysicalVerificationItemsByVerificationId(
  verificationId: string,
) {
  return prisma.physicalVerificationItem.findMany({
    where: {
      verificationId,
    },

    orderBy: {
      expectedAssetName: 'asc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      verification: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
        },
      },

      verifiedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function findPhysicalVerificationItemById(id: string) {
  return prisma.physicalVerificationItem.findUnique({
    where: {
      id,
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      verification: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          status: true,
        },
      },

      verifiedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}
export async function createPhysicalVerificationRecord(
  tx: Prisma.TransactionClient,
  userId: string,
  referenceNumber: string,
  data: CreatePhysicalVerificationFormData,
) {
  return tx.physicalVerification.create({
    data: {
      referenceNumber,
      title: data.title,
      scope: data.scope,
      organizationUnitId: data.organizationUnitId || null,
      locationId: data.locationId || null,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      notes: data.notes || null,
      createdByUserId: userId,
    },
  });
}

export async function createPhysicalVerificationItemRecord(
  tx: Prisma.TransactionClient,
  data: {
    verificationId: string;
    assetId: string;

    expectedAssetCode: string;
    expectedAssetTag: string | null;
    expectedSerialNumber: string | null;
    expectedAssetName: string;

    expectedEmployeeId: string | null;
    expectedEmployeeNumber: string | null;
    expectedEmployeeName: string | null;

    expectedLocationId: string | null;
    expectedLocationCode: string | null;
    expectedLocationName: string | null;

    expectedConditionId: string | null;
    expectedConditionCode: string | null;
    expectedConditionName: string | null;
  },
) {
  return tx.physicalVerificationItem.create({
    data: {
      verificationId: data.verificationId,
      assetId: data.assetId,

      expectedAssetCode: data.expectedAssetCode,
      expectedAssetTag: data.expectedAssetTag,
      expectedSerialNumber: data.expectedSerialNumber,
      expectedAssetName: data.expectedAssetName,

      expectedEmployeeId: data.expectedEmployeeId,
      expectedEmployeeNumber: data.expectedEmployeeNumber,
      expectedEmployeeName: data.expectedEmployeeName,

      expectedLocationId: data.expectedLocationId,
      expectedLocationCode: data.expectedLocationCode,
      expectedLocationName: data.expectedLocationName,

      expectedConditionId: data.expectedConditionId,
      expectedConditionCode: data.expectedConditionCode,
      expectedConditionName: data.expectedConditionName,
    },
  });
}

export async function updatePhysicalVerificationItemRecord(
  tx: Prisma.TransactionClient,
  id: string,
  userId: string,
  data: VerifyPhysicalVerificationItemFormData,
  result: PhysicalVerificationResult,
) {
  return tx.physicalVerificationItem.update({
    where: {
      id,
    },

    data: {
      observedAssetTag: data.observedAssetTag,
      observedSerialNumber: data.observedSerialNumber,
      observedEmployeeNumber: data.observedEmployeeNumber,
      observedEmployeeName: data.observedEmployeeName,
      observedLocationCode: data.observedLocationCode,
      observedLocationName: data.observedLocationName,
      observedConditionCode: data.observedConditionCode,
      observedConditionName: data.observedConditionName,

      result, // ✅ calculated by the service
      notes: data.notes,

      verifiedByUserId: userId,
      verifiedAt: new Date(),
    },
  });
}

export async function createUnregisteredAssetObservationRecord(
  tx: Prisma.TransactionClient,
  data: CreateUnregisteredAssetObservationRecordData,
) {
  return tx.unregisteredAssetObservation.create({
    data: {
      verificationId: data.verificationId,

      observedAssetTag: data.observedAssetTag || null,
      observedSerialNumber: data.observedSerialNumber || null,
      observedName: data.observedName,

      observedLocationId: data.observedLocationId,
      observedLocationCode: data.observedLocationCode,
      observedLocationName: data.observedLocationName,

      observedConditionId: data.observedConditionId,
      observedConditionCode: data.observedConditionCode,
      observedConditionName: data.observedConditionName,

      notes: data.notes || null,

      observedByUserId: data.observedByUserId,
      observedAt: data.observedAt,
    },
  });
}

export async function findUnregisteredAssetObservationsByVerificationId(
  verificationId: string,
) {
  return prisma.unregisteredAssetObservation.findMany({
    where: {
      verificationId,
    },

    orderBy: {
      observedAt: 'desc',
    },

    include: {
      verification: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
        },
      },

      observedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      registeredAsset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },
    },
  });
}

export async function getActiveOrganizationUnits() {
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}

export async function getActiveAssetLocations() {
  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}

export async function getAvailableAssetsForVerification() {
  return prisma.asset.findMany({
    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
      serialNumber: true,

      assetType: {
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

      location: {
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
}
export async function countUnverifiedPhysicalVerificationItems(
  verificationId: string,
) {
  return prisma.physicalVerificationItem.count({
    where: {
      verificationId,
      verifiedAt: null,
    },
  });
}

export async function completePhysicalVerificationRecord(
  tx: Prisma.TransactionClient,
  verificationId: string,
) {
  return tx.physicalVerification.update({
    where: {
      id: verificationId,
    },

    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
    },
  });
}
