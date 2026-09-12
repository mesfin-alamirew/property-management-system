import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

import type { AuditReportFilters } from '../types/audit.types';
import { requirePermission } from '@/lib/authorization/authorization.service';
export async function getAuditReport(
  userId: string,
  filters: AuditReportFilters = {},
) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_AUDIT:READ',
  });

  const {
    search,
    userId: filterUserId,
    action,
    entityType,
    dateFrom,
    dateTo,
  } = filters;

  const where: Prisma.AuditLogWhereInput = {
    ...(search
      ? {
          OR: [
            {
              action: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              entityType: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              entityId: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              user: {
                displayName: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
            },
          ],
        }
      : {}),

    ...(filterUserId
      ? {
          userId: filterUserId,
        }
      : {}),

    ...(action
      ? {
          action: {
            contains: action,
            mode: 'insensitive' as const,
          },
        }
      : {}),

    ...(entityType
      ? {
          entityType: {
            contains: entityType,
            mode: 'insensitive' as const,
          },
        }
      : {}),

    ...(dateFrom || dateTo
      ? {
          createdAt: {
            ...(dateFrom
              ? {
                  gte: new Date(`${dateFrom}T00:00:00`),
                }
              : {}),
            ...(dateTo
              ? {
                  lte: new Date(`${dateTo}T23:59:59.999`),
                }
              : {}),
          },
        }
      : {}),
  };

  const auditLogs = await prisma.auditLog.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      action: true,
      entityType: true,
      entityId: true,
      description: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          displayName: true,
          username: true,
          isActive: true,
        },
      },
    },
  });

  return auditLogs.map((auditLog) => ({
    id: auditLog.id,
    user: auditLog.user,
    action: auditLog.action,
    entityType: auditLog.entityType,
    entityId: auditLog.entityId,
    description: auditLog.description,
    createdAt: auditLog.createdAt,
  }));
}
