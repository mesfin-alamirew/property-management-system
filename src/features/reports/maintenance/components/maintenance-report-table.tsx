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
      <div className="rounded-lg border border-border bg-surface px-5 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          No maintenance records match the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="font-semibold text-foreground">
              Reference
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Asset
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Type
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Title
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Requested
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Scheduled
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Started
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Completed
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Assigned Officer
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Services
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Service Cost
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
                  href={`/reports/maintenances/${row.id}`}
                  className="font-medium text-primary hover:text-primary-hover hover:underline"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell>
                <div className="min-w-[180px]">
                  <div className="font-medium text-foreground">
                    {row.asset.assetCode}
                  </div>

                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {row.asset.name}
                  </div>

                  {row.asset.assetTag && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Tag: {row.asset.assetTag}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.type.replaceAll('_', ' ')}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.status.replaceAll('_', ' ')}
              </TableCell>

              <TableCell className="min-w-[180px] text-sm text-foreground">
                {row.title}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.requestedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.scheduledAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.startedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.completedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.assignedToUser?.displayName ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.serviceCount}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm font-medium text-foreground">
                {formatCurrency(row.totalServiceCost)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
