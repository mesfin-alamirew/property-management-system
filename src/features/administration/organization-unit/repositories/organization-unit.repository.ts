import { prisma } from '@/lib/prisma';

import type { OrganizationUnitFormData } from '../schemas/organization-unit.schema';

export async function findOrganizationUnits() {
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },
    include: {
      country: {
        select: {
          id: true,
          name: true,
        },
      },
      parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findOrganizationUnitById(id: string) {
  return prisma.organizationUnit.findUnique({
    where: {
      id,
    },
  });
}

export async function findOrganizationUnitByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.organizationUnit.findFirst({
    where: {
      code,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findOrganizationUnitByName(
  name: string,
  excludeId?: string,
) {
  return prisma.organizationUnit.findFirst({
    where: {
      name,
      NOT: excludeId
        ? {
            id: excludeId,
          }
        : undefined,
    },
  });
}

export async function findOrganizationUnitChildren(parentId: string) {
  return prisma.organizationUnit.findMany({
    where: {
      parentId,
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findOrganizationUnitDescendants(id: string) {
  const descendants: string[] = [];
  const currentParentIds = [id];

  while (currentParentIds.length > 0) {
    const children = await prisma.organizationUnit.findMany({
      where: {
        parentId: {
          in: currentParentIds,
        },
      },
      select: {
        id: true,
      },
    });

    const childIds = children.map((child) => child.id);

    descendants.push(...childIds);

    currentParentIds.splice(0, currentParentIds.length, ...childIds);
  }

  return descendants;
}

export async function createOrganizationUnitRecord(
  data: OrganizationUnitFormData,
) {
  return prisma.organizationUnit.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      type: data.type,
      countryId: data.countryId,
      parentId: data.parentId,
    },
  });
}

export async function updateOrganizationUnitRecord(
  id: string,
  data: OrganizationUnitFormData,
) {
  return prisma.organizationUnit.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      type: data.type,
      countryId: data.countryId,
      parentId: data.parentId,
    },
  });
}

export async function deactivateOrganizationUnitRecord(id: string) {
  return prisma.organizationUnit.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
export async function findActiveOrganizationUnitChildren(parentId: string) {
  return prisma.organizationUnit.findMany({
    where: {
      parentId,
      isActive: true,
    },
    select: {
      id: true,
    },
  });
}

export async function findActiveOrganizationUnitProperties(
  organizationUnitId: string,
) {
  return prisma.property.findMany({
    where: {
      organizationUnitId,
      isActive: true,
    },
    select: {
      id: true,
    },
  });
}

export async function findOrganizationUnitParents() {
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
