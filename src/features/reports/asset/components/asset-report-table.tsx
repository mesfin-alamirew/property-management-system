import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AssetReportRow } from '../types/asset.types';

type AssetReportTableProps = {
  rows: AssetReportRow[];
};

function formatEmployee(
  employee: AssetReportRow['currentAssignment'] extends infer T
    ? T extends { employee: infer E }
      ? E
      : never
    : never,
) {
  if (!employee) {
    return '—';
  }

  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

function formatDate(value: Date | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB').format(new Date(value));
}

function formatAssignmentStatus(status: AssetReportRow['assignmentStatus']) {
  switch (status) {
    case 'CURRENT':
      return 'Current';
    case 'RETURNED':
      return 'Returned';
    case 'UNASSIGNED':
      return 'Unassigned';
  }
}

export function AssetReportTable({ rows }: AssetReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        No assets found matching the selected filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Code</TableHead>
            <TableHead>Asset Tag</TableHead>
            <TableHead>Asset Name</TableHead>
            <TableHead>Asset Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Organization Unit</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Current Employee</TableHead>
            <TableHead>Assignment Status</TableHead>
            <TableHead>Acquisition Date</TableHead>
            <TableHead>Acquisition Method</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Acquisition Cost</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link
                  href={`/reports/assets/${row.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {row.assetCode}
                </Link>
              </TableCell>

              <TableCell>{row.assetTag ?? '—'}</TableCell>

              <TableCell>{row.name}</TableCell>

              <TableCell>
                {row.assetType.code} - {row.assetType.name}
              </TableCell>

              <TableCell>
                {row.assetType.category.code} - {row.assetType.category.name}
              </TableCell>

              <TableCell>
                {row.status.code} - {row.status.name}
              </TableCell>

              <TableCell>
                {row.condition.code} - {row.condition.name}
              </TableCell>

              <TableCell>
                {row.location
                  ? `${row.location.organizationUnit.code} - ${row.location.organizationUnit.name}`
                  : '—'}
              </TableCell>

              <TableCell>
                {row.location
                  ? `${row.location.code} - ${row.location.name}`
                  : '—'}
              </TableCell>

              <TableCell>
                {row.currentAssignment
                  ? formatEmployee(row.currentAssignment.employee)
                  : '—'}
              </TableCell>

              <TableCell>
                {formatAssignmentStatus(row.assignmentStatus)}
              </TableCell>

              <TableCell>
                {formatDate(row.acquisition?.acquisitionDate ?? null)}
              </TableCell>

              <TableCell>
                {row.acquisition
                  ? `${row.acquisition.acquisitionMethod.code} - ${row.acquisition.acquisitionMethod.name}`
                  : '—'}
              </TableCell>

              <TableCell>{row.acquisition?.currency ?? '—'}</TableCell>

              <TableCell>{row.acquisition?.totalCost ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
