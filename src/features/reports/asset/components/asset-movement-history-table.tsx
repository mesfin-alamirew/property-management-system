import type { AssetMovementHistoryRow } from '../types/asset.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetMovementHistoryTableProps = {
  rows: AssetMovementHistoryRow[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

export function AssetMovementHistoryTable({
  rows,
}: AssetMovementHistoryTableProps) {
  if (rows.length === 0) {
    return (
      <p className="px-5 py-4 text-sm text-muted-foreground">
        No movement history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="whitespace-nowrap font-semibold">
            Date
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            From Location
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            To Location
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
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.movedAt)}
            </TableCell>

            <TableCell className="min-w-48 text-foreground">
              {row.fromLocation
                ? `${row.fromLocation.code} - ${row.fromLocation.name}`
                : '—'}
            </TableCell>

            <TableCell className="min-w-48 text-foreground">
              {`${row.toLocation.code} - ${row.toLocation.name}`}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {row.movedByUser.displayName}
            </TableCell>

            <TableCell className="min-w-40 text-foreground">
              {row.reason ?? '—'}
            </TableCell>

            <TableCell className="min-w-48 text-foreground">
              {row.notes ?? '—'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
