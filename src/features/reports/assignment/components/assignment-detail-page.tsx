import type {
  AssignmentDetail,
  AssignmentHistoryRow,
} from '../types/assignment.types';

import { AssignmentHistoryTable } from './assignment-history-table';
import Link from 'next/link';
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Asset Assignment Detail
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View the asset assignment record and its assignment history.
          </p>
        </div>

        <Link
          href="/reports/assignments"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Assignment Report
        </Link>
      </div>

      <section className="rounded-md border p-6">
        <h2 className="text-lg font-semibold">Asset Information</h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-muted-foreground">Asset Code</dt>
            <dd className="font-medium">{detail.asset.assetCode}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Asset Tag</dt>
            <dd className="font-medium">{detail.asset.assetTag ?? '—'}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Asset Name</dt>
            <dd className="font-medium">{detail.asset.name}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Asset Type</dt>
            <dd className="font-medium">{detail.asset.assetType.name}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Status</dt>
            <dd className="font-medium">{detail.asset.status.name}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Condition</dt>
            <dd className="font-medium">{detail.asset.condition.name}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Manufacturer</dt>
            <dd className="font-medium">{detail.asset.manufacturer ?? '—'}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Model</dt>
            <dd className="font-medium">{detail.asset.model ?? '—'}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Serial Number</dt>
            <dd className="font-medium">{detail.asset.serialNumber ?? '—'}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-md border p-6">
        <h2 className="text-lg font-semibold">Current Location</h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Location</dt>
            <dd className="font-medium">
              {detail.asset.location?.name ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Location Code</dt>
            <dd className="font-medium">
              {detail.asset.location?.code ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Organization Unit</dt>
            <dd className="font-medium">
              {detail.asset.location?.organizationUnit.name ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">
              Organization Unit Code
            </dt>
            <dd className="font-medium">
              {detail.asset.location?.organizationUnit.code ?? '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-md border p-6">
        <h2 className="text-lg font-semibold">Assignment Information</h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm text-muted-foreground">Employee</dt>
            <dd className="font-medium">{employeeName}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Employee Number</dt>
            <dd className="font-medium">{detail.employee.employeeNumber}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">
              Employee Organization Unit
            </dt>
            <dd className="font-medium">
              {detail.employee.organizationUnit.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Assigned Date</dt>
            <dd className="font-medium">{formatDate(detail.assignedAt)}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Returned Date</dt>
            <dd className="font-medium">{formatDate(detail.returnedAt)}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Assignment Status</dt>
            <dd className="font-medium">{assignmentStatus}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-md border p-6">
        <h2 className="text-lg font-semibold">Processing Information</h2>

        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Assigned By</dt>
            <dd className="font-medium">{detail.assignedByUser.displayName}</dd>
          </div>

          <div>
            <dt className="text-sm text-muted-foreground">Returned By</dt>
            <dd className="font-medium">
              {detail.returnedByUser?.displayName ?? '—'}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm text-muted-foreground">Notes</dt>
            <dd className="whitespace-pre-wrap font-medium">
              {detail.notes ?? '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Assignment History</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete assignment history for this asset.
          </p>
        </div>

        <AssignmentHistoryTable rows={history} />
      </section>
    </div>
  );
}
