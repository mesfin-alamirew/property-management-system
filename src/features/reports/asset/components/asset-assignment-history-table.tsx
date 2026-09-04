import type { AssetAssignmentHistoryRow } from '../types/asset.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AssetAssignmentHistoryTableProps = {
  rows: AssetAssignmentHistoryRow[];
};

function formatEmployee(employee: AssetAssignmentHistoryRow['employee']) {
  return [employee.firstName, employee.middleName, employee.lastName]
    .filter(Boolean)
    .join(' ');
}

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

export function AssetAssignmentHistoryTable({
  rows,
}: AssetAssignmentHistoryTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No assignment history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Employee No.</TableHead>
          <TableHead>Assigned Date</TableHead>
          <TableHead>Returned Date</TableHead>
          <TableHead>Assigned By</TableHead>
          <TableHead>Returned By</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{formatEmployee(row.employee)}</TableCell>

            <TableCell>{row.employee.employeeNumber}</TableCell>

            <TableCell>{formatDate(row.assignedAt)}</TableCell>

            <TableCell>{formatDate(row.returnedAt)}</TableCell>

            <TableCell>{row.assignedByUser.displayName}</TableCell>

            <TableCell>{row.returnedByUser?.displayName ?? '—'}</TableCell>

            <TableCell>{row.notes ?? '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
