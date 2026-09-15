import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { MovementReportRow } from '../types/movement.types';

type MovementReportTableProps = {
  rows: MovementReportRow[];
};

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function MovementReportTable({ rows }: MovementReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface px-5 py-8 text-center text-sm text-muted-foreground shadow-sm">
        No asset movement records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="whitespace-nowrap font-semibold">
              Asset
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              From Location
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              To Location
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Moved Date
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Moved By
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Reason
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Notes
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell>
                <div className="min-w-40">
                  <Link
                    href={`/reports/movements/${row.id}`}
                    className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline"
                  >
                    {row.asset.assetCode}
                  </Link>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {row.asset.name}
                  </p>

                  {row.asset.assetTag && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Tag: {row.asset.assetTag}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {row.fromLocation?.name ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {row.toLocation.name}
              </TableCell>

              <TableCell className="whitespace-nowrap tabular-nums">
                {formatDateTime(row.movedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {row.movedByUser.displayName}
              </TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs text-sm">
                  {row.reason ?? '—'}
                </span>
              </TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs text-sm">
                  {row.notes ?? '—'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
