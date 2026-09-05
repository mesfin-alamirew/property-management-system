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
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
        No audit records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date &amp; Time</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity Type</TableHead>
            <TableHead>Entity ID</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="whitespace-nowrap">
                <Link
                  href={`/reports/audits/${row.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {formatDateTime(row.createdAt)}
                </Link>
              </TableCell>

              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {row.user.displayName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {row.user.username}
                  </div>
                </div>
              </TableCell>

              <TableCell>{row.action}</TableCell>

              <TableCell>{row.entityType}</TableCell>

              <TableCell className="font-mono text-xs">
                {row.entityId}
              </TableCell>

              <TableCell className="max-w-md">
                <span className="line-clamp-2">{row.description}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
