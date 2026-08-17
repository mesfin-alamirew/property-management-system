import { getOwnerships } from '../queries/ownership.queries';

import { getProperties } from '@/features/properties/property/queries/property.queries';
import { getOwnershipTypes } from '@/features/ownership/ownership-type/queries/ownership-type.queries';

import { OwnershipWorkspace } from './ownership-workspace';

export async function OwnershipPage() {
  const [ownerships, properties, ownershipTypes] = await Promise.all([
    getOwnerships(),
    getProperties(),
    getOwnershipTypes(),
  ]);

  return (
    <OwnershipWorkspace
      ownerships={ownerships}
      properties={properties}
      ownershipTypes={ownershipTypes}
    />
  );
}
