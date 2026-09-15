import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { AssignmentHistoryRow } from '../types/assignment.types';

type AssignmentHistoryTableProps = {
  rows: AssignmentHistoryRow[];
};

function formatEmployeeName(employee: AssignmentHistoryRow['employee']) {
  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

function formatDate(date: Date | null) {
  if (!date) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

export function AssignmentHistoryTable({ rows }: AssignmentHistoryTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface px-5 py-8 text-center text-sm text-muted-foreground shadow-sm">
        No assignment history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted/60">
            <TableHead className="whitespace-nowrap font-semibold">
              Employee
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Employee Number
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
            <TableHead className="whitespace-nowrap font-semibold">
              Assigned By
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Returned By
            </TableHead>
            <TableHead className="whitespace-nowrap font-semibold">
              Notes
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="transition-colors hover:bg-surface-muted/50"
            >
              <TableCell className="font-medium">
                {formatEmployeeName(row.employee)}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {row.employee.employeeNumber}
              </TableCell>

              <TableCell className="whitespace-nowrap tabular-nums">
                {formatDate(row.assignedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap tabular-nums">
                {formatDate(row.returnedAt)}
              </TableCell>

              <TableCell className="whitespace-nowrap font-medium">
                {row.returnedAt ? 'RETURNED' : 'CURRENT'}
              </TableCell>

              <TableCell>{row.assignedByUser.displayName}</TableCell>

              <TableCell>{row.returnedByUser?.displayName ?? '—'}</TableCell>

              <TableCell className="min-w-48">{row.notes ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
