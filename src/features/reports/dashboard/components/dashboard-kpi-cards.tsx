import type { DashboardKpis } from '../types/dashboard.types';

type DashboardKpiCardsProps = {
  kpis: DashboardKpis;
};

type KpiCardProps = {
  label: string;
  value: number;
  description: string;
  emphasis?: 'primary' | 'default' | 'warning' | 'danger';
};

function KpiCard({
  label,
  value,
  description,
  emphasis = 'default',
}: KpiCardProps) {
  const emphasisClasses = {
    primary: {
      container: 'border-primary/20 bg-primary/5',
      label: 'text-primary',
      value: 'text-primary',
    },
    default: {
      container: 'border-border bg-surface',
      label: 'text-muted-foreground',
      value: 'text-foreground',
    },
    warning: {
      container: 'border-warning/20 bg-warning-surface',
      label: 'text-warning',
      value: 'text-warning',
    },
    danger: {
      container: 'border-danger/20 bg-danger-surface',
      label: 'text-danger',
      value: 'text-danger',
    },
  };

  const styles = emphasisClasses[emphasis];

  return (
    <div
      className={[
        'rounded-lg border p-5',
        'transition-shadow duration-200',
        'hover:shadow-sm',
        styles.container,
      ].join(' ')}
    >
      <p
        className={[
          'text-xs font-medium uppercase tracking-wider',
          styles.label,
        ].join(' ')}
      >
        {label}
      </p>

      <p
        className={[
          'mt-2 text-3xl font-semibold tracking-tight',
          styles.value,
        ].join(' ')}
      >
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function DashboardKpiCards({ kpis }: DashboardKpiCardsProps) {
  return (
    <section aria-labelledby="dashboard-kpi-heading">
      <div className="mb-3">
        <h2
          id="dashboard-kpi-heading"
          className="text-sm font-semibold text-foreground"
        >
          Asset portfolio
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Current asset position and accountability indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          label="Total Assets"
          value={kpis.totalAssets}
          description="Assets currently recorded in the system."
          emphasis="primary"
        />

        <KpiCard
          label="Assigned"
          value={kpis.assignedAssets}
          description="Assets currently assigned to custodians."
        />

        <KpiCard
          label="Unassigned"
          value={kpis.unassignedAssets}
          description="Assets without a current assignment."
        />

        <KpiCard
          label="Exceptions"
          value={kpis.totalExceptions}
          description="Assets requiring management review."
          emphasis="warning"
        />

        <KpiCard
          label="High Exceptions"
          value={kpis.highExceptions}
          description="High-priority accountability exceptions."
          emphasis="danger"
        />
      </div>
    </section>
  );
}
