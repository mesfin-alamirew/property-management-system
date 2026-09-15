import Link from 'next/link';

import type { RetirementDetail } from '../types/retirement.types';

type RetirementDetailPageProps = {
  retirement: RetirementDetail;
};

function formatDate(value: Date | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTime(value: Date | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value.replaceAll('_', ' ');
}

export function RetirementDetailPage({
  retirement,
}: RetirementDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Retirement Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the retirement record, decision history, and final status.
          </p>
        </div>

        <Link
          href="/reports/retirements"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Retirement Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Retirement Information
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Reference Number
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.referenceNumber}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="mt-1 font-medium text-foreground">
              {formatStatus(retirement.status)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Retirement Date
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDate(retirement.retirementDate)}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-medium text-muted-foreground">Reason</p>
            <p className="mt-1 text-sm leading-5 text-foreground">
              {retirement.reason}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Condition at Retirement
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.condition.name}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Retired Asset</h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Asset Code
            </p>
            <Link
              href={`/reports/assets/${retirement.asset.id}`}
              className="mt-1 inline-block font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              {retirement.asset.assetCode}
            </Link>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Asset Name
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.asset.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Asset Tag
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.asset.assetTag ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Decision History
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Requested By
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.requestedByUser.displayName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Approved By
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.approvedByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Approved At
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(retirement.approvedAt)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Cancelled By
            </p>
            <p className="mt-1 font-medium text-foreground">
              {retirement.cancelledByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Cancelled At
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(retirement.cancelledAt)}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-medium text-muted-foreground">
              Cancellation Reason
            </p>
            <p className="mt-1 text-sm leading-5 text-foreground">
              {retirement.cancellationReason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-5 text-foreground">
          {retirement.notes ?? 'No notes recorded.'}
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Record Information
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Created</p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(retirement.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Last Updated
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(retirement.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
