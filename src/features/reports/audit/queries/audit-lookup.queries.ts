import { prisma } from '@/lib/prisma';

export async function getAuditReportUsers() {
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

export async function getAuditReportActions() {
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

export async function getAuditReportEntityTypes() {
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
