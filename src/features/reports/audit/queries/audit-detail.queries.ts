import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/lib/authorization/authorization.service';
export async function getAuditDetail(userId: string, id: string) {
  await requirePermission({
    userId,
    permissionCode: 'REPORT_AUDIT:READ',
  });
  const auditLog = await prisma.auditLog.findUnique({
    where: { id },
    select: {
      id: true,
      action: true,
      entityType: true,
      entityId: true,
      description: true,
      oldValue: true,
      newValue: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          displayName: true,
          username: true,
          isActive: true,
          employeeId: true,
        },
      },
    },
  });

  if (!auditLog) {
    return null;
  }

  return {
    id: auditLog.id,
    user: auditLog.user,
    action: auditLog.action,
    entityType: auditLog.entityType,
    entityId: auditLog.entityId,
    description: auditLog.description,
    oldValue: auditLog.oldValue,
    newValue: auditLog.newValue,
    createdAt: auditLog.createdAt,
  };
}
