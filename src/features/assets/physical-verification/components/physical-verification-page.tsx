import {
  getPhysicalVerifications,
  getActiveOrganizationUnits,
  getActiveAssetLocations,
} from '../queries/physical-verification.queries';

import { PhysicalVerificationWorkspace } from './physical-verification-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function PhysicalVerificationPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getPhysicalVerifications(user.id),
      getActiveOrganizationUnits(),
      getActiveAssetLocations(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [physicalVerifications, organizationUnits, locations] = data;

  return (
    <PhysicalVerificationWorkspace
      physicalVerifications={physicalVerifications}
      organizationUnits={organizationUnits}
      locations={locations}
    />
  );
}
