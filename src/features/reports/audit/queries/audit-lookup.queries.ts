import { prisma } from '@/lib/prisma';

import { requirePermission } from '@/lib/authorization/authorization.service';

export async function getAuditReportUsers(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_AUDIT:READ',
  });

  return prisma.user.findMany({
    orderBy: {
      displayName: 'asc',
    },
    select: {
      id: true,
      displayName: true,
      username: true,
      isActive: true,
    },
  });
}

export async function getAuditReportActions(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_AUDIT:READ',
  });

  const auditLogs = await prisma.auditLog.findMany({
    distinct: ['action'],
    orderBy: {
      action: 'asc',
    },
    select: {
      action: true,
    },
  });

  return auditLogs.map((auditLog) => auditLog.action);
}

export async function getAuditReportEntityTypes(userId: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_AUDIT:READ',
  });

  const auditLogs = await prisma.auditLog.findMany({
    distinct: ['entityType'],
    orderBy: {
      entityType: 'asc',
    },
    select: {
      entityType: true,
    },
  });

  return auditLogs.map((auditLog) => auditLog.entityType);
}
