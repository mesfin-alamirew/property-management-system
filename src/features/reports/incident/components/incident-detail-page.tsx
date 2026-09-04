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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Incident Detail
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View the incident record, affected asset, timeline, and resolution
            information.
          </p>
        </div>

        <Link
          href="/reports/incidents"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Incident Report
        </Link>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Incident Information
        </h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-gray-500">Reference Number</dt>
            <dd className="mt-1 font-medium text-gray-900">
              {incident.referenceNumber}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Type</dt>
            <dd className="mt-1 text-gray-900">{formatValue(incident.type)}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Severity</dt>
            <dd className="mt-1 text-gray-900">
              {formatValue(incident.severity)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Status</dt>
            <dd className="mt-1 text-gray-900">
              {formatValue(incident.status)}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm text-gray-500">Title</dt>
            <dd className="mt-1 font-medium text-gray-900">{incident.title}</dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm text-gray-500">Description</dt>
            <dd className="mt-1 whitespace-pre-wrap text-gray-900">
              {incident.description || '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Incident Date</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.incidentDate)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Affected Asset</h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-gray-500">Asset Code</dt>
            <dd className="mt-1 font-medium text-gray-900">
              {incident.asset.assetCode}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Asset Tag</dt>
            <dd className="mt-1 text-gray-900">
              {incident.asset.assetTag || '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Asset Name</dt>
            <dd className="mt-1 text-gray-900">{incident.asset.name}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Incident Timeline
        </h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-gray-500">Reported</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.reportedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Assigned</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.assignedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Started</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.startedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Resolved</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.resolvedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Closed</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.closedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Responsibility</h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Reported By</dt>
            <dd className="mt-1 text-gray-900">
              {incident.reportedByUser.displayName}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Assigned Officer</dt>
            <dd className="mt-1 text-gray-900">
              {incident.assignedToUser?.displayName || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Resolution</h2>

        {incident.resolution ? (
          <dl className="mt-4 grid gap-4">
            <div>
              <dt className="text-sm text-gray-500">Root Cause</dt>
              <dd className="mt-1 whitespace-pre-wrap text-gray-900">
                {incident.resolution.rootCause}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500">Resolution</dt>
              <dd className="mt-1 whitespace-pre-wrap text-gray-900">
                {incident.resolution.resolution}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500">Corrective Action</dt>
              <dd className="mt-1 whitespace-pre-wrap text-gray-900">
                {incident.resolution.correctiveAction || '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500">Resolved By</dt>
              <dd className="mt-1 text-gray-900">
                {incident.resolution.resolvedByUser.displayName}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500">Resolution Notes</dt>
              <dd className="mt-1 whitespace-pre-wrap text-gray-900">
                {incident.resolution.notes || '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500">Resolution Recorded</dt>
              <dd className="mt-1 text-gray-900">
                {formatDateTime(incident.resolution.createdAt)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            No resolution has been recorded for this incident.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-gray-900">
          {incident.notes || '—'}
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Record Information
        </h2>

        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Created</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Last Updated</dt>
            <dd className="mt-1 text-gray-900">
              {formatDateTime(incident.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
