'use client';

import { useState } from 'react';
import type {
  AccountabilityExceptionSeverity,
  AccountabilityExceptionType,
} from '../types/accountability.types';

type LookupOption = {
  id: string;
  code: string;
  name: string;
};

type AccountabilityReportFiltersProps = {
  filters: {
    search?: string;
    exceptionType?: AccountabilityExceptionType;
    severity?: AccountabilityExceptionSeverity;
    organizationUnitId?: string;
    locationId?: string;
    assetTypeId?: string;
    assetStatusId?: string;
  };
  lookups: {
    organizationUnits: LookupOption[];
    locations: LookupOption[];
    assetTypes: LookupOption[];
    assetStatuses: LookupOption[];
    exceptionTypes: Array<{
      value: AccountabilityExceptionType;
      label: string;
    }>;
    severities: Array<{
      value: AccountabilityExceptionSeverity;
      label: string;
    }>;
  };
  onChange: (filters: AccountabilityReportFiltersProps['filters']) => void;
};

export function AccountabilityReportFilters({
  filters,
  lookups,
  onChange,
}: AccountabilityReportFiltersProps) {
  const [search, setSearch] = useState(filters.search ?? '');

  function updateFilter(
    key: keyof AccountabilityReportFiltersProps['filters'],
    value: string,
  ) {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  }

  function handleSearchChange(value: string) {
    setSearch(value);

    onChange({
      ...filters,
      search: value || undefined,
    });
  }

  function clearFilters() {
    setSearch('');
    onChange({});
  }

  const hasFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== '',
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <label
            htmlFor="accountability-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="accountability-search"
            type="text"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Asset code, tag, name, details, evidence..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="accountability-exception-type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Exception Type
          </label>

          <select
            id="accountability-exception-type"
            value={filters.exceptionType ?? ''}
            onChange={(event) =>
              updateFilter('exceptionType', event.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>

            {lookups.exceptionTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="accountability-severity"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Severity
          </label>

          <select
            id="accountability-severity"
            value={filters.severity ?? ''}
            onChange={(event) => updateFilter('severity', event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>

            {lookups.severities.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="accountability-organization-unit"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Organization Unit
          </label>

          <select
            id="accountability-organization-unit"
            value={filters.organizationUnitId ?? ''}
            onChange={(event) =>
              updateFilter('organizationUnitId', event.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>

            {lookups.organizationUnits.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} — {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="accountability-location"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Location
          </label>

          <select
            id="accountability-location"
            value={filters.locationId ?? ''}
            onChange={(event) => updateFilter('locationId', event.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>

            {lookups.locations.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} — {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="accountability-asset-type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset Type
          </label>

          <select
            id="accountability-asset-type"
            value={filters.assetTypeId ?? ''}
            onChange={(event) =>
              updateFilter('assetTypeId', event.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>

            {lookups.assetTypes.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} — {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="accountability-asset-status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Asset Status
          </label>

          <select
            id="accountability-asset-status"
            value={filters.assetStatusId ?? ''}
            onChange={(event) =>
              updateFilter('assetStatusId', event.target.value)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>

            {lookups.assetStatuses.map((option) => (
              <option key={option.id} value={option.id}>
                {option.code} — {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
