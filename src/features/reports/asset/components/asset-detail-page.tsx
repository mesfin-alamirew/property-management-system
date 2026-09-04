import Link from 'next/link';

import { getAssetDetailAction } from '../actions/asset.actions';
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
  const result = await getAssetDetailAction(assetId);

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asset Detail</h1>
          <p className="mt-1 text-sm text-red-600">{result.message}</p>
        </div>

        <Link
          href="/reports/assets"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asset Detail</h1>
          <p className="mt-1 text-sm text-gray-600">
            {asset.assetCode} — {asset.name}
          </p>
        </div>

        <Link
          href="/reports/assets"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Asset Report
        </Link>
      </div>

      {/* Asset Identity */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Asset Identity
          </h2>
          <p className="text-sm text-gray-600">
            Core identification information for the asset.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Code</dt>
            <dd className="mt-1 text-sm text-gray-900">{asset.assetCode}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Tag</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.assetTag ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{asset.name}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Manufacturer</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.manufacturer ?? '—'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Model</dt>
            <dd className="mt-1 text-sm text-gray-900">{asset.model ?? '—'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.serialNumber ?? '—'}
            </dd>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-900">
              {asset.description ?? '—'}
            </dd>
          </div>
        </dl>
      </section>

      {/* Classification & State */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Classification &amp; Current State
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Asset Type</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.assetType.code} — {asset.assetType.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Category</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.assetType.category.code} — {asset.assetType.category.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.status.code} — {asset.status.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Condition</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.condition.code} — {asset.condition.name}
            </dd>
          </div>
        </dl>
      </section>

      {/* Location */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Current Location
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {asset.location
                ? `${asset.location.code} — ${asset.location.name}`
                : 'Not assigned to a location'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">
              Organization Unit
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
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
          <h2 className="text-lg font-semibold text-gray-900">
            Current Assignment
          </h2>
        </div>

        {asset.currentAssignment ? (
          <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Employee</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatEmployee(asset.currentAssignment.employee)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Employee Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.currentAssignment.employee.employeeNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Organization Unit
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.currentAssignment.employee.organizationUnit.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Assigned Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.currentAssignment.assignedAt)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Assigned By</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.currentAssignment.assignedByUser.displayName}
              </dd>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.currentAssignment.notes ?? '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
            This asset is not currently assigned to an employee.
          </p>
        )}
      </section>

      {/* Acquisition */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Acquisition</h2>
        </div>

        {asset.acquisition ? (
          <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Acquisition Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.acquisition.acquisitionNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Reference Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.acquisition.referenceNumber ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Acquisition Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.acquisition.acquisitionDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Acquisition Method
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.acquisition.acquisitionMethod.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Currency</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.acquisition.currency ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Unit Cost</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(
                  asset.acquisition.currency,
                  asset.acquisition.unitCost,
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(
                  asset.acquisition.currency,
                  asset.acquisition.totalCost,
                )}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
            No acquisition record is associated with this asset.
          </p>
        )}
      </section>

      {/* Assignment History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Assignment History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <AssetAssignmentHistoryTable rows={asset.assignmentHistory} />
        </div>
      </section>

      {/* Movement History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Movement History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <AssetMovementHistoryTable rows={asset.movementHistory} />
        </div>
      </section>

      {/* Maintenance History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Maintenance History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <AssetMaintenanceHistoryTable rows={asset.maintenanceHistory} />
        </div>
      </section>

      {/* Incident History */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Incident History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <AssetIncidentHistoryTable rows={asset.incidentHistory} />
        </div>

        {asset.incidentHistory.some(
          (incident) => incident.resolution !== null,
        ) && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
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
                      className="rounded-lg border border-gray-200 p-6"
                    >
                      <h4 className="font-medium text-gray-900">
                        {incident.referenceNumber} — {incident.title}
                      </h4>

                      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Root Cause
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {resolution.rootCause}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Resolution
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {resolution.resolution}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Corrective Action
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {resolution.correctiveAction ?? '—'}
                          </dd>
                        </div>

                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Resolved By
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {resolution.resolvedByUser.displayName}
                          </dd>
                        </div>

                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Notes
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
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
          <h2 className="text-lg font-semibold text-gray-900">
            Physical Verification History
          </h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <AssetVerificationHistoryTable rows={asset.verificationHistory} />
        </div>
      </section>

      {/* Retirement */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Retirement</h2>
        </div>

        {asset.retirement ? (
          <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Reference Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.referenceNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Retirement Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.retirement.retirementDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.status}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Condition</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.condition.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Requested By
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.requestedByUser.displayName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Approved By</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.approvedByUser?.displayName ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Approved Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.retirement.approvedAt)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Cancelled Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.retirement.cancelledAt)}
              </dd>
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-gray-500">Reason</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.reason}
              </dd>
            </div>

            {asset.retirement.cancellationReason && (
              <div className="sm:col-span-2 lg:col-span-4">
                <dt className="text-sm font-medium text-gray-500">
                  Cancellation Reason
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {asset.retirement.cancellationReason}
                </dd>
              </div>
            )}

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.retirement.notes ?? '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
            No retirement record is associated with this asset.
          </p>
        )}
      </section>

      {/* Disposal */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Disposal</h2>
        </div>

        {asset.disposal ? (
          <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Reference Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.referenceNumber}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Disposal Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.disposal.disposalDate)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Method</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.method}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.status}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Requested By
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.requestedByUser.displayName}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Approved By</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.approvedByUser?.displayName ?? '—'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Approved Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.disposal.approvedAt)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Cancelled Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(asset.disposal.cancelledAt)}
              </dd>
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-gray-500">Reason</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.reason ?? '—'}
              </dd>
            </div>

            {asset.disposal.cancellationReason && (
              <div className="sm:col-span-2 lg:col-span-4">
                <dt className="text-sm font-medium text-gray-500">
                  Cancellation Reason
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {asset.disposal.cancellationReason}
                </dd>
              </div>
            )}

            <div className="sm:col-span-2 lg:col-span-4">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {asset.disposal.notes ?? '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
            No disposal record is associated with this asset.
          </p>
        )}
      </section>

      {/* Audit Information */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Record Information
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(asset.createdAt)}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatDate(asset.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
