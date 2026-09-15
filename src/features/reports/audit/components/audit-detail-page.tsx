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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Audit Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the audit record, performer, and recorded changes.
          </p>
        </div>

        <Link
          href="/reports/audits"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Audit Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Audit Information
        </h2>

        <dl className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Date &amp; Time
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(audit.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Action
            </dt>
            <dd className="mt-1 text-sm text-foreground">{audit.action}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Entity Type
            </dt>
            <dd className="mt-1 text-sm text-foreground">{audit.entityType}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Entity ID
            </dt>
            <dd className="mt-1 break-all font-mono text-sm text-foreground">
              {audit.entityId}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-5 text-foreground">
              {audit.description}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Performed By</h2>

        <dl className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Display Name
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {audit.user.displayName}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Username
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {audit.user.username}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Employee ID
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {audit.user.employeeId ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              User Status
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {audit.user.isActive ? 'Active' : 'Inactive'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Changes</h2>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-foreground">
              Previous Value
            </h3>

            <pre className="mt-2 max-h-96 overflow-auto rounded-md border border-border bg-surface-muted p-4 text-xs leading-5 text-foreground">
              {formatJson(audit.oldValue)}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">New Value</h3>

            <pre className="mt-2 max-h-96 overflow-auto rounded-md border border-border bg-surface-muted p-4 text-xs leading-5 text-foreground">
              {formatJson(audit.newValue)}
            </pre>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Record Information
        </h2>

        <dl className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Audit Log ID
            </dt>
            <dd className="mt-1 break-all font-mono text-sm text-foreground">
              {audit.id}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Created At
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDateTime(audit.createdAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
