import { Prisma } from '@/generated/prisma/client';

export type WoredaWithZone = Prisma.WoredaGetPayload<{
  include: {
    zone: true;
  };
}>;
