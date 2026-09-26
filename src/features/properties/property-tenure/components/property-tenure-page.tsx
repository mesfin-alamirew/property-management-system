import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getPropertyTenures } from '../queries/property-tenure.queries';

import { PropertyTenureWorkspace } from './property-tenure-workspace';

export async function PropertyTenurePage() {
  const user = await requireCurrentUser();

  let propertyTenures;

  try {
    propertyTenures = await getPropertyTenures(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <PropertyTenureWorkspace propertyTenures={propertyTenures} />;
}
