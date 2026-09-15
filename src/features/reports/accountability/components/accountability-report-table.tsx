import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AccountabilityReportRow } from '../types/accountability.types';

type AccountabilityReportTableProps = {
  rows: AccountabilityReportRow[];
  hasActiveFilters: boolean;
};

function getSeverityClasses(severity: AccountabilityReportRow['severity']) {
  switch (severity) {
    case 'HIGH':
      return 'bg-danger-surface text-danger';
    case 'REVIEW':
      return 'bg-warning-surface text-warning';
    case 'MONITOR':
      return 'bg-info-surface text-info';
    default:
      return 'bg-surface-muted text-muted-foreground';
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
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-center text-sm text-muted-foreground">
        {hasActiveFilters
          ? 'No accountability exceptions match the selected filters.'
          : 'No accountability exceptions found.'}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60 hover:bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Asset
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Exception
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Severity
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Details
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Location
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Organization Unit
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Custodian
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Evidence
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const evidenceHref = getEvidenceHref(row);

            return (
              <TableRow
                key={row.id}
                className="transition-colors hover:bg-surface-muted/50"
              >
                <TableCell>
                  <div className="min-w-[180px]">
                    <Link
                      href={`/reports/assets/${row.asset.id}`}
                      className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                    >
                      {row.asset.assetCode}
                    </Link>

                    {row.asset.assetTag && (
                      <p className="text-xs text-muted-foreground">
                        {row.asset.assetTag}
                      </p>
                    )}

                    <p className="text-sm text-foreground">{row.asset.name}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="whitespace-nowrap font-medium text-foreground">
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
                  <div className="min-w-[260px] text-sm text-foreground">
                    {row.details}
                  </div>
                </TableCell>

                <TableCell>
                  {row.location ? (
                    <div className="min-w-[150px]">
                      <p className="font-medium text-foreground">
                        {row.location.code}
                      </p>
                      <p className="text-xs text-muted-foreground">
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
                      <p className="font-medium text-foreground">
                        {row.organizationUnit.code}
                      </p>
                      <p className="text-xs text-muted-foreground">
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
                      <p className="font-medium text-foreground">
                        {row.employee.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
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
                          className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                        >
                          {row.evidence.referenceNumber ?? 'View Record'}
                        </Link>
                      ) : (
                        <span className="font-medium text-foreground">
                          {row.evidence.referenceNumber ?? 'View Record'}
                        </span>
                      )}

                      {row.evidence.date && (
                        <p className="text-xs text-muted-foreground">
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
  );
}
