import Link from 'next/link';

import type { DashboardLifecycleSummary } from '../types/dashboard.types';

type DashboardLifecycleSummaryProps = {
  lifecycle: DashboardLifecycleSummary;
};

type LifecycleItemProps = {
  label: string;
  value: number;
  description: string;
};

function LifecycleItem({ label, value, description }: LifecycleItemProps) {
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

export function DashboardLifecycleSummary({
  lifecycle,
}: DashboardLifecycleSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Lifecycle
        </h2>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Assets currently moving through retirement and disposal processes.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <LifecycleItem
          label="Retirement Pending"
          value={lifecycle.retirementPending}
          description="Retirement requests awaiting approval"
        />

        <LifecycleItem
          label="Retirement Approved"
          value={lifecycle.retirementApproved}
          description="Approved retirement records"
        />

        <LifecycleItem
          label="Disposal Pending"
          value={lifecycle.disposalPending}
          description="Disposal requests awaiting approval"
        />

        <LifecycleItem
          label="Disposal Approved"
          value={lifecycle.disposalApproved}
          description="Approved disposal records"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <Link
          href="/reports/retirements"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Retirement Report
        </Link>

        <Link
          href="/reports/disposals"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-1"
        >
          View Disposal Report
        </Link>
      </div>
    </div>
  );
}
