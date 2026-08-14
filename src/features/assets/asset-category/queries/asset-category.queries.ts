import { prisma } from '@/lib/prisma';

export async function getAssetCategories() {
  const categories = await prisma.assetCategory.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      parent: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });

  return categories;
}
