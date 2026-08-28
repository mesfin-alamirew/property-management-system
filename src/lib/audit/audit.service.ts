import { Prisma } from '@/generated/prisma/client';

import { createAuditLog } from './audit.repository';
import type { CreateAuditLogInput } from './audit.types';

export async function recordAuditEvent(
  tx: Prisma.TransactionClient,
  input: CreateAuditLogInput,
) {
  return createAuditLog(tx, input);
}
