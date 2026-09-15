'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

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

  const fieldClassName =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-focus-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <label
            htmlFor="accountability-search"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Search
          </label>

          <input
            id="accountability-search"
            type="text"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Asset code, tag, name, details, evidence..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="accountability-exception-type"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Exception Type
          </label>

          <select
            id="accountability-exception-type"
            value={filters.exceptionType ?? ''}
            onChange={(event) =>
              updateFilter('exceptionType', event.target.value)
            }
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Severity
          </label>

          <select
            id="accountability-severity"
            value={filters.severity ?? ''}
            onChange={(event) => updateFilter('severity', event.target.value)}
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Organization Unit
          </label>

          <select
            id="accountability-organization-unit"
            value={filters.organizationUnitId ?? ''}
            onChange={(event) =>
              updateFilter('organizationUnitId', event.target.value)
            }
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Location
          </label>

          <select
            id="accountability-location"
            value={filters.locationId ?? ''}
            onChange={(event) => updateFilter('locationId', event.target.value)}
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Asset Type
          </label>

          <select
            id="accountability-asset-type"
            value={filters.assetTypeId ?? ''}
            onChange={(event) =>
              updateFilter('assetTypeId', event.target.value)
            }
            className={fieldClassName}
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
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Asset Status
          </label>

          <select
            id="accountability-asset-status"
            value={filters.assetStatusId ?? ''}
            onChange={(event) =>
              updateFilter('assetStatusId', event.target.value)
            }
            className={fieldClassName}
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
        <div className="mt-5 flex justify-end border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
