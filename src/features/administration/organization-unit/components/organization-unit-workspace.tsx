'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import type { OrganizationUnit, Prisma } from '@/generated/prisma/client';

import { Button } from '@/components/ui/button';
import { MasterDataLayout } from '@/components/layouts/master-data-layout';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

import { deactivateOrganizationUnitAction } from '../actions/organization-unit.actions';

import { OrganizationUnitDialog } from './organization-unit-dialog';
import { OrganizationUnitTable } from './organization-unit-table';

type OrganizationUnitWithRelations = Prisma.OrganizationUnitGetPayload<{
  include: {
    country: {
      select: {
        id: true;
        name: true;
      };
    };
    parent: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

type OrganizationUnitWorkspaceProps = {
  organizationUnits: OrganizationUnitWithRelations[];

  parentOrganizationUnits: {
    id: string;
    code: string;
    name: string;
  }[];

  countries: {
    id: string;
    name: string;
  }[];

  organizationUnitTypes: string[];
};

export function OrganizationUnitWorkspace({
  organizationUnits,
  parentOrganizationUnits,
  countries,
  organizationUnitTypes,
}: OrganizationUnitWorkspaceProps) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedOrganizationUnit, setSelectedOrganizationUnit] =
    useState<OrganizationUnit | null>(null);

  const [organizationUnitToDeactivate, setOrganizationUnitToDeactivate] =
    useState<OrganizationUnit | null>(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  function handleCreate() {
    setSelectedOrganizationUnit(null);
    setIsDialogOpen(true);
  }

  function handleEdit(organizationUnit: OrganizationUnit) {
    setSelectedOrganizationUnit(organizationUnit);
    setIsDialogOpen(true);
  }

  function handleDeactivate(organizationUnit: OrganizationUnit) {
    setOrganizationUnitToDeactivate(organizationUnit);
    setIsConfirmationOpen(true);
  }

  async function confirmDeactivate() {
    if (!organizationUnitToDeactivate) {
      return;
    }

    try {
      setDeactivatingId(organizationUnitToDeactivate.id);

      const result = await deactivateOrganizationUnitAction(
        organizationUnitToDeactivate.id,
      );

      if (result.success) {
        toast.success('Organization Unit deactivated successfully');

        setIsConfirmationOpen(false);
        setOrganizationUnitToDeactivate(null);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <MasterDataLayout
      title="Organization Units"
      description="Manage organization units and their hierarchy."
      actions={
        <Button type="button" onClick={handleCreate}>
          Add Organization Unit{' '}
        </Button>
      }
    >
      {' '}
      <OrganizationUnitTable
        organizationUnits={organizationUnits}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
        deactivatingId={deactivatingId}
      />
      <OrganizationUnitDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        organizationUnit={selectedOrganizationUnit}
        organizationUnits={parentOrganizationUnits}
        countries={countries}
        organizationUnitTypes={organizationUnitTypes}
      />
      <ConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        title="Deactivate Organization Unit"
        description={
          organizationUnitToDeactivate
            ? `Are you sure you want to deactivate "${organizationUnitToDeactivate.name}"?`
            : ''
        }
        confirmLabel="Deactivate"
        loading={deactivatingId !== null}
        onConfirm={confirmDeactivate}
      />
    </MasterDataLayout>
  );
}
