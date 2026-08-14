import { prisma } from '@/lib/prisma';

import type { PropertyCategoryFormData } from '../schemas/property-category.schema';

export async function findPropertyCategories() {
  return prisma.propertyCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function findPropertyCategoryById(id: string) {
  return prisma.propertyCategory.findUnique({
    where: {
      id,
    },
  });
}

export async function findPropertyCategoryByCode(
  code: string,
  excludeId?: string,
) {
  return prisma.propertyCategory.findFirst({
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

export async function findPropertyCategoryByName(
  name: string,
  excludeId?: string,
) {
  return prisma.propertyCategory.findFirst({
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
export async function findPropertyCategoryChildren(parentId: string) {
  return prisma.propertyCategory.findMany({
    where: {
      parentId,
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function createPropertyCategoryRecord(
  data: PropertyCategoryFormData,
) {
  return prisma.propertyCategory.create({
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      parentId: data.parentId,
    },
  });
}
export async function updatePropertyCategoryRecord(
  id: string,
  data: PropertyCategoryFormData,
) {
  return prisma.propertyCategory.update({
    where: {
      id,
    },
    data: {
      code: data.code,
      name: data.name,
      description: data.description,
      parentId: data.parentId,
    },
  });
}
export async function deactivatePropertyCategoryRecord(id: string) {
  return prisma.propertyCategory.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}
// This function retrieves the parent of a given property category by its parentId.
export async function findPropertyCategoryParent(parentId: string) {
  return prisma.propertyCategory.findUnique({
    where: {
      id: parentId,
    },
  });
}

// This function retrieves all descendants of a given property category by its ID.
export async function findPropertyCategoryDescendants(id: string) {
  const descendants: string[] = [];
  let currentParentIds = [id];

  while (currentParentIds.length > 0) {
    const children = await prisma.propertyCategory.findMany({
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

    currentParentIds = childIds;
  }

  return descendants;
}

export async function findPropertyCategoryParents() {
  return prisma.propertyCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
