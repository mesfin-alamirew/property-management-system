import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AuditReportRow } from '../types/audit.types';

type AuditReportTableProps = {
  rows: AuditReportRow[];
};

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function AuditReportTable({ rows }: AuditReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-muted px-5 py-4 text-center text-sm text-muted-foreground">
        No audit records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60 hover:bg-surface-muted/60">
            <TableHead className="whitespace-nowrap font-semibold text-foreground">
              Date &amp; Time
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              User
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Action
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Entity Type
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Entity ID
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Description
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
                  href={`/reports/audits/${row.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                >
                  {formatDateTime(row.createdAt)}
                </Link>
              </TableCell>

              <TableCell>
                <div className="min-w-[150px]">
                  <div className="font-medium text-foreground">
                    {row.user.displayName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {row.user.username}
                  </div>
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.action}
              </TableCell>

              <TableCell className="whitespace-nowrap text-sm text-foreground">
                {row.entityType}
              </TableCell>

              <TableCell className="whitespace-nowrap font-mono text-xs text-foreground">
                {row.entityId}
              </TableCell>

              <TableCell className="max-w-md">
                <span className="line-clamp-2 text-sm text-foreground">
                  {row.description}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
