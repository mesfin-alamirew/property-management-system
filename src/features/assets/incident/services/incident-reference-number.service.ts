import { Prisma } from '@/generated/prisma/client';

export async function generateNextIncidentReferenceNumber(
  tx: Prisma.TransactionClient,
): Promise<string> {
  const year = new Date().getFullYear();

  const sequence = await tx.incidentNumberSequence.upsert({
    where: {
      year,
    },

    create: {
      year,
      lastNumber: 1,
    },

    update: {
      lastNumber: {
        increment: 1,
      },
    },
  });

  return `INC-${year}-${sequence.lastNumber.toString().padStart(6, '0')}`;
}
