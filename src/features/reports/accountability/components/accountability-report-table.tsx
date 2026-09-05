import Link from 'next/link';
import type { AccountabilityReportRow } from '../types/accountability.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AccountabilityReportTableProps = {
  rows: AccountabilityReportRow[];
  hasActiveFilters: boolean;
};

function getSeverityClasses(severity: AccountabilityReportRow['severity']) {
  switch (severity) {
    case 'HIGH':
      return 'bg-red-100 text-red-800';
    case 'REVIEW':
      return 'bg-yellow-100 text-yellow-800';
    case 'MONITOR':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getSeverityLabel(severity: AccountabilityReportRow['severity']) {
  switch (severity) {
    case 'HIGH':
      return 'High';
    case 'REVIEW':
      return 'Review';
    case 'MONITOR':
      return 'Monitor';
    default:
      return severity;
  }
}

function getExceptionLabel(
  exceptionType: AccountabilityReportRow['exceptionType'],
) {
  const labels: Record<AccountabilityReportRow['exceptionType'], string> = {
    NO_CURRENT_ASSIGNMENT: 'No Current Assignment',
    MULTIPLE_CURRENT_ASSIGNMENTS: 'Multiple Current Assignments',
    MISSING_LOCATION: 'Missing Location',
    VERIFICATION_NOT_FOUND: 'Verification Not Found',
    VERIFICATION_LOCATION_MISMATCH: 'Verification Location Mismatch',
    VERIFICATION_CUSTODIAN_MISMATCH: 'Verification Custodian Mismatch',
    VERIFICATION_CONDITION_MISMATCH: 'Verification Condition Mismatch',
    VERIFICATION_IDENTIFICATION_MISMATCH:
      'Verification Identification Mismatch',
    VERIFICATION_MULTIPLE_DISCREPANCIES: 'Verification Multiple Discrepancies',
    MAINTENANCE_REQUIRING_ACTION: 'Maintenance Requiring Action',
    ACTIVE_INCIDENT: 'Active Incident',
    RETIREMENT_PENDING: 'Retirement Pending',
    RETIREMENT_APPROVED: 'Retirement Approved',
    DISPOSAL_PENDING: 'Disposal Pending',
    DISPOSAL_APPROVED: 'Disposal Approved',
  };

  return labels[exceptionType];
}

function getEvidenceHref(row: AccountabilityReportRow) {
  if (!row.evidence) {
    return null;
  }

  switch (row.evidence.type) {
    case 'VERIFICATION':
      return `/reports/verifications/${row.evidence.id}`;
    case 'MAINTENANCE':
      return `/reports/maintenances/${row.evidence.id}`;
    case 'INCIDENT':
      return `/reports/incidents/${row.evidence.id}`;
    case 'RETIREMENT':
      return `/reports/retirements/${row.evidence.id}`;
    case 'DISPOSAL':
      return `/reports/disposals/${row.evidence.id}`;
    default:
      return null;
  }
}

function formatEvidenceDate(date: Date | null) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(date);
}

export function AccountabilityReportTable({
  rows,
  hasActiveFilters,
}: AccountabilityReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm text-gray-600">
          {hasActiveFilters
            ? 'No accountability exceptions match the selected filters.'
            : 'No accountability exceptions found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Exception</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Organization Unit</TableHead>
              <TableHead>Custodian</TableHead>
              <TableHead>Evidence</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => {
              const evidenceHref = getEvidenceHref(row);

              return (
                <TableRow key={row.id}>
                  <TableCell>
                    <div className="min-w-[180px]">
                      <Link
                        href={`/reports/assets/${row.asset.id}`}
                        className="font-medium text-gray-900 hover:underline"
                      >
                        {row.asset.assetCode}
                      </Link>

                      {row.asset.assetTag && (
                        <p className="text-xs text-gray-500">
                          {row.asset.assetTag}
                        </p>
                      )}

                      <p className="text-sm text-gray-700">{row.asset.name}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="whitespace-nowrap font-medium text-gray-900">
                      {getExceptionLabel(row.exceptionType)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getSeverityClasses(
                        row.severity,
                      )}`}
                    >
                      {getSeverityLabel(row.severity)}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="min-w-[260px] text-sm text-gray-700">
                      {row.details}
                    </div>
                  </TableCell>

                  <TableCell>
                    {row.location ? (
                      <div className="min-w-[150px]">
                        <p className="font-medium text-gray-900">
                          {row.location.code}
                        </p>
                        <p className="text-xs text-gray-500">
                          {row.location.name}
                        </p>
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  <TableCell>
                    {row.organizationUnit ? (
                      <div className="min-w-[150px]">
                        <p className="font-medium text-gray-900">
                          {row.organizationUnit.code}
                        </p>
                        <p className="text-xs text-gray-500">
                          {row.organizationUnit.name}
                        </p>
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  <TableCell>
                    {row.employee ? (
                      <div className="min-w-[150px]">
                        <p className="font-medium text-gray-900">
                          {row.employee.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {row.employee.employeeNumber}
                        </p>
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>

                  <TableCell>
                    {row.evidence ? (
                      <div className="min-w-[150px]">
                        {evidenceHref ? (
                          <Link
                            href={evidenceHref}
                            className="font-medium text-gray-900 hover:underline"
                          >
                            {row.evidence.referenceNumber ?? 'View Record'}
                          </Link>
                        ) : (
                          <span className="font-medium text-gray-900">
                            {row.evidence.referenceNumber ?? 'View Record'}
                          </span>
                        )}

                        {row.evidence.date && (
                          <p className="text-xs text-gray-500">
                            {formatEvidenceDate(row.evidence.date)}
                          </p>
                        )}
                      </div>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
