import Link from 'next/link';

import type { DashboardKpis } from '../types/dashboard.types';

type DashboardAccountabilitySummaryProps = {
  kpis: DashboardKpis;
};

type AccountabilityItemProps = {
  label: string;
  value: number;
  description: string;
  action: string;
  emphasis: 'danger' | 'warning' | 'info';
};

function AccountabilityItem({
  label,
  value,
  description,
  action,
  emphasis,
}: AccountabilityItemProps) {
  const styles = {
    danger: {
      container: 'border-danger/20 bg-danger-surface',
      label: 'text-danger',
      value: 'text-danger',
      indicator: 'bg-danger',
    },
    warning: {
      container: 'border-warning/20 bg-warning-surface',
      label: 'text-warning',
      value: 'text-warning',
      indicator: 'bg-warning',
    },
    info: {
      container: 'border-info/20 bg-info-surface',
      label: 'text-info',
      value: 'text-info',
      indicator: 'bg-info',
    },
  };

  const currentStyles = styles[emphasis];

  return (
    <div
      className={[
        'rounded-lg border p-4',
        'transition-shadow duration-200',
        'hover:shadow-sm',
        currentStyles.container,
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            'mt-1.5 h-2 w-2 shrink-0 rounded-full',
            currentStyles.indicator,
          ].join(' ')}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p
              className={[
                'text-xs font-semibold uppercase tracking-wider',
                currentStyles.label,
              ].join(' ')}
            >
              {label}
            </p>

            <p
              className={[
                'text-2xl font-semibold tracking-tight',
                currentStyles.value,
              ].join(' ')}
            >
              {value.toLocaleString()}
            </p>
          </div>

          <p className="mt-2 text-sm leading-5 text-foreground">
            {description}
          </p>

          <p
            className={['mt-2 text-xs font-medium', currentStyles.label].join(
              ' ',
            )}
          >
            {action}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DashboardAccountabilitySummary({
  kpis,
}: DashboardAccountabilitySummaryProps) {
  return (
    <section aria-labelledby="dashboard-accountability-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="dashboard-accountability-heading"
            className="text-sm font-semibold text-foreground"
          >
            Accountability
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Current exceptions requiring management attention.
          </p>
        </div>

        <Link
          href="/reports/accountability"
          className={[
            'text-xs font-medium text-primary',
            'transition-colors hover:text-primary-hover',
            'focus:outline-none focus:ring-2 focus:ring-focus-ring',
            'focus:ring-offset-1',
          ].join(' ')}
        >
          View accountability report →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <AccountabilityItem
          label="High"
          value={kpis.highExceptions}
          description="Priority exceptions that require prompt management attention."
          action="Immediate attention"
          emphasis="danger"
        />

        <AccountabilityItem
          label="Review"
          value={kpis.reviewExceptions}
          description="Exceptions that should be reviewed and followed up."
          action="Review required"
          emphasis="warning"
        />

        <AccountabilityItem
          label="Monitor"
          value={kpis.monitorExceptions}
          description="Lower-priority exceptions that should remain under observation."
          action="Continue monitoring"
          emphasis="info"
        />
      </div>
    </section>
  );
}
