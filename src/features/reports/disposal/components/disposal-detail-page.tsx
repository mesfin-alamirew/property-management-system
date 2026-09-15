import Link from 'next/link';

import type { DisposalDetail } from '../types/disposal.types';
import { DisposalDetailAssetsTable } from './disposal-detail-assets-table';

type DisposalDetailPageProps = {
  disposal: DisposalDetail;
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

export function DisposalDetailPage({ disposal }: DisposalDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Disposal Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the disposal record, affected assets, and decision
            accountability.
          </p>
        </div>

        <Link
          href="/reports/disposals"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Disposal Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Disposal Information
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Reference Number
            </p>
            <p className="mt-1 font-medium text-foreground">
              {disposal.referenceNumber}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Disposal Date
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDate(disposal.disposalDate)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Method</p>
            <p className="mt-1 font-medium text-foreground">
              {disposal.method}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="mt-1 font-medium text-foreground">
              {disposal.status}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-medium text-muted-foreground">Reason</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-foreground">
              {disposal.reason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Assets Included
          </h2>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Assets associated with this disposal record.
          </p>
        </div>

        <DisposalDetailAssetsTable assets={disposal.items} />
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Decision &amp; Accountability
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Requested By
            </p>
            <p className="mt-1 font-medium text-foreground">
              {disposal.requestedByUser.displayName}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Approved By
            </p>
            <p className="mt-1 font-medium text-foreground">
              {disposal.approvedByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Approved At
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(disposal.approvedAt)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Cancelled By
            </p>
            <p className="mt-1 font-medium text-foreground">
              {disposal.cancelledByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Cancelled At
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(disposal.cancelledAt)}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-medium text-muted-foreground">
              Cancellation Reason
            </p>

            <p className="mt-1 whitespace-pre-wrap text-sm leading-5 text-foreground">
              {disposal.cancellationReason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-5 text-foreground">
          {disposal.notes ?? 'No notes recorded.'}
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
              {formatDateTime(disposal.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Last Updated
            </p>
            <p className="mt-1 font-medium text-foreground">
              {formatDateTime(disposal.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
