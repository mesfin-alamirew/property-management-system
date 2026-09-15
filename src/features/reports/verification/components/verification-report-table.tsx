import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PhysicalVerificationReportRow } from '../types/verification.types';

type VerificationReportTableProps = {
  rows: PhysicalVerificationReportRow[];
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

function formatScope(scope: PhysicalVerificationReportRow['scope']) {
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

function formatStatus(status: PhysicalVerificationReportRow['status']) {
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

export function VerificationReportTable({
  rows,
}: VerificationReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-sm text-muted-foreground">
        No physical verification records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60 hover:bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Reference Number
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Title
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Scope
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Organization Unit
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Location
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Scheduled Date
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Completed Date
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Items
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Verified
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Discrepancies
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Unregistered
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Created By
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell className="whitespace-nowrap">
                <Link
                  href={`/reports/verifications/${row.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell className="min-w-48 text-sm text-foreground">
                {row.title}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatScope(row.scope)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.organizationUnit
                  ? `${row.organizationUnit.code} - ${row.organizationUnit.name}`
                  : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.location
                  ? `${row.location.code} - ${row.location.name}`
                  : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatStatus(row.status)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.scheduledAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.completedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm tabular-nums text-foreground">
                {row.itemCount}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm tabular-nums text-foreground">
                {row.verifiedCount}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm tabular-nums text-foreground">
                {row.discrepancyCount}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm tabular-nums text-foreground">
                {row.unregisteredObservationCount}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.createdByUser.displayName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
