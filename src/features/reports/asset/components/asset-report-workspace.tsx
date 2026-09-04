'use client';

import { useState, useTransition } from 'react';

import { getAssetReportAction } from '../actions/asset.actions';
import { AssetReportFilters } from './asset-report-filters';
import { AssetReportTable } from './asset-report-table';
import type {
  AssetReportFilters as AssetReportFiltersType,
  AssetReportRow,
} from '../types/asset.types';

type LookupOption = {
  id: string;
  code: string;
  name: string;
};

type AssetReportWorkspaceProps = {
  assetTypes: LookupOption[];
  assetCategories: LookupOption[];
  statuses: LookupOption[];
  conditions: LookupOption[];
  organizationUnits: LookupOption[];
  locations: LookupOption[];
  acquisitionMethods: LookupOption[];
  initialRows: AssetReportRow[];
};

export function AssetReportWorkspace({
  assetTypes,
  assetCategories,
  statuses,
  conditions,
  organizationUnits,
  locations,
  acquisitionMethods,
  initialRows,
}: AssetReportWorkspaceProps) {
  const [rows, setRows] = useState<AssetReportRow[]>(initialRows);

  const [error, setError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  function handleApply(filters: AssetReportFiltersType) {
    setError(null);

    startTransition(async () => {
      const result = await getAssetReportAction(filters);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setRows(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <AssetReportFilters
        assetTypes={assetTypes}
        assetCategories={assetCategories}
        statuses={statuses}
        conditions={conditions}
        organizationUnits={organizationUnits}
        locations={locations}
        acquisitionMethods={acquisitionMethods}
        onApply={handleApply}
      />

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isPending ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          Loading asset report...
        </div>
      ) : (
        <AssetReportTable rows={rows} />
      )}
    </div>
  );
}
