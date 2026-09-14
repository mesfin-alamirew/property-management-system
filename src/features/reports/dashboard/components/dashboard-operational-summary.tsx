import Link from 'next/link';

import type { DashboardOperationalSummary } from '../types/dashboard.types';

type DashboardOperationalSummaryProps = {
  operations: DashboardOperationalSummary;
};

type OperationalItemProps = {
  label: string;
  value: number;
  description: string;
};

function OperationalItem({ label, value, description }: OperationalItemProps) {
  return (
    <div className="rounded-md border border-border bg-surface-muted p-4">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function DashboardOperationalSummary({
  operations,
}: DashboardOperationalSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Operations
        </h2>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Current maintenance and incident activity requiring attention.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OperationalItem
          label="Maintenance Requiring Action"
          value={operations.maintenanceRequiringAction}
          description="Maintenance in an active action state"
        />

        <OperationalItem
          label="Active Incidents"
          value={operations.activeIncidents}
          description="Incidents currently being handled"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href="/reports/maintenances"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Maintenance Report
        </Link>

        <Link
          href="/reports/incidents"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Incident Report
        </Link>
      </div>
    </div>
  );
}
