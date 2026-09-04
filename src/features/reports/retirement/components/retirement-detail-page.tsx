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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Retirement Detail
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            View the retirement record, decision history, and final status.
          </p>
        </div>

        <Link
          href="/reports/retirements"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Retirement Report
        </Link>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Retirement Information
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Reference Number</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.referenceNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatStatus(retirement.status)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Retirement Date</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDate(retirement.retirementDate)}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Reason</p>
            <p className="mt-1 text-gray-900">{retirement.reason}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Condition at Retirement</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.condition.name}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Retired Asset</h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Asset Code</p>
            <Link
              href={`/reports/assets/${retirement.asset.id}`}
              className="mt-1 inline-block font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {retirement.asset.assetCode}
            </Link>
          </div>

          <div>
            <p className="text-sm text-gray-500">Asset Name</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.asset.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Asset Tag</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.asset.assetTag ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Decision History
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Requested By</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.requestedByUser.displayName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Approved By</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.approvedByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Approved At</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(retirement.approvedAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Cancelled By</p>
            <p className="mt-1 font-medium text-gray-900">
              {retirement.cancelledByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Cancelled At</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(retirement.cancelledAt)}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Cancellation Reason</p>
            <p className="mt-1 text-gray-900">
              {retirement.cancellationReason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
          {retirement.notes ?? 'No notes recorded.'}
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Record Information
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(retirement.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(retirement.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
