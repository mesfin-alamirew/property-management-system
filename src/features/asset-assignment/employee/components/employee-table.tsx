'use client';

import type { EmployeeWithRelations } from '../types/employee.types';

import { RowActionButtons } from '@/components/common/row-action-buttons';
import { StatusBadge } from '@/components/common/status-badge';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type EmployeeTableProps = {
  employees: EmployeeWithRelations[];

  onEdit: (employee: EmployeeWithRelations) => void;

  onDeactivate: (employee: EmployeeWithRelations) => void;

  deactivatingId: string | null;
};

export function EmployeeTable({
  employees,
  onEdit,
  onDeactivate,
  deactivatingId,
}: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees found"
        description="There are no employee records to display."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Organization Unit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="whitespace-nowrap">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {employees.map((employee) => {
          const fullName = [
            employee.firstName,
            employee.middleName,
            employee.lastName,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <TableRow key={employee.id}>
              <TableCell className="whitespace-nowrap font-medium text-foreground">
                {employee.employeeNumber}
              </TableCell>

              <TableCell>
                <span className="font-medium text-foreground">{fullName}</span>
              </TableCell>

              <TableCell>
                <div className="font-medium text-foreground">
                  {employee.organizationUnit.code}
                </div>

                <div className="text-xs text-muted-foreground">
                  {employee.organizationUnit.name}
                </div>
              </TableCell>

              <TableCell className="whitespace-nowrap">
                <StatusBadge active={employee.isActive} />
              </TableCell>

              <TableCell className="whitespace-nowrap">
                <RowActionButtons
                  onEdit={() => onEdit(employee)}
                  onDeactivate={() => onDeactivate(employee)}
                  loading={deactivatingId === employee.id}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
