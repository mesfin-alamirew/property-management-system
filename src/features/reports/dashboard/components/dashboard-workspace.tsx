'use client';

import { useEffect, useState, useTransition } from 'react';

import { getDashboardDataAction } from '../actions/dashboard.actions';
import type {
  DashboardData,
  DashboardFilters as DashboardFilterValues,
} from '../types/dashboard.types';

import { DashboardAccountabilitySummary } from './dashboard-accountability-summary';
import { DashboardFilters } from './dashboard-filters';
import { DashboardKpiCards } from './dashboard-kpi-cards';
import { DashboardLifecycleSummary } from './dashboard-lifecycle-summary';
import { DashboardOperationalSummary } from './dashboard-operational-summary';
import { DashboardOrganizationSummary } from './dashboard-organization-summary';
import { DashboardVerificationSummary } from './dashboard-verification-summary';

type DashboardWorkspaceProps = {
  initialData: DashboardData;
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
};

export function DashboardWorkspace({
  initialData,
  organizationUnits,
  assetTypes,
  assetStatuses,
}: DashboardWorkspaceProps) {
  const [filters, setFilters] = useState<DashboardFilterValues>({});
  const [data, setData] = useState<DashboardData>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (
      !filters.organizationUnitId &&
      !filters.assetTypeId &&
      !filters.assetStatusId
    ) {
      return;
    }

    startTransition(async () => {
      const result = await getDashboardDataAction(filters);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setData(result.data);
      setError(null);
    });
  }, [filters]);

  function handleFiltersChange(nextFilters: DashboardFilterValues) {
    setFilters(nextFilters);
    setError(null);

    const hasFilters =
      Boolean(nextFilters.organizationUnitId) ||
      Boolean(nextFilters.assetTypeId) ||
      Boolean(nextFilters.assetStatusId);

    if (!hasFilters) {
      setData(initialData);
    }
  }

  return (
    <div className="space-y-6">
      <DashboardFilters
        filters={filters}
        organizationUnits={organizationUnits}
        assetTypes={assetTypes}
        assetStatuses={assetStatuses}
        onChange={handleFiltersChange}
      />

      {error ? (
        <div
          className="rounded-md border border-danger/20 bg-danger-surface p-4"
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

          <p className="text-sm text-muted-foreground">Updating dashboard...</p>
        </div>
      ) : null}

      <DashboardKpiCards kpis={data.kpis} />

      <DashboardAccountabilitySummary kpis={data.kpis} />

      <DashboardVerificationSummary verification={data.verification} />

      <DashboardOperationalSummary operations={data.operations} />

      <DashboardLifecycleSummary lifecycle={data.lifecycle} />

      <DashboardOrganizationSummary organizations={data.organizations} />
    </div>
  );
}
