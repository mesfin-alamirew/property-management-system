'use client';

import { useState } from 'react';

import type { AssetReportFilters } from '../types/asset.types';

type AssetReportFiltersProps = {
  assetTypes: {
    id: string;
    code: string;
    name: string;
  }[];

  statuses: {
    id: string;
    code: string;
    name: string;
  }[];

  conditions: {
    id: string;
    code: string;
    name: string;
  }[];

  onFilter: (filters: AssetReportFilters) => void;
};

export function AssetReportFilters({
  assetTypes,
  statuses,
  conditions,
  onFilter,
}: AssetReportFiltersProps) {
  const [search, setSearch] = useState('');
  const [assetTypeId, setAssetTypeId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [conditionId, setConditionId] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onFilter({
      search: search.trim() || undefined,
      assetTypeId: assetTypeId || undefined,
      statusId: statusId || undefined,
      conditionId: conditionId || undefined,
    });
  }

  function handleReset() {
    setSearch('');
    setAssetTypeId('');
    setStatusId('');
    setConditionId('');

    onFilter({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-lg border p-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <div className="space-y-1">
        <label htmlFor="asset-report-search" className="text-sm font-medium">
          Search
        </label>

        <input
          id="asset-report-search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Code, tag, name, serial..."
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="asset-report-type" className="text-sm font-medium">
          Asset Type
        </label>

        <select
          id="asset-report-type"
          value={assetTypeId}
          onChange={(event) => setAssetTypeId(event.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Asset Types</option>

          {assetTypes.map((assetType) => (
            <option key={assetType.id} value={assetType.id}>
              {assetType.code} - {assetType.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="asset-report-status" className="text-sm font-medium">
          Status
        </label>

        <select
          id="asset-report-status"
          value={statusId}
          onChange={(event) => setStatusId(event.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>

          {statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.code} - {status.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="asset-report-condition" className="text-sm font-medium">
          Condition
        </label>

        <select
          id="asset-report-condition"
          value={conditionId}
          onChange={(event) => setConditionId(event.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Conditions</option>

          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.code} - {condition.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end gap-2 md:col-span-2 lg:col-span-4">
        <button
          type="submit"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
