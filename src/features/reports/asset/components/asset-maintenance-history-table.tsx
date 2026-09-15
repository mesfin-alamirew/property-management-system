import type { AssetMaintenanceHistoryRow } from '../types/asset.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetMaintenanceHistoryTableProps = {
  rows: AssetMaintenanceHistoryRow[];
};

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date));
}

export function AssetMaintenanceHistoryTable({
  rows,
}: AssetMaintenanceHistoryTableProps) {
  if (rows.length === 0) {
    return (
      <p className="px-5 py-4 text-sm text-muted-foreground">
        No maintenance history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="whitespace-nowrap font-semibold">
            Reference
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Type
          </TableHead>
          <TableHead className="min-w-48 whitespace-nowrap font-semibold">
            Title
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Status
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Requested
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Scheduled
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Started
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Completed
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            className="transition-colors hover:bg-surface-muted/50"
          >
            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {row.referenceNumber}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {row.type}
            </TableCell>

            <TableCell className="min-w-48 text-foreground">
              {row.title}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {row.status}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.requestedAt)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.scheduledAt)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.startedAt)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.completedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
