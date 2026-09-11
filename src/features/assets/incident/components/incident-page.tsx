import {
  getIncidents,
  getAssets,
  getActiveUsers,
} from '../queries/incident.queries';

import { IncidentWorkspace } from './incident-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function IncidentPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getIncidents(user.id),
      getAssets(),
      getActiveUsers(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [incidents, assets, users] = data;

  return (
    <IncidentWorkspace incidents={incidents} assets={assets} users={users} />
  );
}
