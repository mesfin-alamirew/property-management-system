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
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        No physical verification records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Scope</TableHead>
            <TableHead>Organization Unit</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Completed Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Discrepancies</TableHead>
            <TableHead>Unregistered</TableHead>
            <TableHead>Created By</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link
                  href={`/reports/verifications/${row.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell>{row.title}</TableCell>

              <TableCell>{formatScope(row.scope)}</TableCell>

              <TableCell>
                {row.organizationUnit
                  ? `${row.organizationUnit.code} - ${row.organizationUnit.name}`
                  : '—'}
              </TableCell>

              <TableCell>
                {row.location
                  ? `${row.location.code} - ${row.location.name}`
                  : '—'}
              </TableCell>

              <TableCell>{formatStatus(row.status)}</TableCell>

              <TableCell>{formatDate(row.scheduledAt)}</TableCell>

              <TableCell>{formatDate(row.completedAt)}</TableCell>

              <TableCell>{row.itemCount}</TableCell>

              <TableCell>{row.verifiedCount}</TableCell>

              <TableCell>{row.discrepancyCount}</TableCell>

              <TableCell>{row.unregisteredObservationCount}</TableCell>

              <TableCell>{row.createdByUser.displayName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
