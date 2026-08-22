import {
  getPhysicalVerifications,
  getActiveOrganizationUnits,
  getActiveAssetLocations,
} from '../queries/physical-verification.queries';

import { PhysicalVerificationWorkspace } from './physical-verification-workspace';

export async function PhysicalVerificationPage() {
  const [physicalVerifications, organizationUnits, locations] =
    await Promise.all([
      getPhysicalVerifications(),
      getActiveOrganizationUnits(),
      getActiveAssetLocations(),
    ]);

  return (
    <PhysicalVerificationWorkspace
      physicalVerifications={physicalVerifications}
      organizationUnits={organizationUnits}
      locations={locations}
    />
  );
}
