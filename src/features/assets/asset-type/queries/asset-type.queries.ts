import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getAssetTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_TYPE:READ',
  });
  const assetTypes = await prisma.assetType.findMany({
    where: {
      isActive: true,
      category: {
        isActive: true,
      },
    },
    orderBy: {
      name: 'asc',
    },
    include: {
      category: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },
    },
  });

  return assetTypes;
}
