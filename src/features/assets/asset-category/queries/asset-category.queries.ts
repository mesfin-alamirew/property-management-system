import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getAssetCategories(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_CATEGORY:READ',
  });
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
