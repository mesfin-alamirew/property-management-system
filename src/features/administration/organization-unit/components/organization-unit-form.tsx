'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { OrganizationUnit } from '@/generated/prisma/client';

import {
  organizationUnitSchema,
  type OrganizationUnitFormData,
} from '../schemas/organization-unit.schema';

import {
  createOrganizationUnitAction,
  updateOrganizationUnitAction,
} from '../actions/organization-unit.actions';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/form/text-field';
import { TextAreaField } from '@/components/form/text-area-field';

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Type
        </label>

        <select
          id="type"
          {...register('type')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select Organization Unit Type</option>

          {organizationUnitTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {errors.type?.message && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="countryId" className="text-sm font-medium">
          Country
        </label>

        <select
          id="countryId"
          {...register('countryId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">None</option>

          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>

        {errors.countryId?.message && (
          <p className="text-sm text-destructive">{errors.countryId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="parentId" className="text-sm font-medium">
          Parent Organization Unit
        </label>

        <select
          id="parentId"
          {...register('parentId')}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">None (Root Organization Unit)</option>

          {organizationUnits
            .filter((unit) => unit.id !== organizationUnit?.id)
            .map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
        </select>

        {errors.parentId?.message && (
          <p className="text-sm text-destructive">{errors.parentId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? organizationUnit
            ? 'Updating...'
            : 'Saving...'
          : organizationUnit
            ? 'Update'
            : 'Save'}
      </Button>
    </form>
  );
}
