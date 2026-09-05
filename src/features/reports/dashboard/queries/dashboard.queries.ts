import { prisma } from '@/lib/prisma';
import {
  DisposalStatus,
  IncidentStatus,
  MaintenanceStatus,
  RetirementStatus,
} from '@/generated/prisma/client';
import type {
  DashboardData,
  DashboardFilters,
  DashboardOrganizationSummaryRow,
  DashboardVerificationResult,
} from '../types/dashboard.types';
const ACTIONABLE_MAINTENANCE_STATUSES: MaintenanceStatus[] = [
  MaintenanceStatus.REQUESTED,
  MaintenanceStatus.ASSIGNED,
  MaintenanceStatus.APPROVED,
  MaintenanceStatus.IN_PROGRESS,
];

const ACTIVE_INCIDENT_STATUSES: IncidentStatus[] = [
  IncidentStatus.REPORTED,
  IncidentStatus.ASSIGNED,
  IncidentStatus.IN_PROGRESS,
];

const RETIREMENT_STATUSES: RetirementStatus[] = [
  RetirementStatus.REQUESTED,
  RetirementStatus.APPROVED,
];

const DISPOSAL_STATUSES: DisposalStatus[] = [
  DisposalStatus.REQUESTED,
  DisposalStatus.APPROVED,
];

const HIGH_EXCEPTION_TYPES = new Set([
  'MULTIPLE_CURRENT_ASSIGNMENTS',
  'VERIFICATION_NOT_FOUND',
  'VERIFICATION_LOCATION_MISMATCH',
  'VERIFICATION_CUSTODIAN_MISMATCH',
  'VERIFICATION_CONDITION_MISMATCH',
  'VERIFICATION_IDENTIFICATION_MISMATCH',
  'VERIFICATION_MULTIPLE_DISCREPANCIES',
  'ACTIVE_INCIDENT',
  'RETIREMENT_PENDING',
  'DISPOSAL_PENDING',
]);

const REVIEW_EXCEPTION_TYPES = new Set([
  'NO_CURRENT_ASSIGNMENT',
  'MISSING_LOCATION',
]);

const MONITOR_EXCEPTION_TYPES = new Set([
  'MAINTENANCE_REQUIRING_ACTION',
  'RETIREMENT_APPROVED',
  'DISPOSAL_APPROVED',
]);

const VERIFICATION_EXCEPTION_TYPES = new Set([
  'NOT_FOUND',
  'LOCATION_MISMATCH',
  'CUSTODIAN_MISMATCH',
  'CONDITION_MISMATCH',
  'IDENTIFICATION_MISMATCH',
  'MULTIPLE_DISCREPANCIES',
]);

type AssetWithDashboardData = {
  id: string;
  assetTypeId: string;
  statusId: string;
  locationId: string | null;
  location: {
    id: string;
    organizationUnitId: string;
  } | null;
  assetAssignments: Array<{
    id: string;
    returnedAt: Date | null;
  }>;
};

function getExceptionSeverity(
  exceptionType: string,
): 'HIGH' | 'REVIEW' | 'MONITOR' {
  if (HIGH_EXCEPTION_TYPES.has(exceptionType)) {
    return 'HIGH';
  }

  if (REVIEW_EXCEPTION_TYPES.has(exceptionType)) {
    return 'REVIEW';
  }

  if (MONITOR_EXCEPTION_TYPES.has(exceptionType)) {
    return 'MONITOR';
  }

  throw new Error(`Unknown accountability exception type: ${exceptionType}`);
}

function countException(
  exceptionCounts: {
    high: number;
    review: number;
    monitor: number;
  },
  exceptionType: string,
): 'HIGH' | 'REVIEW' | 'MONITOR' {
  const severity = getExceptionSeverity(exceptionType);

  if (severity === 'HIGH') {
    exceptionCounts.high += 1;
  } else if (severity === 'REVIEW') {
    exceptionCounts.review += 1;
  } else {
    exceptionCounts.monitor += 1;
  }

  return severity;
}

export async function getDashboardData(
  filters: DashboardFilters = {},
): Promise<DashboardData> {
  const assetWhere = {
    ...(filters.organizationUnitId
      ? {
          location: {
            organizationUnitId: filters.organizationUnitId,
          },
        }
      : {}),
    ...(filters.assetTypeId
      ? {
          assetTypeId: filters.assetTypeId,
        }
      : {}),
    ...(filters.assetStatusId
      ? {
          statusId: filters.assetStatusId,
        }
      : {}),
  };

  const assets = await prisma.asset.findMany({
    where: assetWhere,
    select: {
      id: true,
      assetTypeId: true,
      statusId: true,
      locationId: true,
      location: {
        select: {
          id: true,
          organizationUnitId: true,
        },
      },
      assetAssignments: {
        select: {
          id: true,
          returnedAt: true,
        },
      },
    },
  });

  const assetIds = assets.map((asset) => asset.id);

  if (assetIds.length === 0) {
    return {
      kpis: {
        totalAssets: 0,
        assignedAssets: 0,
        unassignedAssets: 0,
        totalExceptions: 0,
        highExceptions: 0,
        reviewExceptions: 0,
        monitorExceptions: 0,
      },
      verification: {
        pending: 0,
        verified: 0,
        notFound: 0,
        locationMismatch: 0,
        custodianMismatch: 0,
        conditionMismatch: 0,
        identificationMismatch: 0,
        multipleDiscrepancies: 0,
      },
      operations: {
        maintenanceRequiringAction: 0,
        activeIncidents: 0,
      },
      lifecycle: {
        retirementPending: 0,
        retirementApproved: 0,
        disposalPending: 0,
        disposalApproved: 0,
      },
      organizations: [],
    };
  }

  const [
    verificationItems,
    maintenanceRecords,
    incidentRecords,
    retirementRecords,
    disposalRecords,
  ] = await Promise.all([
    prisma.physicalVerificationItem.findMany({
      where: {
        assetId: {
          in: assetIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        assetId: true,
        result: true,
        createdAt: true,
      },
    }),

    prisma.maintenance.findMany({
      where: {
        assetId: {
          in: assetIds,
        },
        status: {
          in: ACTIONABLE_MAINTENANCE_STATUSES,
        },
      },
      select: {
        id: true,
        assetId: true,
        status: true,
      },
    }),

    prisma.incident.findMany({
      where: {
        assetId: {
          in: assetIds,
        },
        status: {
          in: ACTIVE_INCIDENT_STATUSES,
        },
      },
      select: {
        id: true,
        assetId: true,
        status: true,
      },
    }),

    prisma.retirement.findMany({
      where: {
        assetId: {
          in: assetIds,
        },
        status: {
          in: RETIREMENT_STATUSES,
        },
      },
      select: {
        id: true,
        assetId: true,
        status: true,
      },
    }),

    prisma.disposal.findMany({
      where: {
        status: {
          in: DISPOSAL_STATUSES,
        },
        items: {
          some: {
            assetId: {
              in: assetIds,
            },
          },
        },
      },
      select: {
        id: true,
        status: true,
      },
    }),
  ]);
  const disposalItems = await prisma.disposalItem.findMany({
    where: {
      assetId: {
        in: assetIds,
      },
      disposalId: {
        in: disposalRecords.map((disposal) => disposal.id),
      },
    },
    select: {
      disposalId: true,
      assetId: true,
    },
  });

  const latestVerificationByAsset = new Map<
    string,
    DashboardVerificationResult
  >();

  for (const item of verificationItems) {
    if (!latestVerificationByAsset.has(item.assetId)) {
      latestVerificationByAsset.set(
        item.assetId,
        item.result as DashboardVerificationResult,
      );
    }
  }

  const verification = {
    pending: 0,
    verified: 0,
    notFound: 0,
    locationMismatch: 0,
    custodianMismatch: 0,
    conditionMismatch: 0,
    identificationMismatch: 0,
    multipleDiscrepancies: 0,
  };

  for (const result of latestVerificationByAsset.values()) {
    switch (result) {
      case 'PENDING':
        verification.pending += 1;
        break;
      case 'VERIFIED':
        verification.verified += 1;
        break;
      case 'NOT_FOUND':
        verification.notFound += 1;
        break;
      case 'LOCATION_MISMATCH':
        verification.locationMismatch += 1;
        break;
      case 'CUSTODIAN_MISMATCH':
        verification.custodianMismatch += 1;
        break;
      case 'CONDITION_MISMATCH':
        verification.conditionMismatch += 1;
        break;
      case 'IDENTIFICATION_MISMATCH':
        verification.identificationMismatch += 1;
        break;
      case 'MULTIPLE_DISCREPANCIES':
        verification.multipleDiscrepancies += 1;
        break;
    }
  }

  const maintenanceByAsset = new Set(
    maintenanceRecords.map((record) => record.assetId),
  );

  const incidentByAsset = new Set(
    incidentRecords.map((record) => record.assetId),
  );

  const retirementByAsset = new Map(
    retirementRecords.map((record) => [record.assetId, record.status]),
  );

  const disposalStatusById = new Map(
    disposalRecords.map((disposal) => [disposal.id, disposal.status]),
  );

  const disposalByAsset = new Map<string, DisposalStatus>();

  for (const item of disposalItems) {
    const status = disposalStatusById.get(item.disposalId);

    if (status) {
      disposalByAsset.set(item.assetId, status);
    }
  }

  const exceptionCounts = {
    total: 0,
    high: 0,
    review: 0,
    monitor: 0,
  };

  const organizationMap = new Map<
    string,
    {
      totalAssets: number;
      assignedAssets: number;
      unassignedAssets: number;
      highExceptions: number;
    }
  >();

  let assignedAssets = 0;
  let unassignedAssets = 0;

  for (const asset of assets) {
    const currentAssignments = asset.assetAssignments.filter(
      (assignment) => assignment.returnedAt === null,
    );

    const isAssigned = currentAssignments.length > 0;

    if (isAssigned) {
      assignedAssets += 1;
    } else {
      unassignedAssets += 1;
    }

    const organizationUnitId = asset.location?.organizationUnitId;

    if (organizationUnitId) {
      const current = organizationMap.get(organizationUnitId) ?? {
        totalAssets: 0,
        assignedAssets: 0,
        unassignedAssets: 0,
        highExceptions: 0,
      };

      current.totalAssets += 1;

      if (isAssigned) {
        current.assignedAssets += 1;
      } else {
        current.unassignedAssets += 1;
      }

      organizationMap.set(organizationUnitId, current);
    }
    const organizationSummary = asset.location?.organizationUnitId
      ? organizationMap.get(asset.location.organizationUnitId)
      : undefined;

    function recordException(exceptionType: string) {
      const severity = countException(exceptionCounts, exceptionType);

      if (severity === 'HIGH' && organizationSummary) {
        organizationSummary.highExceptions += 1;
      }
    }
    if (currentAssignments.length === 0) {
      recordException('NO_CURRENT_ASSIGNMENT');
    }

    if (currentAssignments.length > 1) {
      recordException('MULTIPLE_CURRENT_ASSIGNMENTS');
    }

    if (asset.locationId === null) {
      recordException('MISSING_LOCATION');
    }

    const verificationResult = latestVerificationByAsset.get(asset.id);

    if (
      verificationResult &&
      VERIFICATION_EXCEPTION_TYPES.has(verificationResult)
    ) {
      recordException(`VERIFICATION_${verificationResult}`);
    }

    if (maintenanceByAsset.has(asset.id)) {
      recordException('MAINTENANCE_REQUIRING_ACTION');
    }

    if (incidentByAsset.has(asset.id)) {
      recordException('ACTIVE_INCIDENT');
    }

    const retirementStatus = retirementByAsset.get(asset.id);

    if (retirementStatus === RetirementStatus.REQUESTED) {
      recordException('RETIREMENT_PENDING');
    }

    if (retirementStatus === RetirementStatus.APPROVED) {
      recordException('RETIREMENT_APPROVED');
    }

    const disposalStatus = disposalByAsset.get(asset.id);

    if (disposalStatus === DisposalStatus.REQUESTED) {
      recordException('DISPOSAL_PENDING');
    }

    if (disposalStatus === DisposalStatus.APPROVED) {
      recordException('DISPOSAL_APPROVED');
    }
  }

  const organizationUnitIds = Array.from(organizationMap.keys());

  const organizationUnits = await prisma.organizationUnit.findMany({
    where: {
      id: {
        in: organizationUnitIds,
      },
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

  const organizations: DashboardOrganizationSummaryRow[] =
    organizationUnits.map((organizationUnit) => {
      const summary = organizationMap.get(organizationUnit.id)!;

      return {
        organizationUnit,
        ...summary,
      };
    });

  return {
    kpis: {
      totalAssets: assets.length,
      assignedAssets,
      unassignedAssets,
      totalExceptions: exceptionCounts.total,
      highExceptions: exceptionCounts.high,
      reviewExceptions: exceptionCounts.review,
      monitorExceptions: exceptionCounts.monitor,
    },
    verification,
    operations: {
      maintenanceRequiringAction: maintenanceRecords.length,
      activeIncidents: incidentRecords.length,
    },
    lifecycle: {
      retirementPending: retirementRecords.filter(
        (record) => record.status === 'REQUESTED',
      ).length,
      retirementApproved: retirementRecords.filter(
        (record) => record.status === 'APPROVED',
      ).length,
      disposalPending: disposalRecords.filter(
        (record) => record.status === 'REQUESTED',
      ).length,
      disposalApproved: disposalRecords.filter(
        (record) => record.status === 'APPROVED',
      ).length,
    },
    organizations,
  };
}
