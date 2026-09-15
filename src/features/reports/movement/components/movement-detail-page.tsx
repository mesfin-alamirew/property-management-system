import Link from 'next/link';

import type { MovementDetail } from '../types/movement.types';

type MovementDetailPageProps = {
  movement: MovementDetail;
};

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

export function MovementDetailPage({ movement }: MovementDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Asset Movement Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the asset movement, location change, and accountability
            information.
          </p>
        </div>

        <Link
          href="/reports/movements"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Movement Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Movement Information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Movement ID
            </p>
            <p className="mt-1 break-all text-sm font-medium text-foreground">
              {movement.id}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Moved Date
            </p>
            <p className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
              {formatDateTime(movement.movedAt)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Moved By
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {movement.movedByUser.displayName}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm font-medium text-muted-foreground">Reason</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {movement.reason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Asset</h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Asset Code
            </p>
            <Link
              href={`/reports/assets/${movement.asset.id}`}
              className="mt-1 inline-block text-sm font-medium text-primary transition-colors hover:text-primary-hover hover:underline"
            >
              {movement.asset.assetCode}
            </Link>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Asset Name
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {movement.asset.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Asset Tag
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {movement.asset.assetTag ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Location Change
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              From Location
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {movement.fromLocation?.name ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              To Location
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {movement.toLocation.name}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground">
          {movement.notes ?? 'No notes recorded.'}
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Record Information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Created</p>
            <p className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
              {formatDateTime(movement.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Last Updated
            </p>
            <p className="mt-1 whitespace-nowrap text-sm font-medium text-foreground">
              {formatDateTime(movement.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
