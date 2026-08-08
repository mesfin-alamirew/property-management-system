import { Prisma } from '@/generated/prisma/client';

export type ZoneWithRegion = Prisma.ZoneGetPayload<{
  include: {
    region: true;
  };
}>;
