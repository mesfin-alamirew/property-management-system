import type { Prisma } from '@/generated/prisma/client';

export type BuildingSpaceWithRelations = Omit<
  Prisma.BuildingSpaceGetPayload<{
    include: {
      building: {
        select: {
          id: true;
          buildingCode: true;
          name: true;
          property: {
            select: {
              id: true;
              propertyCode: true;
              name: true;
            };
          };
        };
      };

      spaceType: {
        select: {
          id: true;
          code: true;
          name: true;
        };
      };
    };
  }>,
  'areaSqm'
> & {
  areaSqm: string | null;
};
