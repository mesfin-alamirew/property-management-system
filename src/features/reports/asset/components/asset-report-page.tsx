import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

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
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Asset management report
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          Asset Report
        </h1>

        <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
          Review assets by classification, status, condition, location,
          assignment, and acquisition information.
        </p>
      </header>

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
