'use client';

import { useMemo } from 'react';

import type { DashboardFilters as DashboardFilterValues } from '../types/dashboard.types';

type DashboardFiltersProps = {
  filters: DashboardFilterValues;
  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
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
  onChange: (filters: DashboardFilterValues) => void;
};

type FilterSelectProps = {
  label: string;
  value: string | undefined;
  options: {
    id: string;
    code: string;
    name: string;
  }[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="min-w-0 space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>

      <select
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        className={[
          'w-full rounded-md border border-border bg-surface px-3 py-2',
          'text-sm text-foreground shadow-sm',
          'transition-colors',
          'hover:border-muted-foreground/40',
          'focus:border-primary focus:outline-none',
          'focus:ring-2 focus:ring-focus-ring focus:ring-offset-1',
        ].join(' ')}
      >
        <option value="">All</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.code} — {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DashboardFilters({
  filters,
  organizationUnits,
  assetTypes,
  assetStatuses,
  onChange,
}: DashboardFiltersProps) {
  const hasFilters = Boolean(
    filters.organizationUnitId || filters.assetTypeId || filters.assetStatusId,
  );

  const activeFilterCount = useMemo(
    () =>
      [
        filters.organizationUnitId,
        filters.assetTypeId,
        filters.assetStatusId,
      ].filter(Boolean).length,
    [filters.organizationUnitId, filters.assetTypeId, filters.assetStatusId],
  );

  function updateFilter(key: keyof DashboardFilterValues, value: string) {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  }

  function clearFilters() {
    onChange({});
  }

  return (
    <section
      aria-labelledby="dashboard-filters-heading"
      className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="dashboard-filters-heading"
            className="text-sm font-semibold text-foreground"
          >
            Dashboard filters
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Narrow the dashboard by organization unit, asset type, or asset
            status.
          </p>
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className={[
              'inline-flex shrink-0 items-center justify-center rounded-md',
              'border border-border bg-surface px-3 py-2',
              'text-sm font-medium text-foreground',
              'transition-colors',
              'hover:bg-surface-muted',
              'focus:outline-none focus:ring-2 focus:ring-focus-ring',
              'focus:ring-offset-1',
            ].join(' ')}
          >
            Clear filters
            <span className="ml-1.5 text-xs text-muted-foreground">
              ({activeFilterCount})
            </span>
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FilterSelect
          label="Organization Unit"
          value={filters.organizationUnitId}
          options={organizationUnits}
          onChange={(value) => updateFilter('organizationUnitId', value)}
        />

        <FilterSelect
          label="Asset Type"
          value={filters.assetTypeId}
          options={assetTypes}
          onChange={(value) => updateFilter('assetTypeId', value)}
        />

        <FilterSelect
          label="Asset Status"
          value={filters.assetStatusId}
          options={assetStatuses}
          onChange={(value) => updateFilter('assetStatusId', value)}
        />
      </div>

      {hasFilters ? (
        <div
          className="mt-4 flex items-center gap-2 rounded-md border border-primary/20 bg-info-surface px-3 py-2"
          role="status"
          aria-live="polite"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

          <p className="text-xs font-medium text-info">
            Dashboard results are filtered by {activeFilterCount}{' '}
            {activeFilterCount === 1 ? 'criterion' : 'criteria'}.
          </p>
        </div>
      ) : null}
    </section>
  );
}
