import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getOwnershipTypes } from '../queries/ownership-type.queries';

import { OwnershipTypeWorkspace } from './ownership-type-workspace';

export async function OwnershipTypePage() {
  const user = await requireCurrentUser();

  let ownershipTypes;

  try {
    ownershipTypes = await getOwnershipTypes(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <OwnershipTypeWorkspace ownershipTypes={ownershipTypes} />;
}
