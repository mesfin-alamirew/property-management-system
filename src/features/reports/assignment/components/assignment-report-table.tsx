'use client';

import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AssignmentReportRow } from '../types/assignment.types';

type AssignmentReportTableProps = {
  rows: AssignmentReportRow[];
};

function formatEmployeeName(employee: AssignmentReportRow['employee']) {
  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

export function AssignmentReportTable({ rows }: AssignmentReportTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface px-5 py-8 text-center text-sm text-muted-foreground shadow-sm">
        No asset assignments found.
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
              Employee
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Employee Number
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Employee Organization Unit
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Asset Location
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Asset Organization Unit
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Assigned Date
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Returned Date
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Status
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
                  href={`/reports/assignments/${row.id}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover hover:underline"
                >
                  {row.asset.assetCode}
                </Link>
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {row.asset.assetTag ?? '—'}
              </TableCell>

              <TableCell className="font-medium">{row.asset.name}</TableCell>

              <TableCell>{row.asset.assetType.name}</TableCell>

              <TableCell>{formatEmployeeName(row.employee)}</TableCell>

              <TableCell className="whitespace-nowrap">
                {row.employee.employeeNumber}
              </TableCell>

              <TableCell>{row.employee.organizationUnit.name}</TableCell>

              <TableCell>{row.assetLocation?.name ?? '—'}</TableCell>

              <TableCell>
                {row.assetLocation?.organizationUnit.name ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap tabular-nums">
                {formatDate(row.assignedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap tabular-nums">
                {row.returnedAt ? formatDate(row.returnedAt) : '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap font-medium">
                {row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
