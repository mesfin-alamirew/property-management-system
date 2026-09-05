import { prisma } from '@/lib/prisma';
import type {
  AccountabilityExceptionSeverity,
  AccountabilityExceptionType,
  AccountabilityReportFilters,
  AccountabilityReportRow,
} from '../types/accountability.types';

type AssetWithAccountabilityData = {
  id: string;
  assetCode: string;
  assetTag: string | null;
  name: string;
  assetTypeId: string;
  statusId: string;
  location: {
    id: string;
    code: string;
    name: string;
    organizationUnit: {
      id: string;
      code: string;
      name: string;
    } | null;
  } | null;
  assetAssignments: Array<{
    id: string;
    assignedAt: Date;
    returnedAt: Date | null;
    employee: {
      id: string;
      employeeNumber: string;
      firstName: string;
      middleName: string | null;
      lastName: string;
    };
  }>;
};

const severityRank: Record<AccountabilityExceptionSeverity, number> = {
  HIGH: 1,
  REVIEW: 2,
  MONITOR: 3,
};

function getEmployeeName(employee: {
  firstName: string;
  middleName: string | null;
  lastName: string;
}) {
  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

function createExceptionId(
  assetId: string,
  exceptionType: AccountabilityExceptionType,
  evidenceId?: string,
) {
  return `${assetId}:${exceptionType}:${evidenceId ?? 'none'}`;
}

export async function getAccountabilityReport(
  filters: AccountabilityReportFilters = {},
): Promise<AccountabilityReportRow[]> {
  const assets = await prisma.asset.findMany({
    where: {
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
      ...(filters.locationId
        ? {
            locationId: filters.locationId,
          }
        : {}),
    },
    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
      assetTypeId: true,
      statusId: true,
      location: {
        select: {
          id: true,
          code: true,
          name: true,
          organizationUnit: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },
      assetAssignments: {
        orderBy: {
          assignedAt: 'desc',
        },
        select: {
          id: true,
          assignedAt: true,
          returnedAt: true,
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

  const rows: AccountabilityReportRow[] = [];

  /*
   * Physical Verification
   *
   * PhysicalVerificationItem does not expose a `verification`
   * relation in the generated Prisma client. Therefore:
   *
   * 1. Fetch verification items.
   * 2. Fetch their parent PhysicalVerification records separately.
   * 3. Build a lookup by verification ID.
   * 4. Select the latest verification item for each asset.
   */
  const verificationItems = await prisma.physicalVerificationItem.findMany({
    where: {
      assetId: {
        in: assets.map((asset) => asset.id),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      assetId: true,
      verificationId: true,
      result: true,
      createdAt: true,
    },
  });

  const verificationIds = [
    ...new Set(verificationItems.map((item) => item.verificationId)),
  ];

  const verifications =
    verificationIds.length > 0
      ? await prisma.physicalVerification.findMany({
          where: {
            id: {
              in: verificationIds,
            },
          },
          select: {
            id: true,
            referenceNumber: true,
            scheduledAt: true,
          },
        })
      : [];

  const verificationById = new Map(
    verifications.map((verification) => [verification.id, verification]),
  );

  type VerificationRecord = (typeof verifications)[number];

  const latestVerificationByAsset = new Map<
    string,
    {
      id: string;
      assetId: string;
      result: (typeof verificationItems)[number]['result'];
      verification: VerificationRecord;
    }
  >();

  for (const item of verificationItems) {
    if (latestVerificationByAsset.has(item.assetId)) {
      continue;
    }

    const verification = verificationById.get(item.verificationId);

    if (!verification) {
      continue;
    }

    latestVerificationByAsset.set(item.assetId, {
      id: item.id,
      assetId: item.assetId,
      result: item.result,
      verification,
    });
  }
  const maintenanceRecords = await prisma.maintenance.findMany({
    where: {
      assetId: {
        in: assets.map((asset) => asset.id),
      },
      status: {
        in: ['REQUESTED', 'ASSIGNED', 'APPROVED', 'IN_PROGRESS'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      assetId: true,
      referenceNumber: true,
      status: true,
      title: true,
      requestedAt: true,
      scheduledAt: true,
      startedAt: true,
      createdAt: true,
    },
  });

  const latestMaintenanceByAsset = new Map<
    string,
    (typeof maintenanceRecords)[number]
  >();

  for (const maintenance of maintenanceRecords) {
    if (!latestMaintenanceByAsset.has(maintenance.assetId)) {
      latestMaintenanceByAsset.set(maintenance.assetId, maintenance);
    }
  }

  const incidentRecords = await prisma.incident.findMany({
    where: {
      assetId: {
        in: assets.map((asset) => asset.id),
      },
      status: {
        in: ['REPORTED', 'ASSIGNED', 'IN_PROGRESS'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      assetId: true,
      referenceNumber: true,
      status: true,
      title: true,
      incidentDate: true,
      reportedAt: true,
      assignedAt: true,
      startedAt: true,
      createdAt: true,
    },
  });

  const latestIncidentByAsset = new Map<
    string,
    (typeof incidentRecords)[number]
  >();

  for (const incident of incidentRecords) {
    if (!latestIncidentByAsset.has(incident.assetId)) {
      latestIncidentByAsset.set(incident.assetId, incident);
    }
  }
  const retirementRecords = await prisma.retirement.findMany({
    where: {
      assetId: {
        in: assets.map((asset) => asset.id),
      },
      status: {
        in: ['REQUESTED', 'APPROVED'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      assetId: true,
      referenceNumber: true,
      retirementDate: true,
      reason: true,
      status: true,
      createdAt: true,
    },
  });

  const latestRetirementByAsset = new Map<
    string,
    (typeof retirementRecords)[number]
  >();

  for (const retirement of retirementRecords) {
    if (!latestRetirementByAsset.has(retirement.assetId)) {
      latestRetirementByAsset.set(retirement.assetId, retirement);
    }
  }
  const disposalRecords = await prisma.disposal.findMany({
    where: {
      status: {
        in: ['REQUESTED', 'APPROVED'],
      },
      items: {
        some: {
          assetId: {
            in: assets.map((asset) => asset.id),
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      referenceNumber: true,
      disposalDate: true,
      method: true,
      reason: true,
      status: true,
      createdAt: true,
      items: {
        where: {
          assetId: {
            in: assets.map((asset) => asset.id),
          },
        },
        select: {
          assetId: true,
        },
      },
    },
  });

  const latestDisposalByAsset = new Map<
    string,
    (typeof disposalRecords)[number]
  >();

  for (const disposal of disposalRecords) {
    for (const item of disposal.items) {
      if (!latestDisposalByAsset.has(item.assetId)) {
        latestDisposalByAsset.set(item.assetId, disposal);
      }
    }
  }
  for (const asset of assets as AssetWithAccountabilityData[]) {
    const currentAssignments = asset.assetAssignments.filter(
      (assignment) => assignment.returnedAt === null,
    );

    const location = asset.location;

    const organizationUnit = location?.organizationUnit ?? null;

    if (
      filters.organizationUnitId &&
      organizationUnit?.id !== filters.organizationUnitId
    ) {
      continue;
    }

    const employee =
      currentAssignments.length === 1
        ? {
            id: currentAssignments[0].employee.id,
            employeeNumber: currentAssignments[0].employee.employeeNumber,
            name: getEmployeeName(currentAssignments[0].employee),
          }
        : null;

    /*
     * A-01: No Current Assignment
     */
    if (currentAssignments.length === 0) {
      rows.push({
        id: createExceptionId(asset.id, 'NO_CURRENT_ASSIGNMENT'),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: 'NO_CURRENT_ASSIGNMENT',
        severity: 'REVIEW',
        details: 'No current assignment is recorded for this asset.',
        evidence: null,
        location,
        organizationUnit,
        employee: null,
      });
    }

    /*
     * A-02: Multiple Current Assignments
     */
    if (currentAssignments.length > 1) {
      rows.push({
        id: createExceptionId(asset.id, 'MULTIPLE_CURRENT_ASSIGNMENTS'),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: 'MULTIPLE_CURRENT_ASSIGNMENTS',
        severity: 'HIGH',
        details: `Multiple current assignments are recorded (${currentAssignments.length}).`,
        evidence: null,
        location,
        organizationUnit,
        employee: null,
      });
    }

    /*
     * L-01: Missing Location
     */
    if (!location) {
      rows.push({
        id: createExceptionId(asset.id, 'MISSING_LOCATION'),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: 'MISSING_LOCATION',
        severity: 'REVIEW',
        details: 'No current location is recorded for this asset.',
        evidence: null,
        location: null,
        organizationUnit: null,
        employee,
      });
    }

    /*
     * V-01 through V-06:
     * Latest Physical Verification Exceptions
     */
    const latestVerification = latestVerificationByAsset.get(asset.id);
    const latestMaintenance = latestMaintenanceByAsset.get(asset.id);
    const latestIncident = latestIncidentByAsset.get(asset.id);
    const latestRetirement = latestRetirementByAsset.get(asset.id);
    const latestDisposal = latestDisposalByAsset.get(asset.id);
    if (latestVerification) {
      const verificationExceptionMap: Record<
        string,
        {
          type: AccountabilityExceptionType;
          severity: AccountabilityExceptionSeverity;
          details: string;
        }
      > = {
        NOT_FOUND: {
          type: 'VERIFICATION_NOT_FOUND',
          severity: 'HIGH',
          details:
            'Asset was not found during the latest physical verification.',
        },
        LOCATION_MISMATCH: {
          type: 'VERIFICATION_LOCATION_MISMATCH',
          severity: 'HIGH',
          details:
            'The asset location does not match the location recorded during the latest physical verification.',
        },
        CUSTODIAN_MISMATCH: {
          type: 'VERIFICATION_CUSTODIAN_MISMATCH',
          severity: 'HIGH',
          details:
            'The asset custodian does not match the custodian recorded during the latest physical verification.',
        },
        CONDITION_MISMATCH: {
          type: 'VERIFICATION_CONDITION_MISMATCH',
          severity: 'HIGH',
          details:
            'The asset condition does not match the condition recorded during the latest physical verification.',
        },
        IDENTIFICATION_MISMATCH: {
          type: 'VERIFICATION_IDENTIFICATION_MISMATCH',
          severity: 'HIGH',
          details:
            'The asset identification does not match the identification recorded during the latest physical verification.',
        },
        MULTIPLE_DISCREPANCIES: {
          type: 'VERIFICATION_MULTIPLE_DISCREPANCIES',
          severity: 'HIGH',
          details:
            'Multiple discrepancies were identified during the latest physical verification.',
        },
      };

      const verificationException =
        verificationExceptionMap[latestVerification.result];

      if (verificationException) {
        rows.push({
          id: createExceptionId(
            asset.id,
            verificationException.type,
            latestVerification.id,
          ),
          asset: {
            id: asset.id,
            assetCode: asset.assetCode,
            assetTag: asset.assetTag,
            name: asset.name,
          },
          exceptionType: verificationException.type,
          severity: verificationException.severity,
          details: verificationException.details,
          evidence: {
            type: 'VERIFICATION',
            id: latestVerification.verification.id,
            referenceNumber: latestVerification.verification.referenceNumber,
            date: latestVerification.verification.scheduledAt,
          },
          location,
          organizationUnit,
          employee,
        });
      }
    }
    if (latestMaintenance) {
      rows.push({
        id: createExceptionId(
          asset.id,
          'MAINTENANCE_REQUIRING_ACTION',
          latestMaintenance.id,
        ),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: 'MAINTENANCE_REQUIRING_ACTION',
        severity: 'MONITOR',
        details: latestMaintenance.title
          ? `Maintenance requires action: ${latestMaintenance.title}.`
          : `Maintenance is currently ${latestMaintenance.status.toLowerCase().replace('_', ' ')}.`,
        evidence: {
          type: 'MAINTENANCE',
          id: latestMaintenance.id,
          referenceNumber: latestMaintenance.referenceNumber,
          date:
            latestMaintenance.startedAt ??
            latestMaintenance.scheduledAt ??
            latestMaintenance.requestedAt ??
            latestMaintenance.createdAt,
        },
        location,
        organizationUnit,
        employee,
      });
    }

    if (latestIncident) {
      rows.push({
        id: createExceptionId(asset.id, 'ACTIVE_INCIDENT', latestIncident.id),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: 'ACTIVE_INCIDENT',
        severity: 'HIGH',
        details: latestIncident.title
          ? `Active incident requires attention: ${latestIncident.title}.`
          : `An active incident is currently ${latestIncident.status
              .toLowerCase()
              .replace('_', ' ')}.`,
        evidence: {
          type: 'INCIDENT',
          id: latestIncident.id,
          referenceNumber: latestIncident.referenceNumber,
          date:
            latestIncident.startedAt ??
            latestIncident.assignedAt ??
            latestIncident.reportedAt ??
            latestIncident.incidentDate ??
            latestIncident.createdAt,
        },
        location,
        organizationUnit,
        employee,
      });
    }
    if (latestRetirement) {
      const retirementException =
        latestRetirement.status === 'REQUESTED'
          ? {
              type: 'RETIREMENT_PENDING' as const,
              severity: 'HIGH' as const,
              details: latestRetirement.reason
                ? `Retirement is pending approval: ${latestRetirement.reason}.`
                : 'Retirement is pending approval.',
            }
          : {
              type: 'RETIREMENT_APPROVED' as const,
              severity: 'MONITOR' as const,
              details: latestRetirement.reason
                ? `Retirement has been approved: ${latestRetirement.reason}.`
                : 'Retirement has been approved.',
            };

      rows.push({
        id: createExceptionId(
          asset.id,
          retirementException.type,
          latestRetirement.id,
        ),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: retirementException.type,
        severity: retirementException.severity,
        details: retirementException.details,
        evidence: {
          type: 'RETIREMENT',
          id: latestRetirement.id,
          referenceNumber: latestRetirement.referenceNumber,
          date: latestRetirement.retirementDate,
        },
        location,
        organizationUnit,
        employee,
      });
    }

    if (latestDisposal) {
      const disposalException =
        latestDisposal.status === 'REQUESTED'
          ? {
              type: 'DISPOSAL_PENDING' as const,
              severity: 'HIGH' as const,
              details: latestDisposal.reason
                ? `Disposal is pending approval: ${latestDisposal.reason}.`
                : 'Disposal is pending approval.',
            }
          : {
              type: 'DISPOSAL_APPROVED' as const,
              severity: 'MONITOR' as const,
              details: latestDisposal.reason
                ? `Disposal has been approved: ${latestDisposal.reason}.`
                : 'Disposal has been approved.',
            };

      rows.push({
        id: createExceptionId(
          asset.id,
          disposalException.type,
          latestDisposal.id,
        ),
        asset: {
          id: asset.id,
          assetCode: asset.assetCode,
          assetTag: asset.assetTag,
          name: asset.name,
        },
        exceptionType: disposalException.type,
        severity: disposalException.severity,
        details: disposalException.details,
        evidence: {
          type: 'DISPOSAL',
          id: latestDisposal.id,
          referenceNumber: latestDisposal.referenceNumber,
          date: latestDisposal.disposalDate,
        },
        location,
        organizationUnit,
        employee,
      });
    }
  }

  return rows
    .filter((row) => {
      if (
        filters.exceptionType &&
        row.exceptionType !== filters.exceptionType
      ) {
        return false;
      }

      if (filters.severity && row.severity !== filters.severity) {
        return false;
      }

      if (filters.search) {
        const search = filters.search.toLowerCase();

        const searchableText = [
          row.asset.assetCode,
          row.asset.assetTag ?? '',
          row.asset.name,
          row.details,
          row.evidence?.referenceNumber ?? '',
        ]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(search)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const severityDifference =
        severityRank[a.severity] - severityRank[b.severity];

      if (severityDifference !== 0) {
        return severityDifference;
      }

      const aDate = a.evidence?.date?.getTime() ?? 0;
      const bDate = b.evidence?.date?.getTime() ?? 0;

      return bDate - aDate;
    });
}
