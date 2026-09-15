import Link from 'next/link';

import type { DashboardData } from '../types/dashboard.types';

type DashboardLifecycleSummaryProps = {
  lifecycle: DashboardData['lifecycle'];
};

type LifecycleItemProps = {
  label: string;
  value: number;
  description: string;
  href: string;
  action: string;
  emphasis?: 'default' | 'warning';
};

function LifecycleItem({
  label,
  value,
  description,
  href,
  action,
  emphasis = 'default',
}: LifecycleItemProps) {
  const styles = {
    default: {
      container: 'border-border bg-surface',
      value: 'text-foreground',
    },
    warning: {
      container: 'border-warning/20 bg-warning-surface',
      value: 'text-warning',
    },
  };

  const currentStyles = styles[emphasis];

  return (
    <div
      className={[
        'rounded-lg border p-5',
        'transition-shadow duration-200',
        'hover:shadow-sm',
        currentStyles.container,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{label}</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>

        <p
          className={[
            'shrink-0 text-3xl font-semibold tracking-tight',
            currentStyles.value,
          ].join(' ')}
        >
          {value.toLocaleString()}
        </p>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <Link
          href={href}
          className={[
            'text-xs font-medium text-primary',
            'transition-colors hover:text-primary-hover',
            'focus:outline-none focus:ring-2 focus:ring-focus-ring',
            'focus:ring-offset-1',
          ].join(' ')}
        >
          {action} →
        </Link>
      </div>
    </div>
  );
}

export function DashboardLifecycleSummary({
  lifecycle,
}: DashboardLifecycleSummaryProps) {
  return (
    <section aria-labelledby="dashboard-lifecycle-heading">
      <div>
        <h2
          id="dashboard-lifecycle-heading"
          className="text-sm font-semibold text-foreground"
        >
          Asset Lifecycle
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Current retirement and disposal workflow activity.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LifecycleItem
          label="Retirement Pending"
          value={lifecycle.retirementPending}
          description="Retirement requests awaiting further action."
          href="/reports/retirements"
          action="Review retirements"
          emphasis="warning"
        />

        <LifecycleItem
          label="Retirement Approved"
          value={lifecycle.retirementApproved}
          description="Retirements that have received approval."
          href="/reports/retirements"
          action="View retirements"
        />

        <LifecycleItem
          label="Disposal Pending"
          value={lifecycle.disposalPending}
          description="Disposal items awaiting further action."
          href="/reports/disposals"
          action="Review disposals"
          emphasis="warning"
        />

        <LifecycleItem
          label="Disposal Approved"
          value={lifecycle.disposalApproved}
          description="Disposals that have received approval."
          href="/reports/disposals"
          action="View disposals"
        />
      </div>
    </section>
  );
}
