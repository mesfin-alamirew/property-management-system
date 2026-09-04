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
      <p className="text-sm text-gray-500">
        No incident records match the selected filters.
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
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Incident Date</TableHead>
          <TableHead>Reported</TableHead>
          <TableHead>Assigned Officer</TableHead>
          <TableHead>Resolved</TableHead>
          <TableHead>Resolution</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Link
                href={`/reports/incidents/${row.id}`}
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

            <TableCell>{row.severity.replaceAll('_', ' ')}</TableCell>

            <TableCell>{row.status.replaceAll('_', ' ')}</TableCell>

            <TableCell>{row.title}</TableCell>

            <TableCell>{formatDate(row.incidentDate)}</TableCell>

            <TableCell>{formatDate(row.reportedAt)}</TableCell>

            <TableCell>{row.assignedToUser?.displayName ?? '—'}</TableCell>

            <TableCell>{formatDate(row.resolvedAt)}</TableCell>

            <TableCell>{row.hasResolution ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
