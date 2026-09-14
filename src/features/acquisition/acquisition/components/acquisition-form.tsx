'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  acquisitionSchema,
  type AcquisitionFormData,
} from '../schemas/acquisition.schema';

import {
  createAcquisitionAction,
  updateAcquisitionAction,
} from '../actions/acquisition.actions';

import type { AcquisitionWithRelations } from '../types/acquisition.types';

import { Button } from '@/components/ui/button';
import { SelectField } from '@/components/form/select-field';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

type AcquisitionFormProps = {
  acquisition?: AcquisitionWithRelations | null;

  acquisitionMethods: {
    id: string;
    code: string;
    name: string;
  }[];

  onSuccess?: () => void;
};

export function AcquisitionForm({
  acquisition,
  acquisitionMethods,
  onSuccess,
}: AcquisitionFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof acquisitionSchema>,
    unknown,
    z.output<typeof acquisitionSchema>
  >({
    resolver: zodResolver(acquisitionSchema),

    defaultValues: {
      acquisitionDate: acquisition
        ? acquisition.acquisitionDate.toISOString().split('T')[0]
        : '',
      acquisitionMethodId: acquisition?.acquisitionMethodId ?? '',
      supplierName: acquisition?.supplierName ?? '',
      referenceNumber: acquisition?.referenceNumber ?? '',
      description: acquisition?.description ?? '',
      fundingSource: acquisition?.fundingSource ?? '',
      totalAmount: acquisition?.totalAmount?.toString() ?? '',
      currency: acquisition?.currency ?? '',
      notes: acquisition?.notes ?? '',
    },
  });

  async function onSubmit(data: AcquisitionFormData) {
    const result = acquisition
      ? await updateAcquisitionAction(acquisition.id, data)
      : await createAcquisitionAction(data);

    if (result.success) {
      toast.success(
        acquisition
          ? `Acquisition ${result.data.acquisitionNumber} updated successfully`
          : `Acquisition ${result.data.acquisitionNumber} created successfully`,
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Acquisition Information
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Identify the acquisition date and method used to obtain the assets.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Acquisition Date"
              type="date"
              required
              error={errors.acquisitionDate?.message}
              {...register('acquisitionDate')}
            />

            <SelectField
              label="Acquisition Method"
              required
              options={[
                {
                  value: '',
                  label: 'Select acquisition method',
                },
                ...acquisitionMethods.map((method) => ({
                  value: method.id,
                  label: `${method.code} - ${method.name}`,
                })),
              ]}
              error={errors.acquisitionMethodId?.message}
              {...register('acquisitionMethodId')}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Source Information
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Record the supplier and funding information associated with the
            acquisition.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Supplier Name"
              error={errors.supplierName?.message}
              {...register('supplierName')}
            />

            <TextField
              label="Reference Number"
              error={errors.referenceNumber?.message}
              {...register('referenceNumber')}
            />

            <TextField
              label="Funding Source"
              error={errors.fundingSource?.message}
              {...register('fundingSource')}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Financial Information
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Record the financial value and currency of the acquisition.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Total Amount"
              type="number"
              step="0.01"
              error={errors.totalAmount?.message}
              {...register('totalAmount')}
            />

            <TextField
              label="Currency"
              error={errors.currency?.message}
              {...register('currency')}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            Description & Notes
          </h3>

          <p className="text-sm leading-5 text-muted-foreground">
            Add supporting information about the acquisition.
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="space-y-4">
            <TextAreaField
              label="Description"
              error={errors.description?.message}
              {...register('description')}
            />

            <TextAreaField
              label="Notes"
              error={errors.notes?.message}
              {...register('notes')}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-border pt-5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? acquisition
              ? 'Updating...'
              : 'Saving...'
            : acquisition
              ? 'Update Acquisition'
              : 'Save Acquisition'}
        </Button>
      </div>
    </form>
  );
}
