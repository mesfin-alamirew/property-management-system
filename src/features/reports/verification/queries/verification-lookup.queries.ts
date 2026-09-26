import { requirePermission } from '@/lib/authorization/authorization.service';
import { prisma } from '@/lib/prisma';

export async function getVerificationOrganizationUnits(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_VERIFICATION:READ',
  });

  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getVerificationLocations(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_VERIFICATION:READ',
  });

  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}
