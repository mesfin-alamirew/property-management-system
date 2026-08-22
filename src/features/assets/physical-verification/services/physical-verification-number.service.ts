import { Prisma } from '@/generated/prisma/client';

export async function generateNextPhysicalVerificationNumber(
  tx: Prisma.TransactionClient,
): Promise<string> {
  const year = new Date().getFullYear();

  const sequence = await tx.physicalVerificationNumberSequence.upsert({
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

  return `PV-${year}-${sequence.lastNumber.toString().padStart(6, '0')}`;
}
