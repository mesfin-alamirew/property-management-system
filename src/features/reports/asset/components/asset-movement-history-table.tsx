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
      <p className="text-sm text-gray-500">
        No movement history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>From Location</TableHead>
          <TableHead>To Location</TableHead>
          <TableHead>Moved By</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{formatDate(row.movedAt)}</TableCell>

            <TableCell>
              {row.fromLocation
                ? `${row.fromLocation.code} - ${row.fromLocation.name}`
                : '—'}
            </TableCell>

            <TableCell>
              {`${row.toLocation.code} - ${row.toLocation.name}`}
            </TableCell>

            <TableCell>{row.movedByUser.displayName}</TableCell>

            <TableCell>{row.reason ?? '—'}</TableCell>

            <TableCell>{row.notes ?? '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
