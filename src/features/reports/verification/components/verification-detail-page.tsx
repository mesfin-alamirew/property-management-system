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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Physical Verification Detail
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-5 text-muted-foreground">
            View the verification record, results, discrepancies, and
            unregistered asset observations.
          </p>
        </div>

        <Link
          href="/reports/verifications"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Verification Report
        </Link>
      </div>

      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Verification Information
        </h2>

        <dl className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Reference Number
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {verification.referenceNumber}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">Title</dt>
            <dd className="mt-1 text-sm text-foreground">
              {verification.title}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">Scope</dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatScope(verification.scope)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatStatus(verification.status)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Organization Unit
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {verification.organizationUnit
                ? `${verification.organizationUnit.code} - ${verification.organizationUnit.name}`
                : '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Location
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {verification.location
                ? `${verification.location.code} - ${verification.location.name}`
                : '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Scheduled Date
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(verification.scheduledAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Started Date
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(verification.startedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Completed Date
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(verification.completedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Created By
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {verification.createdByUser.displayName}
            </dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">Notes</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">
              {verification.notes || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Verification Summary
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Items</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {verification.itemCount}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Verified
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {verification.verifiedCount}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {verification.pendingCount}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              Discrepancies
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {verification.discrepancyCount}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Result Breakdown
        </h2>

        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <dl className="divide-y divide-border">
            {resultSummary.map((summary) => (
              <div
                key={summary.result}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-surface-muted/50"
              >
                <dt className="text-sm text-foreground">
                  {formatResult(summary.result)}
                </dt>
                <dd className="text-sm font-semibold text-foreground">
                  {summary.count}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Verification Items
          </h2>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Expected values compared with values observed during physical
            verification.
          </p>
        </div>

        <VerificationDetailItemsTable items={items} />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Unregistered Asset Observations
          </h2>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
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
