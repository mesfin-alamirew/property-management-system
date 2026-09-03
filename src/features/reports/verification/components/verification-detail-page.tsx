import Link from 'next/link';

import { VerificationDetailItemsTable } from './verification-detail-items-table';
import { VerificationUnregisteredTable } from './verification-unregistered-table';

import type {
  PhysicalVerificationDetail,
  PhysicalVerificationDetailItem,
  PhysicalVerificationDetailResultSummary,
  PhysicalVerificationUnregisteredObservation,
} from '../types/verification.types';

type VerificationDetailPageProps = {
  verification: PhysicalVerificationDetail;
  items: PhysicalVerificationDetailItem[];
  resultSummary: PhysicalVerificationDetailResultSummary[];
  unregisteredObservations: PhysicalVerificationUnregisteredObservation[];
};

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

function formatScope(scope: PhysicalVerificationDetail['scope']) {
  switch (scope) {
    case 'ORGANIZATION':
      return 'Organization';
    case 'ORGANIZATION_UNIT':
      return 'Organization Unit';
    case 'LOCATION':
      return 'Location';
    case 'ORGANIZATION_UNIT_LOCATION':
      return 'Organization Unit + Location';
    case 'SELECTED_ASSETS':
      return 'Selected Assets';
    default:
      return scope;
  }
}

function formatStatus(status: PhysicalVerificationDetail['status']) {
  switch (status) {
    case 'DRAFT':
      return 'Draft';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'COMPLETED':
      return 'Completed';
    case 'CANCELLED':
      return 'Cancelled';
    default:
      return status;
  }
}

function formatResult(
  result: PhysicalVerificationDetailResultSummary['result'],
) {
  switch (result) {
    case 'PENDING':
      return 'Pending';
    case 'VERIFIED':
      return 'Verified';
    case 'NOT_FOUND':
      return 'Not Found';
    case 'LOCATION_MISMATCH':
      return 'Location Mismatch';
    case 'CUSTODIAN_MISMATCH':
      return 'Custodian Mismatch';
    case 'CONDITION_MISMATCH':
      return 'Condition Mismatch';
    case 'IDENTIFICATION_MISMATCH':
      return 'Identification Mismatch';
    case 'MULTIPLE_DISCREPANCIES':
      return 'Multiple Discrepancies';
    default:
      return result;
  }
}

export function VerificationDetailPage({
  verification,
  items,
  resultSummary,
  unregisteredObservations,
}: VerificationDetailPageProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Physical Verification Detail
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            View the verification record, results, discrepancies, and
            unregistered asset observations.
          </p>
        </div>

        <Link
          href="/reports/verifications"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Verification Report
        </Link>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Verification Information
        </h2>

        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Reference Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {verification.referenceNumber}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900">{verification.title}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Scope</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatScope(verification.scope)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatStatus(verification.status)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Organization Unit
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {verification.organizationUnit
                ? `${verification.organizationUnit.code} - ${verification.organizationUnit.name}`
                : '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {verification.location
                ? `${verification.location.code} - ${verification.location.name}`
                : '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Scheduled Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(verification.scheduledAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Started Date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(verification.startedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Completed Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(verification.completedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {verification.createdByUser.displayName}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Notes</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-900">
              {verification.notes || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">
          Verification Summary
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Items</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {verification.itemCount}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Verified</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {verification.verifiedCount}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {verification.pendingCount}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Discrepancies</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {verification.discrepancyCount}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">
          Result Breakdown
        </h2>

        <div className="mt-4 rounded-lg border border-gray-200 bg-white">
          <dl className="divide-y divide-gray-200">
            {resultSummary.map((summary) => (
              <div
                key={summary.result}
                className="flex items-center justify-between px-5 py-4"
              >
                <dt className="text-sm text-gray-700">
                  {formatResult(summary.result)}
                </dt>
                <dd className="text-sm font-semibold text-gray-900">
                  {summary.count}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Verification Items
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Expected values compared with values observed during physical
            verification.
          </p>
        </div>

        <VerificationDetailItemsTable items={items} />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Unregistered Asset Observations
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Assets observed during verification that were not part of the
            registered verification items.
          </p>
        </div>

        <VerificationUnregisteredTable
          observations={unregisteredObservations}
        />
      </section>
    </div>
  );
}
