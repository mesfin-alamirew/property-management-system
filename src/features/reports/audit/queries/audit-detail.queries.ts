import { prisma } from '@/lib/prisma';

export async function getAuditDetail(id: string) {
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
