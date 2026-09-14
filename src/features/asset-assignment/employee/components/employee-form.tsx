'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  employeeSchema,
  type EmployeeFormData,
} from '../schemas/employee.schema';

import {
  createEmployeeAction,
  updateEmployeeAction,
} from '../actions/employee.actions';

import type { EmployeeWithRelations } from '../types/employee.types';

import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/form/select-field';
import { TextField } from '@/components/form/text-field';

type EmployeeFormProps = {
  employee?: EmployeeWithRelations | null;
  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];
  onSuccess?: () => void;
};

export function EmployeeForm({
  employee,
  organizationUnits,
  onSuccess,
}: EmployeeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof employeeSchema>,
    unknown,
    z.output<typeof employeeSchema>
  >({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employeeNumber: employee?.employeeNumber ?? '',
      firstName: employee?.firstName ?? '',
      middleName: employee?.middleName ?? '',
      lastName: employee?.lastName ?? '',
      organizationUnitId: employee?.organizationUnitId ?? '',
    },
  });

  async function onSubmit(data: EmployeeFormData) {
    const result = employee
      ? await updateEmployeeAction(employee.id, data)
      : await createEmployeeAction(data);

    if (result.success) {
      toast.success(
        employee
          ? 'Employee updated successfully'
          : 'Employee created successfully',
      );

      reset();
      router.refresh();
      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  const organizationUnitOptions = organizationUnits.map((organizationUnit) => ({
    value: organizationUnit.id,
    label: `${organizationUnit.code} - ${organizationUnit.name}`,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Identity</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Enter the employee&apos;s identification and name information.
          </p>
        </div>

        <TextField
          label="Employee Number"
          required
          error={errors.employeeNumber?.message}
          {...register('employeeNumber')}
        />

        <TextField
          label="First Name"
          required
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <TextField
          label="Middle Name"
          error={errors.middleName?.message}
          {...register('middleName')}
        />

        <TextField
          label="Last Name"
          required
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Organization
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the organizational unit responsible for this employee.
          </p>
        </div>

        <SelectField
          label="Organization Unit"
          required
          options={organizationUnitOptions}
          placeholder="Select organization unit"
          error={errors.organizationUnitId?.message}
          {...register('organizationUnitId')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? employee
              ? 'Updating...'
              : 'Saving...'
            : employee
              ? 'Update Employee'
              : 'Save Employee'}
        </Button>
      </div>
    </form>
  );
}
