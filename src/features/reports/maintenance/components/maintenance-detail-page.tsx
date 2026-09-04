import Link from 'next/link';

import { getMaintenanceDetailAction } from '../actions/maintenance.actions';
import { MaintenanceServiceHistoryTable } from './maintenance-service-history-table';

type MaintenanceDetailPageProps = {
  maintenanceId: string;
};

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

function formatDateTime(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function formatValue(value: string | null) {
  return value ?? '—';
}

export async function MaintenanceDetailPage({
  maintenanceId,
}: MaintenanceDetailPageProps) {
  const result = await getMaintenanceDetailAction(maintenanceId);

  if (!result.success) {
    return (
      <div className="space-y-4">
        <Link
          href="/reports/maintenances"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Maintenance Report
        </Link>

        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {result.message}
        </div>
      </div>
    );
  }

  const maintenance = result.data;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Maintenance Detail
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View the maintenance record and its associated service history.
          </p>
        </div>

        <Link
          href="/reports/maintenances"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Maintenance Report
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Maintenance Information
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Reference Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.referenceNumber}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.type.replaceAll('_', ' ')}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.status.replaceAll('_', ' ')}
            </dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900">{maintenance.title}</dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-900">
              {formatValue(maintenance.description)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Asset</h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Code</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.asset.assetCode}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Tag</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatValue(maintenance.asset.assetTag)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.asset.name}
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Requested</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(maintenance.requestedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Scheduled</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(maintenance.scheduledAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Started</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(maintenance.startedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Completed</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(maintenance.completedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Responsibility & Approval
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Requested By</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.requestedByUser.displayName}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Assigned Officer
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.assignedToUser?.displayName ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Approved By</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {maintenance.approvedByUser?.displayName ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Approved At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(maintenance.approvedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Service History</h2>

        <MaintenanceServiceHistoryTable services={maintenance.services} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>

        <p className="whitespace-pre-wrap text-sm text-gray-700">
          {formatValue(maintenance.notes)}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Record Information
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(maintenance.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(maintenance.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
