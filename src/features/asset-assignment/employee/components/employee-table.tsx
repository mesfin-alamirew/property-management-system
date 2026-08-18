'use client';

import type { EmployeeWithRelations } from '../types/employee.types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { StatusBadge } from '@/components/common/status-badge';
import { RowActionButtons } from '@/components/common/row-action-buttons';

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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Organization Unit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">
              {employee.employeeNumber}
            </TableCell>

            <TableCell>
              {employee.firstName}{' '}
              {employee.middleName ? `${employee.middleName} ` : ''}
              {employee.lastName}
            </TableCell>

            <TableCell>
              {employee.organizationUnit.code} -{' '}
              {employee.organizationUnit.name}
            </TableCell>

            <TableCell>
              <StatusBadge active={employee.isActive} />
            </TableCell>

            <TableCell>
              <RowActionButtons
                onEdit={() => onEdit(employee)}
                onDeactivate={() => onDeactivate(employee)}
                loading={deactivatingId === employee.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
