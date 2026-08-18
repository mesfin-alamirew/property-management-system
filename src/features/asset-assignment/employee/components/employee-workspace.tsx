'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateEmployeeAction } from '../actions/employee.actions';
import type { EmployeeWithRelations } from '../types/employee.types';

import { EmployeeTable } from './employee-table';
import { EmployeeDialog } from './employee-dialog';

type EmployeeWorkspaceProps = {
  employees: EmployeeWithRelations[];

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function EmployeeWorkspace({
  employees,
  organizationUnits,
}: EmployeeWorkspaceProps) {
  const router = useRouter();

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeWithRelations | null>(null);

  const [employeeToDeactivate, setEmployeeToDeactivate] =
    useState<EmployeeWithRelations | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleCreate() {
    setSelectedEmployee(null);
    setIsDialogOpen(true);
  }

  function handleEdit(employee: EmployeeWithRelations) {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  }

  function handleDeactivate(employee: EmployeeWithRelations) {
    setEmployeeToDeactivate(employee);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!employeeToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(employeeToDeactivate.id);

      const result = await deactivateEmployeeAction(employeeToDeactivate.id);

      if (result.success) {
        toast.success('Employee deactivated successfully');

        setIsConfirmationOpen(false);
        setEmployeeToDeactivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Employees"
      description="Manage employees and their organizational assignments."
      actions={
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md border px-4 py-2 text-sm"
        >
          Add Employee
        </button>
      }
    >
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />

      <EmployeeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        employee={selectedEmployee}
        organizationUnits={organizationUnits}
      />

      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Employee"
        description={
          employeeToDeactivate
            ? `Are you sure you want to deactivate "${employeeToDeactivate.firstName} ${employeeToDeactivate.lastName}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
