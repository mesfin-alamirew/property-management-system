'use client';

import type { AssetAssignmentWithRelations } from '../types/asset-assignment.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { StatusBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  if (assignments.length === 0) {
    return (
      <EmptyState
        title="No asset assignments found"
        description="There are no asset assignment records to display."
      />
    );
  }

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
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assignments.map((assignment) => {
          const isActive = assignment.returnedAt === null;

          const employeeName = [
            assignment.employee.firstName,
            assignment.employee.middleName,
            assignment.employee.lastName,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <TableRow key={assignment.id}>
              <TableCell>
                <div className="font-medium text-foreground">
                  {assignment.asset.assetCode}
                </div>

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
                <div className="font-medium text-foreground">
                  {employeeName}
                </div>

                <div className="text-xs text-muted-foreground">
                  {assignment.employee.employeeNumber}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {assignment.assignedAt.toLocaleString()}
              </TableCell>

              <TableCell>{assignment.assignedByUser.displayName}</TableCell>

              <TableCell className="whitespace-nowrap">
                {assignment.returnedAt
                  ? assignment.returnedAt.toLocaleString()
                  : '—'}
              </TableCell>

              <TableCell>
                {assignment.returnedByUser?.displayName ?? '—'}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                <StatusBadge active={isActive} />
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {isActive ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5"
                    disabled={returningId === assignment.id}
                    onClick={() => onReturn(assignment)}
                  >
                    {returningId === assignment.id ? 'Returning...' : 'Return'}
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
