import Link from 'next/link';

import type {
  AssignmentDetail,
  AssignmentHistoryRow,
} from '../types/assignment.types';

import { AssignmentHistoryTable } from './assignment-history-table';

type AssignmentDetailPageProps = {
  detail: AssignmentDetail;
  history: AssignmentHistoryRow[];
};

function formatEmployeeName(employee: AssignmentDetail['employee']) {
  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

export function AssignmentDetailPage({
  detail,
  history,
}: AssignmentDetailPageProps) {
  const employeeName = formatEmployeeName(detail.employee);

  const assignmentStatus = detail.returnedAt ? 'RETURNED' : 'CURRENT';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Asset Assignment Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the asset assignment record and its assignment history.
          </p>
        </div>

        <Link
          href="/reports/assignments"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Assignment Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Asset Information
        </h2>

        <dl className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          <DetailField label="Asset Code" value={detail.asset.assetCode} />

          <DetailField label="Asset Tag" value={detail.asset.assetTag ?? '—'} />

          <DetailField label="Asset Name" value={detail.asset.name} />

          <DetailField label="Asset Type" value={detail.asset.assetType.name} />

          <DetailField label="Status" value={detail.asset.status.name} />

          <DetailField label="Condition" value={detail.asset.condition.name} />

          <DetailField
            label="Manufacturer"
            value={detail.asset.manufacturer ?? '—'}
          />

          <DetailField label="Model" value={detail.asset.model ?? '—'} />

          <DetailField
            label="Serial Number"
            value={detail.asset.serialNumber ?? '—'}
          />
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Current Location
        </h2>

        <dl className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
          <DetailField
            label="Location"
            value={detail.asset.location?.name ?? '—'}
          />

          <DetailField
            label="Location Code"
            value={detail.asset.location?.code ?? '—'}
          />

          <DetailField
            label="Organization Unit"
            value={detail.asset.location?.organizationUnit.name ?? '—'}
          />

          <DetailField
            label="Organization Unit Code"
            value={detail.asset.location?.organizationUnit.code ?? '—'}
          />
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Assignment Information
        </h2>

        <dl className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          <DetailField label="Employee" value={employeeName} />

          <DetailField
            label="Employee Number"
            value={detail.employee.employeeNumber}
          />

          <DetailField
            label="Employee Organization Unit"
            value={detail.employee.organizationUnit.name}
          />

          <DetailField
            label="Assigned Date"
            value={formatDate(detail.assignedAt)}
          />

          <DetailField
            label="Returned Date"
            value={formatDate(detail.returnedAt)}
          />

          <DetailField label="Assignment Status" value={assignmentStatus} />
        </dl>
      </section>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Processing Information
        </h2>

        <dl className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2">
          <DetailField
            label="Assigned By"
            value={detail.assignedByUser.displayName}
          />

          <DetailField
            label="Returned By"
            value={detail.returnedByUser?.displayName ?? '—'}
          />

          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">Notes</dt>

            <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {detail.notes ?? '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Assignment History
          </h2>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Complete assignment history for this asset.
          </p>
        </div>

        <AssignmentHistoryTable rows={history} />
      </section>
    </div>
  );
}

type DetailFieldProps = {
  label: string;
  value: string;
};

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div>
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>

      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}
