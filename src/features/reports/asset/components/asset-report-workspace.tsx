'use client';

import { useState, useTransition } from 'react';

import { getAssetReportAction } from '../actions/asset.actions';
import type {
  AssetReportFilters as AssetReportFiltersType,
  AssetReportRow,
} from '../types/asset.types';

import { AssetReportFilters } from './asset-report-filters';
import { AssetReportTable } from './asset-report-table';

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

      {error ? (
        <div
          className="rounded-md border border-danger/20 bg-danger-surface px-4 py-3"
          role="alert"
        >
          <p className="text-sm font-medium text-danger">{error}</p>
        </div>
      ) : null}

      {isPending ? (
        <div
          className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3"
          role="status"
          aria-live="polite"
        >
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />

          <p className="text-sm text-muted-foreground">
            Loading asset report...
          </p>
        </div>
      ) : (
        <AssetReportTable rows={rows} />
      )}
    </div>
  );
}
