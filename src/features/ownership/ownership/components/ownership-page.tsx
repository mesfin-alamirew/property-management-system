import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getOwnerships } from '../queries/ownership.queries';

import { getProperties } from '@/features/properties/property/queries/property.queries';
import { getOwnershipTypes } from '@/features/ownership/ownership-type/queries/ownership-type.queries';

import { OwnershipWorkspace } from './ownership-workspace';

export async function OwnershipPage() {
  const user = await requireCurrentUser();

  let ownerships;
  let properties;
  let ownershipTypes;

  try {
    [ownerships, properties, ownershipTypes] = await Promise.all([
      getOwnerships(user.id),
      getProperties(user.id),
      getOwnershipTypes(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return (
    <OwnershipWorkspace
      ownerships={ownerships}
      properties={properties}
      ownershipTypes={ownershipTypes}
    />
  );
}
