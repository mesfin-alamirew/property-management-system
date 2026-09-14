'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { PropertyTenure } from '@/generated/prisma/client';

import {
  propertyTenureSchema,
  type PropertyTenureFormData,
} from '../schemas/property-tenure.schema';

import {
  createPropertyTenureAction,
  updatePropertyTenureAction,
} from '../actions/property-tenure.actions';

import { Button } from '@/components/ui/button';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';

type PropertyTenureFormProps = {
  propertyTenure?: PropertyTenure | null;
  onSuccess?: () => void;
};

export function PropertyTenureForm({
  propertyTenure,
  onSuccess,
}: PropertyTenureFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof propertyTenureSchema>,
    unknown,
    z.output<typeof propertyTenureSchema>
  >({
    resolver: zodResolver(propertyTenureSchema),

    defaultValues: {
      code: propertyTenure?.code ?? '',
      name: propertyTenure?.name ?? '',
      description: propertyTenure?.description ?? '',
    },
  });

  async function onSubmit(data: PropertyTenureFormData) {
    const result = propertyTenure
      ? await updatePropertyTenureAction(propertyTenure.id, data)
      : await createPropertyTenureAction(data);

    if (result.success) {
      toast.success(
        propertyTenure
          ? 'Property Tenure updated successfully'
          : 'Property Tenure created successfully',
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
            Property Tenure Information
          </h3>

          <p className="text-xs leading-5 text-muted-foreground">
            Provide the identifying information used to classify property
            tenure.
          </p>
        </div>

        <div className="space-y-4">
          <TextField
            label="Code"
            required
            error={errors.code?.message}
            {...register('code')}
          />

          <TextField
            label="Name"
            required
            error={errors.name?.message}
            {...register('name')}
          />

          <TextAreaField
            label="Description"
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </section>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? propertyTenure
              ? 'Updating...'
              : 'Saving...'
            : propertyTenure
              ? 'Update Property Tenure'
              : 'Save Property Tenure'}
        </Button>
      </div>
    </form>
  );
}
