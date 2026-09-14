import Link from 'next/link';

import type { DashboardKpis } from '../types/dashboard.types';

type DashboardAccountabilitySummaryProps = {
  kpis: DashboardKpis;
};

export function DashboardAccountabilitySummary({
  kpis,
}: DashboardAccountabilitySummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Accountability
          </h2>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Current exceptions requiring management attention.
          </p>
        </div>

        <Link
          href="/reports/accountability"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Exceptions
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-danger/20 bg-danger-surface p-4">
          <p className="text-sm font-medium text-danger">High</p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-danger">
            {kpis.highExceptions.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-danger">Act promptly</p>
        </div>

        <div className="rounded-md border border-warning/20 bg-warning-surface p-4">
          <p className="text-sm font-medium text-warning">Review</p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-warning">
            {kpis.reviewExceptions.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-warning">Check and assess</p>
        </div>

        <div className="rounded-md border border-info/20 bg-info-surface p-4">
          <p className="text-sm font-medium text-info">Monitor</p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-info">
            {kpis.monitorExceptions.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-info">Follow up</p>
        </div>
      </div>
    </div>
  );
}
