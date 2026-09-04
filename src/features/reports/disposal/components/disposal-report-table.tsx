import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { DisposalReportRow } from '../types/disposal.types';

type DisposalReportTableProps = {
  rows: DisposalReportRow[];
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

export function DisposalReportTable({ rows }: DisposalReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-gray-500">No disposal records found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Disposal Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assets</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Approved By</TableHead>
            <TableHead>Approved Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div>
                  <Link
                    href={`/reports/disposals/${row.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {row.referenceNumber}
                  </Link>
                </div>
              </TableCell>

              <TableCell>{formatDate(row.disposalDate)}</TableCell>

              <TableCell>{row.method}</TableCell>

              <TableCell>{row.status}</TableCell>

              <TableCell>{row.itemCount}</TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs">
                  {row.reason ?? '—'}
                </span>
              </TableCell>

              <TableCell>{row.requestedByUser.displayName}</TableCell>

              <TableCell>{row.approvedByUser?.displayName ?? '—'}</TableCell>

              <TableCell>{formatDateTime(row.approvedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
