import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getPropertyTypes } from '../queries/property-type.queries';

import { PropertyTypeWorkspace } from './property-type-workspace';

export async function PropertyTypePage() {
  const user = await requireCurrentUser();

  let propertyTypes;

  try {
    propertyTypes = await getPropertyTypes(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <PropertyTypeWorkspace propertyTypes={propertyTypes} />;
}
