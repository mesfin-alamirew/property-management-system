import {
  getAssetAssignments,
  getAvailableAssets,
} from '../queries/asset-assignment.queries';

import { getEmployees } from '@/features/asset-assignment/employee/queries/employee.queries';

import { AssetAssignmentWorkspace } from '../components/asset-assignment-workspace';

import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

export async function AssetAssignmentPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getAssetAssignments(user.id),
      getAvailableAssets(),
      getEmployees(),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [assignments, assets, employees] = data;

  return (
    <AssetAssignmentWorkspace
      assignments={assignments}
      assets={assets}
      employees={employees}
    />
  );
}
