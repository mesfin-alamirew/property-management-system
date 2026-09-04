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
      <p className="text-sm text-gray-500">
        No maintenance history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested</TableHead>
          <TableHead>Scheduled</TableHead>
          <TableHead>Started</TableHead>
          <TableHead>Completed</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.referenceNumber}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{formatDate(row.requestedAt)}</TableCell>
            <TableCell>{formatDate(row.scheduledAt)}</TableCell>
            <TableCell>{formatDate(row.startedAt)}</TableCell>
            <TableCell>{formatDate(row.completedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
