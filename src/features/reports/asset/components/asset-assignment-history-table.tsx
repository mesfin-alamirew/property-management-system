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
      <p className="px-5 py-4 text-sm text-muted-foreground">
        No assignment history is available for this asset.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-surface-muted/60">
          <TableHead className="whitespace-nowrap font-semibold">
            Employee
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Employee No.
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Assigned Date
          </TableHead>
          <TableHead className="whitespace-nowrap font-semibold">
            Returned Date
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
            <TableCell className="whitespace-nowrap font-medium text-foreground">
              {formatEmployee(row.employee)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {row.employee.employeeNumber}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.assignedAt)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-muted-foreground">
              {formatDate(row.returnedAt)}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {row.assignedByUser.displayName}
            </TableCell>

            <TableCell className="whitespace-nowrap text-foreground">
              {row.returnedByUser?.displayName ?? '—'}
            </TableCell>

            <TableCell className="min-w-48 text-foreground">
              {row.notes ?? '—'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
