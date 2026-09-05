import Link from 'next/link';

import type { AuditDetail } from '../types/audit.types';

type AuditDetailPageProps = {
  audit: AuditDetail;
};

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatJson(value: unknown | null) {
  if (value === null || value === undefined) {
    return '—';
  }

  return JSON.stringify(value, null, 2);
}

export function AuditDetailPage({ audit }: AuditDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Audit Detail</h1>
          <p className="mt-1 text-sm text-gray-600">
            View the audit record, performer, and recorded changes.
          </p>
        </div>

        <Link
          href="/reports/audits"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Audit Report
        </Link>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Audit Information
        </h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Date &amp; Time</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(audit.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Action</dt>
            <dd className="mt-1 text-sm text-gray-900">{audit.action}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Entity Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{audit.entityType}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Entity ID</dt>
            <dd className="mt-1 break-all font-mono text-sm text-gray-900">
              {audit.entityId}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{audit.description}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Performed By</h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Display Name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {audit.user.displayName}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Username</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {audit.user.username}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Employee ID</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {audit.user.employeeId ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">User Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {audit.user.isActive ? 'Active' : 'Inactive'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Changes</h2>

        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              Previous Value
            </h3>

            <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-gray-50 p-4 text-xs text-gray-800">
              {formatJson(audit.oldValue)}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">New Value</h3>

            <pre className="mt-2 max-h-96 overflow-auto rounded-md bg-gray-50 p-4 text-xs text-gray-800">
              {formatJson(audit.newValue)}
            </pre>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Record Information
        </h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Audit Log ID</dt>
            <dd className="mt-1 break-all font-mono text-sm text-gray-900">
              {audit.id}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDateTime(audit.createdAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
