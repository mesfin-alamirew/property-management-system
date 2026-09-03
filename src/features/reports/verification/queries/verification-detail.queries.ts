import { prisma } from '@/lib/prisma';

import type {
  PhysicalVerificationDetail,
  PhysicalVerificationDetailItem,
  PhysicalVerificationDetailResultSummary,
  PhysicalVerificationUnregisteredObservation,
} from '../types/verification.types';

const discrepancyResults = [
  'NOT_FOUND',
  'LOCATION_MISMATCH',
  'CUSTODIAN_MISMATCH',
  'CONDITION_MISMATCH',
  'IDENTIFICATION_MISMATCH',
  'MULTIPLE_DISCREPANCIES',
] as const;

export async function getPhysicalVerificationDetail(id: string): Promise<{
  verification: PhysicalVerificationDetail;
  items: PhysicalVerificationDetailItem[];
  resultSummary: PhysicalVerificationDetailResultSummary[];
  unregisteredObservations: PhysicalVerificationUnregisteredObservation[];
} | null> {
  const verification = await prisma.physicalVerification.findUnique({
    where: { id },
    select: {
      id: true,
      referenceNumber: true,
      title: true,
      scope: true,
      status: true,
      scheduledAt: true,
      startedAt: true,
      completedAt: true,
      notes: true,
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
          displayName: true,
        },
      },
      items: {
        orderBy: {
          expectedAssetName: 'asc',
        },
        select: {
          id: true,
          expectedAssetCode: true,
          expectedAssetTag: true,
          expectedSerialNumber: true,
          expectedAssetName: true,
          expectedEmployee: {
            select: {
              id: true,
              employeeNumber: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
          expectedEmployeeNumber: true,
          expectedEmployeeName: true,
          expectedLocation: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
          expectedLocationCode: true,
          expectedLocationName: true,
          expectedConditionCode: true,
          expectedConditionName: true,
          observedAssetTag: true,
          observedSerialNumber: true,
          observedEmployeeNumber: true,
          observedEmployeeName: true,
          observedLocationCode: true,
          observedLocationName: true,
          observedConditionCode: true,
          observedConditionName: true,
          result: true,
          notes: true,
          verifiedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          verifiedAt: true,
          asset: {
            select: {
              id: true,
              assetCode: true,
              assetTag: true,
              name: true,
              serialNumber: true,
            },
          },
        },
      },
      unregisteredObservations: {
        orderBy: {
          observedAt: 'desc',
        },
        select: {
          id: true,
          observedAssetTag: true,
          observedSerialNumber: true,
          observedName: true,
          observedLocation: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
          observedLocationCode: true,
          observedLocationName: true,
          observedConditionCode: true,
          observedConditionName: true,
          notes: true,
          observedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          observedAt: true,
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

  if (!verification) {
    return null;
  }

  let verifiedCount = 0;
  let pendingCount = 0;
  let discrepancyCount = 0;

  const resultCounts = new Map<string, number>();

  const items: PhysicalVerificationDetailItem[] = verification.items.map(
    (item) => {
      if (item.result === 'VERIFIED') {
        verifiedCount += 1;
      }

      if (item.result === 'PENDING') {
        pendingCount += 1;
      }

      if (
        discrepancyResults.includes(
          item.result as (typeof discrepancyResults)[number],
        )
      ) {
        discrepancyCount += 1;
      }

      resultCounts.set(item.result, (resultCounts.get(item.result) ?? 0) + 1);

      return {
        id: item.id,
        asset: item.asset,
        expectedAssetCode: item.expectedAssetCode,
        expectedAssetTag: item.expectedAssetTag,
        expectedSerialNumber: item.expectedSerialNumber,
        expectedAssetName: item.expectedAssetName,
        expectedEmployee: item.expectedEmployee
          ? {
              id: item.expectedEmployee.id,
              employeeNumber: item.expectedEmployee.employeeNumber,
              name: [
                item.expectedEmployee.firstName,
                item.expectedEmployee.middleName,
                item.expectedEmployee.lastName,
              ]
                .filter(Boolean)
                .join(' '),
            }
          : null,
        expectedEmployeeNumber: item.expectedEmployeeNumber,
        expectedEmployeeName: item.expectedEmployeeName,
        expectedLocation: item.expectedLocation,
        expectedLocationCode: item.expectedLocationCode,
        expectedLocationName: item.expectedLocationName,
        expectedConditionCode: item.expectedConditionCode,
        expectedConditionName: item.expectedConditionName,
        observedAssetTag: item.observedAssetTag,
        observedSerialNumber: item.observedSerialNumber,
        observedEmployeeNumber: item.observedEmployeeNumber,
        observedEmployeeName: item.observedEmployeeName,
        observedLocationCode: item.observedLocationCode,
        observedLocationName: item.observedLocationName,
        observedConditionCode: item.observedConditionCode,
        observedConditionName: item.observedConditionName,
        result: item.result,
        notes: item.notes,
        verifiedByUser: item.verifiedByUser,
        verifiedAt: item.verifiedAt,
      };
    },
  );

  const resultSummary: PhysicalVerificationDetailResultSummary[] = Array.from(
    resultCounts.entries(),
  ).map(([result, count]) => ({
    result: result as PhysicalVerificationDetailResultSummary['result'],
    count,
  }));

  const unregisteredObservations: PhysicalVerificationUnregisteredObservation[] =
    verification.unregisteredObservations.map((observation) => ({
      id: observation.id,
      observedAssetTag: observation.observedAssetTag,
      observedSerialNumber: observation.observedSerialNumber,
      observedName: observation.observedName,
      observedLocation: observation.observedLocation,
      observedLocationCode: observation.observedLocationCode,
      observedLocationName: observation.observedLocationName,
      observedConditionCode: observation.observedConditionCode,
      observedConditionName: observation.observedConditionName,
      notes: observation.notes,
      observedByUser: observation.observedByUser,
      observedAt: observation.observedAt,
      registeredAsset: observation.registeredAsset,
    }));

  const detail: PhysicalVerificationDetail = {
    id: verification.id,
    referenceNumber: verification.referenceNumber,
    title: verification.title,
    scope: verification.scope,
    organizationUnit: verification.organizationUnit,
    location: verification.location,
    status: verification.status,
    scheduledAt: verification.scheduledAt,
    startedAt: verification.startedAt,
    completedAt: verification.completedAt,
    notes: verification.notes,
    createdByUser: verification.createdByUser,
    itemCount: verification.items.length,
    verifiedCount,
    pendingCount,
    discrepancyCount,
    unregisteredObservationCount: unregisteredObservations.length,
  };

  return {
    verification: detail,
    items,
    resultSummary,
    unregisteredObservations,
  };
}
