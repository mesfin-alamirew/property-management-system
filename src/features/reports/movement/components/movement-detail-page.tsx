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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Asset Movement Detail
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            View the asset movement, location change, and accountability
            information.
          </p>
        </div>

        <Link
          href="/reports/movements"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Movement Report
        </Link>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Movement Information
        </h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Movement ID</p>
            <p className="mt-1 font-medium text-gray-900">{movement.id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Moved Date</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(movement.movedAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Moved By</p>
            <p className="mt-1 font-medium text-gray-900">
              {movement.movedByUser.displayName}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">Reason</p>
            <p className="mt-1 text-gray-900">{movement.reason ?? '—'}</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Asset</h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Asset Code</p>
            <Link
              href={`/reports/assets/${movement.asset.id}`}
              className="mt-1 inline-block font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              {movement.asset.assetCode}
            </Link>
          </div>

          <div>
            <p className="text-sm text-gray-500">Asset Name</p>
            <p className="mt-1 font-medium text-gray-900">
              {movement.asset.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Asset Tag</p>
            <p className="mt-1 font-medium text-gray-900">
              {movement.asset.assetTag ?? '—'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Location Change</h2>

        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">From Location</p>
            <p className="mt-1 font-medium text-gray-900">
              {movement.fromLocation?.name ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">To Location</p>
            <p className="mt-1 font-medium text-gray-900">
              {movement.toLocation.name}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
          {movement.notes ?? 'No notes recorded.'}
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
              {formatDateTime(movement.createdAt)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="mt-1 font-medium text-gray-900">
              {formatDateTime(movement.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
