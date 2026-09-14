'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { OrganizationUnit } from '@/generated/prisma/client';

import { SelectField } from '@/components/form/select-field';
import { TextAreaField } from '@/components/form/text-area-field';
import { TextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

import {
  createOrganizationUnitAction,
  updateOrganizationUnitAction,
} from '../actions/organization-unit.actions';
import {
  organizationUnitSchema,
  type OrganizationUnitFormData,
} from '../schemas/organization-unit.schema';

type OrganizationUnitFormProps = {
  organizationUnit?: OrganizationUnit | null;

  organizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  countries: {
    id: string;
    name: string;
  }[];

  organizationUnitTypes: string[];

  onSuccess?: () => void;
};

export function OrganizationUnitForm({
  organizationUnit,
  organizationUnits,
  countries,
  organizationUnitTypes,
  onSuccess,
}: OrganizationUnitFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof organizationUnitSchema>,
    unknown,
    z.output<typeof organizationUnitSchema>
  >({
    resolver: zodResolver(organizationUnitSchema),

    defaultValues: {
      code: organizationUnit?.code ?? '',
      name: organizationUnit?.name ?? '',
      description: organizationUnit?.description ?? '',
      type: organizationUnit?.type ?? '',
      countryId: organizationUnit?.countryId ?? '',
      parentId: organizationUnit?.parentId ?? '',
    },
  });

  async function onSubmit(data: OrganizationUnitFormData) {
    const result = organizationUnit
      ? await updateOrganizationUnitAction(organizationUnit.id, data)
      : await createOrganizationUnitAction(data);

    if (result.success) {
      toast.success(
        organizationUnit
          ? 'Organization Unit updated successfully'
          : 'Organization Unit created successfully',
      );

      reset();

      router.refresh();

      onSuccess?.();
    } else {
      toast.error(result.message);
    }
  }

  const typeOptions = organizationUnitTypes.map((type) => ({
    value: type,
    label: type,
  }));

  const countryOptions = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const parentOptions = organizationUnits
    .filter((unit) => unit.id !== organizationUnit?.id)
    .map((unit) => ({
      value: unit.id,
      label: unit.name,
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <SelectField
          label="Type"
          required
          options={typeOptions}
          error={errors.type?.message}
          {...register('type')}
        />

        <SelectField
          label="Country"
          options={[
            {
              value: '',
              label: 'None',
            },
            ...countryOptions,
          ]}
          error={errors.countryId?.message}
          {...register('countryId')}
        />

        <SelectField
          label="Parent Organization Unit"
          options={[
            {
              value: '',
              label: 'None (Root Organization Unit)',
            },
            ...parentOptions,
          ]}
          error={errors.parentId?.message}
          {...register('parentId')}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? organizationUnit
              ? 'Updating...'
              : 'Saving...'
            : organizationUnit
              ? 'Update'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
