import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getActiveAcquisitionMethods } from '../queries/acquisition-method.queries';

import { AcquisitionMethodWorkspace } from './acquisition-method-workspace';

export async function AcquisitionMethodPage() {
  const user = await requireCurrentUser();

  let acquisitionMethods;

  try {
    acquisitionMethods = await getActiveAcquisitionMethods(user.id);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  return <AcquisitionMethodWorkspace acquisitionMethods={acquisitionMethods} />;
}
