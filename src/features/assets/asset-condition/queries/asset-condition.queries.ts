import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getAssetConditions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_CONDITION:READ',
  });

  return prisma.assetCondition.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
