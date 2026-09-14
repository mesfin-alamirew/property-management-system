import type { DashboardKpis } from '../types/dashboard.types';

type DashboardKpiCardsProps = {
  kpis: DashboardKpis;
};

type KpiCardProps = {
  label: string;
  value: number;
  description: string;
  emphasis?: 'default' | 'danger';
};

function KpiCard({
  label,
  value,
  description,
  emphasis = 'default',
}: KpiCardProps) {
  return (
    <div
      className={[
        'rounded-lg border bg-surface p-5',
        'transition-shadow hover:shadow-sm',
        emphasis === 'danger' ? 'border-danger/20' : 'border-border',
      ].join(' ')}
    >
      <p
        className={[
          'text-sm font-medium',
          emphasis === 'danger' ? 'text-danger' : 'text-muted-foreground',
        ].join(' ')}
      >
        {label}
      </p>

      <p
        className={[
          'mt-2 text-3xl font-semibold tracking-tight',
          emphasis === 'danger' ? 'text-danger' : 'text-foreground',
        ].join(' ')}
      >
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
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
        emphasis="danger"
      />

      <KpiCard
        label="High Exceptions"
        value={kpis.highExceptions}
        description="Exceptions requiring prompt attention"
        emphasis="danger"
      />
    </div>
  );
}
