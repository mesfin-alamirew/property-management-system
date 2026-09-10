import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getAssetStatuses(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'ASSET_STATUS:READ',
  });

  return prisma.assetStatus.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
