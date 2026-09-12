import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';
import { AccessDenied } from '@/components/ui/access-denied';

import { getAssetReport } from '../queries/asset.queries';
import {
  getAssetReportAcquisitionMethods,
  getAssetReportAssetCategories,
  getAssetReportAssetTypes,
  getAssetReportConditions,
  getAssetReportLocations,
  getAssetReportOrganizationUnits,
  getAssetReportStatuses,
} from '../queries/asset-lookup.queries';
import { AssetReportWorkspace } from './asset-report-workspace';

export async function AssetReportPage() {
  const user = await requireCurrentUser();

  let data;

  try {
    data = await Promise.all([
      getAssetReportAssetTypes(),
      getAssetReportAssetCategories(),
      getAssetReportStatuses(),
      getAssetReportConditions(),
      getAssetReportOrganizationUnits(),
      getAssetReportLocations(),
      getAssetReportAcquisitionMethods(),
      getAssetReport(user.id),
    ]);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  const [
    assetTypes,
    assetCategories,
    statuses,
    conditions,
    organizationUnits,
    locations,
    acquisitionMethods,
    initialRows,
  ] = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Asset Report</h1>

        <p className="mt-1 text-sm text-gray-600">
          Review the organization&apos;s assets, current status, condition,
          location, assignment, and acquisition information.
        </p>
      </div>

      <AssetReportWorkspace
        assetTypes={assetTypes}
        assetCategories={assetCategories}
        statuses={statuses}
        conditions={conditions}
        organizationUnits={organizationUnits}
        locations={locations}
        acquisitionMethods={acquisitionMethods}
        initialRows={initialRows}
      />
    </div>
  );
}
