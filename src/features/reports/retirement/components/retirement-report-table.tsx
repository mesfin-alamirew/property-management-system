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
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-sm text-muted-foreground">
        No retirement records found.
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
            <TableHead className="font-semibold text-foreground">
              Asset
            </TableHead>
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Retirement Date
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Reason
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Condition
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
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
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Cancelled By
            </TableHead>
            <TableHead className="font-semibold text-foreground whitespace-nowrap">
              Cancelled Date
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Cancellation Reason
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
                  href={`/reports/retirements/${row.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell className="min-w-48">
                <div>
                  <p className="font-medium text-foreground">
                    {row.asset.assetCode}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {row.asset.name}
                  </p>
                  {row.asset.assetTag && (
                    <p className="text-xs text-muted-foreground">
                      Tag: {row.asset.assetTag}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.retirementDate)}
              </TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs text-sm text-foreground">
                  {row.reason}
                </span>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.condition.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm font-medium text-foreground">
                {formatStatus(row.status)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.requestedByUser.displayName}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.approvedByUser?.displayName ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.approvedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.cancelledByUser?.displayName ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.cancelledAt)}
              </TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs text-sm text-foreground">
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
