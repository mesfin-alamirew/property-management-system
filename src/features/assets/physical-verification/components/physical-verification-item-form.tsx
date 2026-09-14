'use client';

import { useForm, useWatch } from 'react-hook-form';
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
import { SelectField } from '@/components/form/select-field';
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
    control,
    setValue,
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

  const assetFound = useWatch({
    control,
    name: 'assetFound',
  });

  async function onSubmit(data: VerifyPhysicalVerificationItemFormData) {
    const result = await verifyPhysicalVerificationItemAction(item.id, data);

    if (result.success) {
      toast.success('Physical verification recorded successfully');

      reset(data);

      router.refresh();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Expected Information
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Information captured when the verification items were generated.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
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
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Observed Information
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Record the information found during the physical verification.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="space-y-5">
            <SelectField
              label="Asset Found"
              options={[
                {
                  value: 'true',
                  label: 'Yes - Asset Found',
                },
                {
                  value: 'false',
                  label: 'No - Asset Not Found',
                },
              ]}
              value={assetFound ? 'true' : 'false'}
              onChange={(event) => {
                setValue('assetFound', event.target.value === 'true', {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              error={errors.assetFound?.message}
            />

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

            {!assetFound && (
              <p className="text-sm leading-5 text-muted-foreground">
                Observed asset details are unavailable because the expected
                asset was not found during the verification.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Verification Notes
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Add any additional observations or comments.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <TextAreaField
            label="Notes"
            error={errors.notes?.message}
            {...register('notes')}
          />
        </div>
      </section>

      <div className="flex justify-end border-t border-border pt-5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Record Verification'}
        </Button>
      </div>
    </form>
  );
}
