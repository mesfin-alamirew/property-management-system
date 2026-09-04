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
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Disposal Detail
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            View the disposal record, affected assets, and decision
            accountability.
          </p>
        </div>

        <Link
          href="/reports/disposals"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Disposal Report
        </Link>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Disposal Information
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Reference Number</p>
            <p className="mt-1 font-medium text-gray-900">
              {disposal.referenceNumber}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Disposal Date</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDate(disposal.disposalDate)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Method</p>
            <p className="mt-1 font-medium text-gray-900">{disposal.method}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="mt-1 font-medium text-gray-900">{disposal.status}</p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Reason</p>
            <p className="mt-1 whitespace-pre-wrap text-gray-900">
              {disposal.reason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Assets Included
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Assets associated with this disposal record.
          </p>
        </div>

        <DisposalDetailAssetsTable assets={disposal.items} />
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Decision &amp; Accountability
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Requested By</p>
            <p className="mt-1 font-medium text-gray-900">
              {disposal.requestedByUser.displayName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Approved By</p>
            <p className="mt-1 font-medium text-gray-900">
              {disposal.approvedByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Approved At</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(disposal.approvedAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Cancelled By</p>
            <p className="mt-1 font-medium text-gray-900">
              {disposal.cancelledByUser?.displayName ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Cancelled At</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(disposal.cancelledAt)}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Cancellation Reason</p>

            <p className="mt-1 whitespace-pre-wrap text-gray-900">
              {disposal.cancellationReason ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
          {disposal.notes ?? 'No notes recorded.'}
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
              {formatDateTime(disposal.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(disposal.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
