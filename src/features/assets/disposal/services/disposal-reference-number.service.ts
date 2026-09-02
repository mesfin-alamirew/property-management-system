import { Prisma } from '@/generated/prisma/client';

export async function generateNextDisposalReferenceNumber(
  tx: Prisma.TransactionClient,
): Promise<string> {
  const year = new Date().getFullYear();

  const sequence = await tx.disposalNumberSequence.upsert({
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

  return `DSP-${year}-${sequence.lastNumber.toString().padStart(6, '0')}`;
}
