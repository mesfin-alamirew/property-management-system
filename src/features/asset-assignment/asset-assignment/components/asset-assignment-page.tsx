import {
  getAssetAssignments,
  getAvailableAssets,
} from '../queries/asset-assignment.queries';

import { getEmployees } from '@/features/asset-assignment/employee/queries/employee.queries';

import { AssetAssignmentWorkspace } from '../components/asset-assignment-workspace';

export async function AssetAssignmentPage() {
  const [assignments, assets, employees] = await Promise.all([
    getAssetAssignments(),
    getAvailableAssets(),
    getEmployees(),
  ]);

  return (
    <AssetAssignmentWorkspace
      assignments={assignments}
      assets={assets}
      employees={employees}
    />
  );
}
