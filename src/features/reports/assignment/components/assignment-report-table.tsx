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
      <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
        No asset assignments found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset Code</TableHead>
            <TableHead>Asset Tag</TableHead>
            <TableHead>Asset Name</TableHead>
            <TableHead>Asset Type</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Employee Number</TableHead>
            <TableHead>Employee Organization Unit</TableHead>
            <TableHead>Asset Location</TableHead>
            <TableHead>Asset Organization Unit</TableHead>
            <TableHead>Assigned Date</TableHead>
            <TableHead>Returned Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link
                  href={`/reports/assignments/${row.id}`}
                  className="font-medium hover:underline"
                >
                  {row.asset.assetCode}
                </Link>
              </TableCell>

              <TableCell>{row.asset.assetTag ?? '—'}</TableCell>

              <TableCell>{row.asset.name}</TableCell>

              <TableCell>{row.asset.assetType.name}</TableCell>

              <TableCell>{formatEmployeeName(row.employee)}</TableCell>

              <TableCell>{row.employee.employeeNumber}</TableCell>

              <TableCell>{row.employee.organizationUnit.name}</TableCell>

              <TableCell>{row.assetLocation?.name ?? '—'}</TableCell>

              <TableCell>
                {row.assetLocation?.organizationUnit.name ?? '—'}
              </TableCell>

              <TableCell>{formatDate(row.assignedAt)}</TableCell>

              <TableCell>
                {row.returnedAt ? formatDate(row.returnedAt) : '—'}
              </TableCell>

              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
