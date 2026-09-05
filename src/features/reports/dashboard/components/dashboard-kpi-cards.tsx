import type { DashboardKpis } from '../types/dashboard.types';

type DashboardKpiCardsProps = {
  kpis: DashboardKpis;
};

type KpiCardProps = {
  label: string;
  value: number;
  description: string;
};

function KpiCard({ label, value, description }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <p className="text-sm font-medium text-gray-600">{label}</p>

      <p className="mt-2 text-3xl font-semibold text-gray-900">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export function DashboardKpiCards({ kpis }: DashboardKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <KpiCard
        label="Total Assets"
        value={kpis.totalAssets}
        description="Assets in the current scope"
      />

      <KpiCard
        label="Assigned"
        value={kpis.assignedAssets}
        description="Assets with a current assignment"
      />

      <KpiCard
        label="Unassigned"
        value={kpis.unassignedAssets}
        description="Assets without a current assignment"
      />

      <KpiCard
        label="Exceptions"
        value={kpis.totalExceptions}
        description="Current accountability exceptions"
      />

      <KpiCard
        label="High Exceptions"
        value={kpis.highExceptions}
        description="Exceptions requiring prompt attention"
      />
    </div>
  );
}
