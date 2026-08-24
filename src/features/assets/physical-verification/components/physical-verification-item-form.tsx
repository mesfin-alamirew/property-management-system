'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  verifyPhysicalVerificationItemSchema,
  type VerifyPhysicalVerificationItemFormData,
} from '../schemas/physical-verification.schema';

import { verifyPhysicalVerificationItemAction } from '../actions/physical-verification.actions';

import type { PhysicalVerificationItemWithRelations } from '../types/physical-verification.types';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type PhysicalVerificationItemFormProps = {
  item: PhysicalVerificationItemWithRelations;
};

export function PhysicalVerificationItemForm({
  item,
}: PhysicalVerificationItemFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifyPhysicalVerificationItemFormData>({
    resolver: zodResolver(verifyPhysicalVerificationItemSchema),

    defaultValues: {
      assetFound: true,

      observedAssetTag: item.observedAssetTag ?? '',
      observedSerialNumber: item.observedSerialNumber ?? '',
      observedEmployeeNumber: item.observedEmployeeNumber ?? '',
      observedEmployeeName: item.observedEmployeeName ?? '',
      observedLocationCode: item.observedLocationCode ?? '',
      observedLocationName: item.observedLocationName ?? '',
      observedConditionCode: item.observedConditionCode ?? '',
      observedConditionName: item.observedConditionName ?? '',
      notes: item.notes ?? '',
    },
  });

  const assetFound = watch('assetFound');

  async function onSubmit(data: VerifyPhysicalVerificationItemFormData) {
    const result = await verifyPhysicalVerificationItemAction(item.id, data);

    if (result.success) {
      toast.success('Physical verification recorded successfully');

      reset(data);

      router.refresh();

      // onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Expected Information */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Expected Information</h3>

          <p className="text-sm text-muted-foreground">
            Information captured when the verification items were generated.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Asset Code"
            value={item.expectedAssetCode}
            readOnly
          />

          <TextField
            label="Asset Name"
            value={item.expectedAssetName}
            readOnly
          />

          <TextField
            label="Asset Tag"
            value={item.expectedAssetTag ?? ''}
            readOnly
          />

          <TextField
            label="Serial Number"
            value={item.expectedSerialNumber ?? ''}
            readOnly
          />

          <TextField
            label="Employee Number"
            value={item.expectedEmployeeNumber ?? ''}
            readOnly
          />

          <TextField
            label="Employee Name"
            value={item.expectedEmployeeName ?? ''}
            readOnly
          />

          <TextField
            label="Location Code"
            value={item.expectedLocationCode ?? ''}
            readOnly
          />

          <TextField
            label="Location Name"
            value={item.expectedLocationName ?? ''}
            readOnly
          />

          <TextField
            label="Condition Code"
            value={item.expectedConditionCode ?? ''}
            readOnly
          />

          <TextField
            label="Condition Name"
            value={item.expectedConditionName ?? ''}
            readOnly
          />
        </div>
      </section>

      {/* Observed Information */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Observed Information</h3>

          <p className="text-sm text-muted-foreground">
            Record the information found during the physical verification.
          </p>
        </div>

        {/* Asset Found */}
        <div>
          <label
            htmlFor="assetFound"
            className="mb-1 block text-sm font-medium"
          >
            Asset Found
          </label>

          <select
            id="assetFound"
            {...register('assetFound', {
              setValueAs: (value) => value === 'true',
            })}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="true">Yes - Asset Found</option>
            <option value="false">No - Asset Not Found</option>
          </select>

          {errors.assetFound?.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.assetFound.message}
            </p>
          )}
        </div>

        {/* Observed Fields */}
        <div
          className={
            assetFound
              ? 'grid gap-4 md:grid-cols-2'
              : 'grid gap-4 opacity-50 md:grid-cols-2'
          }
        >
          <TextField
            label="Observed Asset Tag"
            error={errors.observedAssetTag?.message}
            disabled={!assetFound}
            {...register('observedAssetTag')}
          />

          <TextField
            label="Observed Serial Number"
            error={errors.observedSerialNumber?.message}
            disabled={!assetFound}
            {...register('observedSerialNumber')}
          />

          <TextField
            label="Observed Employee Number"
            error={errors.observedEmployeeNumber?.message}
            disabled={!assetFound}
            {...register('observedEmployeeNumber')}
          />

          <TextField
            label="Observed Employee Name"
            error={errors.observedEmployeeName?.message}
            disabled={!assetFound}
            {...register('observedEmployeeName')}
          />

          <TextField
            label="Observed Location Code"
            error={errors.observedLocationCode?.message}
            disabled={!assetFound}
            {...register('observedLocationCode')}
          />

          <TextField
            label="Observed Location Name"
            error={errors.observedLocationName?.message}
            disabled={!assetFound}
            {...register('observedLocationName')}
          />

          <TextField
            label="Observed Condition Code"
            error={errors.observedConditionCode?.message}
            disabled={!assetFound}
            {...register('observedConditionCode')}
          />

          <TextField
            label="Observed Condition Name"
            error={errors.observedConditionName?.message}
            disabled={!assetFound}
            {...register('observedConditionName')}
          />
        </div>
      </section>

      {/* Notes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Verification Notes</h3>

          <p className="text-sm text-muted-foreground">
            Add any additional observations or comments.
          </p>
        </div>

        <TextAreaField
          label="Notes"
          error={errors.notes?.message}
          {...register('notes')}
        />
      </section>

      {/* Action */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Record Verification'}
        </Button>
      </div>
    </form>
  );
}
