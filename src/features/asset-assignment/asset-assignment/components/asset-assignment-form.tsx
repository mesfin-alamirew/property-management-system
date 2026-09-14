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
import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

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

  const assetOptions = assets.map((asset) => ({
    value: asset.id,
    label: `${asset.assetCode}${asset.assetTag ? ` - ${asset.assetTag}` : ''} - ${asset.name}`,
  }));

  const employeeOptions = employees.map((employee) => {
    const fullName = [
      employee.firstName,
      employee.middleName,
      employee.lastName,
    ]
      .filter(Boolean)
      .join(' ');

    return {
      value: employee.id,
      label: `${employee.employeeNumber} - ${fullName}`,
    };
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Assignment Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the asset and employee for this assignment.
          </p>
        </div>

        <SelectField
          label="Asset"
          required
          options={assetOptions}
          placeholder="Select asset"
          error={errors.assetId?.message}
          {...register('assetId')}
        />

        <SelectField
          label="Employee"
          required
          options={employeeOptions}
          placeholder="Select employee"
          error={errors.employeeId?.message}
          {...register('employeeId')}
        />

        <TextField
          label="Assignment Date"
          type="datetime-local"
          error={errors.assignedAt?.message}
          {...register('assignedAt')}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Additional Information
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Add any notes relevant to this asset assignment.
          </p>
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Assigning...' : 'Assign Asset'}
        </Button>
      </div>
    </form>
  );
}
