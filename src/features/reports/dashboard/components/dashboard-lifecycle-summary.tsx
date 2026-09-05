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
    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export function DashboardLifecycleSummary({
  lifecycle,
}: DashboardLifecycleSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Lifecycle</h2>
        <p className="mt-1 text-sm text-gray-600">
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

      <div className="mt-5 flex flex-wrap gap-4">
        <Link
          href="/reports/retirements"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View Retirement Report
        </Link>

        <Link
          href="/reports/disposals"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View Disposal Report
        </Link>
      </div>
    </div>
  );
}
