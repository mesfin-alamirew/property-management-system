'use client';

import type { AssetAssignmentWithRelations } from '../types/asset-assignment.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/common/status-badge';

type AssetAssignmentTableProps = {
  assignments: AssetAssignmentWithRelations[];

  onReturn: (assignment: AssetAssignmentWithRelations) => void;

  returningId: string | null;
};

export function AssetAssignmentTable({
  assignments,
  onReturn,
  returningId,
}: AssetAssignmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Assigned At</TableHead>
          <TableHead>Assigned By</TableHead>
          <TableHead>Returned At</TableHead>
          <TableHead>Returned By</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assignments.map((assignment) => {
          const isActive = assignment.returnedAt === null;

          return (
            <TableRow key={assignment.id}>
              <TableCell className="font-medium">
                <div>{assignment.asset.assetCode}</div>

                <div className="text-xs text-muted-foreground">
                  {assignment.asset.name}
                </div>

                {assignment.asset.assetTag && (
                  <div className="text-xs text-muted-foreground">
                    Tag: {assignment.asset.assetTag}
                  </div>
                )}
              </TableCell>

              <TableCell>
                <div>
                  {assignment.employee.firstName}{' '}
                  {assignment.employee.middleName
                    ? `${assignment.employee.middleName} `
                    : ''}
                  {assignment.employee.lastName}
                </div>

                <div className="text-xs text-muted-foreground">
                  {assignment.employee.employeeNumber}
                </div>
              </TableCell>

              <TableCell>{assignment.assignedAt.toLocaleString()}</TableCell>

              <TableCell>{assignment.assignedByUser.displayName}</TableCell>

              <TableCell>
                {assignment.returnedAt
                  ? assignment.returnedAt.toLocaleString()
                  : '—'}
              </TableCell>

              <TableCell>
                {assignment.returnedByUser
                  ? assignment.returnedByUser.displayName
                  : '—'}
              </TableCell>

              <TableCell>
                <StatusBadge active={isActive} />
              </TableCell>

              <TableCell>
                {isActive && (
                  <button
                    type="button"
                    onClick={() => onReturn(assignment)}
                    disabled={returningId === assignment.id}
                    className="rounded-md border px-3 py-1.5 text-sm"
                  >
                    {returningId === assignment.id ? 'Returning...' : 'Return'}
                  </button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
