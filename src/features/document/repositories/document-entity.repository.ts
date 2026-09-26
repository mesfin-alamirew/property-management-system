import { prisma } from '@/lib/prisma';

import type { DocumentEntityType } from '@/generated/prisma/client';

export async function documentEntityExists(
  entityType: DocumentEntityType,
  entityId: string,
): Promise<boolean> {
  switch (entityType) {
    case 'ASSET':
      return Boolean(
        await prisma.asset.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'ACQUISITION':
      return Boolean(
        await prisma.acquisition.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'ACQUISITION_ITEM':
      return Boolean(
        await prisma.acquisitionItem.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'ASSET_ASSIGNMENT':
      return Boolean(
        await prisma.assetAssignment.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'ASSET_MOVEMENT':
      return Boolean(
        await prisma.assetMovement.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'PHYSICAL_VERIFICATION':
      return Boolean(
        await prisma.physicalVerification.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'PHYSICAL_VERIFICATION_ITEM':
      return Boolean(
        await prisma.physicalVerificationItem.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'PROPERTY':
      return Boolean(
        await prisma.property.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'BUILDING':
      return Boolean(
        await prisma.building.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'OWNERSHIP':
      return Boolean(
        await prisma.ownership.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'MAINTENANCE':
      return Boolean(
        await prisma.maintenance.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'INCIDENT':
      return Boolean(
        await prisma.incident.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'INCIDENT_RESOLUTION':
      return Boolean(
        await prisma.incidentResolution.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'RETIREMENT':
      return Boolean(
        await prisma.retirement.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'DISPOSAL':
      return Boolean(
        await prisma.disposal.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );

    case 'DISPOSAL_ITEM':
      return Boolean(
        await prisma.disposalItem.findUnique({
          where: { id: entityId },
          select: { id: true },
        }),
      );
  }
}
