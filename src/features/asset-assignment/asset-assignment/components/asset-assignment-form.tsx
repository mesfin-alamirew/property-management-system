'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  createAssetAssignmentSchema,
  type CreateAssetAssignmentFormData,
} from '../schemas/asset-assignment.schema';

import { createAssetAssignmentAction } from '../actions/asset-assignment.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';

type AssetAssignmentFormProps = {
  assets: {
    id: string;
    assetCode: string;
    assetTag: string | null;
    name: string;
  }[];

  employees: {
    id: string;
    employeeNumber: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
  }[];

  onSuccess?: () => void;
};

export function AssetAssignmentForm({
  assets,
  employees,
  onSuccess,
}: AssetAssignmentFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof createAssetAssignmentSchema>,
    unknown,
    z.output<typeof createAssetAssignmentSchema>
  >({
    resolver: zodResolver(createAssetAssignmentSchema),

    defaultValues: {
      assetId: '',
      employeeId: '',
      assignedAt: '',
      notes: '',
    },
  });

  async function onSubmit(data: CreateAssetAssignmentFormData) {
    const result = await createAssetAssignmentAction(data);

    if (result.success) {
      toast.success('Asset assigned successfully');

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Assignment */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Assignment</h3>

        {/* Asset */}
        <div className="space-y-2">
          <label htmlFor="assetId" className="text-sm font-medium">
            Asset <span className="text-destructive">*</span>
          </label>

          <select
            id="assetId"
            {...register('assetId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Asset</option>

            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.assetCode}
                {asset.assetTag ? ` - ${asset.assetTag}` : ''} - {asset.name}
              </option>
            ))}
          </select>

          {errors.assetId?.message && (
            <p className="text-sm text-destructive">{errors.assetId.message}</p>
          )}
        </div>

        {/* Employee */}
        <div className="space-y-2">
          <label htmlFor="employeeId" className="text-sm font-medium">
            Employee <span className="text-destructive">*</span>
          </label>

          <select
            id="employeeId"
            {...register('employeeId')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Select Employee</option>

            {employees.map((employee) => {
              const fullName = [
                employee.firstName,
                employee.middleName,
                employee.lastName,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <option key={employee.id} value={employee.id}>
                  {employee.employeeNumber} - {fullName}
                </option>
              );
            })}
          </select>

          {errors.employeeId?.message && (
            <p className="text-sm text-destructive">
              {errors.employeeId.message}
            </p>
          )}
        </div>

        {/* Assignment Date */}
        <div className="space-y-2">
          <label htmlFor="assignedAt" className="text-sm font-medium">
            Assignment Date
          </label>

          <input
            id="assignedAt"
            type="datetime-local"
            {...register('assignedAt')}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          {errors.assignedAt?.message && (
            <p className="text-sm text-destructive">
              {errors.assignedAt.message}
            </p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Additional Information</h3>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Assigning...' : 'Assign Asset'}
      </Button>
    </form>
  );
}
