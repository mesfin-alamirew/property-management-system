'use client';

import { useEffect, useState, useTransition } from 'react';
import { getDashboardDataAction } from '../actions/dashboard.actions';
import { DashboardAccountabilitySummary } from './dashboard-accountability-summary';
import { DashboardFilters } from './dashboard-filters';
import { DashboardKpiCards } from './dashboard-kpi-cards';
import { DashboardLifecycleSummary } from './dashboard-lifecycle-summary';
import { DashboardOperationalSummary } from './dashboard-operational-summary';
import { DashboardOrganizationSummary } from './dashboard-organization-summary';
import { DashboardVerificationSummary } from './dashboard-verification-summary';
import type {
  DashboardData,
  DashboardFilters as DashboardFilterValues,
} from '../types/dashboard.types';

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
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
      ) : null}

      {isPending ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-600">Updating dashboard...</p>
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
