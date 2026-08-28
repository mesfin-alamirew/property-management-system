import { Prisma } from '@/generated/prisma/client';

import type { CreateAuditLogInput } from './audit.types';

type AuditDbClient = Prisma.TransactionClient;

function toPrismaJsonValue(value: CreateAuditLogInput['oldValue']) {
  if (value === null) {
    return Prisma.JsonNull;
  }

  return value;
}

export async function createAuditLog(
  db: AuditDbClient,
  input: CreateAuditLogInput,
) {
  return db.auditLog.create({
    data: {
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      description: input.description,

      oldValue: toPrismaJsonValue(input.oldValue),
      newValue: toPrismaJsonValue(input.newValue),
    },

    select: {
      id: true,
      userId: true,
      action: true,
      entityType: true,
      entityId: true,
      description: true,
      oldValue: true,
      newValue: true,
      createdAt: true,
    },
  });
}
