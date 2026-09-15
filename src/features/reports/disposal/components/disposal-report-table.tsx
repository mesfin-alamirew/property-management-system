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
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-sm text-muted-foreground">
        No disposal records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60 hover:bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Reference
            </TableHead>
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Disposal Date
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Method
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Assets
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Reason
            </TableHead>
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Requested By
            </TableHead>
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Approved By
            </TableHead>
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Approved Date
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
                  href={`/reports/disposals/${row.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.disposalDate)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.method}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm font-medium text-foreground">
                {row.status}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.itemCount}
              </TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs text-sm text-foreground">
                  {row.reason ?? '—'}
                </span>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.requestedByUser.displayName}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.approvedByUser?.displayName ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDateTime(row.approvedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
