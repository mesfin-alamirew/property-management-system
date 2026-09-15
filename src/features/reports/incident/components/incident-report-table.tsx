import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { IncidentReportRow } from '../types/incident.types';

type IncidentReportTableProps = {
  rows: IncidentReportRow[];
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

export function IncidentReportTable({ rows }: IncidentReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4">
        <p className="text-sm text-muted-foreground">
          No incident records match the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Reference
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Asset
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Type
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Severity
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Title
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Incident Date
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Reported
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Assigned Officer
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Resolved
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Resolution
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
                  href={`/reports/incidents/${row.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
                >
                  {row.referenceNumber}
                </Link>
              </TableCell>

              <TableCell>
                <div className="min-w-44">
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
                {row.severity.replaceAll('_', ' ')}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.status.replaceAll('_', ' ')}
              </TableCell>

              <TableCell className="min-w-56 text-sm text-foreground">
                {row.title}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.incidentDate)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.reportedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.assignedToUser?.displayName ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {formatDate(row.resolvedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.hasResolution ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
