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
    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export function DashboardOperationalSummary({
  operations,
}: DashboardOperationalSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Operations</h2>
          <p className="mt-1 text-sm text-gray-600">
            Current maintenance and incident activity requiring attention.
          </p>
        </div>
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

      <div className="mt-5 flex flex-wrap gap-4">
        <Link
          href="/reports/maintenances"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View Maintenance Report
        </Link>

        <Link
          href="/reports/incidents"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          View Incident Report
        </Link>
      </div>
    </div>
  );
}
