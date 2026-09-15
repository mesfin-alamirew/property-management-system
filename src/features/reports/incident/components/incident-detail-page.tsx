import Link from 'next/link';

import type { IncidentDetail } from '../types/incident.types';

type IncidentDetailPageProps = {
  incident: IncidentDetail;
};

function formatDate(date: Date | null) {
  if (!date) return '—';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

function formatDateTime(date: Date | null) {
  if (!date) return '—';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function formatValue(value: string) {
  return value.replaceAll('_', ' ');
}

export function IncidentDetailPage({ incident }: IncidentDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Incident Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the incident record, affected asset, timeline, and resolution
            information.
          </p>
        </div>

        <Link
          href="/reports/incidents"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Incident Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Incident Information
        </h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Reference Number
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {incident.referenceNumber}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">Type</dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatValue(incident.type)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Severity
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatValue(incident.severity)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatValue(incident.status)}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">Title</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {incident.title}
            </dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-muted-foreground">
              Description
            </dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {incident.description || '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Incident Date
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.incidentDate)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Affected Asset
        </h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Code
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {incident.asset.assetCode}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Tag
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {incident.asset.assetTag || '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Name
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {incident.asset.name}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Incident Timeline
        </h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Reported
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.reportedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Assigned
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.assignedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Started
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.startedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Resolved
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.resolvedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Closed
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.closedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Responsibility
        </h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Reported By
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {incident.reportedByUser.displayName}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Assigned Officer
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {incident.assignedToUser?.displayName || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Resolution</h2>

        {incident.resolution ? (
          <dl className="mt-5 grid gap-5">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Root Cause
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                {incident.resolution.rootCause}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Resolution
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                {incident.resolution.resolution}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Corrective Action
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                {incident.resolution.correctiveAction || '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Resolved By
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {incident.resolution.resolvedByUser.displayName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Resolution Notes
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
                {incident.resolution.notes || '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Resolution Recorded
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDateTime(incident.resolution.createdAt)}
              </dd>
            </div>
          </dl>
        ) : (
          <div className="mt-5 rounded-md border border-border bg-surface-muted px-4 py-3">
            <p className="text-sm text-muted-foreground">
              No resolution has been recorded for this incident.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Notes</h2>

        <p className="mt-5 whitespace-pre-wrap text-sm text-foreground">
          {incident.notes || '—'}
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Record Information
        </h2>

        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Created
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Last Updated
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(incident.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
