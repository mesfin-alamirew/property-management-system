import type { AssetIncidentHistoryRow } from '../types/asset.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetIncidentHistoryTableProps = {
  rows: AssetIncidentHistoryRow[];
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

export function AssetIncidentHistoryTable({
  rows,
}: AssetIncidentHistoryTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No incident history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Incident Date</TableHead>
          <TableHead>Reported By</TableHead>
          <TableHead>Resolved</TableHead>
          <TableHead>Closed</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.referenceNumber}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.severity}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{formatDate(row.incidentDate)}</TableCell>

            <TableCell>{row.reportedByUser.displayName}</TableCell>

            <TableCell>{formatDate(row.resolvedAt)}</TableCell>
            <TableCell>{formatDate(row.closedAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
