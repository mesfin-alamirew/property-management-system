import type {
  Ownership,
  OwnershipType,
  Property,
} from '@/generated/prisma/client';

export type OwnershipWithRelations = Omit<Ownership, 'acquisitionPrice'> & {
  acquisitionPrice: string | null;

  property: Pick<Property, 'id' | 'propertyCode' | 'name'>;

  ownershipType: Pick<OwnershipType, 'id' | 'code' | 'name'>;
};
