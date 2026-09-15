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
      <p className="px-5 py-4 text-sm text-muted-foreground">
        No incident history is available for this asset.
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
          <TableHead className="whitespace-nowrap font-semibold">
            Severity
          </TableHead>
          <TableHead className="min-w-48 whitespace-nowrap font-semibold">
            Title
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Status
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Incident Date
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Reported By
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Resolved
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Closed
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

            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {row.severity}
            </TableCell>

            <TableCell className="min-w-48 text-foreground">
              {row.title}
            </TableCell>

            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {row.status}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.incidentDate)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {row.reportedByUser.displayName}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.resolvedAt)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.closedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
