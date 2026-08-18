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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Identity */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Identity</h3>

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

      {/* Organization */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Organization</h3>

        <div className="space-y-2">
          <label htmlFor="organizationUnitId" className="text-sm font-medium">
            Organization Unit
            <span className="text-destructive"> *</span>
          </label>

          <select
            id="organizationUnitId"
            {...register('organizationUnitId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Organization Unit</option>

            {organizationUnits.map((organizationUnit) => (
              <option key={organizationUnit.id} value={organizationUnit.id}>
                {organizationUnit.code} - {organizationUnit.name}
              </option>
            ))}
          </select>

          {errors.organizationUnitId?.message && (
            <p className="text-sm text-destructive">
              {errors.organizationUnitId.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? employee
            ? 'Updating...'
            : 'Saving...'
          : employee
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
