import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { MaintenanceReportRow } from '../types/maintenance.types';

type MaintenanceReportTableProps = {
  rows: MaintenanceReportRow[];
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

function formatCurrency(amount: string | null) {
  if (!amount) {
    return '—';
  }

  return amount;
}

export function MaintenanceReportTable({ rows }: MaintenanceReportTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No maintenance records match the selected filters.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Requested</TableHead>
          <TableHead>Scheduled</TableHead>
          <TableHead>Started</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>Assigned Officer</TableHead>
          <TableHead>Services</TableHead>
          <TableHead>Service Cost</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Link
                href={`/reports/maintenances/${row.id}`}
                className="font-medium text-blue-600 hover:underline"
              >
                {row.referenceNumber}
              </Link>
            </TableCell>

            <TableCell>
              <div>
                <div className="font-medium text-gray-900">
                  {row.asset.assetCode}
                </div>

                <div className="text-xs text-gray-500">{row.asset.name}</div>

                {row.asset.assetTag && (
                  <div className="text-xs text-gray-500">
                    Tag: {row.asset.assetTag}
                  </div>
                )}
              </div>
            </TableCell>

            <TableCell>{row.type.replaceAll('_', ' ')}</TableCell>

            <TableCell>{row.status.replaceAll('_', ' ')}</TableCell>

            <TableCell>{row.title}</TableCell>

            <TableCell>{formatDate(row.requestedAt)}</TableCell>

            <TableCell>{formatDate(row.scheduledAt)}</TableCell>

            <TableCell>{formatDate(row.startedAt)}</TableCell>

            <TableCell>{formatDate(row.completedAt)}</TableCell>

            <TableCell>{row.assignedToUser?.displayName ?? '—'}</TableCell>

            <TableCell>{row.serviceCount}</TableCell>

            <TableCell>{formatCurrency(row.totalServiceCost)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
