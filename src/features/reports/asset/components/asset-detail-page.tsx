import Link from 'next/link';

import { getAssetDetailAction } from '../actions/asset.actions';
import { AccessDenied } from '@/components/ui/access-denied';
import { AppError } from '@/lib/errors';

import { AssetAssignmentHistoryTable } from './asset-assignment-history-table';
import { AssetIncidentHistoryTable } from './asset-incident-history-table';
import { AssetMaintenanceHistoryTable } from './asset-maintenance-history-table';
import { AssetMovementHistoryTable } from './asset-movement-history-table';
import { AssetVerificationHistoryTable } from './asset-verification-history-table';

type AssetDetailPageProps = {
  assetId: string;
};

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

function formatEmployee(employee: {
  firstName: string;
  middleName: string | null;
  lastName: string;
}) {
  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

function formatCurrency(currency: string | null, amount: string | null) {
  if (!amount) {
    return '—';
  }

  return currency ? `${currency} ${amount}` : amount;
}

export async function AssetDetailPage({ assetId }: AssetDetailPageProps) {
  let result;

  try {
    result = await getAssetDetailAction(assetId);
  } catch (error) {
    if (error instanceof AppError && error.code === 'PERMISSION_DENIED') {
      return <AccessDenied />;
    }

    throw error;
  }

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-danger/20 bg-danger-surface p-5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Asset Detail
          </h1>
          <p className="mt-2 text-sm text-danger">{result.message}</p>
        </div>

        <Link
          href="/reports/assets"
          className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Asset Report
        </Link>
      </div>
    );
  }

  const asset = result.data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Asset management report
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            Asset Detail
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {asset.assetCode} — {asset.name}
          </p>
        </div>

        <Link
          href="/reports/assets"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Back to Asset Report
        </Link>
      </div>

      {/* Asset Identity */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Asset Identity
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Core identification information for the asset.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Code
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {asset.assetCode}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Tag
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.assetTag ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Name
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {asset.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Manufacturer
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.manufacturer ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">Model</dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.model ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Serial Number
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.serialNumber ?? '—'}
            </dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-muted-foreground">
              Description
            </dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-foreground">
              {asset.description ?? '—'}
            </dd>
          </div>
        </dl>
      </section>

      {/* Classification & State */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Classification &amp; Current State
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Asset Type
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.assetType.code} — {asset.assetType.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Category
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.assetType.category.code} — {asset.assetType.category.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {asset.status.code} — {asset.status.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Condition
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {asset.condition.code} — {asset.condition.name}
            </dd>
          </div>
        </dl>
      </section>

      {/* Location */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Current Location
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Location
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.location
                ? `${asset.location.code} — ${asset.location.name}`
                : 'Not assigned to a location'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Organization Unit
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {asset.location
                ? `${asset.location.organizationUnit.code} — ${asset.location.organizationUnit.name}`
                : '—'}
            </dd>
          </div>
        </dl>
      </section>

      {/* Current Assignment */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Current Assignment
          </h2>
        </div>

        {asset.currentAssignment ? (
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Employee
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {formatEmployee(asset.currentAssignment.employee)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Employee Number
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.currentAssignment.employee.employeeNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Organization Unit
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.currentAssignment.employee.organizationUnit.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Assigned Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.currentAssignment.assignedAt)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Assigned By
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.currentAssignment.assignedByUser.displayName}
              </dd>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <dt className="text-sm font-medium text-muted-foreground">
                Notes
              </dt>
              <dd className="mt-1 text-sm leading-6 text-foreground">
                {asset.currentAssignment.notes ?? '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-border bg-surface-muted/50 p-5 text-sm text-muted-foreground">
            This asset is not currently assigned to an employee.
          </p>
        )}
      </section>

      {/* Acquisition */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Acquisition
          </h2>
        </div>

        {asset.acquisition ? (
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Acquisition Number
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {asset.acquisition.acquisitionNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Reference Number
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.acquisition.referenceNumber ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Acquisition Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.acquisition.acquisitionDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Acquisition Method
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.acquisition.acquisitionMethod.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Currency
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.acquisition.currency ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Unit Cost
              </dt>
              <dd className="mt-1 text-sm font-medium tabular-nums text-foreground">
                {formatCurrency(
                  asset.acquisition.currency,
                  asset.acquisition.unitCost,
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Total Cost
              </dt>
              <dd className="mt-1 text-sm font-semibold tabular-nums text-foreground">
                {formatCurrency(
                  asset.acquisition.currency,
                  asset.acquisition.totalCost,
                )}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-border bg-surface-muted/50 p-5 text-sm text-muted-foreground">
            No acquisition record is associated with this asset.
          </p>
        )}
      </section>

      {/* Assignment History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Assignment History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <AssetAssignmentHistoryTable rows={asset.assignmentHistory} />
        </div>
      </section>

      {/* Movement History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Movement History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <AssetMovementHistoryTable rows={asset.movementHistory} />
        </div>
      </section>

      {/* Maintenance History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Maintenance History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <AssetMaintenanceHistoryTable rows={asset.maintenanceHistory} />
        </div>
      </section>

      {/* Incident History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Incident History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <AssetIncidentHistoryTable rows={asset.incidentHistory} />
        </div>

        {asset.incidentHistory.some(
          (incident) => incident.resolution !== null,
        ) && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              Incident Resolutions
            </h3>

            <div className="space-y-4">
              {asset.incidentHistory
                .filter((incident) => incident.resolution !== null)
                .map((incident) => {
                  const resolution = incident.resolution!;

                  return (
                    <div
                      key={resolution.id}
                      className="rounded-lg border border-border bg-surface p-5 shadow-sm"
                    >
                      <h4 className="font-medium text-foreground">
                        {incident.referenceNumber} — {incident.title}
                      </h4>

                      <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Root Cause
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-foreground">
                            {resolution.rootCause}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Resolution
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-foreground">
                            {resolution.resolution}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Corrective Action
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-foreground">
                            {resolution.correctiveAction ?? '—'}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Resolved By
                          </dt>
                          <dd className="mt-1 text-sm text-foreground">
                            {resolution.resolvedByUser.displayName}
                          </dd>
                        </div>

                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-muted-foreground">
                            Notes
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-foreground">
                            {resolution.notes ?? '—'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </section>

      {/* Physical Verification History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Physical Verification History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <AssetVerificationHistoryTable rows={asset.verificationHistory} />
        </div>
      </section>

      {/* Retirement */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Retirement
          </h2>
        </div>

        {asset.retirement ? (
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Reference Number
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {asset.retirement.referenceNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Retirement Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.retirement.retirementDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Status
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {asset.retirement.status}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Condition
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.retirement.condition.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Requested By
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.retirement.requestedByUser.displayName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Approved By
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.retirement.approvedByUser?.displayName ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Approved Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.retirement.approvedAt)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Cancelled Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.retirement.cancelledAt)}
              </dd>
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Reason
              </dt>
              <dd className="mt-1 text-sm leading-6 text-foreground">
                {asset.retirement.reason}
              </dd>
            </div>

            {asset.retirement.cancellationReason && (
              <div className="sm:col-span-2 lg:col-span-4">
                <dt className="text-sm font-medium text-muted-foreground">
                  Cancellation Reason
                </dt>
                <dd className="mt-1 text-sm leading-6 text-foreground">
                  {asset.retirement.cancellationReason}
                </dd>
              </div>
            )}

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Notes
              </dt>
              <dd className="mt-1 text-sm leading-6 text-foreground">
                {asset.retirement.notes ?? '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-border bg-surface-muted/50 p-5 text-sm text-muted-foreground">
            No retirement record is associated with this asset.
          </p>
        )}
      </section>

      {/* Disposal */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Disposal
          </h2>
        </div>

        {asset.disposal ? (
          <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Reference Number
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {asset.disposal.referenceNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Disposal Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.disposal.disposalDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Method
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.disposal.method}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Status
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {asset.disposal.status}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Requested By
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.disposal.requestedByUser.displayName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Approved By
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {asset.disposal.approvedByUser?.displayName ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Approved Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.disposal.approvedAt)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Cancelled Date
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {formatDate(asset.disposal.cancelledAt)}
              </dd>
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Reason
              </dt>
              <dd className="mt-1 text-sm leading-6 text-foreground">
                {asset.disposal.reason ?? '—'}
              </dd>
            </div>

            {asset.disposal.cancellationReason && (
              <div className="sm:col-span-2 lg:col-span-4">
                <dt className="text-sm font-medium text-muted-foreground">
                  Cancellation Reason
                </dt>
                <dd className="mt-1 text-sm leading-6 text-foreground">
                  {asset.disposal.cancellationReason}
                </dd>
              </div>
            )}

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-muted-foreground">
                Notes
              </dt>
              <dd className="mt-1 text-sm leading-6 text-foreground">
                {asset.disposal.notes ?? '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-border bg-surface-muted/50 p-5 text-sm text-muted-foreground">
            No disposal record is associated with this asset.
          </p>
        )}
      </section>

      {/* Audit Information */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Record Information
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Created
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(asset.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Last Updated
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatDate(asset.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
