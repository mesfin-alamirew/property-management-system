'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import type { OrganizationUnit } from '@/generated/prisma/client';

import { deactivateOrganizationUnitAction } from '../actions/organization-unit.actions';

import { OrganizationUnitDialog } from './organization-unit-dialog';
import { OrganizationUnitTable } from './organization-unit-table';

type OrganizationUnitWithRelations = OrganizationUnit & {
  country: {
    name: string;
  } | null;

  parent: {
    name: string;
  } | null;
};

type OrganizationUnitClientProps = {
  organizationUnits: OrganizationUnitWithRelations[];

  countries: {
    id: string;
    name: string;
  }[];

  organizationUnitTypes: string[];
};

export function OrganizationUnitClient({
  organizationUnits,
  countries,
  organizationUnitTypes,
}: OrganizationUnitClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedOrganizationUnit, setSelectedOrganizationUnit] =
    useState<OrganizationUnit | null>(null);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedOrganizationUnit(null);
    setDialogOpen(true);
  }

  function handleEdit(organizationUnit: OrganizationUnit) {
    setSelectedOrganizationUnit(organizationUnit);
    setDialogOpen(true);
  }

  async function handleDeactivate(organizationUnit: OrganizationUnit) {
    setDeactivatingId(organizationUnit.id);

    try {
      const result = await deactivateOrganizationUnitAction(
        organizationUnit.id,
      );

      if (result.success) {
        toast.success('Organization Unit deactivated successfully');
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {' '}
      <div className="flex items-center justify-between">
        {' '}
        <div>
          {' '}
          <h1 className="text-2xl font-semibold">Organization Units </h1>
          <p className="text-sm text-muted-foreground">
            Manage organizational units and their hierarchy.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Add Organization Unit
        </button>
      </div>
      <OrganizationUnitTable
        organizationUnits={organizationUnits}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />
      <OrganizationUnitDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        organizationUnit={selectedOrganizationUnit}
        organizationUnits={organizationUnits}
        countries={countries}
        organizationUnitTypes={organizationUnitTypes}
      />
    </div>
  );
}
