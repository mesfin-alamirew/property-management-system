import { getActiveAcquisitionMethods } from '../queries/acquisition-method.queries';

import { AcquisitionMethodWorkspace } from './acquisition-method-workspace';

export async function AcquisitionMethodPage() {
  const acquisitionMethods = await getActiveAcquisitionMethods();

  return <AcquisitionMethodWorkspace acquisitionMethods={acquisitionMethods} />;
}
