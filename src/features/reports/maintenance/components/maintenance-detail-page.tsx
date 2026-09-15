import Link from 'next/link';

import { AccessDenied } from '@/components/ui/access-denied';
import { requireCurrentUser } from '@/lib/auth/require-current-user';
import { AppError } from '@/lib/errors';

import { getMaintenanceDetail } from '../queries/maintenance-detail.queries';
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
  const user = await requireCurrentUser();

  let maintenance;

  try {
    maintenance = await getMaintenanceDetail(user.id, maintenanceId);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!maintenance) {
    return (
      <div className="space-y-4">
        <Link
          href="/reports/maintenances"
          className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          ← Back to Maintenance Report
        </Link>

        <div className="rounded-lg border border-danger bg-danger-surface px-4 py-3 text-sm text-danger">
          Maintenance record not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Maintenance Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the maintenance record and its associated service history.
          </p>
        </div>

        <Link
          href="/reports/maintenances"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Maintenance Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Maintenance Information
        </h2>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Reference Number
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.referenceNumber}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">Type</dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.type.replaceAll('_', ' ')}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.status.replaceAll('_', ' ')}
            </dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-muted-foreground">Title</dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.title}
            </dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-muted-foreground">
              Description
            </dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {formatValue(maintenance.description)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Asset</h2>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Code
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {maintenance.asset.assetCode}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Tag
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatValue(maintenance.asset.assetTag)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Name
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.asset.name}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Schedule</h2>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Requested
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(maintenance.requestedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Scheduled
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(maintenance.scheduledAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Started
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(maintenance.startedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Completed
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(maintenance.completedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Responsibility & Approval
        </h2>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Requested By
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.requestedByUser.displayName}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Assigned Officer
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.assignedToUser?.displayName ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Approved By
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {maintenance.approvedByUser?.displayName ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Approved At
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(maintenance.approvedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-foreground">
            Service History
          </h2>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Services recorded against this maintenance request.
          </p>
        </div>

        <MaintenanceServiceHistoryTable services={maintenance.services} />
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm text-foreground">
          {formatValue(maintenance.notes)}
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Record Information
        </h2>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Created At
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(maintenance.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Last Updated
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(maintenance.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
