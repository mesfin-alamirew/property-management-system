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
      <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
        No assignment history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Employee Number</TableHead>
            <TableHead>Assigned Date</TableHead>
            <TableHead>Returned Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned By</TableHead>
            <TableHead>Returned By</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{formatEmployeeName(row.employee)}</TableCell>

              <TableCell>{row.employee.employeeNumber}</TableCell>

              <TableCell>{formatDate(row.assignedAt)}</TableCell>

              <TableCell>{formatDate(row.returnedAt)}</TableCell>

              <TableCell>{row.returnedAt ? 'RETURNED' : 'CURRENT'}</TableCell>

              <TableCell>{row.assignedByUser.displayName}</TableCell>

              <TableCell>{row.returnedByUser?.displayName ?? '—'}</TableCell>

              <TableCell>{row.notes ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
