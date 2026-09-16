import { prisma } from '@/lib/prisma';

export async function countActiveProperties(): Promise<number> {
  return prisma.property.count({
    where: {
      isActive: true,
    },
  });
}

export async function countActiveBuildings(): Promise<number> {
  return prisma.building.count({
    where: {
      isActive: true,
    },
  });
}

export async function countAssets(): Promise<number> {
  return prisma.asset.count();
}

export async function countActiveEmployees(): Promise<number> {
  return prisma.employee.count({
    where: {
      isActive: true,
    },
  });
}

export async function countAcquisitions(): Promise<number> {
  return prisma.acquisition.count();
}

export async function countActiveOrganizationUnits(): Promise<number> {
  return prisma.organizationUnit.count({
    where: {
      isActive: true,
    },
  });
}

export async function getAssetsForExecutiveDashboard() {
  return prisma.asset.findMany({
    select: {
      id: true,
      assetType: {
        select: {
          id: true,
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
          organizationUnit: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function getAcquisitionsSince(startDate: Date) {
  return prisma.acquisition.findMany({
    where: {
      acquisitionDate: {
        gte: startDate,
      },
    },
    select: {
      acquisitionDate: true,
    },
  });
}

export async function getMaintenancesSince(startDate: Date) {
  return prisma.maintenance.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
    },
  });
}

export async function getIncidentsSince(startDate: Date) {
  return prisma.incident.findMany({
    where: {
      incidentDate: {
        gte: startDate,
      },
    },
    select: {
      incidentDate: true,
    },
  });
}

export async function getRetirementsSince(startDate: Date) {
  return prisma.retirement.findMany({
    where: {
      retirementDate: {
        gte: startDate,
      },
    },
    select: {
      retirementDate: true,
    },
  });
}

export async function getDisposalsSince(startDate: Date) {
  return prisma.disposal.findMany({
    where: {
      disposalDate: {
        gte: startDate,
      },
    },
    select: {
      disposalDate: true,
    },
  });
}
