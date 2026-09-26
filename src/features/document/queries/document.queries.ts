import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

import {
  findDocuments,
  findActiveDocumentById,
  findDocumentsByEntity,
  findDocumentVersionById,
} from '../repositories/document.repository';

import type { DocumentEntityType } from '@/generated/prisma/client';

export async function getDocuments(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:READ',
  });

  return findDocuments();
}

export async function getDocumentById(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:READ',
  });

  return findActiveDocumentById(id);
}

export async function getDocumentsByEntity(
  userId: string,
  entityType: DocumentEntityType,
  entityId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:READ',
  });

  return findDocumentsByEntity(entityType, entityId);
}

export async function getDocumentVersionById(
  userId: string,
  versionId: string,
) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:READ',
  });

  const version = await findDocumentVersionById(versionId);

  if (!version || version.document.deletedAt) {
    return null;
  }

  return version;
}

export async function getDocumentEntityOptions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'DOCUMENT:READ',
  });

  const [
    assets,
    acquisitions,
    acquisitionItems,
    assetAssignments,
    assetMovements,
    physicalVerifications,
    physicalVerificationItems,
    properties,
    buildings,
    ownerships,
    maintenances,
    incidents,
    incidentResolutions,
    retirements,
    disposals,
    disposalItems,
  ] = await Promise.all([
    prisma.asset.findMany({
      orderBy: { assetCode: 'asc' },
      select: {
        id: true,
        assetCode: true,
        name: true,
      },
    }),

    prisma.acquisition.findMany({
      orderBy: { acquisitionNumber: 'asc' },
      select: {
        id: true,
        acquisitionNumber: true,
        supplierName: true,
      },
    }),

    prisma.acquisitionItem.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        asset: {
          select: {
            assetCode: true,
            name: true,
          },
        },
      },
    }),

    prisma.assetAssignment.findMany({
      orderBy: { assignedAt: 'desc' },
      select: {
        id: true,
        asset: {
          select: {
            assetCode: true,
            name: true,
          },
        },
        employeeId: true,
        assignedAt: true,
      },
    }),

    prisma.assetMovement.findMany({
      orderBy: { movedAt: 'desc' },
      select: {
        id: true,
        asset: {
          select: {
            assetCode: true,
            name: true,
          },
        },
        toLocationId: true,
        movedAt: true,
      },
    }),

    prisma.physicalVerification.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        referenceNumber: true,
        title: true,
      },
    }),

    prisma.physicalVerificationItem.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        asset: {
          select: {
            assetCode: true,
            name: true,
          },
        },
      },
    }),

    prisma.property.findMany({
      orderBy: { propertyCode: 'asc' },
      select: {
        id: true,
        propertyCode: true,
        name: true,
      },
    }),

    prisma.building.findMany({
      orderBy: { buildingCode: 'asc' },
      select: {
        id: true,
        buildingCode: true,
        name: true,
      },
    }),

    prisma.ownership.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        property: {
          select: {
            propertyCode: true,
            name: true,
          },
        },
        ownershipType: {
          select: {
            name: true,
          },
        },
      },
    }),

    prisma.maintenance.findMany({
      orderBy: { referenceNumber: 'asc' },
      select: {
        id: true,
        referenceNumber: true,
        title: true,
      },
    }),

    prisma.incident.findMany({
      orderBy: { referenceNumber: 'asc' },
      select: {
        id: true,
        referenceNumber: true,
        title: true,
      },
    }),

    prisma.incidentResolution.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        incident: {
          select: {
            referenceNumber: true,
          },
        },
        resolution: true,
      },
    }),

    prisma.retirement.findMany({
      orderBy: { referenceNumber: 'asc' },
      select: {
        id: true,
        referenceNumber: true,
        asset: {
          select: {
            assetCode: true,
          },
        },
      },
    }),

    prisma.disposal.findMany({
      orderBy: { referenceNumber: 'asc' },
      select: {
        id: true,
        referenceNumber: true,
        disposalDate: true,
      },
    }),

    prisma.disposalItem.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        disposal: {
          select: {
            referenceNumber: true,
          },
        },
        asset: {
          select: {
            assetCode: true,
            name: true,
          },
        },
      },
    }),
  ]);

  return {
    ASSET: assets.map((record) => ({
      id: record.id,
      label: `${record.assetCode} — ${record.name}`,
    })),

    ACQUISITION: acquisitions.map((record) => ({
      id: record.id,
      label: record.supplierName
        ? `${record.acquisitionNumber} — ${record.supplierName}`
        : record.acquisitionNumber,
    })),

    ACQUISITION_ITEM: acquisitionItems.map((record) => ({
      id: record.id,
      label: `${record.asset.assetCode} — ${record.asset.name}`,
    })),

    ASSET_ASSIGNMENT: assetAssignments.map((record) => ({
      id: record.id,
      label: `${record.asset.assetCode} — ${record.asset.name} — Employee ${record.employeeId}`,
    })),

    ASSET_MOVEMENT: assetMovements.map((record) => ({
      id: record.id,
      label: `${record.asset.assetCode} — ${record.asset.name} — To location ${record.toLocationId} — ${record.movedAt.toLocaleDateString()}`,
    })),

    PHYSICAL_VERIFICATION: physicalVerifications.map((record) => ({
      id: record.id,
      label: record.title
        ? `${record.referenceNumber} — ${record.title}`
        : record.referenceNumber,
    })),

    PHYSICAL_VERIFICATION_ITEM: physicalVerificationItems.map((record) => ({
      id: record.id,
      label: `${record.asset.assetCode} — ${record.asset.name}`,
    })),

    PROPERTY: properties.map((record) => ({
      id: record.id,
      label: `${record.propertyCode} — ${record.name}`,
    })),

    BUILDING: buildings.map((record) => ({
      id: record.id,
      label: `${record.buildingCode} — ${record.name}`,
    })),

    OWNERSHIP: ownerships.map((record) => ({
      id: record.id,
      label: record.ownershipType?.name
        ? `${record.property.propertyCode} — ${record.property.name} — ${record.ownershipType.name}`
        : `${record.property.propertyCode} — ${record.property.name}`,
    })),

    MAINTENANCE: maintenances.map((record) => ({
      id: record.id,
      label: record.title
        ? `${record.referenceNumber} — ${record.title}`
        : record.referenceNumber,
    })),

    INCIDENT: incidents.map((record) => ({
      id: record.id,
      label: record.title
        ? `${record.referenceNumber} — ${record.title}`
        : record.referenceNumber,
    })),

    INCIDENT_RESOLUTION: incidentResolutions.map((record) => ({
      id: record.id,
      label: record.resolution
        ? `${record.incident.referenceNumber} — ${record.resolution}`
        : record.incident.referenceNumber,
    })),

    RETIREMENT: retirements.map((record) => ({
      id: record.id,
      label: `${record.referenceNumber} — ${record.asset.assetCode}`,
    })),

    DISPOSAL: disposals.map((record) => ({
      id: record.id,
      label: `${record.referenceNumber} — ${record.disposalDate.toLocaleDateString()}`,
    })),

    DISPOSAL_ITEM: disposalItems.map((record) => ({
      id: record.id,
      label: `${record.disposal.referenceNumber} — ${record.asset.assetCode} — ${record.asset.name}`,
    })),
  } satisfies Record<DocumentEntityType, { id: string; label: string }[]>;
}
