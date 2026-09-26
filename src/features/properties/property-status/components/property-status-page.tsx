import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getPropertyStatuses } from '../queries/property-status.queries';

import { PropertyStatusWorkspace } from './property-status-workspace';

export async function PropertyStatusPage() {
  const user = await requireCurrentUser();

  let propertyStatuses;

  try {
    propertyStatuses = await getPropertyStatuses(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <PropertyStatusWorkspace propertyStatuses={propertyStatuses} />;
}
