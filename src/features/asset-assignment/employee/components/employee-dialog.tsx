'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { EmployeeWithRelations } from '../types/employee.types';

import { EmployeeForm } from './employee-form';

type EmployeeDialogProps = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  employee?: EmployeeWithRelations | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
};

export function EmployeeDialog({
  open,
  onOpenChange,
  employee,
  organizationUnits,
}: EmployeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Edit Employee' : 'Create Employee'}
          </DialogTitle>

          <DialogDescription>Enter employee information.</DialogDescription>
        </DialogHeader>

        <EmployeeForm
          employee={employee}
          organizationUnits={organizationUnits}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
