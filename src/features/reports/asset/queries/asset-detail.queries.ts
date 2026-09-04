import { prisma } from '@/lib/prisma';

import type {
  AssetAssignmentHistoryRow,
  AssetDetail,
  AssetDisposalDetail,
  AssetIncidentHistoryRow,
  AssetMaintenanceHistoryRow,
  AssetMovementHistoryRow,
  AssetRetirementDetail,
  AssetVerificationHistoryRow,
} from '../types/asset.types';

export async function getAssetDetail(
  assetId: string,
): Promise<AssetDetail | null> {
  const asset = await prisma.asset.findUnique({
    where: {
      id: assetId,
    },
    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
      description: true,
      manufacturer: true,
      model: true,
      serialNumber: true,

      assetType: {
        select: {
          id: true,
          code: true,
          name: true,
          category: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },

      status: {
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
              organizationUnit: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                },
              },
            },
          },
          assignedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          returnedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          notes: true,
        },
      },

      acquisitionItem: {
        select: {
          id: true,
          unitCost: true,
          totalCost: true,
          acquisition: {
            select: {
              id: true,
              acquisitionNumber: true,
              referenceNumber: true,
              acquisitionDate: true,
              currency: true,
              acquisitionMethod: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                },
              },
            },
          },
        },
      },

      assetMovements: {
        orderBy: {
          movedAt: 'desc',
        },
        select: {
          id: true,
          movedAt: true,
          fromLocation: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
          toLocation: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
          movedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          reason: true,
          notes: true,
        },
      },

      maintenances: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          referenceNumber: true,
          type: true,
          status: true,
          title: true,
          requestedAt: true,
          scheduledAt: true,
          startedAt: true,
          completedAt: true,
        },
      },

      incidents: {
        orderBy: {
          incidentDate: 'desc',
        },
        select: {
          id: true,
          referenceNumber: true,
          type: true,
          severity: true,
          status: true,
          title: true,
          description: true,
          incidentDate: true,
          reportedAt: true,
          assignedAt: true,
          startedAt: true,
          resolvedAt: true,
          closedAt: true,
          reportedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          assignedToUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          resolution: {
            select: {
              id: true,
              rootCause: true,
              resolution: true,
              correctiveAction: true,
              resolvedByUser: {
                select: {
                  id: true,
                  displayName: true,
                },
              },
              notes: true,
            },
          },
        },
      },

      physicalVerificationItems: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          expectedAssetCode: true,
          expectedAssetTag: true,
          expectedSerialNumber: true,
          expectedAssetName: true,
          expectedEmployeeName: true,
          expectedLocationName: true,
          expectedConditionName: true,
          observedAssetTag: true,
          observedSerialNumber: true,
          observedEmployeeName: true,
          observedLocationName: true,
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
          verification: {
            select: {
              id: true,
              referenceNumber: true,
              title: true,
              status: true,
              completedAt: true,
            },
          },
        },
      },

      retirement: {
        select: {
          id: true,
          referenceNumber: true,
          retirementDate: true,
          reason: true,
          status: true,
          approvedAt: true,
          cancelledAt: true,
          cancellationReason: true,
          notes: true,
          condition: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
          requestedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          approvedByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
          cancelledByUser: {
            select: {
              id: true,
              displayName: true,
            },
          },
        },
      },

      disposalItems: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
        select: {
          disposal: {
            select: {
              id: true,
              referenceNumber: true,
              disposalDate: true,
              method: true,
              reason: true,
              status: true,
              approvedAt: true,
              cancelledAt: true,
              cancellationReason: true,
              notes: true,
              requestedByUser: {
                select: {
                  id: true,
                  displayName: true,
                },
              },
              approvedByUser: {
                select: {
                  id: true,
                  displayName: true,
                },
              },
              cancelledByUser: {
                select: {
                  id: true,
                  displayName: true,
                },
              },
            },
          },
        },
      },

      createdAt: true,
      updatedAt: true,
    },
  });

  if (!asset) {
    return null;
  }

  const latestAssignment = asset.assetAssignments[0] ?? null;

  const currentAssignment =
    latestAssignment && latestAssignment.returnedAt === null
      ? {
          id: latestAssignment.id,
          assignedAt: latestAssignment.assignedAt,
          employee: latestAssignment.employee,
          assignedByUser: latestAssignment.assignedByUser,
          notes: latestAssignment.notes,
        }
      : null;

  const assignmentHistory: AssetAssignmentHistoryRow[] = asset.assetAssignments;

  const movementHistory: AssetMovementHistoryRow[] = asset.assetMovements;

  const maintenanceHistory: AssetMaintenanceHistoryRow[] =
    asset.maintenances.map((maintenance) => ({
      ...maintenance,
      type: maintenance.type.toString(),
      status: maintenance.status.toString(),
    }));

  const incidentHistory: AssetIncidentHistoryRow[] = asset.incidents.map(
    (incident) => ({
      ...incident,
      type: incident.type.toString(),
      severity: incident.severity.toString(),
      status: incident.status.toString(),
      resolution: incident.resolution
        ? {
            ...incident.resolution,
          }
        : null,
    }),
  );

  const verificationHistory: AssetVerificationHistoryRow[] =
    asset.physicalVerificationItems.map((item) => ({
      id: item.id,
      verification: {
        id: item.verification.id,
        referenceNumber: item.verification.referenceNumber,
        title: item.verification.title,
        status: item.verification.status.toString(),
        completedAt: item.verification.completedAt,
      },
      expectedAssetCode: item.expectedAssetCode,
      expectedAssetTag: item.expectedAssetTag,
      expectedSerialNumber: item.expectedSerialNumber,
      expectedAssetName: item.expectedAssetName,
      expectedEmployeeName: item.expectedEmployeeName,
      expectedLocationName: item.expectedLocationName,
      expectedConditionName: item.expectedConditionName,
      observedAssetTag: item.observedAssetTag,
      observedSerialNumber: item.observedSerialNumber,
      observedEmployeeName: item.observedEmployeeName,
      observedLocationName: item.observedLocationName,
      observedConditionName: item.observedConditionName,
      result: item.result.toString(),
      notes: item.notes,
      verifiedByUser: item.verifiedByUser,
      verifiedAt: item.verifiedAt,
    }));

  const retirement: AssetRetirementDetail | null = asset.retirement
    ? {
        ...asset.retirement,
        status: asset.retirement.status.toString(),
      }
    : null;

  const disposal: AssetDisposalDetail | null = asset.disposalItems[0]?.disposal
    ? {
        ...asset.disposalItems[0].disposal,
        status: asset.disposalItems[0].disposal.status.toString(),
      }
    : null;

  return {
    id: asset.id,
    assetCode: asset.assetCode,
    assetTag: asset.assetTag,
    name: asset.name,
    description: asset.description,
    manufacturer: asset.manufacturer,
    model: asset.model,
    serialNumber: asset.serialNumber,

    assetType: asset.assetType,
    status: asset.status,
    condition: asset.condition,
    location: asset.location,

    currentAssignment,
    acquisition: asset.acquisitionItem
      ? {
          id: asset.acquisitionItem.id,
          acquisitionNumber:
            asset.acquisitionItem.acquisition.acquisitionNumber,
          referenceNumber: asset.acquisitionItem.acquisition.referenceNumber,
          acquisitionDate: asset.acquisitionItem.acquisition.acquisitionDate,
          acquisitionMethod:
            asset.acquisitionItem.acquisition.acquisitionMethod,
          currency: asset.acquisitionItem.acquisition.currency,
          unitCost: asset.acquisitionItem.unitCost?.toString() ?? null,
          totalCost: asset.acquisitionItem.totalCost?.toString() ?? null,
        }
      : null,

    assignmentHistory,
    movementHistory,
    maintenanceHistory,
    incidentHistory,
    verificationHistory,

    retirement,
    disposal,

    createdAt: asset.createdAt,
    updatedAt: asset.updatedAt,
  };
}
