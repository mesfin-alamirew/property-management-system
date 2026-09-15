import Link from 'next/link';
import { DashboardData } from '../types/dashboard.types';

type DashboardOperationalSummaryProps = {
  operations: DashboardData['operations'];
};

type OperationalItemProps = {
  label: string;
  value: number;
  description: string;
  href: string;
  action: string;
};

function OperationalItem({
  label,
  value,
  description,
  href,
  action,
}: OperationalItemProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 transition-shadow duration-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{label}</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>

        <p className="shrink-0 text-3xl font-semibold tracking-tight text-foreground">
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

export function DashboardOperationalSummary({
  operations,
}: DashboardOperationalSummaryProps) {
  return (
    <section aria-labelledby="dashboard-operations-heading">
      <div>
        <h2
          id="dashboard-operations-heading"
          className="text-sm font-semibold text-foreground"
        >
          Operations Requiring Attention
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Current maintenance and incident activity that may require follow-up.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <OperationalItem
          label="Maintenance Requiring Action"
          value={operations.maintenanceRequiringAction}
          description="Maintenance items that currently require operational follow-up."
          href="/reports/maintenances"
          action="Review maintenance"
        />

        <OperationalItem
          label="Active Incidents"
          value={operations.activeIncidents}
          description="Incidents that remain active and require resolution or monitoring."
          href="/reports/incidents"
          action="Review incidents"
        />
      </div>
    </section>
  );
}
