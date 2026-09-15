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
      <div className="rounded-lg border border-border bg-surface px-6 py-10 text-center text-sm text-muted-foreground">
        No assets found matching the selected filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="whitespace-nowrap font-semibold">
              Asset Code
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Asset Tag
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Asset Name
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Asset Type
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Category
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Status
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Condition
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Organization Unit
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Location
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Current Employee
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Assignment Status
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Acquisition Date
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Acquisition Method
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Currency
            </TableHead>
            <TableHead className="whitespace-nowrap text-right font-semibold">
              Acquisition Cost
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
                  href={`/reports/assets/${row.id}`}
                  className="font-medium text-primary hover:text-primary-hover hover:underline"
                >
                  {row.assetCode}
                </Link>
              </TableCell>

              <TableCell className="whitespace-nowrap text-muted-foreground">
                {row.assetTag ?? '—'}
              </TableCell>

              <TableCell className="font-medium text-foreground">
                {row.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.assetType.code} - {row.assetType.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.assetType.category.code} - {row.assetType.category.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.status.code} - {row.status.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.condition.code} - {row.condition.name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.location
                  ? `${row.location.organizationUnit.code} - ${row.location.organizationUnit.name}`
                  : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.location
                  ? `${row.location.code} - ${row.location.name}`
                  : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.currentAssignment
                  ? formatEmployee(row.currentAssignment.employee)
                  : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                <span
                  className={[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                    row.assignmentStatus === 'CURRENT'
                      ? 'bg-info-surface text-info'
                      : row.assignmentStatus === 'UNASSIGNED'
                        ? 'bg-warning-surface text-warning'
                        : 'bg-surface-muted text-muted-foreground',
                  ].join(' ')}
                >
                  {formatAssignmentStatus(row.assignmentStatus)}
                </span>
              </TableCell>

              <TableCell className="whitespace-nowrap text-muted-foreground">
                {formatDate(row.acquisition?.acquisitionDate ?? null)}
              </TableCell>

              <TableCell className="whitespace-nowrap text-foreground">
                {row.acquisition
                  ? `${row.acquisition.acquisitionMethod.code} - ${row.acquisition.acquisitionMethod.name}`
                  : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-muted-foreground">
                {row.acquisition?.currency ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap text-right font-medium tabular-nums text-foreground">
                {row.acquisition?.totalCost ?? '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
