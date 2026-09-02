import { Prisma } from '@/generated/prisma/client';

export async function generateNextRetirementReferenceNumber(
  tx: Prisma.TransactionClient,
): Promise<string> {
  const year = new Date().getFullYear();

  const sequence = await tx.retirementNumberSequence.upsert({
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

  return `RET-${year}-${sequence.lastNumber.toString().padStart(6, '0')}`;
}
