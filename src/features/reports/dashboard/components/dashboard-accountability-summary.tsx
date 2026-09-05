import Link from 'next/link';
import type { DashboardKpis } from '../types/dashboard.types';

type DashboardAccountabilitySummaryProps = {
  kpis: DashboardKpis;
};

export function DashboardAccountabilitySummary({
  kpis,
}: DashboardAccountabilitySummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Accountability
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Current exceptions requiring management attention.
          </p>
        </div>

        <Link
          href="/reports/accountability"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View Exceptions
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">High</p>

          <p className="mt-1 text-2xl font-semibold text-red-900">
            {kpis.highExceptions.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-red-700">Act promptly</p>
        </div>

        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm font-medium text-yellow-700">Review</p>

          <p className="mt-1 text-2xl font-semibold text-yellow-900">
            {kpis.reviewExceptions.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-yellow-700">Check and assess</p>
        </div>

        <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">Monitor</p>

          <p className="mt-1 text-2xl font-semibold text-blue-900">
            {kpis.monitorExceptions.toLocaleString()}
          </p>

          <p className="mt-1 text-sm text-blue-700">Follow up</p>
        </div>
      </div>
    </div>
  );
}
