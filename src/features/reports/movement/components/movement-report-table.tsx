import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { MovementReportRow } from '../types/movement.types';

type MovementReportTableProps = {
  rows: MovementReportRow[];
};

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function MovementReportTable({ rows }: MovementReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-6 py-10 text-center">
        <p className="text-sm text-gray-500">
          No asset movement records found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>From Location</TableHead>
            <TableHead>To Location</TableHead>
            <TableHead>Moved Date</TableHead>
            <TableHead>Moved By</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div>
                  <Link
                    href={`/reports/movements/${row.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {row.asset.assetCode}
                  </Link>

                  <p className="text-xs text-gray-500">{row.asset.name}</p>

                  {row.asset.assetTag && (
                    <p className="text-xs text-gray-500">
                      Tag: {row.asset.assetTag}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>{row.fromLocation?.name ?? '—'}</TableCell>

              <TableCell>{row.toLocation.name}</TableCell>

              <TableCell>{formatDateTime(row.movedAt)}</TableCell>

              <TableCell>{row.movedByUser.displayName}</TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs">
                  {row.reason ?? '—'}
                </span>
              </TableCell>

              <TableCell>
                <span className="line-clamp-2 max-w-xs">
                  {row.notes ?? '—'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
