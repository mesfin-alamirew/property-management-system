'use client';

import { useState } from 'react';

import type { AssetReportFilters, AssetReportRow } from '../types/asset.types';

import { getAssetReportAction } from '../actions/asset.actions';

import { AssetReportFilters as AssetReportFiltersComponent } from './asset-report-filters';
import { AssetReportTable } from './asset-report-table';

type AssetReportWorkspaceProps = {
  assets: AssetReportRow[];

  assetTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  assetStatuses: {
    id: string;
    code: string;
    name: string;
  }[];

  assetConditions: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function AssetReportWorkspace({
  assets,
  assetTypes,
  assetStatuses,
  assetConditions,
}: AssetReportWorkspaceProps) {
  const [reportRows, setReportRows] = useState<AssetReportRow[]>(assets);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleFilter(filters: AssetReportFilters) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await getAssetReportAction(filters);

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setReportRows(result.data);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Asset Report</h1>

        <p className="text-sm text-muted-foreground">
          View and filter registered organizational assets.
        </p>
      </div>

      <AssetReportFiltersComponent
        assetTypes={assetTypes}
        statuses={assetStatuses}
        conditions={assetConditions}
        onFilter={handleFilter}
      />

      {errorMessage && (
        <div className="rounded-md border p-3 text-sm">{errorMessage}</div>
      )}

      {isLoading ? (
        <div className="rounded-md border p-6 text-center text-sm">
          Loading report...
        </div>
      ) : (
        <AssetReportTable assets={reportRows} />
      )}
    </div>
  );
}
