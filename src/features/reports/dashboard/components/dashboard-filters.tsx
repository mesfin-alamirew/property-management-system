'use client';

import type { DashboardFilters } from '../types/dashboard.types';

type LookupOption = {
  id: string;
  code: string;
  name: string;
};

type DashboardFiltersProps = {
  filters: DashboardFilters;
  organizationUnits: LookupOption[];
  assetTypes: LookupOption[];
  assetStatuses: LookupOption[];
  onChange: (filters: DashboardFilters) => void;
};

export function DashboardFilters({
  filters,
  organizationUnits,
  assetTypes,
  assetStatuses,
  onChange,
}: DashboardFiltersProps) {
  function updateFilter(key: keyof DashboardFilters, value: string) {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  }

  function clearFilters() {
    onChange({});
  }

  const hasFilters =
    Boolean(filters.organizationUnitId) ||
    Boolean(filters.assetTypeId) ||
    Boolean(filters.assetStatusId);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            htmlFor="dashboard-organization-unit"
            className="block text-sm font-medium text-gray-700"
          >
            Organization Unit
          </label>
          <select
            id="dashboard-organization-unit"
            value={filters.organizationUnitId ?? ''}
            onChange={(event) =>
              updateFilter('organizationUnitId', event.target.value)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
          >
            <option value="">All organization units</option>
            {organizationUnits.map((organizationUnit) => (
              <option key={organizationUnit.id} value={organizationUnit.id}>
                {organizationUnit.code} — {organizationUnit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="dashboard-asset-type"
            className="block text-sm font-medium text-gray-700"
          >
            Asset Type
          </label>
          <select
            id="dashboard-asset-type"
            value={filters.assetTypeId ?? ''}
            onChange={(event) =>
              updateFilter('assetTypeId', event.target.value)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
          >
            <option value="">All asset types</option>
            {assetTypes.map((assetType) => (
              <option key={assetType.id} value={assetType.id}>
                {assetType.code} — {assetType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="dashboard-asset-status"
            className="block text-sm font-medium text-gray-700"
          >
            Asset Status
          </label>
          <select
            id="dashboard-asset-status"
            value={filters.assetStatusId ?? ''}
            onChange={(event) =>
              updateFilter('assetStatusId', event.target.value)
            }
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
          >
            <option value="">All asset statuses</option>
            {assetStatuses.map((assetStatus) => (
              <option key={assetStatus.id} value={assetStatus.id}>
                {assetStatus.code} — {assetStatus.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasFilters}
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
