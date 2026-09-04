import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { RetirementReportRow } from '../types/retirement.types';

type RetirementReportTableProps = {
  rows: RetirementReportRow[];
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

function formatStatus(value: string) {
  return value.replaceAll('_', ' ');
}

export function RetirementReportTable({ rows }: RetirementReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-gray-500">No retirement records found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Retirement Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Approved Date</TableHead>
            <TableHead>Cancelled By</TableHead>
            <TableHead>Cancelled Date</TableHead>
            <TableHead>Cancellation Reason</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link
                  href={`/reports/retirements/${row.id}`}
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">
                    {row.asset.assetCode}
                  </p>
                  <p className="text-xs text-gray-500">{row.asset.name}</p>
                  {row.asset.assetTag && (
                    <p className="text-xs text-gray-500">
                      Tag: {row.asset.assetTag}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>{formatDate(row.retirementDate)}</TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs">{row.reason}</span>
              </TableCell>

              <TableCell>{row.condition.name}</TableCell>

              <TableCell>{formatStatus(row.status)}</TableCell>

              <TableCell>{row.requestedByUser.displayName}</TableCell>

              <TableCell>{row.approvedByUser?.displayName ?? '—'}</TableCell>

              <TableCell>{formatDate(row.approvedAt)}</TableCell>

              <TableCell>{row.cancelledByUser?.displayName ?? '—'}</TableCell>

              <TableCell>{formatDate(row.cancelledAt)}</TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs">
                  {row.cancellationReason ?? '—'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
