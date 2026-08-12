import { getOwnershipTypes } from '../queries/ownership-type.queries';

import { OwnershipTypeWorkspace } from './ownership-type-workspace';

export async function OwnershipTypePage() {
  const ownershipTypes = await getOwnershipTypes();

  return <OwnershipTypeWorkspace ownershipTypes={ownershipTypes} />;
}
